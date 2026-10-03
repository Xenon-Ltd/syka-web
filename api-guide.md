# Syka - Frontend Integration Guide

### A Human-Friendly Introduction to the APIs

**Base URL (development):** `http://35.174.111.204:9000/api/v1`  
**Interactive docs:** `http://35.174.111.204:9000/swagger/index.html`  
**OpenAPI spec (for codegen):** `http://35.174.111.204:9000/swagger-doc.json`  
-- or `/swagger/doc.json`, which the Swagger UI itself fetches and also works. What does NOT work is
`/openapi.json` or `/swagger/swagger.json`; both have been tried repeatedly in the logs. Both the UI
and the spec are disabled in production.  
**Auth header:** All protected endpoints require `Authorization: Bearer <access_token>`

---

## How to Read This Guide

Endpoints are listed **in the order you must call them** -- you cannot call a later endpoint without completing the earlier ones first. Each endpoint shows its HTTP method and path, a plain-English description, and any special notes.

Sections marked **(coming soon)** are planned and designed but not yet deployed. They are listed here so all three frontend teams can plan their UI flows in advance.

---

## Endpoints You Already Have

We reviewed all 142 endpoints in `Syka Missing Endpoint.pdf`. **About 23 of them already exist** --
usually under a path you didn't know about. Please check this table before filing a request; it is
the fastest way to unblock a screen.

### Syka Merchant app -> **now built at `/api/v1/merchant/*`**

**SUPERSEDED (2026-08-29).** This section used to map the merchant app's screens onto the teller
endpoints as a stopgap. It no longer applies: the merchant app has its own namespace, its own app
context and all 41 endpoints. See the change-log entry at the top of this file.

Do **not** point a merchant account at `/teller/*` -- it will 403, and it always would have: a
merchant token carries `app_context: "merchant"`, which the teller routes reject. The teller
endpoints also have no ownership scoping, so they were never a safe stand-in for an external party.

| You asked for                       | Use                                                                |
| ----------------------------------- | ------------------------------------------------------------------ |
| `GET /customers` (search + filters) | `GET /merchant/customers?q=&status=&risk=&branch_id=&page=&limit=` |
| `POST /customers` (6-step KYB)      | `POST /merchant/customers` (individual or corporate)               |
| `GET`/`PUT /customers/{id}`         | `GET`/`PUT /merchant/customers/{id}`                               |
| `GET /customers/{id}/transactions`  | `GET /merchant/customers/{id}/transactions` (returns a rollup too) |
| `POST /payments/quote`              | `POST /merchant/payments/quote`                                    |
| `POST /payments`                    | `POST /merchant/payments` (idempotent; read `action`)              |
| `GET /payments/{id}`                | `GET /merchant/payments/{reference}` (live stages)                 |
| `GET /payments?status=processing`   | `GET /merchant/payments?status=PROCESSING`                         |
| `GET /payments/{id}/receipt`        | `GET /merchant/payments/{reference}/receipt`                       |

### Syka Admin

| You asked for                                            | Use today                                                                                                         |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `GET /admin/staff`                                       | `GET /admin/users?account_type=admin` -- works now                                                                |
| `PUT /admin/staff/{id}` (identity/status)                | `PUT /admin/users/{user_id}` \* `PUT /admin/users/{user_id}/status` (role: new `PUT /admin/users/{user_id}/role`) |
| `GET /admin/users/{id}/risk-assessment`                  | `GET`/`PUT /admin/compliance/risk/{user_id}` (no scored breakdown yet)                                            |
| `GET /admin/treasury/summary`, `/fiat-balances` (partly) | `GET /admin/transfi/balance` \* `POST /admin/transfi/prefund`                                                     |
| `GET /admin/revenue/summary` (partly)                    | `GET /admin/dashboard` (fee revenue) \* `GET /admin/reports/revenue`                                              |

### Syka Web App

| You asked for                              | Use today                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `POST /transactions/bulk/upload`           | Now built -- but `POST /transactions/bulk` with `items[]` already existed and still works           |
| `POST /beneficiaries/resolve`              | `POST /beneficiaries/{id}/verify` -- !! structural check only, **not** real account-name resolution |
| `GET /fx/rates?base=&pairs=`               | `GET /exchange-rates?base=&quotes=` (see the change log)                                            |
| `GET /transactions` param extensions       | Now built -- see the change log                                                                     |
| `POST /users/me/email/verify` + `/confirm` | Now built (registration-flow verification already existed at `POST /auth/register/verify-email`)    |
| `POST /treasury/alerts/{id}/dismiss`       | `DELETE /rate-alerts/{id}` -- rate alerts already exist (`GET`/`POST`/`DELETE /rate-alerts`)        |

### Needs a third-party provider (not scheduled)

These cannot be built until a provider is selected and contracted. Please tell us which matter most
so selection can start.

| Feature                                                                                                             | What it needs                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Virtual cards** (`/cards/*`, 11 endpoints)                                                                        | A card issuer / BIN sponsor. !! `GET /cards/{id}/pin` is not implementable as specified -- PINs live in the issuer's HSM and are never returned by an API. `GET /cards/{id}/sensitive` (full PAN + CVV) puts us in PCI-DSS scope unless it's the issuer's hosted reveal. Both need redesigning around a one-time reveal token rendered in an issuer iframe. |
| **Account-name resolution** (`/beneficiaries/resolve`, and the name-check half of bulk validate)                    | A bank account-name verification API                                                                                                                                                                                                                                                                                                                        |
| **Yield / APY** (`/treasury/yield`)                                                                                 | A yield provider -- there is no yield product to report on                                                                                                                                                                                                                                                                                                  |
| **Treasury balances** (`/admin/treasury/stablecoins`, `/fiat-balances`, `/reconciliation`, `/transfer`, `/convert`) | Custody/chain data and partner bank statements                                                                                                                                                                                                                                                                                                              |
| **KYC documents** (`GET /admin/users/{id}/kyc-documents`)                                                           | We never receive KYC documents -- Sumsub/TransFi hold them. Needs a provider document API.                                                                                                                                                                                                                                                                  |
| **PEP / adverse-media screening** (`GET /admin/users/{id}/screening`, partly)                                       | A screening vendor. The _internal watchlist_ half is built and live now.                                                                                                                                                                                                                                                                                    |

### Why there is no wallet-to-wallet conversion

**Asked again on 2026-10-01 for the Treasury page's "convert one currency to another" section.
The answer has not changed, and the reason is worth having in one place.**

`POST /wallets/convert`, `POST /wallets/convert/quote`, `GET /treasury/summary`,
`GET /wallets/{currency}/deposit-details` and `POST /wallets/{currency}/statement` all assume Syka
holds customer money in named balances. **We do not.** Converting between a user's own balances
requires us to hold both of them, and holding customer funds is a **licensing** decision -- answered
**no** on 2026-08-07 (PRD Sec 7.3). It is not a missing endpoint and not a third-party gap; there is
nothing to convert.

Concretely: every user wallet reads `0.00` and always will. No code path credits or debits one.
`GET /wallets/{currency}/ledger` returns an empty list for the same reason -- the double-entry ledger
posts against internal settlement accounts, not user wallets. `/admin/treasury/*` reports **flow,
not balances**, which is why `treasury_management` is a permanent zero there rather than being
omitted.

**What you CAN build that screen on, today:**

| You want                                                  | Use                                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| A live rate board, several pairs at once                  | `GET /exchange-rates?base=GHS&quotes=USD,EUR,NGN`                                           |
| "Convert 500 GHS to CAD" with real, fee-inclusive figures | `POST /transactions/quote` -- returns `rate`, `fee`, `total_cost`, `receive_amount`         |
| Actually moving that money                                | `POST /transactions/send`. It goes to a bank or mobile money account, not an in-app balance |

A conversion **calculator** works now and is a faithful screen. A conversion **button that moves
money between two balances you hold with us** cannot be built, and shipping something that looked
like one would be promising a product we are not licensed to run.

### Why a recipient does not see your transfer

**Reported on 2026-10-01: "the account I send money to, the transaction never reflects on their
end". This is by design, and the "they are unverified accounts" theory is a red herring -- a fully
verified Syka user would see nothing either.**

A payout recipient is a **rail, not an account**. When you send to a Ghanaian mobile-money number,
that number is a destination we hand to the payment provider; it is not linked to a Syka user even
if the same person happens to have one. The transfer carries exactly one user-linked party, the
SENDER, so it appears in the sender's history and nowhere else. The money arrives in the
recipient's mobile money or bank account -- not in the Syka app, where every balance is zero
anyway.

This is also why `direction` on a transaction is only ever `debit` today (except ONRAMP). It becomes
a real money-in-vs-money-out view only when inbound remittances to Syka users are modelled, which is
a product decision nobody has taken.

**What the recipient DOES get** is an out-of-band SMS or email when the payout settles, if the rail
carries a phone or email. That had a real bug -- the number we handed the gateway was not in E.164,
so nothing could be delivered -- which is fixed; see the change log. `GET /transactions/{reference}`
now reports `recipient_notification` so you can show the sender whether we reached them.
**Note:** SMS credentials are still unset in production, so it will currently read `skipped`.

### Not built yet, but no third party needed

**Now built (2026-08-15):** the merchant/agent network admin surface, the commercial-partner CRM,
the applications pipeline and commissions -- see the change log. Revenue analytics shipped in
Wave 2.

Still outstanding, and buildable without a third party:

- ~~**The merchant-facing app**~~ -- **SUPERSEDED (2026-08-29): BUILT AND LIVE.**
  `/api/v1/merchant/*` is mounted (`cmd/api/main.go`) with 41 endpoints. See Part 19.
- **Payment-link invoices** (5) -- buildable on the existing payin checkout; collection is
  blocked by the same TransFi merchant-config issue as all live orders.

---

## Two verifications, and why that keeps causing bugs

Read this once. It has now cost three separate rounds of debugging, and every symptom it produces
looks like a backend fault.

**A customer has to pass TWO unrelated verifications, run by two different parties.**

|                               | Syka's                                                           | The payment provider's                                                         |
| ----------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| What                          | The OTP at registration (phone, then email)                      | Its own email/phone check on the person it is being asked to move money for    |
| Where you see it              | `users.phone_verified` / `email_verified`, the registration flow | `contact_verification` on `GET /kyc/status` and on the merchant customer reads |
| How the customer completes it | Types the OTP into our app                                       | Opens a link the PROVIDER emails them, **valid ten minutes**                   |
| Can we resend it              | Yes                                                              | **No.** There is no provider API for it and no documented trigger              |

Neither one substitutes for the other, and **neither is KYC**. KYC is a third thing: the hosted
identity session behind `verify_url`.

**The symptoms this explains, all of which have been reported as backend bugs:**

- _"The customer verified their email but the KYC status didn't change."_ Correct behaviour. They
  opened the PROVIDER's contact link. That is not KYC; it unblocks transfers, nothing else.
- _"The user is verified but the transfer fails with `CONTACT_NOT_VERIFIED`."_ They are verified
  with **us**. The provider is still waiting. Read `error.details.how_to_resolve`.
- _"The link expired in ten minutes and there's no resend."_ True, and only of the PROVIDER's email.
  The KYC session link is ours and **is** resumable -- `POST /kyc/tier1/initiate`, or
  `POST /merchant/customers/{id}/kyc/initiate`, returns a live one with `resumed: true`.

**What to build.** When `contact_verification.verified` is false, show
`contact_verification.note` verbatim and tell the customer to look for the provider's email NOW,
before it expires. `email_at` / `phone_at` are when it was sent; an `"initiated"` status with an old
timestamp means it was sent and never opened. Verifying **either** channel is enough.

Full field reference: the 2026-09-04 entry further down.

---

## API Change Log

Breaking or behaviour-changing updates the frontend teams must act on. Newest first.
(Additive/new endpoints are listed too, flagged **non-breaking**.)

### 2026-10-01 -- NEW: merchant self-registration and onboarding `[merchant endpoints, 14 Sept]`

**15 new endpoints, all additive. Nothing existing changes.**

This is the whole of `merchant-endpoints-needed-14sept.pdf`. You were right that none of it
existed: the admin application pipeline was there, but every route into it needed an admin token,
and documents could only be attached to a partner that did not exist until onboarding.

**Public, on the website -- NO authentication.** `/api/v1/merchant-applications/*`

| Route                                           | What it does                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /merchant-applications/requirements`       | The form's reference data: required documents, business types, target-audience types |
| `POST /merchant-applications`                   | Step 1. Returns `tracking_token` + `status_url_path`                                 |
| `GET /merchant-applications/{token}`            | Steps 2-3 and the status page                                                        |
| `PUT /merchant-applications/{token}`            | Amend a draft (the Back button)                                                      |
| `POST /merchant-applications/{token}/documents` | Step 2, multipart                                                                    |
| `POST /merchant-applications/{token}/submit`    | Step 3                                                                               |
| `POST /merchant-applications/recover`           | Email a 6-digit code                                                                 |
| `POST /merchant-applications/recover/verify`    | Exchange it for the tracking token                                                   |

**Five things to build against:**

1. **There is no password and no account.** The UI has no password field, and we did not invent
   one. An unguessable `tracking_token` addresses the application instead. Keep it; it is also
   emailed. If it is lost, `recover` -> `recover/verify` gets it back by proving control of the
   mailbox.
2. **Step 1 creates a DRAFT, not a submission.** A draft is invisible to administrators, so an
   abandoned form never reaches the review queue. `POST .../submit` is what files it.
3. **Render the form from `/requirements`, do not hardcode it.** The same document list decides
   whether an application may be submitted, so a hardcoded copy goes out of step with the rule the
   first time compliance asks for another document. `code` is what you send as `document_type`.
4. **Check `can_submit` before enabling the button.** Submitting with a document missing returns
   `422 MISSING_DOCUMENTS` and `details.missing_documents` names each one.
5. **`recover` ALWAYS returns 202 with the same body**, whether or not an application exists for
   that address. That is deliberate -- otherwise the endpoint tells anybody who asks which
   businesses have applied.

Re-uploading the same `document_type` REPLACES the previous file, which is how a blurred photo is
corrected. `409 APPLICATION_EXISTS` means an application for that email is already in progress; a
rejected one does not block a new attempt. Uploaded documents are listed back by name and type with
**no download links** -- holding the status token must not become a way to read identity documents.

**Merchant app -- 6 new endpoints under `/api/v1/merchant/*`** (43 -> 49 routes)

| Route                             | Notes                                                       |
| --------------------------------- | ----------------------------------------------------------- |
| `GET /merchant/onboarding`        | Setup checklist with `completed` per step                   |
| `GET /merchant/profile`           | The merchant's own organisation record                      |
| `GET /merchant/settings/controls` | Approval thresholds in force + the range they may be set in |
| `PUT /merchant/settings/controls` | **Manager-only**                                            |
| `GET /merchant/roles`             | The two roles and what each may do                          |
| `POST /merchant/staff`            | **Manager-only.** Invite a team member                      |

- **`PUT /merchant/settings/controls` is the first thing that has ever written these.** Until now
  every merchant ran on platform defaults with no way to change them, which is what "approval
  authority config" means. `approval_threshold` is the amount above which a payment waits for a
  manager; `security_check_threshold` the amount above which the sender re-enters their password;
  `block_threshold` refuses outright and has no default. Amounts are decimal STRINGS in USDC.
  The block threshold must be HIGHER than the approval threshold (`422 INVALID_CONTROLS`), or every
  payment that would have queued is refused before a manager can see it. The ranges are in `limits`
  on the GET; above a maximum is `422 CONTROL_ABOVE_PLATFORM_MAXIMUM`.
- **`configured: false`** means nobody has ever set them and the values shown are our defaults, not
  somebody's choice. The onboarding checklist's `approval_controls` step keys off exactly this.
- **On `GET /merchant/onboarding`, read `can_transact`, not just `completed`.** A merchant can
  finish every step and still be unable to send payments if Syka has not activated the
  organisation; `note` says so when that is the case. `completed` counts the REQUIRED steps,
  `percent` counts them all, so a single-location merchant with no branches is not stuck below 100%.
- **`POST /merchant/staff` returns the temporary password ONCE** and also emails it. The employer
  comes from your session, never the request.

**Admin:** `GET /admin/merchants/applications/{id}/documents` returns an applicant's uploads with
15-minute presigned links -- without it a self-registered application cannot be reviewed at all.
And **`POST /admin/merchants/applications/{id}/onboard` now honours the tier and commission set at
approval.** It previously dropped both and every onboarded merchant started on the default
commission whatever the approver had agreed; you can still override either on the onboard call.

**`422 INVALID_STATE_TRANSITION` now names the next step.** A freshly submitted application cannot
be approved directly -- a background check has to be recorded first -- and the refusal now carries
`details.allowed_next` and `details.next_steps`, each with the endpoint to call.

---

### 2026-10-01 -- NEW: paying a shared invoice `[frontend, 2026-10-01]`

**2 new endpoints, additive.** You reported that a recipient opening a share link cannot check out.
**That was correct and it was our gap**: this guide already said invoices paid through Syka carry a
`payment_ref`, and nothing could produce one. The settle function existed with no caller.

| Route                                 | What it does                                     |
| ------------------------------------- | ------------------------------------------------ |
| `POST /invoices/shared/{token}/quote` | Prices the payment for the signed-in payer       |
| `POST /invoices/shared/{token}/pay`   | Sends it. Needs `Idempotency-Key` and `quote_id` |

**The issuer now says how they want to be paid.** `POST /invoices` and `PUT /invoices/{id}` take an
optional `payout_rail`:

```jsonc
"payout_rail": {
  "payout_country": "GH",
  "payment_code":   "mtn",            // from GET /config/payment-methods?direction=withdraw&currency=GHS
  "payment_type":   "local_wallet",
  "payout_details": { "phone": "0545707532", "phoneCode": "+233" }
}
```

It is validated at save, exactly like a beneficiary, so a badly formatted number is a correction the
issuer makes now rather than an error a stranger hits later. Stored encrypted.

**Five things to build against:**

1. **Still no anonymous checkout.** The payer must be a signed-in Syka user. Every payin our
   provider collects carries a registered, verified account; a link a stranger can pay does not
   exist and cannot be built on what we have.
2. **The money does NOT land in a Syka balance.** It is an ordinary transfer to the issuer's mobile
   money or bank account. Syka holds no customer funds and every wallet reads zero -- see "Why there
   is no wallet-to-wallet conversion" above.
3. **`GET /invoices/shared/{token}` now carries `payable`, `not_payable_reason` and
   `payment_label`.** Gate the Pay button on `payable`. `payment_label` ("mtn (local_wallet), GH")
   names the rail WITHOUT the account number -- holding the link must not expose the issuer's bank
   details, so you click pay and the server builds the transfer.
4. **The first payer claims it.** A second person on the same link gets `409
INVOICE_ALREADY_CLAIMED`, so one bill cannot be paid twice. A payment that fails before reaching
   the provider releases the claim, so a genuine retry is never blocked.
5. **The invoice reads `paid` only when the transfer COMPLETES**, not when it starts -- an abandoned
   checkout is not a payment. It then carries `payment_ref`; one recorded with `mark-paid` still
   does not, which is what distinguishes a payment we can verify from the issuer's word.

The quote is priced RECEIVE-anchored, so the issuer gets exactly the invoice amount and the payer
pays that plus the fee. `quantity` defaults to `min_qty`. `422 INVOICE_NOT_PAYABLE` means the issuer
never nominated a rail -- pay them directly and ask them to use `mark-paid`.

---

### 2026-10-01 -- CHANGED: "Currency Not Configured" is now a 422, not a 503 `[from the logs]`

`GET /config/payment-methods` for a currency we do not have enabled returned
**503 "Payment provider is unreachable. Please try again."** On 2026-09-29 somebody asked for GBP
withdrawals **seven times in twenty-three seconds**, which is exactly what that message invites.

The provider was reachable the whole time. Its answer -- GBP payout is not enabled on our merchant
account -- is final until somebody enables it, and no amount of retrying changes it.

**Now `422 UNSUPPORTED_CURRENCY`,** with `details.currency` and `details.direction`, and a message
that does not promise a retry. Treat it as "this corridor is not available", the same as
`UNSUPPORTED_CORRIDOR`. **Action:** stop retrying on it, and show a corridor-unavailable state.

---

### 2026-10-01 -- FIXED: the recipient's SMS was never deliverable `[frontend, 2026-10-01]`

You reported that the account you send money to never sees the transaction. **Most of that is by
design** (see "Why a recipient does not see your transfer" above) -- but the one thing that _should_
have reached them was broken.

The payout details hold the recipient's number in the shape the PROVIDER wants: the national number
with the country code in a separate field (`"545707532"` + `"+233"`). We handed that bare national
number to the SMS gateway, which only accepts E.164. **No recipient SMS could ever have been
delivered.** It went unnoticed because SMS is unconfigured in production, so the call never left the
box.

`GET /transactions/{reference}` now carries **`recipient_notification`**:

```jsonc
"recipient_notification": {
  "status":   "sent",              // sent | skipped | failed
  "channels": ["sms", "email"],
  "reason":   "",                  // e.g. "no contact on file for this recipient"
  "at":       "2026-10-01T..."
}
```

`skipped` with "no contact on file" is normal for a payout rail that carries no phone or email, and
is not a failure of the transfer. Use it to tell the sender whether the recipient was told.
**Note:** SMS credentials are still unset in production, so nothing is actually delivered yet -- the
field will read `skipped`. That is an ops action, not a code one.

---

### 2026-09-27 -- !! BREAKING (all apps): names are checked against the provider's rule

**Endpoints:** `POST /auth/register/personal-info`, `PUT /users/me/profile`,
`PUT /admin/users/{user_id}`, `POST /teller/customers`, `PUT /teller/customers/{id}`,
`POST /merchant/customers`, `PUT /merchant/customers/{id}` (the `first_name` / `last_name`
fields), and `POST /kyc/tier1/initiate` (plus teller/merchant customer KYC initiate).

**Why.** You reported `POST /kyc/tier1/initiate` returning `400 INVALID_REQUEST "Invalid request
parameters."` (request `09245b57-...`, and five more attempts that morning). It was the payment
provider refusing to register the user: **"Last name cannot contain numeric or special
characters"** -- the tester's last name contained two digits. The provider sends no field name
with that refusal, so we passed on a generic message, and nothing had checked the name at
registration. We probed the provider's sandbox to find its exact rule rather than guess:

- **accepted:** letters from any alphabet (accents, Greek, Vietnamese, Akan open-o all fine),
  spaces, hyphens `-`, the straight apostrophe `'`, full stops `.`
- **refused:** digits, `,` `_` `/` `&` `(` `)` and other symbols

**What changed.**

1. **`first_name` / `last_name` failing that rule are now `400` at the form** on every endpoint
   above (validation tag `person_name`), so a user can no longer register a name the provider
   will refuse. Staff/teller/admin account names are not checked -- they never reach the provider.
2. **The curly apostrophe is fine.** iPhones and Macs type U+2019 for an apostrophe, and the
   provider refuses it -- so we accept it and convert it to `'` when registering the user with the
   provider. Nothing for you to do; do not strip it client-side.
3. **`POST /kyc/tier1/initiate`: `400 INVALID_REQUEST` -> `422 NAME_NOT_ACCEPTED`** when the
   provider refuses a name already stored (accounts registered before this change).
   `error.details.field` is `first_name` or `last_name`, `error.details.allowed` states the rule.
4. **`PUT /users/me/profile` now accepts `first_name` / `last_name`** (**non-breaking**) so the user
   can fix it themselves. It is refused with `422 IDENTITY_LOCKED` once verification is approved or
   under review, and with `422 NAME_HELD_BY_PROVIDER` once the user is already registered with the
   provider -- in both cases the user must contact support. Re-sending the stored name unchanged is
   never refused, so sending the whole form is fine.

**What the frontend must do.** Show the `400` validation message on the name fields. On
`422 NAME_NOT_ACCEPTED` from KYC initiate, send the user to their profile with
`error.details.field` highlighted, let them correct it (`PUT /users/me/profile`), then retry
verification. **The tester who hit this can do exactly that now** -- their account has not been
registered with the provider yet, so the self-service correction is allowed.

### 2026-09-27 -- bug fix (mobile): notification preferences now stay saved

**Endpoints:** `GET`/`PUT /notifications/preferences` (and `GET`/`PUT /admin/notification-preferences`,
the `channels` part).

**Why.** You reported PUT returning all four toggles `true` and the next GET returning all four
`false` (requests `1917f5ef-...` then `7b0a9a73-...`). **It was our bug**, not the app: the value
WAS saved, but the server could not read the saved document back and fell to all-`false`. The
same broken read was used when sending notifications, so **any user who had saved preferences
once was silently getting no in-app, email or SMS notifications at all.** Three accounts were
affected; yours is one, and its saved values (all four on) are intact.

**What changed.** GET returns what was saved. The PUT response is now read back from storage, so
it is exactly what the next GET returns. A PUT carrying only some toggles changes only those (it
used to reset the others).

**What the frontend must do.** Nothing.

### 2026-09-27 -- behaviour (web app especially): a refresh token re-sent seconds later is a 409, not a log-out

**Endpoint:** `POST /auth/refresh`.

**Why.** Ten times last week a user was logged out of every session by our token-theft
protection, and every case was the web app itself: it refreshed successfully, then about **two
seconds later sent the refresh token it had just exchanged**. Re-using a spent refresh token is
what a stolen token looks like, so the whole token family was revoked.

**What changed.** A spent token sent again **within 10 seconds** of being exchanged now gets
`409 REFRESH_TOKEN_RACE` -- the same response two simultaneous refreshes already got -- and
**nothing is issued and nothing is revoked**. After 10 seconds, reuse still revokes the family
(`401 TOKEN_FAMILY_REVOKED`), as before.

**What the frontend must do (web team).** This softens the symptom; the fix is on your side:

1. Make refresh **single-flight**: one refresh in progress at a time; everything else waits for
   its result.
2. **Persist the new refresh token before sending any other request** (this includes a server-side
   render and the browser both refreshing from the same cookie).
3. On `409 REFRESH_TOKEN_RACE`: do **not** refresh again and do **not** log out. Re-read the
   tokens the successful refresh stored and retry the original request with them.

### 2026-09-27 -- **non-breaking**: OTP rate limits are per endpoint

**Endpoints:** `POST /auth/register/initiate`, `/auth/register/verify-otp`,
`/auth/register/verify-email`, `POST /users/me/email/verify`, `/users/me/email/confirm`,
`POST /merchant/payments/security-check`, `POST /teller/transactions/step-up`.

**Why.** Every OTP endpoint shared ONE budget of 3 requests per 10 minutes per IP. Signup alone
makes three OTP calls, so a signup with a single resend was locked out of the next step for up to
ten minutes -- both `429`s in last week's log were that.

**What changed.** Each endpoint has its own 3 per 10 minutes. The limit on guessing any one code
is unchanged. Nothing for you to do; a `429` now really means that step was retried too often.

### 2026-09-20 -- !! ACTION REQUIRED: recipient details are validated BEFORE payment

**Endpoints:** `POST`/`PUT /beneficiaries`, `POST /beneficiaries/{id}/verify`,
`POST /transactions/send`, `POST /teller/transactions/create`, `POST /merchant/payments`,
and `GET /config/payment-methods`.

**Why.** Three GHS transfers on 2026-09-15 collected the customer's money and then failed: the
payout was rejected with `destination.additionalPaymentDetails.phone`. **The provider wants a
Ghanaian mobile-money number as exactly 9 digits** (`^\d{9}$`), with the country code sent
separately as `phoneCode: "+233"`. Every recipient had been saved as `0XXXXXXXXX`. Nothing checked
until the payout, which happens AFTER the payin settles -- so each transfer ended up held with the
money taken and the recipient unpaid.

**What changed.**

1. **`GET /config/payment-methods` now returns each field's format rules.** `fields[]` gains
   `pattern`, `length`, `min_length` and `max_length` where the provider sets them. They were being
   dropped, which is why you were told `phone` was just a string. **Build the form from these** --
   they differ per corridor (NGN account numbers are 6-16 digits, EUR IBAN has its own pattern).
2. **Bad details are refused at SAVE and at SEND, with `400 INVALID_PAYOUT_DETAILS`**, naming the
   field and the rule in `error.details` (`field`, `rule`, `pattern`/`length`, `payment_code`).
   Nothing is collected from the customer.
3. **Local phone formats are normalised for you, not rejected.** `0545707532`, `+233545707532` and
   `233545707532` are all saved and sent as `phone: "545707532"`, `phoneCode: "+233"`. Beneficiaries
   you saved earlier are normalised on their next send, so they start working with no migration.
   A number that is genuinely wrong -- 11 digits -- is refused, never "corrected".

**What the frontend must do.** Render `error.details.field` and `rule` on the recipient form.
Ideally use `pattern`/`length` from `/config/payment-methods` so the user is told before they
submit. Nothing else changes: `payout_details` keeps its shape.

### 2026-09-20 -- simulate waits for the provider, and a retry no longer errors

**Endpoint:** `POST /transactions/{reference}/simulate`.

**Why.** You reported "it says the transaction is still pending, then when I try again I get an
error and the transaction moves to hold". All three parts were real:

- the provider applies a simulation **asynchronously** (it reports `fund_processing` first, then
  settles 3-18 seconds later), and we read the status back immediately, so the response showed the
  OLD status;
- the retry then asked for a status the order had already reached, which the provider refuses;
- the hold was the payout failing for the phone-format reason above.

**From -> to.**

- The call now **waits up to about 12 seconds** for the provider to apply the change.
- **200** with `simulation.applied: true` once it has; **202** with `applied: false` if it is still
  applying -- then poll `GET /transactions/{reference}` instead of simulating again.
- A retry for a status the order already has **succeeds** instead of erroring.
- The response **embeds the transaction exactly as before** and adds:

```jsonc
"simulation": {
  "leg": "payin", "requested_status": "fund_settled",
  "provider_status": "fund_settled", "applied": true,
  "next_step": "The payin settled and the payout is at the provider. Simulate {\"leg\":\"payout\",\"status\":\"fund_settled\"} to complete the transfer."
},
"legs": [ {"type":"payin","status":"settled","has_provider_order":true},
          {"type":"payout","status":"initiated","has_provider_order":true} ]
```

**A REMITTANCE TAKES TWO SIMULATE CALLS.** `fund_settled` on the **payin** collects the money and
moves the transfer to PROCESSING; `fund_settled` on the **payout** completes it. The old copy said a
payin "completes the transfer", which is what made PROCESSING look like a failure. **Drive off
`simulation.next_step`** -- it names the exact next call.

**What the frontend must do.** Accept **202** as success-in-progress, not an error. Stop treating
PROCESSING as a failed simulation. Show `next_step`.

### 2026-09-20 -- !! BREAKING (admin app): identity changes need a `reason`

**Endpoint:** `PUT /admin/users/{user_id}`.

**From -> to:** any field could be changed with no justification -> changing an **identity** field
now requires `reason` (5-500 chars) or the call is refused with **`400 REASON_REQUIRED`**, whose
`details.identity_fields` lists what triggered it.

Identity fields are: `first_name`, `last_name`, `dob`, `gender`, `country`, the new
`id_type`/`id_number`/`id_expiry`/`id_country`/`nationality`/`place_of_birth`, and a company's
`company_name`, `registration_number`, `registration_country`, `registration_date`,
`business_type`, `tax_id`. **Contact and address edits need no reason** and are unaffected.

**Also new on this endpoint:** the document identity fields above. Before, an admin could not change
them at all -- which matters now that self-service cannot either.

**What the admin app must do.** Add a required "reason for change" field, shown only when an
identity field is being edited. Re-sending a field unchanged does not count as a change.

### 2026-09-20 -- !! BREAKING (all apps): a verified identity can no longer be edited in place

**Endpoints:** `PUT /users/me/profile`, `PUT /users/me/corporate`, `PUT /teller/customers/{id}`,
`PUT /merchant/customers/{id}`.

**Why.** A verified user could rewrite their own ID number and nationality; a teller or merchant
could rewrite a verified customer's legal name and date of birth. None of it ever reached the
verification provider, so our record silently stopped matching the identity that was verified.

**From -> to:** once `kyc_status` is `approved` **or** `pending_review`, a CHANGE to a locked field
returns **`422 IDENTITY_LOCKED`** with `details.locked_fields`, `kyc_status` and `how_to_change`.

- **Re-sending a field unchanged is fine.** You can keep PUTting the whole form; only an actual
  change is refused. A verified user can still edit occupation, employer, source of funds, address,
  email and phone.
- `id_expiry` may move to a **later** date (a renewed document) but not earlier.
- `pep` may go **false -> true** but never back.
- `kyc_status: in_progress` is NOT locked -- someone who just started verification can still fix a typo.

**New on every user/customer read** (`GET /users/me`, admin user detail, teller and merchant
customer detail): `identity_locked` (bool) and `locked_fields` (array). **Grey those fields out**
instead of letting the user type into them and hit a 422.

**Corrections go through Syka support**, who use the admin endpoint above.

### 2026-09-20 -- **non-breaking**: identity review pauses sending, and how it is cleared

**New endpoint:** `POST /admin/users/{user_id}/identity-review/clear` (compliance officer or
super-admin), body `{"note": "..."}`.

When an administrator changes a **verified** identity, the account gets an identity review:
`identity_review: {required, fields, reason, requested_by, requested_at}` appears on the user
record, and **every send path refuses with `422 IDENTITY_REVIEW_REQUIRED`** until it is cleared.
Existing transfers are unaffected.

The officer clearing it **may not be the person who made the change** (`403 SAME_REVIEWER`).

**Why a review and not a re-verification:** the provider holds the identity it verified and we have
no way to update its copy, so a local reset would simply be undone by the next status check. The
hold is the honest mechanism: the change is recorded, money stops moving, a human confirms.

**What the apps must do.** The user app should show a clear "your details are being reviewed"
state on `422 IDENTITY_REVIEW_REQUIRED` rather than a generic failure. The admin app needs the
clear action on a user whose `identity_review.required` is true.

### 2026-09-20 -- behaviour: a cancelled request is no longer reported as a 500

**Endpoints:** all.

**From -> to:** a request the CLIENT abandoned (navigating away, logging out, an aborted search)
could surface as **500** -- seen on `GET /merchant/dashboard/manager` on 2026-09-17 -- because the
handler wrapped the resulting "context canceled" as a server fault. It is now **499** and is not
logged as an error. Our own timeouts are unaffected and still return 503.

**What the frontend must do.** Nothing, but do not treat 499 as a failure worth showing: the
request was cancelled on purpose. Do not log the user out on it.

### 2026-09-15 -- **non-breaking**: two new merchant endpoints for a customer's verification

**Endpoints:** `GET /merchant/customers/{id}/kyc/status` and
`POST /merchant/customers/{id}/kyc/initiate`. Both new; nothing existing changed shape.

**Why.** You reported that a new merchant customer's verification "doesn't update the KYC status"
and that there is "no option to resend the link". Both were accurate, and the cause was worse than
it looked: **nothing ever asked the provider about a merchant-registered customer.** The only thing
that polls is `GET /kyc/status`, which is mounted on the **user** app context -- so it runs when the
CUSTOMER opens the Syka consumer app, which a merchant's walk-in customer never does. Combined with
zero inbound provider webhooks reaching us across 2026-09-13..15, their status was frozen at
whatever registration wrote.

**What the frontend gets.**

- `GET .../kyc/status` asks the provider, adopts the real answer, and returns `kyc_status`,
  `kyc_tier`, `resume_url` (a still-valid link when one exists), `can_retry`, and
  `contact_verification`. Throttled server-side to one provider call per customer per 20s, so it is
  safe to poll.
- `POST .../kyc/initiate` returns a working `verify_url`. It does **not** always mint a new session:
  when an unfinished one is live it returns that same URL with `resumed: true`. Body is optional --
  `{"level": 1-4, "redirect_url": "..."}`. Business customers are refused with `USE_KYB_FLOW`.
- `GET /merchant/customers/{id}` now reconciles too, and its `kyc` / `kyb` block carries the same
  `resume_url`, `can_retry` and `contact_verification` fields.

**THERE ARE TWO VERIFICATIONS, AND THIS IS THE ONE THAT KEEPS BITING.** See the section
"Two verifications" below. `contact_verification` is the provider's own email/phone check --
entirely separate from the Syka OTP the customer completed at registration. When it reads
`{"email": "initiated", "verified": false}` with an old `email_at`, the provider emailed the
customer a link, it lived for **ten minutes**, and nobody opened it. We cannot resend that one.
Render `contact_verification.note` verbatim -- it is written for the end user.

### 2026-09-15 -- **non-breaking**: `POST /merchant/customers` takes `redirect_url`

**From -> to:** the field did not exist -> optional `redirect_url` on the registration body, and on
`POST /merchant/customers/{id}/kyc/initiate`.

**Why.** Every merchant-registered customer was returned to the Syka **consumer** app after
verifying (`https://app.syka.io/kyc/complete`), which is not where they came from and, for a
walk-in, not an app they have.

**What the frontend must do.** Nothing, unless you want the customer back on your own page -- then
send `redirect_url`. It is validated against `ALLOWED_ORIGINS` (the same list CORS uses). An origin
that is not on the list is a **400 `INVALID_REDIRECT_URL`** naming the rejected origin, and the
customer is not created at all -- deliberately, rather than silently sending them somewhere they did
not ask for. Ask backend to add your origin. KYB (business) takes no redirect: the provider's
business flow does not accept one.

### 2026-09-15 -- **non-breaking**: `GET /admin/kyc/applications` takes `status`

**From -> to:** always returned `manual_review` only -> `?status=pending|manual_review|approved|rejected`,
**defaulting to `manual_review`**, so existing callers are unchanged.

**Why.** A customer stuck at `in_progress` holds a `pending` application, which never becomes
`manual_review` -- so they appeared in no admin queue and there was genuinely no way to find the
record. That is the other half of "I am not able to change status".

**What the frontend must do.** Add a status filter to the KYC review screen and default it to
`pending` when hunting a stuck customer. To actually clear one, use
`POST /admin/kyc/users/{user_id}/reset` (keyed by **user**, not application) -- approve/reject act on
an application id and only make sense for one awaiting a decision.

### 2026-09-15 -- **non-breaking**: `POST /merchant/customers/{id}/kyc-renewal-reminder` now carries a link

**From -> to:** a fixed sentence with no link in it -> the customer's live verification link when one
can be resumed, plus a warning about the provider's separate ten-minute email.

**Why.** You said it "simply sends an email with text reminding the user to do KYC". Correct -- and a
customer who has lost their link was being told to finish something they had no way to reach.

**What the frontend must do.** Nothing; the response shape (`sent` / `skipped` / `failed` /
`details`) is unchanged. Note that when no session is live there is nothing to resume and the
message says so -- use `POST .../kyc/initiate` to start one.

### 2026-09-15 -- behaviour: a failed database read no longer reads as an auth error

**Endpoints:** every `/merchant/*` and the `/teller/supervisor/*` routes.

**From -> to:** a lookup that failed for infrastructure reasons returned **401 "Invalid session."**
or **403 "This account's merchant could not be found. Contact support."** -> it now returns
**503 `MERCHANT_UNAVAILABLE`** (retryable) or, when the CLIENT cancelled the request, **499**.

**Why.** Seen in production on 2026-09-14: a merchant typing in the customer search box got a 403
telling them their merchant did not exist, with the same token returning 200 for the next keystroke
1.5 seconds later. Nothing was wrong with the account -- one database read did not complete, and the
code could not tell that apart from "no such partner".

**What the frontend must do.** **Do not log the user out on 503 or 499.** Treat 503 as retryable and
499 (the request you cancelled) as nothing at all. 401 now means only what it says.

### 2026-09-09 -- BREAKING (mobile): `/onramp/*` and `/offramp/*` are now OFF by default

**Endpoints:** `GET|POST /onramp/{options,quote,initiate,{ref}/status}` and the eight
`/offramp/*` equivalents -- all of Part 18.

**From -> to:** mounted unconditionally -> mounted only when `ONRAMP_ENABLED=true`, which
**defaults to false**. With the flag off they return **404**, not 403 and not a friendly error.

**Why.** These endpoints let a user buy or sell crypto against their own external wallet address.
We tell TransFi, and would tell a regulator, that Syka is a remittance platform and that end users
never buy, sell or hold crypto. That statement was not true of the running build while these routes
were mounted. PRD Sec.11 always listed crypto trading as out of scope for v1.0; the code and the
PRD had drifted apart. Turning the ramps on is now an explicit product and compliance decision
rather than a side effect of deployment.

**What the frontend must do.** Remove or feature-flag any Buy/Sell Crypto entry point in the
launch build -- do not ship a screen that 404s. Nothing else changes: the remittance, teller and
merchant paths are untouched, and no request or response shape was altered. If you need the ramps
in a dev environment, set `ONRAMP_ENABLED=true`; the module is still fully built and tested.

### 2026-09-13 -- !! BREAKING: teller sends now require a quote and a step-up `[Vincent, 2026-08-28]`

**`POST /teller/transactions/create` now requires two new fields.** Nothing is live on the teller
app yet (there is no teller traffic in any server log), so this breaks no running client -- but the
call sequence has changed and it is now three calls, not one.

**The sequence:**

```
1. POST /teller/quote              -> quote_id          (valid 5 minutes)
2. POST /teller/transactions/step-up  -> security_token (valid 5 minutes, single use)
3. POST /teller/transactions/create   with both
```

**Why the quote (items 9, 10).** `POST /teller/quote` used to be a preview: nothing stored, no
`quote_id`, and `expires_at` serialised as `0001-01-01`. The send then re-priced the corridor
independently -- so **the figure a teller read to a customer and the figure the customer was charged
were two separate calls that could disagree.** The quote is now real and spendable: send `quote_id`
and the customer is charged exactly what they were quoted. It also now takes `customer_user_id`
(the quote is minted against the customer) and accepts `receive_amount` as an alternative to
`send_amount`.

**Validity is 5 minutes, not the 90 seconds an app quote gets.** A counter transaction is quote ->
explain -> agree -> count cash -> submit, and 90 seconds would expire on most real ones. `expires_at`
is the authority; an expired quote is `422 QUOTE_EXPIRED` and you re-quote.

**Why the step-up (item 1).** A counter workstation can be left unlocked, and whoever sits down at
it could otherwise move a customer's money with nothing but the open tab. The token is bound to
(teller, customer, quote), so it cannot be replayed onto a different customer or a different price --
and because a quote fixes the amount, both currencies and the recipient's rail, **re-quoting
invalidates the token by design**. It is consumed on first use, succeed or fail. Rate limited to 3
attempts per 10 minutes.

**Also new on the send:**

- `counter_payment_method` -- `cash` | `direct_debit` | `collected` (item 2). This is how the
  customer settled **with the teller**, and is deliberately NOT `send_payment_code`/`send_payment_type`:
  those are the payment provider's funding rail for a payin order, and a teller send has no payin leg
  at all. It is returned on the transaction as `counter_payment_method`.
- **Flagged sends now go to review** (item 3). Teller-assisted transfers were the only money-moving
  path on the platform that was never screened -- walk-in customers, the hardest to verify, got the
  least scrutiny. A flagged send now returns status `ON_HOLD` with no funds disbursed, exactly as an
  app send does. Show it as "referred for review", not as a failure.

### 2026-09-13 -- NEW: teller office, office roster, and richer filters `[Vincent, 2026-08-28]`

- **`GET /teller/office`** (new, item 2) -- the branch the signed-in teller is assigned to.
  **It does not return a manager, and will not until that data is captured**: the offices collection
  has no manager field and a teller's supervisor link is never written by anything. A teller not yet
  assigned gets `422 NO_OFFICE_ASSIGNED`, which is a real state, not an error.
- **`GET /admin/offices/{id}/tellers`** (new, item 3) -- who works at a branch. Assignment was
  writable but never readable back, so there was no way to confirm it had worked.
- **`GET /teller/transactions` now takes the full filter set** (item 11) -- `type`, `currency`,
  `direction`, `category`, `search`, `from`, `to`, not just `status`. It was passing one filter while
  `GET /transactions` over the same data passed seven.
- **`status` accepts several, comma-separated** (item 11): `?status=PENDING,PROCESSING`. Works on
  every transaction list -- user, teller, supervisor and merchant payments. **An unknown status is now
  a 400** rather than an empty page; it was not validated at all before, so a typo returned zero rows
  and looked like an answer.
- **`settle_currency`** is returned beside `settle_amount` on teller and admin transaction views
  (item 7). Nothing in that payload previously said the settle figure was USDC.
- **`GET /admin/users/{id}` returns an `office` block** for teller accounts (item 12) -- id, code,
  name and city, not a bare id.

**Already existed, no new route:** a downloadable commission statement is
`POST /admin/merchants/{id}/report`, which returns a branded "Partner Commission Statement" PDF.

### 2026-09-13 -- NEW: branch-supervisor views `[Vincent, 2026-08-28]`

Items 13-21 asked for office-scoped versions of `/admin/dashboard`, `/admin/revenue/*`,
`/admin/reports` and `/admin/users`. **They are served at `/teller/supervisor/*` instead**, and the
reason matters: `TELLER_SUPERVISOR` is not an admin role and cannot obtain an admin-context token at
all. Admitting it to `/admin/*` would have widened four admin route trees at once and given a branch
role reach over platform-wide data. The figures are the same; the path and the token are the teller
app's.

| Route                                    | Replaces                                                    |
| ---------------------------------------- | ----------------------------------------------------------- |
| `GET /teller/supervisor/dashboard?days=` | branch-scoped `/admin/dashboard` + `/admin/revenue/summary` |
| `GET /teller/supervisor/team?days=`      | branch staff roster, team size and per-teller rank          |
| `GET /teller/supervisor/transactions`    | every transfer the branch keyed in, full filters            |

**Read this before building screens on it.** "Your branch's figures" means **transfers keyed in by
your office's tellers**. A customer sending from the mobile app belongs to no office, so a branch
total is a strict subset of the platform total and the two are not comparable. That is the
definition, not a gap.

Figures are matched on the office **snapshotted onto each transaction when it was created**, so
moving a teller between branches never rewrites history -- last quarter's branch report stays what it
was.

`days` defaults to 30, max 365. A supervisor with no office assigned gets `403 NO_OFFICE_ASSIGNED`.
Another branch's data is unreachable: the office filter is built from the caller's own record and a
query parameter cannot widen or redirect it.

**Not built, deliberately: branch-scoped compliance alerts (items 18-19).** A compliance case carries
no office, teller or branch, so scoping needs a three-hop join or a schema change at case-raise time.
There is also a policy question underneath -- a case raised against a customer who happened to walk
into a branch is arguably not branch data, and putting the compliance queue in front of branch staff
is a decision rather than a filter. Recorded in `otherThings/third-party-blocked-endpoints.md`.

### 2026-09-12 -- NEW: invoices `[Theo, 2026-09-10]` + `[Vincent, early Aug]`

The invoice page now has a backend. **9 endpoints, all non-breaking additions.** This is the same
feature as Web App 12-16 on the original list, so it closes both requests.

| Route                                | What it does                             |
| ------------------------------------ | ---------------------------------------- |
| `GET /invoices?status=&page=&limit=` | your invoices, newest first              |
| `POST /invoices`                     | issue one                                |
| `GET /invoices/{id}`                 | detail                                   |
| `PUT /invoices/{id}`                 | edit, while unpaid                       |
| `DELETE /invoices/{id}`              | withdraw (a status change, not a delete) |
| `POST /invoices/{id}/duplicate`      | the copy action                          |
| `POST /invoices/{id}/share`          | mint the share link                      |
| `GET /invoices/shared/{token}`       | what a recipient sees                    |
| `POST /invoices/{id}/mark-paid`      | record a payment made outside Syka       |

**Three things to build against:**

1. **`amount` is a decimal STRING, never a JSON number.** `"1200.80"`, not `1200.80`. It is the
   UNIT price; `min_qty`/`max_qty` bound how many units may be paid for and both default to 1. Each
   row also carries `total` (amount x max_qty) so you do not have to multiply decimal strings.
2. **`overdue` is DERIVED, not stored.** An invoice reads `overdue` when it is still active and past
   `due_date`. It becomes overdue at the **end** of the due day, not the start, and an invoice with
   no `due_date` is never overdue. You can filter on `?status=overdue` and it does the right thing.
3. **`share_url_path` is a PATH, not a full URL** (`/invoices/shared/<token>`). The API is reached
   on a different host per environment and the server cannot know which one you came through --
   prefix it with your own base URL. Re-sharing returns the SAME token, so a link already sent keeps
   working.

**What this deliberately is NOT: a link a stranger can pay.** Every payment our provider collects is
attached to a registered, KYC-verified user, so there is no such thing as an anonymous checkout on
our side today. A recipient opening a share link must be signed in. An invoice paid any other way is
recorded with `mark-paid`, and those carry **no `payment_ref`** while ones paid through Syka do --
deliberately distinguishable, because one is verifiable and the other is the issuer's word.

> **SUPERSEDED in part (2026-10-01).** When this shipped there was no way at all to pay a shared
> invoice through Syka, so the `payment_ref` promised above could never be produced. There is now:
> the issuer nominates a payout rail on the invoice and a signed-in recipient pays it with
> `POST /invoices/shared/{token}/quote` then `/pay`. See the change-log entry at the top of this
> file. The "no anonymous checkout" half is unchanged and always will be.

### 2026-09-12 -- Transaction details: `rate`, how the customer paid, and the receiver's account `[Theo, 2026-09-10]`

Three additions to `GET /transactions/{reference}` and every transaction list row. All non-breaking.

**`rate`** -- the exchange rate. You were right that it was missing and that deriving it from the
amounts is wrong: that quotient is the EFFECTIVE ratio net of fees, a different and smaller number
than the rate the customer was quoted, and the gap widens with the fee. The quoted rate is now
snapshotted onto the transaction and returned.

**The same bug was on the receipt**, which divided the amounts too. It now uses the quoted rate.
Transactions created before today have no snapshot and fall back to the old derivation -- so `rate`
may be slightly off on historical rows, and is exact from here on.

**`send_payment_code` / `send_payment_type`** -- how the SENDER paid (their funding rail, not the
recipient's payout rail). Stored since August, never serialised. This also answers
`[Vincent, 2026-08-28] #8`.

**`recipient`** -- a block naming where the money went:

```jsonc
"recipient": {
  "name": "Ama Serwaa",
  "institution": "Column N.A.",       // bank / mobile-money operator
  "account_masked": "****3065",
  "account_label": "account number",  // or "IBAN", "phone number", "wallet address"
  "payment_code": "ach",
  "payment_type": "bank_transfer"
}
```

**The account is MASKED and always will be.** Last four only. A transaction list is one of the
broadest read surfaces in the API, and the full identifier is not something to spread across it --
the last four confirms the account to whoever already knows it, which is the job on that screen.
`account_label` says WHAT is masked, because the answer differs by rail.

### 2026-09-12 -- Notifications carry deep links `[Theo, 2026-09-10]`

Notifications now say what they are ABOUT, so tapping one can open it instead of only marking it
read. Three new optional fields:

```jsonc
{
  "type": "transaction",
  "title": "Transfer failed",
  "body": "...",
  "resource_type": "transaction",
  "resource_ref": "TX-9BDADD6ED0C3407388",
  "action": "view_transaction",
}
```

**A resource reference, not a URL** -- deliberately. Three apps consume this feed (user, teller,
merchant) and the server knows none of their routing tables; a URL built here would be wrong for at
least two of them and would rot the moment one changed its paths. Map `{resource_type, action}` to
your own screen and use `resource_ref` as the argument -- it is the same reference the rest of the
API uses.

Current values: `resource_type` is `transaction` or `kyc`; `action` is `view_transaction`,
`resume_kyc` or `view_kyc`. **KYC notifications carry no `resource_ref`** -- verification is the
caller's own and there is one per user, so the action carries the meaning: `resume_kyc` is an
outcome the user must act on, `view_kyc` one they only need to see.

**All three fields are absent on notifications created before today, and on admin broadcasts**,
which are about nothing in particular. Handle absence.

### 2026-09-12 -- FIXED: `/transactions/{ref}/simulate` returned a confusing 400 `[Theo, 2026-09-09]`

Reported: `{"status":"fund_settled","leg":"payin"}` came back with

```json
{ "code": "INVALID_REQUEST", "message": "Invalid or missing field(s): status." }
```

**Your payload was fine.** That error was TransFi's, not ours, and our error mapping flattened it
into a field-validation message -- so a valid status word looked like it had been rejected by name.

**What was actually wrong:** the transfer being simulated (`TX-E3E172C1B2F04319B9`) had already
failed days earlier with `BEHAVIORAL_CHECK_FAILED`. **The provider will not move an order out of a
terminal state**, and we were forwarding the request instead of saying so.

Three things changed:

1. **A terminal leg is now refused by us, immediately**, with `422 LEG_ALREADY_TERMINAL` naming the
   leg and its state. No provider round-trip, and the message says what to do: start a new transfer.
2. **The provider's own refusals now map to specific errors** --
   `422 SIMULATION_TRANSITION_REFUSED` (valid status, wrong state) and
   `400 SIMULATION_STATUS_UNSUPPORTED` (status not valid for this kind of order) -- instead of
   collapsing into "Invalid or missing field(s)".
3. **`initiated` was removed from the documented status list.** The provider answers "Status cannot
   be updated to initiated", so we should never have offered it.

**Which statuses actually work, verified live against the provider on 2026-09-12.** TransFi
validates per ORDER TYPE, and for a **payin** it accepts only:

| Status          | Effect                                   |
| --------------- | ---------------------------------------- |
| `fund_settled`  | the transfer completes                   |
| `fund_failed`   | the transfer fails                       |
| `expired`       | the order expired unpaid                 |
| `manual_review` | provider-side review; no change our side |

Every `asset_*` status is refused on a payin with `SIMULATION_STATUS_UNSUPPORTED`. They remain in
the allow-list because they are valid for other order types, but **do not use them on a remittance
payin**.

**Simulate a transfer you have just created, not one that already finished.**

**SUPERSEDED 2026-09-20 in one respect:** a remittance takes TWO calls, not one --
send -> simulate `fund_settled` (payin, -> PROCESSING) -> simulate
`{"leg":"payout","status":"fund_settled"}` (-> COMPLETED), after which receipts, tracking and the
ledger populate. The call also waits for the provider now and answers 202 while it is still
applying. See the 2026-09-20 entries at the top.

### 2026-09-12 -- FIXED: `/health` returned 403 from a browser `[found in the server log]`

`GET /health` answered **403 with no body** to a developer's browser. CORS was applied to it, so any
`Origin` not in `ALLOWED_ORIGINS` was rejected before the handler ran. `/health` is now exempt and
always answers.

**Worth knowing, because it is the same cause with a worse symptom:** if you run a frontend on a
port nobody has allowlisted, **every** endpoint returns that same bodyless 403, which looks exactly
like an auth failure. If you are getting blanket 403s, check `/health` first -- it now answers
regardless of origin, so a working `/health` plus 403s everywhere else means your origin needs
adding to `ALLOWED_ORIGINS`, not a new token.

### 2026-09-08 -- NOT A BUG: `dev_otp` IS in the payload, at `data.dev_otp`

Reported twice as "the OTP isn't in the payload so I can't create an account". It is being returned.
The server log for 2026-09-05 -> 09-07 shows four registration OTPs and three email OTPs generated,
and they are printed from the _same_ branch that populates the field -- if one happened, so did the
other.

**Two things trip people up.**

**1. It is inside the envelope.** Every response is wrapped. `dev_otp` is at `data.dev_otp`, not at
the top level:

```jsonc
POST /api/v1/auth/register/initiate
{ "phone": "+233201356871", "country_code": "GH" }

200 {
  "success": true,
  "data": {
    "registration_token": "a3f2...",
    "dev_otp": "616888",          // <-- HERE, not response.dev_otp
    "message": "OTP sent to +2332****871"
  },
  "message": "OTP sent",
  "request_id": "...",
  "timestamp": "..."
}
```

**2. There are TWO different OTPs, at two different steps.** Reading the wrong response gets you
nothing:

| Step                                | Returns           | Verify it with                     |
| ----------------------------------- | ----------------- | ---------------------------------- |
| `POST /auth/register/initiate`      | the **phone** OTP | `POST /auth/register/verify-otp`   |
| `POST /auth/register/personal-info` | the **email** OTP | `POST /auth/register/verify-email` |

Full order: `initiate` -> `verify-otp` -> `set-password` -> `personal-info` -> `verify-email` ->
`account-type` -> `complete`.

**It is absent only in production** (`APP_ENV=production`), which is intended -- never ship a client
that depends on it. If it is missing in dev, check the status code first: a **`409`** carries no OTP
because no registration was started. `409 PHONE_TAKEN` means that number already completed
registration -- sign in, or use forgot-password.

### 2026-09-08 -- NEW: simulate a transfer's status in sandbox (this unblocks testing)

**`POST /transactions/{reference}/simulate`** -- drive YOUR OWN transfer to any provider order
status, without going through the hosted checkout. No admin token needed.

This exists because the checkout's biometric/device check has been failing every sandbox attempt
(see the entry below), which made everything after payment -- COMPLETED status, receipts, tracking,
ledger, notifications -- impossible to test.

```jsonc
POST /api/v1/transactions/TX-9BDADD6ED0C3407388/simulate
{ "status": "fund_settled" }              // payin -> PROCESSING (then simulate the payout)
{ "status": "fund_failed",                // -> the transfer fails
  "error_code": "BEHAVIORAL_CHECK_FAILED" }
{ "status": "fund_settled", "leg": "payout" }   // pick a leg explicitly
```

`status` is one of: `asset_deposited`, `asset_settled`, `asset_settle_failed`, `expired`,
`fund_deposit_failed`, `fund_deposited`, `fund_failed`, `fund_settled`, `manual_review`. Anything
else is a `400`. (**Corrected:** `initiated` was listed here and is NOT settable -- the provider
answers "Status cannot be updated to initiated".)

- `fund_settled` on the **payin** collects the money and moves the transfer to **PROCESSING**,
  creating the payout; `fund_settled` on the **payout** is what COMPLETES it. This entry used to
  say a payin "completes" the transfer, which is wrong for a remittance -- see 2026-09-20.
- `fund_failed` / `expired` fail the transfer. (A failed **payout** goes `ON_HOLD` instead, because
  funds were already collected -- that is correct, not a bug.)
- The `initiated` / `*_deposited` states are recorded by the provider but change nothing our side,
  so you can walk a realistic lifecycle rather than jumping straight to settled.

`leg` is optional and defaults to the first leg not already settled or failed -- the payin, then the
payout. The response is the updated transfer plus a `simulation` block (`applied`, `provider_status`,
`next_step`) and a `legs` array; see the 2026-09-20 entry.

**Sandbox only.** In production the payment partner refuses the call and nothing changes -- the
endpoint never sets a status itself, it asks the provider to move the order and then reads the
provider's real state back. A transfer you did not send returns `404`.

The admin route `POST /admin/transfi/simulate-order` is unchanged; it stays SUPER_ADMIN and takes a
provider order id.

### 2026-09-08 -- FIXED: parallel refreshes returned 500 (and could log the user out)

Firing several API calls at once, having them all get `401` on an expired access token, and letting
each kick off its own `POST /auth/refresh` produced a **500** for every request but the winner. It
happened three times in production on 2026-09-06/07, all within 8ms of each other.

It is now a **`409 REFRESH_TOKEN_RACE`**. Deliberately not a `401`: your session is fine -- the
refresh that won minted a valid token -- and a `401` would send most clients straight to their
log-out path and boot a user whose credentials were never in question.

**What to do on your side:** single-flight your refresh. Queue concurrent 401s behind one refresh
call and replay them with the token it returns. On a `409`, retry the original request with the
token the concurrent refresh already gave you; do not sign the user out.

Genuine token reuse is unchanged and still revokes the token family
(`401 TOKEN_FAMILY_REVOKED`) -- that is the theft signal and it stays aggressive.

### 2026-09-05 -- ACTION FOR YOU: show `failure_reason`; the "biometric error" is already explained

The two failed transfers reported on 2026-09-04 are diagnosed. **Neither failed on our side.** Both
were accepted (`201`), reached TransFi's hosted checkout, and were declined there:

```
TX-CDCDFB0DCC1943048C   3000 GHS   BEHAVIORAL_CHECK_FAILED
TX-DA48FC5EA4124083B6    200 GHS   BEHAVIORAL_CHECK_FAILED
"Biometric check of users device has failed."
```

The biometric step is TransFi's own device check, on their domain (`sandbox-pay-widget.transfi.com`).
We neither send nor control it, and it is not configurable from our side.

**The message was already in the API the whole time.** `GET /transactions/{reference}` returns
`failure_reason`, and for both of these it already read _"Biometric check of users device has
failed."_ -- put there by the provider reconciliation that shipped in the previous build.

So: **render `failure_reason` on your failed-transfer screen.** A user who sees "Biometric check of
your device has failed" knows to retry on a different device or payment method; one who sees
"Transaction failed" files a support ticket. No API change is needed -- the field is already there.

### 2026-09-05 -- NEW (non-breaking): merchants can register INDIVIDUAL customers

`POST /merchant/customers` previously registered businesses only. It now takes a `customer_type` of
`"individual"` or `"corporate"`.

**Nothing you have already written changes.** `customer_type` is OPTIONAL and defaults to
`"corporate"`, which is exactly what the endpoint did before, so existing calls keep working
untouched.

**Individual body** -- `contact`, `compliance` and `registered_address` as before, plus:

```jsonc
{
  "customer_type": "individual",
  "individual": {
    "country_code": "GH",
    "dob": "1990-01-31"          // YYYY-MM-DD
  },
  "registered_address": { ... }, // the person's RESIDENTIAL address
  "contact":  { ... },           // the customer themselves; "role" is ignored
  "compliance": { ... }
}
```

`country_code` and `dob` are both REQUIRED for an individual: the payment provider will not verify a
person without them, and the endpoint opens a verification session immediately. The customer must be
at least 18 (`422 UNDERAGE`).

**Do not mix the two shapes.** Sending `business`, `directors` or `ubos` on an individual -- or an
`individual` block on a corporate -- is a `400 CUSTOMER_TYPE_MISMATCH` naming the offending field.
Fields are never silently ignored, because a merchant who filled in directors and then found they had
registered a person was misled by their own form.

**Response**: unchanged except that `customer_type` is echoed back, and the verification state is
filed under `kyb` for a business or **`kyc` for an individual** -- exactly one of the two, same shape.
`GET /merchant/customers/{id}` does the same. `blocked_provider_registration` applies to businesses
only; an individual has no provider account until verification starts, so its absence there is
normal, not a fault.

`start_verification` replaces `start_kyb` as the flag's name. `start_kyb` is still accepted.

### 2026-09-04 -- !! FIXED: KYC could complete at the provider and stay "not started" here

**This is the bug in your issues document, and it was ours.** A customer who finished verification
could sit at `kyc_status: "not_started"`, tier 0, permanently -- while the provider held a completed,
successful verification for the same account.

**What happened.** Our status poll asks the provider, and the provider answers `kyc_initiated`
whenever a session exists but nothing has been submitted yet. We map that to `not_started` on
purpose -- it is what lets someone who closed the verification tab start again. But the poll only ran
for accounts already marked `in_progress`, so the moment it wrote `not_started` it disqualified the
account from ever being polled again. With the provider's webhooks not reaching us, nothing else
could correct it.

Fixed: an account with a provider record is now polled whatever its local status, unless it is
already approved. Approving through the poll also sets the KYC **tier**, which it previously did not
-- so an account could otherwise have gone "approved" with no limits attached.

**Nothing to change on your side.** Affected accounts self-correct on the next
`GET /kyc/status` call.

### 2026-09-04 -- New: `contact_verification` on `GET /kyc/status`

**This answers the other half of your document** -- _"we don't have any useful message to tell the
user they need to check their mailbox"_.

`GET /kyc/status` now returns a `contact_verification` block whenever we checked the provider on
that call:

```jsonc
"contact_verification": {
  "email":    "verified",      // or "initiated" = link sent, never opened
  "phone":    "initiated",
  "email_at": "2026-09-03T05:18:55.061Z",
  "phone_at": "2026-09-03T05:17:23.908Z",
  "verified": true,
  "note":     "..."            // present ONLY when verified is false
}
```

**Show `note` verbatim when `verified` is false.** It tells the user to look for the email from
TransFi and open it promptly, and that this is separate from the Syka verification they already
completed -- which is the exact confusion that made "verification in progress" so misleading.

`email_at` / `phone_at` are when each was last initiated. **The link is valid for ten minutes from
that timestamp**, so an old `at` on an `"initiated"` status means it has expired and the user needs
a fresh one. Verifying **either** the email or the phone is enough; both are not required.

The `POST /kyc/tier1/initiate` response message now warns about the email at the moment the link is
issued, so you can show it before the user gets stuck rather than after.

### 2026-09-04 -- Clearer refusals in two places that cost real time

- **`PUT /admin/merchants/{id}/status`** now names the legal next statuses in both the message and
  `details.allowed`. A pending merchant cannot go straight to active -- it has to be approved first
  -- and the old message said only what was forbidden. Show `details.allowed` as the options.
- **`403 PARTNER_NOT_ACTIVE`** on `/merchant/*` now names the merchant's actual status and what has
  to happen. The usual cause is not a permissions problem: the merchant is still `pending` and an
  administrator has to approve and then activate it.

### 2026-09-04 -- `POST /auth/refresh` no longer returns 500 for a dead token

A refresh token whose user no longer exists returned **500**, so clients retried a token that could
never work. It now returns **401 `INVALID_REFRESH_TOKEN`** -- re-authenticate. Genuine server faults
still return 500, and they are now logged with their cause and your `request_id`, so if you report
one we can trace it to a line.

### 2026-09-02 -- !! ACTION NEEDED: send `success_redirect_url` on every payment

**The server deliberately has no default checkout redirect, so you must send one per request or
the customer lands on the provider's page instead of yours.**

`TRANSFI_SUCCESS_REDIRECT_URL` and `TRANSFI_FAILURE_REDIRECT_URL` are intentionally blank on the
dev server. One backend serves the web app, mobile deep links and several developers' localhosts, so
a single configured value would be wrong for most of you. Blank means "fall back to whatever is set
in the provider's dashboard", which is `syka.com` -- the behaviour you reported.

**What to do.** Add both to `POST /transactions/send` (and `POST /merchant/payments`):

```jsonc
{
  "quote_id": "QT-...",
  "send_payment_type": "local_wallet",
  "beneficiary_id": "...",
  "success_redirect_url": "http://localhost:3000/transfer/done",
  "failure_redirect_url": "http://localhost:3000/transfer/failed",
}
```

**They are validated against the server's `ALLOWED_ORIGINS`**, which is the same list that governs
CORS -- so if your origin already works for API calls, your redirect will be accepted. Today that is
`http://localhost:3000` and `http://localhost:5173`. A URL on any other host is refused with
`400 INVALID_REDIRECT_URL` and the payment is not created. That is deliberate: an unvalidated
post-payment redirect is a phishing hand-off at the moment the user most trusts the page, so we
refuse rather than quietly sending them somewhere they did not ask for.

**If you deploy to a new origin, tell us** -- it is one config change on our side (`ALLOWED_ORIGINS`),
and until it is made your redirects will 400.

Both fields are optional in the schema, so nothing breaks if you omit them; you just keep the old
behaviour.

### 2026-09-02 -- A teller-assisted send that fails is now reported as a failure

**`POST /teller/transactions/create` could report a failed transfer as a success.** If a send was
rejected by the provider and the teller retried with the **same `Idempotency-Key`**, the response
was `201` carrying the original transaction -- which was `FAILED`, with no payout order. The teller
was told the money had gone while it had not, and had already taken the customer's cash.

Fixed: a teller send that failed before any payout order existed releases its key, so a retry is a
genuine fresh attempt. Once an order might exist at the provider we still replay, so one intent can
never become two payouts.

**Check `status` on the response**, not just the HTTP code. A replay is still a legitimate `201`;
`status: "FAILED"` with `failure_reason` set means the transfer did not happen.

Same change: the shift cash total is now recorded once per transfer reference, so a double submit no
longer inflates the drawer and produces a phantom shortfall at close.

### 2026-09-02 -- Slow quotes now fail fast instead of hanging

Pricing calls the provider twice, and those calls were unbounded, so a slow provider could hold a
request open past twenty seconds until your client gave up -- you saw a dead connection or a bare 503. Pricing is now bounded at 15 seconds and returns `503 PROVIDER_ERROR` with a real message you
can show and retry on. Healthy quotes take 1-2 seconds, so this should never fire in normal use.

### 2026-08-30 -- `CONTACT_NOT_VERIFIED` is satisfiable after all (non-breaking)

**We told you this could not be fixed by the user. That was wrong, and here is what is actually
happening.**

TransFi emails the customer a verification link -- sender "TransFi Verification", subject-less,
with a **Verify Now** button pointing at `sandbox-pay-widget.transfi.com/verify?type=email&...`.
**The link is valid for TEN MINUTES.** A developer forwarded one after opening it four hours later,
by which time it was long dead, and every send he tried kept failing.

**There are two separate verifications and they have nothing to do with each other.** Ours is the
email and SMS OTP a user completes during registration. TransFi runs its own, on its own side, and
completing ours does nothing for theirs. That is why "but I'm recorded as a verified user" and this
error are both true at the same time -- and why the old message telling people to contact support
meant nobody connected the email to the failure.

**Same error code, same 422, and the message now says what to do:** check your email for a message
from TransFi and open the link promptly, because it expires ten minutes after it is sent. The
`details` gained `how_to_resolve`, `link_valid_for` and `separate_from_syka_verification: true`
alongside the existing `provider_code`, `contact` and `satisfied_by`.

**What you can do in the app.** If a customer hits this, tell them to look for the TransFi email --
including in spam -- and open it straight away. If it has expired there is currently no way to ask
for another from our side.

**Still open with TransFi**, and asked of them in `docs/RUNBOOKS.md`: what triggers the email, how
to resend it, and how to query whether a customer has completed it. Their published error table
does not document either of the two codes we receive. Our leading theory is that the rejected
payment attempt itself triggers the email -- every occurrence we have logged is at order creation,
never at registration or verification -- which would mean the customer gets the link right after
the failure they just saw.

### 2026-08-30 -- !! Tellers: transaction lookup by reference is now scoped

**`GET /teller/transactions/{reference}` used to return ANY transaction on the platform to ANY
teller.** It is now scoped to the teller who processed the transfer; a reference this teller did
not handle returns 404.

**What to change:** for "a customer is asking about their transfer", go customer-first.
`GET /teller/customers?q=` is still open to every individual customer, so find them and read
`GET /teller/customers/{id}/transactions` (which now also accepts `?status=`). The 404 message says
this too. Looking up by reference still works normally for transfers taken at this counter --
receipts and same-day queries are unaffected.

**Also scoped, and these had NO check at all before:** `PUT /teller/customers/{id}`,
`POST /teller/customers/{id}/beneficiaries`, `POST /teller/customers/{id}/kyc/initiate` and
`POST /teller/transactions/create` are limited to customers registered at a Syka office. A customer
who signed up on the mobile app owns their own record and gets `403 CUSTOMER_NOT_EDITABLE`. The
edit restriction is not new -- it now covers the other three as well, which is why this is flagged.

**New field to build against:** `GET /teller/customers/{id}` now returns **`editable`**. Use it to
hide the edit form rather than letting a teller fill it in and discover a 403 on submit.

**Unchanged:** the customer directory, every shift endpoint, quote preview, and reading a customer's
details, KYC status, transactions or beneficiaries. A teller can still see any walk-in.

### 2026-08-30 -- Merchant approvals re-price on approval (breaking for the approve endpoint)

**`POST /merchant/approvals/{id}/approve` now returns a union. Read `action`.**

A payment released at the price it was quoted at hours earlier commits us to a rate the provider
will no longer transact at. Approving now re-prices at the live rate first.

| `action`                        | What it means                                                                                                                                                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `approved`                      | Released at the current price. `approval` carries the updated record.                                                                                                                                                        |
| `requote_confirmation_required` | **Nothing was decided.** The price moved more than the merchant's tolerance. `requote` has the old and new figures plus a `quote_id`; show them, then call again with `accept_quote_id` to release at exactly those figures. |
| `security_check_required`       | Re-pricing pushed the amount at or above the merchant's security threshold, which it was below at submission. Confirm the password at `/merchant/payments/security-check`, then approve again.                               |

The re-quote **expires in 90 seconds**. If it does, approve again and you get fresh figures -- which
is correct, because the price genuinely moved again. Within the tolerance (0.5% by default) the
payment approves straight through with no second call, so most approvals are unchanged.

**The merchant's gates are re-run against the NEW amount**, so approving can now return
`422 AMOUNT_BLOCKED` or `422 LIMIT_EXCEEDED` even though submission did not. That is deliberate: a
re-price can genuinely push a payment past a ceiling it was under before, and releasing it would
mean processing a payment the merchant is not permitted to make.

**`422 QUOTE_TOO_STALE` is gone. Handle `422 APPROVAL_EXPIRED` instead.** Re-pricing makes the price
honest, but it cannot make a week-old instruction current -- so the merchant's approval window now
bounds the _intent_ rather than the rate. `stale` on the approval detail means the same thing.

**`GET /merchant/approvals/{id}` additions:** `requoted_at`, `previous_settle_amount` and
`requote_count`, so a payment released at a different price from the one it was submitted at says so.

### 2026-08-29 -- Merchant app is live: 41 endpoints at `/api/v1/merchant/*` (non-breaking)

**New app context.** `MERCHANT_STAFF` and `MERCHANT_MANAGER` accounts log in with
`app_context: "merchant"` and reach `/api/v1/merchant/*`. They cannot reach `/teller/*` or
`/admin/*`, and admin/teller/user tokens cannot reach `/merchant/*` -- 403 either way. Nothing in
the user, teller or admin apps changes.

**Everything is scoped to the caller's own merchant, always.** A customer, payment, branch, staff
member, approval or report belonging to another merchant returns **404, not 403** -- deliberately, so
ids cannot be probed by watching status codes. There is no "all merchants" view in this app.

**The three things worth reading before you build against it:**

1. **`POST /merchant/payments` returns a UNION -- always read `action`, never just the status code.**

   | `action`                  | HTTP | What happened                                                                                                                                                         |
   | ------------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | `processed`               | 201  | Payment created. `payment.checkout_url` is the customer's checkout.                                                                                                   |
   | `queued_for_approval`     | 202  | Waiting on a merchant manager. **No funds collected, no checkout exists yet.**                                                                                        |
   | `security_check_required` | 200  | **Nothing was written.** Confirm your password at `POST /merchant/payments/security-check`, then resubmit the _identical_ request with the returned `security_token`. |

   An amount at or above the merchant's block threshold is **not** in this union -- it is
   `422 AMOUNT_BLOCKED`, so a client that ignores `action` cannot read a refusal as a success.
   `422 LIMIT_EXCEEDED` (customer's own limits) and `403 CUSTOMER_BLOCKED` are checked _before_ any
   of the threshold routing.

2. **Approving is not always immediate.** `GET /merchant/approvals/{id}` returns two fields your UI
   must handle. `blocked_by: ["compliance"]` means Syka is _also_ holding the payment -- approving
   records the decision but the payment stays `ON_HOLD` until Syka's review clears it, so the button
   will appear to do nothing unless you say why. `stale: true` means the locked exchange rate has
   aged past the merchant's approval window; approving will return `422 QUOTE_TOO_STALE` and the
   staff member must submit the payment again at the current rate.

3. **`?risk=` on `GET /merchant/customers` filters the returned PAGE only.** Risk ratings live in a
   separate compliance database and cannot be joined in the query, so the pagination total still
   counts the unfiltered set. Use it to skim, not to count. Every other filter is a real query.

**Endpoints** (41). All require `Authorization: Bearer <merchant token>`.

| Area         | Endpoints                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customers    | `GET /customers` _ `POST /customers` (6-step KYB) _ `GET /customers/export` _ `GET`/`PUT /customers/{id}` _ `POST /customers/{id}/block` **(manager)** _ `PUT /customers/{id}/limits` **(manager)** _ `GET /customers/{id}/transactions` _ `GET /customers/{id}/activity` _ `GET`/`POST /customers/{id}/notes` _ `GET`/`POST /customers/{id}/documents` _ `GET /customers/{id}/documents/{doc_id}/download` \* `POST /customers/{id}/kyc-renewal-reminder` |
| Payments     | `POST /payments/quote` _ `POST /payments` _ `POST /payments/security-check` _ `GET /payments` _ `GET /payments/{reference}` \* `GET /payments/{reference}/receipt`                                                                                                                                                                                                                                                                                         |
| Approvals    | `GET /approvals` _ `GET /approvals/{id}` _ `POST /approvals/{id}/approve` **(manager)** _ `POST /approvals/{id}/reject` **(manager)** _ `POST /approvals/{id}/request-info` **(manager)**                                                                                                                                                                                                                                                                  |
| Reports      | `GET /reports/{transaction-summary,customer-activity,performance,revenue,trend-analysis,compliance}` _ `GET /reports/branch-performance` **(manager)** _ `GET /reports/{type}/export` _ `POST /reports/custom/generate` _ `POST /reports/custom/schedule` \* `GET`/`POST /reports/templates`                                                                                                                                                               |
| Organisation | `GET /branches` _ `GET /staff` _ `GET /dashboard/manager` **(manager)**                                                                                                                                                                                                                                                                                                                                                                                    |

**Manager-only** endpoints return 403 for `MERCHANT_STAFF`. That is the maker-checker rule: the
person who submits a payment cannot approve it.

**Custom reports are built from a closed catalogue.** `GET /merchant/reports/templates` returns the
exact metrics, groupings and filters `POST /merchant/reports/custom/generate` accepts, plus the
limits (max 2 groupings, 6 metrics, 5,000 rows, 366-day window). Build your picker from that
response and it cannot offer something the server rejects. An unrecognised name is a **400**, never
ignored -- silently dropping a filter would return _more_ than you asked for.

**`POST /merchant/customers` returns the temporary password ONCE.** It is not retrievable
afterwards. Non-fatal problems (a director that did not save, a wallet that was not created) come
back in `warnings[]` rather than failing the registration and losing that password. If the payment
provider was unreachable during registration, `GET /merchant/customers/{id}` reports
`kyb.status: "blocked_provider_registration"` -- that customer cannot transact until it is retried.

**New admin endpoints** to support it (`/admin/merchants/{id}/...`): `GET`/`POST /branches`,
`PUT /branches/{branch_id}`, `POST /staff`. Branches are created by Syka, not by merchants, because
a branch id is snapshotted onto every customer and payment. Assigning `branch_id` when provisioning
a staff account is what makes branch reporting work -- without it, that person's payments report as
"unattributed".

### 2026-08-29 -- tellers can read the transfers they processed (bug fix, non-breaking)

**`GET /transactions/{reference}`, `/tracking` and `/receipt` returned 404 to the teller who
processed the transfer.** Those endpoints checked only the _sender_, and a teller-assisted send's
sender of record is the walk-in **customer**. A teller could see the transfer at
`GET /teller/transactions/{reference}` but got 404 on tracking, which also meant they could not
trigger the provider reconciliation that advances a stuck transfer.

Fixed: the sender **or** the teller of record may read it. No request change; these calls simply
work now. `POST /transactions/{reference}/cancel` is unchanged and stays sender-only.

### 2026-08-29 -- clearer `CONTACT_NOT_VERIFIED` message (non-breaking)

Same error code, same 422, better wording. The payment provider sends its phone and email
verification failures **together** and its own rule is that _either one_ satisfies it -- our message
named a single channel and told the user to fix that one, which was wrong twice over. The message
now says either will do, and the details carry `satisfied_by`. The underlying block is still the
provider's and is unresolved with them; nothing a user does in Syka clears it.

### 2026-08-27 -- release retry + no more duplicate rate alerts (non-breaking)

**`POST /admin/transactions/{reference}/release`** -- two fixes, no request change.

- A release that failed at the payment provider used to leave a dead collection leg behind, and
  every later release then **skipped the resume entirely** and parked the transaction in `PENDING`
  with no order and no `checkout_url` -- permanently, while reporting success. Releases are now
  retryable: a leg that never reached the provider is reused, and a transaction that genuinely has
  an order is left alone (never a second payable checkout for one transfer).
- New `422 CANNOT_RESUME`. Show the message. It means the transfer cannot be restarted -- either the
  sender is no longer eligible, or the transfer was created before `send_payment_type` existed and
  has no payment method stored, in which case the sender must start a new transfer. (At the time of
  writing there are **zero** such transactions in the database, so this should not appear in
  practice.)

**Rate alerts** -- no API change. `GET`/`POST`/`DELETE /rate-alerts` behave identically. Internally,
firing an alert is now an atomic claim, so a user can no longer receive the same one-shot alert
once per running backend instance.

### 2026-08-27 -- !! BREAKING: sends now require the SENDER's payment method

**Every `POST /transactions/send` has been failing.** Our collection order to the payment
provider omitted `source.paymentType`, which the provider requires, so it answered
`400 PAYMENT_TYPE_REQUIRED` and you saw:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid or missing field(s): source.paymentType.",
    "details": { "invalid_fields": ["source.paymentType"] }
  }
}
```

The cause: our API had **no field for how the SENDER pays**. `beneficiary.payment_code` /
`beneficiary.payment_type` are the _recipient's payout_ rail -- a different thing. There are two
rails in every transfer and we only ever modelled one.

**What you must change -- `POST /transactions/send`:**

|                     | from -> to                                             |
| ------------------- | ------------------------------------------------------ |
| `send_payment_type` | **new, REQUIRED** -- how the sender funds the transfer |
| `send_payment_code` | new, optional (recommended) -- the specific rail       |

Get both from an endpoint you already call, with `direction=deposit`:

```
GET /config/payment-methods?direction=deposit&currency=<send_currency>
     -> [{ "code": "mtn", "type": "local_wallet", "name": "MTN" }, ...]
        code -> send_payment_code        type -> send_payment_type
```

For GHS today that is `airtel` / `mtn` / `vodafone`, all `local_wallet`. Do **not** hardcode the
list -- it is per corridor and changes as the provider enables rails.

```jsonc
POST /transactions/send          // Idempotency-Key header as before
{
  "quote_id": "QT-...",
  "purpose_code": "company_expenses",
  "send_payment_type": "local_wallet",   // NEW -- how the SENDER pays
  "send_payment_code": "mtn",            // NEW -- optional
  "beneficiary": { "payment_type": "local_wallet", ... }   // unchanged: how the RECIPIENT is paid
}
```

**Also accepted on `POST /transactions/quote` (optional, non-breaking, but recommended).** The
rail changes the fee and the rate, so passing `send_payment_type` / `send_payment_code` there
prices the collection leg on the rail actually charged. Doing so **locks the quote to that rail**:
send inherits it (you may then omit both on send), and sending on a _different_ rail returns
`422 QUOTE_METHOD_MISMATCH` -- request a new quote instead. If you quote without a rail, nothing
is locked and send decides.

**New error codes on send:** `400 MISSING_PAYMENT_METHOD` (no rail anywhere),
`400 INVALID_PAYMENT_METHOD` (not offered for that currency),
`422 QUOTE_METHOD_MISMATCH` (above).

**Also breaking -- same field, same reason:**

- `POST /transactions/bulk` -- `send_payment_type` required, batch-level (every child send uses it).
- `POST /transactions/scheduled` -- `send_payment_type` required. **Existing schedules have no rail
  stored and can no longer run**; cancel and recreate them. A failing run now says so explicitly in
  its notification.

**Behaviour change -- retrying a failed send.** Previously, retrying with the same `Idempotency-Key`
after a failure returned `201` with the original **FAILED** transaction and no `checkout_url`, so a
dead transfer looked like a success (this is what the four "successful" sends in our logs actually
were). Now, if the earlier attempt failed _before any payment order existed_ -- no funds collected,
nothing at the provider -- the retry creates a **fresh attempt**. Genuine replays are unaffected:
once a payment order exists, the same key still returns the original transaction.

**Better error, non-breaking.** The provider's order-time contact checks now map to
`422 CONTACT_NOT_VERIFIED` ("Please verify your email address or phone number before sending
money.") instead of a generic "Invalid request parameters." -- expect it if a user's email/phone
isn't verified at the provider.

### 2026-08-27 -- `POST /admin/users/tellers` accepts a role (non-breaking)

You could create a `TELLER` but not a `TELLER_SUPERVISOR`: the role was hardcoded. It now takes an
optional `role`:

```jsonc
POST /admin/users/tellers
{ "first_name": "Ama", "...": "...", "role": "TELLER_SUPERVISOR" }   // optional; default "TELLER"
```

Only `TELLER` and `TELLER_SUPERVISOR` are accepted (anything else -> `400`); the guard is unchanged
(ADMIN or SUPER_ADMIN). The response now also echoes `role`.

!! **`TELLER_SUPERVISOR` currently grants exactly the same access as `TELLER`.** Every route guard
treats the two identically, so promoting someone changes a label and nothing else. Supervisor-only
behaviour (e.g. reviewing another teller's shift variance) does not exist yet -- don't build a UI
that implies it does. Existing tellers can still be promoted with
`PUT /admin/users/{user_id}/role` (SUPER_ADMIN), which force-logs them out.

### 2026-08-29 (frontend-reported fixes: checkout redirect, stuck transactions, contact error)

Three issues were reported against the dev backend. Two were real bugs on our side.

**FIXED -- the checkout no longer returns to the wrong site. Action needed (all apps).**
Nothing ever sent a redirect URL to the payment provider, so after paying, users were returned
to whatever is configured in the provider's dashboard (syka.com) regardless of which app started
the transfer. `POST /transactions/send` now accepts optional **`success_redirect_url`** and
**`failure_redirect_url`** -- pass your own (`http://localhost:3000/payment/complete` in dev, a
deep link on mobile) and the sender comes back to you. Omit them and the new server defaults
(`TRANSFI_SUCCESS_REDIRECT_URL` / `TRANSFI_FAILURE_REDIRECT_URL`) apply; with those unset,
behaviour is exactly as before.
!! **The URL must be on an origin in the deployment's `ALLOWED_ORIGINS` list** -- the same list
that governs CORS. Anything else is rejected with **`400 INVALID_REDIRECT_URL`**, and the
response names the offending origin. An unvalidated post-payment redirect would be a phishing
hand-off at the moment a user is most likely to trust the page, so this is deliberate: ask for
your origin to be added rather than expecting arbitrary URLs to work.
!! The values are snapshotted onto the transaction, so a transfer released from a compliance hold
returns to the destination it was created with, not whatever is configured later.

**FIXED -- transactions no longer stick on PENDING. No action needed.**
Transaction state used to advance _only_ on an inbound webhook. A webhook cannot reach
`localhost`, so a paid transfer in local development stayed PENDING forever; in production any
lost or delayed webhook did the same. `GET /transactions/{reference}` and
`GET /transactions/{reference}/tracking` now **ask the provider for the real state** before
responding and apply whatever it reports -- so polling the transaction after paying advances it
with no webhook at all. A background sweeper also picks up transfers nobody is looking at.
!! The check is throttled to roughly once per 20 seconds per transaction, so polling faster than
that returns the last known state. It is best-effort: an unreachable provider returns the
current state rather than an error.

**Changed: `CONTACT_NOT_VERIFIED` now says whose verification is missing.**
This error is the **payment provider's** contact check, not Syka's -- a user who is
`email_verified: true` and `phone_verified: true` with us can still hit it. The old message told
them to verify an email they had already verified, which sent them in circles. The message now
names the provider, and the error `details` carry `provider_code`, `contact` (`email`/`phone`)
and `verified_by: "provider"` so support can see exactly what was rejected.
!! **SUPERSEDED 2026-08-30.** This section said the state was unsatisfiable. It is not -- TransFi
emails the customer a verification link that is valid for ten minutes. See the entry at the top of
this file.

**Fixed: KYC approved at tier 0.** A `kyc_success` arriving with no matching pending application
approved the status but left `kyc_tier` at 0 (visible on at least one live account). The tier now
falls back to the level of the user's most recent application. Where there is genuinely no
application on record the tier is still left alone -- guessing would grant limits with no evidence
-- and an admin can set it via `PUT /admin/users/{user_id}/kyc-tier`.

### 2026-08-15 (Wave 3 -- merchant / channel-partner network, 43 new endpoints)

The whole referral-network product surface: merchants, the commercial-partner CRM,
the onboarding pipeline, and commissions.

**Before you build against these, understand attribution.** Nothing linked a customer to
the merchant that referred them, so this wave added it. A customer gets a
`channel_partner_id` either by entering a partner's **referral code** or via
`PUT /admin/users/{user_id}/channel-partner`. That attribution is then **copied onto every
transaction at creation time**. It is a snapshot, not a live lookup -- so reassigning a
customer, or ending a partner relationship, never rewrites commission already earned or a
statement already issued. Expect all the per-partner views to be empty until customers are
attributed.

**New (non-breaking): merchants -- `/admin/merchants/*` (15).**
`GET`/`POST ""`, `GET /{id}`, `GET /{id}/{clients,transactions,commission,performance,training}`,
`PUT /{id}/{status,commission-rate,tier}`, `POST /{id}/{commission/pay,message,checkin,report}`.
!! Merchants and commercial partners share ONE collection discriminated by `kind`, so a
commercial partner's id **404s** on `/admin/merchants/*` and vice versa. Use the right tree.
!! A merchant is created `pending` and **earns nothing** until moved to approved or active --
so a mistyped commission rate cannot start paying out. Status moves are guarded
(422 `INVALID_STATE_TRANSITION`); terminated is final.
!! `tier` is a commercial label for reporting. It does **not** change what a merchant earns --
that comes from `/commission-rate`. Change both if a tier is meant to carry a different rate.

**New (non-breaking): applications -- `/admin/merchants/applications/*` (11).**
`GET ""`, `GET /stats`, `GET /{id}`, `POST ""`, `PUT /{id}/{background-check,interview}`,
`POST /{id}/{interview/schedule,documents/request,toolkit,approve,reject,onboard}`.
Stage flow: `submitted -> background_check -> interview -> documents -> approved -> onboarded`,
with `rejected` reachable from any live stage. Skipping ahead is a 422.
!! **The background check is manually recorded, not automated.** `pep`, `sanctions` and
`adverse_media` record what a _reviewer_ checked -- we have no screening vendor connected.
Do not present these as system-verified.
!! **Approve != onboard.** Approving marks the decision; `POST /onboard` creates the partner,
issues credentials and schedules the first check-in. `onboard` returns a **one-time**
`temp_password` that is never retrievable again.
!! `PUT /background-check` is a partial update -- omitted checks keep their existing result.
`PUT /interview` **replaces** the checklist, so send the whole list.
!! `POST /toolkit` deliberately does not move the stage.

**New (non-breaking): commercial partner CRM -- `/admin/channel-partners/*` (11).**
`GET`/`POST ""`, `GET /onboarding`, `GET /{id}`, `GET /{id}/{customers,transactions,payments,performance}`,
`GET`+`POST /{id}/documents`, `PUT /{id}/status`.
!! **This is NOT `GET /admin/partners`.** That path already exists and means the _technical_
registry of payment providers we integrate with. This is the commercial relationship CRM.
!! Document downloads are **presigned URLs valid 15 minutes** -- the bucket is private, so do
not cache or share them. Uploads accept PDF/JPEG/PNG/Word/Excel only, max 10 MB.

**New (non-breaking): commissions -- `/admin/commissions/*` (4).**
`GET ""`, `GET /summary`, `POST /{id}/mark-paid`, `POST /statement`.
!! **Named commissions, not payouts.** "Payout" already means the money-movement leg of a
remittance in this API; overloading it would be a production misunderstanding.
!! **Commission is a share of OUR platform fee**, never of the transfer amount and never of
the provider's fee. Rates are decimal fractions -- `"0.20"` is 20% _of our fee_.
!! `mark-paid` **records** that finance sent money; it does not move money. It is idempotent,
and only a `pending` payout can be settled.
!! Paying a merchant claims their outstanding accruals **atomically**, so two admins clicking
at once cannot double-pay -- the second gets 422 `NOTHING_TO_PAY`.
!! `total_outstanding` should match the commission-payable balance in the ledger. A persistent
divergence means an accrual posted without its ledger pair, and is worth investigating.

**New (non-breaking): attribution -- `PUT /admin/users/{user_id}/channel-partner` (1).**
Links or clears a customer's referring partner. Send an empty `channel_partner_id` to clear.
!! Affects **future transactions only**, per the snapshot rule above.

**New (non-breaking): `?channel_partner_id=` on `GET /admin/transactions`** -- the same data as
`/admin/merchants/{id}/transactions`.

**New: merchant app context.** `app_context: "merchant"` with roles `MERCHANT_STAFF` and
`MERCHANT_MANAGER` now exist, and `POST /login` accepts `"merchant"`. Onboarding provisions a
manager account.
!! ~~**These accounts can authenticate but reach no routes**~~ -- **SUPERSEDED (2026-08-29).**
`/api/v1/merchant/*` IS built and mounted: 41 endpoints, see Part 19. A merchant login screen is
safe to ship. (The text above is kept as a dated record of what was true on 2026-08-15.)
!! `GET /admin/config/roles` now includes both merchant roles with an **empty** permission list,
which is accurate: they have no reachable routes yet.

### 2026-08-15 (KYC recovery fix + Wave 2 analytics -- 11 new endpoints)

**FIXED -- interrupted KYC no longer strands the user. Action needed (user app).**
Reported by the mobile team: start verification, close the tab, and you could never
start again. Confirmed and fixed. The cause: `kyc_status` was set to `in_progress` the
moment we handed you the verification link -- before the user had done anything -- and was
only ever cleared by a completion webhook. Abandon the flow and no webhook ever fires, so
the account stayed `in_progress` forever: re-initiating returned `409
KYC_ALREADY_IN_PROGRESS` and `POST /kyc/resubmit` returned `422 NOTHING_TO_RESUBMIT`.
The same one-way door explains the _"completed but still showing in progress"_ reports --
nothing ever asked the provider, so a lost or delayed webhook was indistinguishable
from an abandoned session.

`POST /kyc/tier{N}/initiate` and `POST /kyb/*/initiate` now **resume instead of refusing**:

- **A live session returns `200` with the SAME `verify_url` and `"resumed": true`.** No new
  provider session is created -- just reopen the link. _Handle this: it is now a normal
  success, not an error._
- If the session looks stale we ask the provider for the real state and adopt it, then
  start a fresh session if the provider says a retry is allowed.
- Only genuinely final states refuse: `422 KYC_NOT_RETRYABLE` (declined, with
  `details.reject_labels` explaining why) and `409 KYC_UNDER_REVIEW` (documents submitted,
  a human is deciding). **`409 KYC_ALREADY_IN_PROGRESS` is gone** -- delete any handling for it.

`POST /kyc/resubmit` no longer requires a rejected verification; it accepts any
non-final state and delegates to the same logic. `422 NOTHING_TO_RESUBMIT` is gone.

**Changed (non-breaking): `GET /kyc/status` reconciles and gained four fields.**
When we still believe a verification is running, this endpoint now asks the provider for
the truth (throttled to once per 20s, best-effort -- an unreachable provider never breaks
the screen). New fields:

- `resume_url` -- the still-valid link when a session was started but not finished. **Use
  this to offer "continue verification"** instead of a dead-end status screen.
- `can_retry` -- whether starting a new verification is allowed right now.
- `provider_status` -- the provider's own state. Diagnostic; drive UI off `kyc_status`.
- `reject_reasons` -- e.g. `BAD_SELFIE`, `AGE_REQUIREMENT_MISMATCH`, so you can tell the
  user what to fix.

**New (non-breaking, admin): `POST /admin/kyc/users/{user_id}/reset`.** Manual escape hatch
for a wedged verification. Refuses with `422 KYC_ALREADY_APPROVED` for a verified user.
Rarely needed now that the user-facing flow self-recovers.

**New (non-breaking, admin): revenue analytics.** `GET /admin/revenue/{summary,by-source,trend,by-country,by-partner,top-customers}`.
All accept `period=today|week|month|90d|year|all` (default `month`) or explicit `from`/`to`;
`trend` also takes `granularity=day|week|month`.
!! **Read the revenue model before wiring these up.** `gross_revenue` is our platform fee
(explicit fee + FX markup). `provider_cost` is what the payment provider charges **us** --
in `by-source` it is flagged `is_cost: true` and must be **subtracted**, never summed with
the other lines. `net_revenue` is already computed for you. `treasury_management` is always
zero (we hold no customer balances, so there is no treasury product to earn on). Only
COMPLETED transactions count. All amounts are decimal **strings** in USDC.
!! `by-partner` returns exactly one row today -- all traffic routes through a single partner.
!! `trend` **omits empty buckets**; plot against the returned dates, don't assume a
contiguous range.

**New (non-breaking, admin): treasury analytics.** `GET /admin/treasury/{fx-activity,cash-flow,transactions}`.
!! These show **flow, not balances**. Per-chain stablecoin balances and per-partner-bank
fiat balances need custody and partner data we don't hold -- see "Needs a third-party
provider". The live provider float remains at `GET /admin/transfi/balance`.
!! **`cash-flow` net will be ~0 and that is correct**, not a bug: every completed transfer
passes value straight through, so inflow and outflow track each other and the margin
appears under revenue. A persistently non-zero net means stranded value worth investigating.
!! `fx-activity`'s `spread_captured` counts only rate-haircut pricing, so it never
double-counts an explicit fee already reported under revenue.

**New (non-breaking, user app): `GET /analytics/spending?month=YYYY-MM`.** The signed-in
user's completed transfers for a month, grouped into spending categories with each
category's share, largest first. Categories come from the same purpose-code mapping as the
transaction list and `GET /config/purpose-codes`, so a badge and this breakdown cannot
disagree. Defaults to the current month.
!! Amounts are in the **settlement currency (USDC)**, not the send currency -- a month may
mix several send currencies, which cannot be added together.

**Changed (admin UI menus): `/admin/users/*` role guards were re-tiered.**

- **FINANCE_ADMIN can now reach** the user list, user detail, notes (read), activity,
  financial summary, teller shifts and teller transactions. It previously got `403` on all
  of them -- including the finance-facing financial summary -- while still being able to
  export every user's PII via `GET /admin/reports/users` and see them in `GET /admin/search`.
  That was an inconsistency, not a boundary.
- **SUPPORT_AGENT no longer reads** `/screening` or `/reviews` -- compliance case data. Both
  shipped on 2026-08-07, so nothing should depend on them yet. Support **keeps** the status
  change (freezing an account on a fraud report stays a tier-1 action).
- `GET /admin/config/roles`: `users.notes` split into **`users.notes.read`** and
  **`users.notes.write`** (they now differ by role), and **`users.screening`** added.
  That endpoint also shipped on 2026-08-07, so no client should be pinned to the old codes.

### 2026-08-07 (Wave 1 from the "Missing Endpoints" list -- 22 new endpoints)

> **Read [Endpoints You Already Have](#endpoints-you-already-have) first.** Of the 142 endpoints in
> `Syka Missing Endpoint.pdf`, **~23 already exist** under paths you may not know about, **~26 need a
> third-party provider** we have not selected, and the rest need a new product model. This release
> ships the 22 that extend what already existed.

**Changed: `GET /transactions` now actually applies `status` for every role -- action needed if you pass it.**
`status` was accepted and then **silently ignored** for non-teller callers, so a request that sent it
got _everything_ back. It now filters. If your client was passing `status` and relying on getting the
full list, either drop the param or pass it deliberately. No change for teller callers (already
honoured). _Behaviour-changing, not breaking._

**New (non-breaking): `GET /transactions` filtering.** Added `type`, `currency` (matches send **or**
receive), `direction`, `category`, `start_date`, `end_date`, `search` (reference or recipient name,
max 64 chars). Dates accept `YYYY-MM-DD` or RFC3339; a bare `end_date` covers the whole day. Bad
values are a `400`, not an empty list.

**New (non-breaking): extra fields on every transaction object.** `fee` (our platform fee, send
currency), `total_cost`, `purpose_code`, `category`, `direction`, `recipient_name`. History rows can
now show what a transfer cost without a second call.
!! **`direction` caveat -- do not build a money-in/money-out chart on it yet.** A transaction has one
user-linked party (the sender); the recipient is an encrypted snapshot, not a Syka user. So today
`ONRAMP` is the only `credit` and everything else is a `debit`. It becomes meaningful when inbound
remittances to Syka users are modelled.

**New (non-breaking): `category` on `GET /config/purpose-codes`.** Twelve stable buckets
(`family_support`, `business`, `bills_utilities`, `education`, `healthcare`, `travel`, `housing`,
`investment`, `taxes_government`, `gaming`, `financial_services`, `other`). Same mapping powers the
transaction `category` field, so the dropdown and the badge cannot disagree.

**New (non-breaking): `GET /exchange-rates` rate-board mode.** Pass `base` + `quotes=USD,EUR,GBP`
(max 8) + optional `amount` (default 1000) to price several corridors at once. Returns
`{base_currency, amount, rates[], as_of}`. **The single-pair contract is untouched** -- keep sending
`send_currency`/`send_amount`/`receive_currency` and nothing changes.
!! In board mode **each entry may carry its own `error` object instead of amounts** while the others
succeed. Always check per entry: corridors with no payment methods configured (most of them today)
return `NO_PAYMENT_METHODS_AVAILABLE` there rather than failing the whole response.

**New (non-breaking): post-login email verification.**
`POST /users/me/email/verify` sends a 6-digit code to the signed-in user's address (this is also the
**resend** path -- there wasn't one) and `POST /users/me/email/confirm {otp}` confirms it, flipping
`email_verified` on `GET /users/me`. `422 EMAIL_ALREADY_VERIFIED` / `422 EMAIL_NOT_SET`.
!! OTP endpoints share **one bucket of 3 per 10 minutes** per IP+user across the whole API, so a user
who just did SMS-2FA or a password reset may hit `429` here.

**New (non-breaking): spreadsheet bulk payments.** Four-step flow, all corporate-only:

1. `GET /transactions/bulk/template?format=xlsx|csv` -- download the template (a **file**, not JSON).
2. `POST /transactions/bulk/upload` -- multipart `file` (.xlsx/.csv, <=2 MB, <=200 rows) -> `upload_id`
   plus parsed rows with their real spreadsheet row numbers. Nothing is sent.
3. `POST /transactions/bulk/validate {upload_id}` -- each row comes back `matched` (has a
   `beneficiary_id`), `unmatched` or `invalid` (with a specific `error`).
4. `POST /transactions/bulk {upload_id, send_currency, receive_currency, purpose_code,
send_payment_type}` -- the **existing** send endpoint, now accepting `upload_id` instead of
   `items`. `send_payment_type` is required and applies to the whole batch (see the 2026-08-27
   change-log entry).

!! **Account names always come back `name_verification: "unverified_name"`.** Confirming a name
against the bank needs a third-party verification service that is not connected -- we will not claim a
name was verified when it wasn't.
!! **Unmatched rows are not auto-created as beneficiaries** (an unverified account number silently
becoming a saved payee is a fraud vector). Save them with `POST /beneficiaries`, then re-validate.
Submitting an upload with any unresolved row returns `422 UNRESOLVED_ROWS` listing the row numbers --
a payee is never silently dropped from a payroll run.
!! Uploads are held **24 hours** and are scoped to the uploading user; after that, upload again.
`POST /transactions/bulk` still accepts `items` exactly as before.

**New (non-breaking): PDF output.** `GET /transactions/{reference}/receipt?format=pdf` returns a
branded PDF (file download, not the JSON envelope); default is still JSON. The five
`/admin/reports/*` streams and `POST /admin/reports/generate` also accept `format=pdf`.
!! PDF is for printing, not bulk data: over 5,000 rows returns `422 REPORT_TOO_LARGE_FOR_PDF` -- use
`xlsx`. PDFs use Latin-1 core fonts, so characters outside that range render as `?`.

**New (non-breaking, admin): per-user 360 views.** All under `/admin/users/{user_id}` -- note the param
is **`user_id`**, matching the existing routes in that group:

- `GET .../financial-summary` -- counts by status, volume and fees **per currency** (send amounts are
  denominated in their own currency and are never summed across currencies), plus
  `lifetime_volume_settle` in USDC, and tier limits with 24h/month usage.
  !! `limits.enforced` is `false`: tier limits are **display-only**, nothing on the send path checks
  them. Do not present them as enforced.
- `GET .../activity` -- the admin view of the user's activity feed.
- `GET .../reviews` + `POST .../reviews` -- periodic compliance reviews, with `next_scheduled_date`
  and a `review_due` flag (a never-reviewed user reports as due). POST is ADMIN / SUPER_ADMIN /
  COMPLIANCE_OFFICER.
- `GET .../teller-shifts` and `GET .../teller-transactions` -- admin visibility into a teller's work.
  `422 NOT_A_TELLER` for non-teller accounts.
- `GET .../screening` -- persisted internal-watchlist screening history.
  !! Internal watchlist **only** -- regulated sanctions/PEP screening is TransFi's and is not mirrored
  here. !! Teller-assisted sends do not run the compliance hook, so walk-in customers show only
  manual screens.

**New (non-breaking, admin): staff & RBAC.**

- `GET /admin/config/roles` -- every role by app context, with label, description and permissions,
  plus a `permission_catalogue` legend. !! `permissions` is **advisory**: route-level role guards are
  the only enforcement.
- `POST /admin/users/staff` (SUPER_ADMIN) -- create ADMIN / COMPLIANCE_OFFICER / FINANCE_ADMIN /
  SUPPORT_AGENT. Returns a **one-time** `temp_password`. SUPER_ADMIN cannot be created here.
  To **list** staff, use the existing `GET /admin/users?account_type=admin`.
- `PUT /admin/users/{user_id}/role` (SUPER_ADMIN) -- `{role, reason}`. !! **Every session and refresh
  token for that user is revoked immediately** and their current access token stops working on the
  next request; they must sign in again. Refusals: `403 CANNOT_MODIFY_SELF`,
  `422 ROLE_CONTEXT_MISMATCH` (cross-app-context moves are not supported), `422 LAST_SUPER_ADMIN`,
  `422 ROLE_UNCHANGED`.

**New (non-breaking, admin): alerts & search.**

- `GET`/`PUT /admin/notification-preferences` -- the signed-in admin's own event-alert toggles. The
  GET ships a `catalogue` so you render labels from the API, never hardcoded. PUT is **partial**:
  omitted channels/alerts/fields are untouched. !! Stored and returned, but **no alert emitters exist
  yet** -- toggling one has no delivery effect today.
- `GET /admin/search?q=` -- cross-entity search (users, transactions by reference, beneficiaries,
  compliance cases). Min 2 chars, `limit` per section (default 5, max 20). !! A section that fails or
  times out returns an **empty array and is named in `sections_failed`** -- that is not the same as
  "no matches". `sections_omitted` names sections your role cannot see (compliance cases are hidden
  from SUPPORT_AGENT and FINANCE_ADMIN). Bank details are not searchable (payout details are
  encrypted).

**New (non-breaking, admin): `?teller_id=` on `GET /admin/transactions`** -- same data as
`/admin/users/{user_id}/teller-transactions`.

**Fixed: user search no longer 500s on punctuation.** `GET /admin/users?search=` put the raw term
into a regex, so a `(` was a `500` and a crafted pattern was a denial-of-service. Search input is now
escaped everywhere.

### 2026-07-11 (typed payout_details, teller transaction list, CAD corridor error)

**Changed: `payout_details` fields are now TYPED -- action needed (teller + user apps, bank payout corridors).**
`payout_details` (on `POST /teller/transactions/create` and `POST /transactions/send` / beneficiaries) is
no longer a flat string->string map. Some corridors require **non-string** fields, and the provider rejects
a wrong type. Concretely for **US bank payout (`ach`, `wire`)**:

- `bankAddress` must be an **object** -- `{ "street1": "...", "street2": "...", "city": "...", "state": "...",
"postalCode": "...", "country": "US" }` (was a string -> `400 INVALID_REQUEST`,
  `invalid_fields: [destination.additionalPaymentDetails.bankAddress]`).
- `invoiceIds` must be an **array of strings** -- `["1"]` (was `"1"` -> same 400).
- All other US fields (`accountNumber`, `routingNumber`, `accountType` = `checking|savings`, `bankName`,
  `firstName`, `lastName`, `city`, `state`, `postalCode`, `street`, `email`) stay strings.
  **How to build the form correctly:** `GET /config/payment-methods` now returns a typed **`fields`** array
  alongside `required_fields`. Each entry has `name`, `type` (`string|number|boolean|array|object`), optional
  `enum` (allowed values, e.g. `accountType`), `items` (element type when `array`), and `fields` (sub-fields
  when `object`, e.g. `bankAddress`). Drive the beneficiary form and the JSON types you submit from this -- do
  not hardcode. **Migration:** if you previously sent `bankAddress`/`invoiceIds` as strings, switch to
  object/array; string-only corridors (Interac email, mobile money, IBAN) are unaffected.

**Changed: `GET /transactions` is role-aware for tellers -- non-breaking (fixes empty list).**
For a **TELLER / TELLER_SUPERVISOR**, `GET /transactions` now returns the transactions the teller
**processed** (teller-assisted sends, `teller_id` scope), newest first, and accepts an optional `status`
filter. Previously it was sender-scoped and always empty for a teller (the customer is the sender of
record). No change for user/mobile callers (still their own sends).

**New (non-breaking, teller app): `GET /teller/transactions`.**
Explicit teller-scoped list of the transactions this teller processed (same data as the role-aware
`GET /transactions` above). Query: `page`, `limit`, optional `status`. Prefer this in the teller app.

**Changed: unsupported payout corridor now returns 422, not 503 -- non-breaking (better UX).**
`GET /config/payment-methods?direction=withdraw&currency=<X>` for a currency the provider has **no payout
methods** configured for (e.g. **CAD** today) now returns **`422 UNSUPPORTED_CORRIDOR`** (was `503
PROVIDER_ERROR`). Show a "this destination isn't available yet" state on 422. (CAD specifically is pending
provider-side enablement -- a config action, not a code fix.)

### 2026-07-09 (amount basis send/receive, honest provider fee, prefunding admin ops)

**Changed: quotes/teller-send can now be priced by SEND or RECEIVE amount -- action needed (user + teller apps).**

- **User quote (`POST /transactions/quote`):** now takes **exactly one** of `send_amount` OR
  `receive_amount` (both are optional individually; sending neither or both -> `400 INVALID_AMOUNT`).
  `receive_amount` prices so the recipient receives exactly that (reverse FX). `send_amount` behaves as
  before. **If you always sent `send_amount`, nothing breaks** -- just keep sending it.
- **Teller assisted-send (`POST /teller/transactions/create`):** new fields **`amount` + `amount_type`**
  (`"send"` = cash collected in `send_currency`; `"receive"` = what the recipient gets, in
  `receive_currency`). The old **`amount_received` is DEPRECATED** but still accepted (always treated as a
  SEND amount) -- migrate to `amount` + `amount_type`. NOTE: `amount_received` was always a _send_ amount
  despite its name; if your UI labelled it "recipient receives", switch to `amount_type: "receive"`.

**Changed: `provider_fee` on a quote is now the honest TOTAL (both legs) -- non-breaking but read the note.**
`provider_fee` previously showed only the payout-leg fee; it now covers **payin + payout**, expressed in
the **send currency**. New fields: `provider_fee_payin` (send ccy) and `provider_fee_payout` (receive ccy).
`fee`/`platform_fee` (our fee) are unchanged. All provider fees are netted into the amounts -- shown for
transparency, never added on top.

**New (non-breaking, admin app): TransFi treasury ops.**

- `GET /admin/transfi/balance?currency=USDC` -- our prefunding/MCA balance (available prefunding,
  collections, payouts, unsettled) per currency. Any admin role.
- `POST /admin/transfi/prefund` -- top up the prefunding balance payouts draw from, via a **fiat_prefund**
  (fiat funding -> stablecoin float). Body: `{amount, source_currency?, dest_currency?, payment_code?,
payment_type?, source_details}` -- defaults `source_currency=USD`, `payment_code=ach`,
  `payment_type=bank_transfer`, `dest_currency=USDC`; `source_details` supplies the funding account's
  `email` + bank fields (`accountNumber`, `routingNumber`, `accountType` = `checking|savings`).
  Super-admin / finance-admin only. (Verified in sandbox: a **crypto_prefund** completes but does NOT
  credit the payout balance -- only **fiat_prefund** does, so we use fiat_prefund. In sandbox the balance
  lands after you simulate the returned order to `completed`.)
- `POST /admin/transfi/simulate-order` `{provider_order_id, status, error_code?}` -- **sandbox only**
  (403 `SIMULATION_DISABLED` in prod); drives an order/prefund to a status and fires its webhook.
  Super-admin only. Use it to complete a prefund (`completed`) or settle a payout (`fund_settled`) E2E.

### 2026-07-07 (purpose_code must be a valid value -- fixes teller-send/send 503)

**Fixed: sends failed with `503 "Payment provider error: Validation error"` -- action needed (all apps).**
`POST /teller/transactions/create`, `POST /transactions/send`, and the scheduled/bulk send endpoints
were forwarding whatever `purpose_code` you sent straight to the payment provider. Values like
`"services_payment"` (and the old doc example `"family_support"`) are **not** accepted by the provider,
so the order was rejected and surfaced as a confusing `503 PROVIDER_ERROR`.

- **New endpoint (non-breaking): `GET /config/purpose-codes`** (public, no auth) -- returns the list of
  valid purpose codes as `[{ "code": "...", "label": "..." }]`. **You MUST populate the purpose dropdown
  from this endpoint and send the chosen `code` as `purpose_code`.** Do not hardcode/guess values.
  Common ones: `friends_and_family_transfer`, `household_support`, `low_value_remittance`,
  `salary_payment`, `vendor_payment`, `service_charges`, `other`.
- **Behaviour change:** an invalid `purpose_code` now returns **`400 INVALID_PURPOSE_CODE`** _before_ we
  call the provider (message points you to `GET /config/purpose-codes`), instead of a `503`.
- **Behaviour change (from -> to):** if the provider rejects any other field, the error is now
  **`400 INVALID_REQUEST`** (was `503 PROVIDER_ERROR`) with `error.details.invalid_fields: [...]`
  naming the offending field(s). Treat `400 INVALID_REQUEST` as "fix the request", not "retry later".

### 2026-07-04 (KYC-initiate fix + teller/admin user editing)

**Fixed: KYC/KYB initiate was failing with "Invalid request parameters" -- behaviour fix (all apps).**
Every KYC-initiate call (`POST /kyc/tier1..4/initiate`, `POST /kyc/resubmit`, and
`POST /teller/customers/{id}/kyc/initiate`) was returning `503 PROVIDER_ERROR`
`"Payment provider error: Invalid request parameters"` for anyone whose payment-partner user already
existed. Cause: the partner requires a `redirectUrl` on its KYC endpoints and we weren't sending one.
The backend now always sends a configured default, so **no frontend change is required** -- these
endpoints just work now. **Optional (non-breaking):** you may pass a JSON body
`{ "redirect_url": "<https URL or deep link>" }` on any KYC-initiate call (and `redirect_url` alongside
`level` on the teller initiate) to control where the user lands after finishing the hosted KYC flow;
omit it to use the server default.

**New: admin can edit a user -- non-breaking (admin app).**
`PUT /admin/users/{user_id}` -- edit a user's identity/contact/address. Body (all optional, partial
update): `first_name`, `last_name`, `email`, `phone` (E.164, or local when `country_code` is set),
`country_code` (ISO-alpha2), `dob` (YYYY-MM-DD), `gender`, `country`, `address{street,city,state,
postal_code,country}`, and for corporate accounts a `corporate{...}` block (company name/reg/addresses).
Returns the updated user detail. `409` if the new email/phone belongs to another account. Admin/super-admin only.

**UPDATED 2026-09-20.** The body also takes `id_type`, `id_number`, `id_expiry`, `id_country`,
`nationality` and `place_of_birth` -- and changing ANY identity field now requires `reason`
(`400 REASON_REQUIRED` without it). On a verified account the change also pauses that person's
sending until a compliance officer clears it with
`POST /admin/users/{user_id}/identity-review/clear`. See the change-log entries at the top.

**New: teller can edit a customer -- non-breaking (teller app).**
`PUT /teller/customers/{id}` -- edit a teller-created customer's identity/contact/address. Same optional
fields as above (`first_name`, `last_name`, `phone`, `country_code`, `email`, `dob`, `street`, `city`,
`state`, `postal_code`). Only accounts the teller created (individual, teller-assisted) are editable --
others return `403 CUSTOMER_NOT_EDITABLE`. `409` on a duplicate email/phone. Returns the updated customer.

**UPDATED 2026-09-20.** On a VERIFIED customer, `first_name`, `last_name`, `dob` and the country
are locked: changing them returns `422 IDENTITY_LOCKED` (an unchanged value is fine, so sending the
whole form still works). Contact details and the address stay editable. The customer detail carries
`identity_locked` and `locked_fields`.

### 2026-06-25 (avatar fix + address autocomplete)

**Avatar URL is now a short-lived signed URL -- behaviour change (all apps).** Uploaded avatars were
returning a permanent S3 URL that 403'd (the bucket is private -- shared with KYC docs). `avatar_url` (from
`POST /users/me/avatar` and `GET /users/me`) is now a **presigned URL that expires (~1h)** and loads
directly in an `<img>`. **What to do:** use `avatar_url` as-is; don't cache it long-term -- **re-read the
profile to get a fresh URL** when it expires. (No 403 anymore.)

**New: address autocomplete -- non-breaking (all apps).**
`GET /config/address/autocomplete?input=<text>&country=<ISO-alpha2>` returns address **suggestions** from
the financial partner so the user can pick a **resolvable** address (a hand-typed address often fails the
partner's validation at KYC). Authenticated, any role. `input` is required. Response items: `place_id`,
`description`, `main_text`, `secondary_text`. **What to do:** call as the user types the address; on
select, populate the profile address (`street` ~= `main_text`, `city/state` from `secondary_text`) and have
the user confirm `postal_code`. A validated address is what lets KYC pass the address-validation step.

### 2026-06-25 (payment methods endpoint)

**New: live payment-methods config -- non-breaking (all apps).**
`GET /config/payment-methods?direction=deposit|withdraw&currency=GHS&user_type=individual` returns the
payment methods the financial partner offers for a corridor, **including each method's `required_fields`**
-- use those to build the beneficiary/payout form dynamically (instead of hardcoding corridor fields).
Authenticated, callable by **any** role (mobile / teller / admin). `direction` is required; `currency`
and `user_type` are optional. Response items: `code`, `name`, `type`, `logo_url`, `min_amount`,
`max_amount` (decimal strings), `required_fields`. Cached ~1h. If the partner has nothing configured for
the corridor you'll get `422` (`code: PROVIDER_ERROR`) -- that's a merchant-config state on the partner
side, not a client error.

### 2026-06-24 (production bug fixes)

**KYC now works end-to-end -- but needs a complete profile (all apps).** `POST /kyc/tier{1..4}/initiate`
(and teller `POST /teller/customers/{id}/kyc/initiate`) previously failed with a `503`/opaque error
because the financial partner (TransFi) requires a **residential address** + **phoneCode** that we
weren't sending. We now send them. **What to do:** ensure the user has completed their profile
**address** (street/city/state/postal_code) and DOB before calling KYC. If anything is missing the
endpoint returns a clear `422 PROFILE_INCOMPLETE` whose message lists exactly what's needed -- surface it.
(No gender-picker change needed: keep sending any of `male|female|other|prefer_not_to_say` -- the backend
now maps these to what the partner accepts, so all selections work for KYC.)

**Teller create-customer accepts DOB + address -- non-breaking (teller).** `POST /teller/customers` now
takes optional `dob` (YYYY-MM-DD), `street`, `city`, `state`, `postal_code`. They're optional at
creation but **required before that customer can be KYC-verified** -- collect them in the teller form so
teller-initiated KYC works.

**2FA login: cleaner error when the authenticator can't be verified -- behaviour change (all apps).**
`POST /auth/login/2fa` with `method=totp` used to return a `500` ("2FA secret error") if the stored
secret couldn't be read. It now returns **`401 TWO_FA_UNAVAILABLE`** with guidance to sign in with a
**backup code** and re-enrol. **What to do:** handle `TWO_FA_UNAVAILABLE` by offering the backup-code
flow (`method=backup_code`) and prompting the user to set up 2FA again. (Disabling 2FA now also works
with just the password when the secret is unrecoverable, so a locked-out user can recover.)

### 2026-06-17 (audit fixes)

**Request validation is now ENFORCED -- behaviour change (all apps).** Input validation rules
(required fields, enum/`oneof` values, currency `len=3`, password strength, min/max) were previously
declared but **not actually applied**; malformed request bodies that used to be silently accepted now
return **`400`** (standard error envelope, `code: VALIDATION_ERROR`). **What to do:** ensure request
bodies match the documented schema -- send all required fields, valid enum values, 3-letter currency
codes, and conforming passwords. This affects **every** POST/PUT with a JSON body.

**Bulk / payroll is now ASYNCHRONOUS -- behaviour change (admin/corporate).**
`POST /transactions/bulk` now returns **immediately** with the batch in status **`processing`** and
every item **`pending`**; child transactions (and their `checkout_url`s) are created in the background.
**What to do:** poll `GET /transactions/bulk/{reference}` until the batch status becomes
`created` | `partial` | `failed`, and read each item's `status` / `child_ref` / `checkout_url` as they
fill in. Two line-items to the **same beneficiary** now correctly create **two** child transactions
(previously the second was dropped).

**Compliance hold can now be cleared -- behaviour change (admin).** Releasing a transfer that the
send-path compliance hook placed `ON_HOLD` (`POST /admin/transactions/{reference}/release`) now
**creates the payin + checkout** so the sender can pay (previously such a transfer was stuck). Treat a
released hold as a normal `PENDING` transfer awaiting checkout.

**New compliance endpoints -- non-breaking (admin).** `GET /admin/compliance/risk/{user_id}` and
`PUT /admin/compliance/risk/{user_id}` (body `{ "risk_level": "LOW|MEDIUM|HIGH|VERY_HIGH", "notes": "" }`)
-- read / override a user's AML risk profile (compliance officer / admin / super-admin).

### 2026-06-16 (completion wave)

**Communications -- behaviour change (all apps).** OTPs, verification codes, password-reset
codes, the welcome email, and teller "account-claim" notifications are now **actually delivered**
out-of-band (email via SendGrid, SMS via Twilio) in addition to in-app notifications. Delivery is
env-gated: when provider credentials are unset it silently no-ops (and dev still returns `dev_otp`

- logs the code outside production). **Frontend: nothing required** -- codes now arrive by SMS/email
  as expected; keep handling `dev_otp` in dev. Payout **recipients who are not Syka users** are now
  notified by SMS/email when a transfer completes (where their contact details are in the payout fields).

**New mobile (user app) endpoints -- non-breaking.**

- `POST /transactions/{reference}/cancel` -- cancel a transfer still `INITIATED`/`PENDING` (no funds
  collected) -> status `CANCELLED`. New terminal status `CANCELLED` may now appear in tx lists.
- `POST /transactions/scheduled`, `GET /transactions/scheduled`, `DELETE /transactions/scheduled/{id}`
  -- schedule one-off / recurring (daily|weekly|monthly) sends to a **saved beneficiary**. NOTE
  (pass-through MVP): at each run the backend creates the transaction and notifies you with a fresh
  **checkout link** -- it cannot auto-charge. Show the user the checkout when the notification arrives.
- `POST /transactions/bulk` (corporate only; needs `Idempotency-Key`), `GET /transactions/bulk/{reference}`
  -- batch/payroll send to multiple saved beneficiaries; each item becomes a child transaction with its
  own `checkout_url` (reported per item).
- `POST /kyc/tier3/initiate`, `POST /kyc/tier4/initiate` -- Enhanced Due Diligence (EDD) tiers.
  `POST /kyc/resubmit` -- re-initiate verification after a rejection.
- `POST /beneficiaries/{id}/verify` -- verify a saved beneficiary (adds `verified`/`verified_at` to the
  beneficiary shape).
- `GET /users/me/activity` -- unified activity feed (recent transactions + notifications).
- Mobile PIN: `POST /auth/pin/set`, `PUT /auth/pin/change`, `POST /auth/login/pin` (PIN login is only
  allowed from a **trusted device** -- see device management).
- Device management: `GET /auth/devices`, `POST /auth/devices/{id}/trust`, `DELETE /auth/devices/{id}`.
- SMS 2FA: `POST /auth/2fa/sms/enable`, `POST /auth/2fa/sms/confirm`; backup codes:
  `POST /auth/2fa/backup-codes/regenerate`.
- Rate alerts: `GET/POST /rate-alerts`, `DELETE /rate-alerts/{id}` -- fire-once FX-rate alerts.

**New teller (desktop app) endpoints -- non-breaking.**

- Customer management: `GET /teller/customers` (search `?q=`), `GET /teller/customers/{id}`,
  `POST /teller/customers/{id}/kyc/initiate`, `GET /teller/customers/{id}/kyc/status`,
  `GET /teller/customers/{id}/transactions`, `GET/POST /teller/customers/{id}/beneficiaries`.
- `POST /teller/quote` (corridor preview), `GET /teller/transactions/{reference}` (lookup/receipt),
  `GET /teller/shifts`, `GET /teller/shifts/{id}`, `GET /teller/office/stats`.

**New admin (web app) endpoints -- non-breaking.**

- `GET /admin/dashboard` (`?period=24h|7d|30d|90d|all`) -- platform metrics.
- Reports: `GET /admin/reports/{transactions|users|revenue|kyc|partner-settlement}?format=csv|xlsx`
  (synchronous stream); `POST /admin/reports/generate` + `GET /admin/reports`, `GET /admin/reports/{id}`,
  `GET /admin/reports/{id}/download` (async via worker).
- Settings/config: `GET/PUT /admin/config/settings` (+ `/{key}`), `GET/POST/PUT/DELETE
/admin/config/feature-flags` (+ `/{id}/toggle`), `GET/POST/PUT/DELETE /admin/config/countries`,
  `GET /admin/config/fx-markups`.
- Partner/provider config: `GET/POST/PUT/DELETE /admin/config/financial-partners`,
  `.../kyc-providers`, `.../partner-matrix`.
- Compliance: `GET /admin/compliance/alerts` (+ `/{id}`, `/{id}/action`), `GET/POST/DELETE
/admin/compliance/watchlist`, `GET/POST/PUT/DELETE /admin/compliance/rules`,
  `POST /admin/compliance/screen`, `GET/POST/PUT /admin/compliance/sar`. A new **send-path
  monitoring hook** may now place a transfer `ON_HOLD` (with a compliance case) at creation -- treat
  `ON_HOLD` as "under review".
- Broadcast + templates: `POST /admin/broadcast`, `GET/POST/PUT/DELETE /admin/notification-templates`.
- Audit/security: `GET /admin/audit/security-events`; API keys (super-admin):
  `GET/POST /admin/audit/api-keys`, `DELETE /admin/audit/api-keys/{id}`.
- Offices: `GET/POST/PUT/DELETE /admin/offices`, `POST /admin/offices/{id}/assign-teller`.

### 2026-06-12 (pre-ship hardening)

- **Rate limiting now ENFORCED -- behaviour change (all apps).** Endpoints can now return
  **`429 Too Many Requests`** (standard error envelope, `code: RATE_LIMIT_EXCEEDED`) with
  `X-RateLimit-Limit` / `X-RateLimit-Remaining` / `Retry-After` headers. Limits: login / 2FA /
  forgot-password / reset-password = **5 per 15 min per IP**; OTP steps (`/auth/register/initiate`,
  `/register/verify-otp`, `/register/verify-email`) = **3 per 10 min**; send / onramp / offramp /
  teller send (`POST .../send`, `.../initiate`, `/teller/transactions/create`) = **20 per min per
  user**; all other API endpoints = **100 per min per user/IP**. **What to do:** handle 429 gracefully
  (show "please wait and retry", respect `Retry-After`); don't hammer login/OTP. The TransFi webhook is
  exempt.
- **Failed payout now holds instead of failing -- behaviour change (all apps).** When a transfer's
  payout fails **after** the sender's funds were already collected (remittance payin settled, or teller
  cash taken), the transaction now moves to **`ON_HOLD`** (not `FAILED`) so the held funds are tracked
  and a refund can be actioned. **What to do:** treat `ON_HOLD` on a previously-`PROCESSING` transfer as
  "under review / refund pending", not a hard failure. (A payin/onramp/offramp failure with nothing
  collected still goes to `FAILED` as before.)

### 2026-06-12

- **New mobile endpoints -- non-breaking (mobile).** `GET /transactions/{reference}/tracking` returns an
  ordered lifecycle timeline (created -> collection -> payout -> completed/failed); `GET
/transactions/{reference}/receipt` returns receipt data for a **COMPLETED** transaction (422 before
  then). See Part 12.
- **New admin endpoints -- non-breaking (admin).** Partner monitoring + corridor config:
  `GET /admin/partners`, `GET /admin/partners/health` (up/degraded/down + latency),
  `POST /admin/partners/{name}/test`; and `GET/POST /admin/config/corridors`,
  `PUT/DELETE /admin/config/corridors/{id}` (corridor matrix for the future routing layer).
- **New admin endpoint -- non-breaking (admin).** `POST /admin/transactions/{reference}/reverse`
  reverses a **COMPLETED** transaction on our books (compensating double-entry ledger + status
  `REVERSED`). TransFi has no programmatic refund, so the actual fund return is a support action; the
  `reason` is recorded. Idempotent. New transaction status `REVERSED` may appear in transaction lists.
- **Teller-assisted send + shift cash reconciliation -- non-breaking (teller).**
  `POST /teller/transactions/create` (needs `Idempotency-Key`; the customer must be KYC-approved; the
  payout is funded from our float) and `GET /teller/transactions/summary` (running cash position).
  `POST /teller/shifts/start` now accepts `opening_float` + `currency`; `POST /teller/shifts/end` accepts
  `declared_close` and returns the computed `expected_close` + `variance`. Creates a new transaction type
  `TELLER_SEND` (also visible in `GET /transactions` / `GET /admin/transactions`). Custodial cash-in/out
  to a wallet is **not** built (deferred). See Part 14.
- **New crypto endpoints -- non-breaking (mobile).** `/onramp/*` (buy crypto with fiat) and
  `/offramp/*` (sell crypto for fiat): `GET .../options`, `POST .../quote`, `POST .../initiate`
  (`Idempotency-Key` header required; KYC-approved users only), and `GET .../{reference}/status`.
  These create new transaction types `ONRAMP` / `OFFRAMP` that also appear in the normal
  `GET /transactions` history. Full walkthrough in **Part 18**.
- **`POST /transactions/quote` & `GET /exchange-rates` -- behaviour change (mobile).**
  From -> To: the `fee` field now reports **our platform fee** -- it previously carried TransFi's
  provider fee. New fields (additive, non-breaking): `platform_fee` (same value as `fee`),
  `provider_fee` (TransFi's fee, informational), and `total_cost` (what the sender pays =
  send amount + platform fee, in the send currency).
  Why: the fee-markup engine now applies our admin-configured markup to every quote.
  Frontend must: display `total_cost` as the amount the sender is charged and `platform_fee` as our
  fee; read `fee` as the platform fee (no longer the provider fee). For an `fx_markup` rule the fee is
  baked into the rate (recipient receives less) and `total_cost` equals the send amount.
- **New admin endpoints -- non-breaking.** `GET/POST /admin/config/fee-rules`,
  `PUT/DELETE /admin/config/fee-rules/{id}`, `PUT /admin/config/fee-rules/{id}/toggle`
  (admin / super-admin / finance roles). Configure fee/markup rules (fx_markup, flat, percentage,
  tiered, combo) at runtime -- no deployment. Replaces the previously-planned `/admin/fee-rules` paths.
- **In-app notifications now fire on real events -- non-breaking (mobile).** Transactions and KYC/KYB
  outcomes now generate in-app notifications, visible via the existing `GET /notifications` feed.
  Events covered: transfer **created** (awaiting checkout), **completed**, **failed**, **on-hold**;
  KYC/KYB **verified**, **unsuccessful**, **in-review**. Frontend must: nothing -- the notifications
  feed simply starts populating; optionally surface a badge/poll. (SMS/email dispatch is still a stub.)
- **`POST /auth/register/personal-info` -- BREAKING (mobile).**
  From -> To: `email` is now a **required** field on this step; the registration flow gained a
  new step and `next_step` changed from `account_type` -> **`verify_email`**.
  Why: TransFi requires a verified email to create the user; we now collect + verify it during signup.
  Frontend must: send `email` in personal-info, then call the new **`POST /auth/register/verify-email`**
  (`{registration_token, otp}`) before `account-type`. In dev the OTP is returned as `dev_otp`.
- **`POST /transactions/send` -- non-breaking (mobile).** Now accepts **`beneficiary_id`** (a saved
  beneficiary) as an alternative to the inline `beneficiary` object. Existing inline payloads still work.
- **New endpoints -- non-breaking.**
  - Mobile: `.../beneficiaries` (CRUD), `.../notifications` (+ `/{id}/read`, `/read-all`, `/preferences`),
    `GET /config/countries`, `GET /config/currencies`, public `GET /exchange-rates` (rate preview),
    `GET /dashboard/user`.
  - Teller: `GET /teller/dashboard`, `POST /teller/shifts/start|end`, `GET /teller/shifts/current`,
    `POST /teller/customers`.
  - Admin: `GET /admin/transactions` (+ `/{reference}`, `/hold`, `/release`),
    `GET /admin/kyc/applications`, `POST /admin/kyc/{id}/approve|reject`,
    `GET /admin/audit/logs`, `GET /admin/audit/failed-logins`, `GET /admin/config/limits`.
- **`POST /webhooks/transfi` -- server-to-server only (no frontend impact).** Signature header corrected
  to `X-Transfi-Hmac-Hash`; now rejects unsigned requests.

> Full request/response shapes for every endpoint above are in the live Swagger
> (`/swagger/index.html`). Detailed prose for the new endpoints is being added to the relevant
> sections of this guide (tracked in the handoff plan).

---

## Part 1 -- Authentication & Account Creation (User App)

These are the first endpoints any new user encounters. They must be called in sequence -- each step depends on the previous one.

### 1. `POST /auth/register/initiate`

The very first call a new user makes. They provide their phone number and country. The backend validates the phone, creates a "pending" account, and sends a 6-digit OTP to their phone. The response includes a `registration_token` -- a temporary session ID that must be passed to every subsequent registration step. Store this token locally until registration is complete.

### 2. `POST /auth/register/verify-otp`

The user types the OTP they received. Send the `registration_token` (from step 1) and the OTP code. If correct, the phone is marked as verified and the next step is unlocked. The token does not change -- keep using the same one.

### 3. `POST /auth/register/set-password`

The user creates their account password. Send the `registration_token` and the password (plus a confirmation copy). Password rules: minimum 12 characters, must include uppercase, lowercase, a number, and a special character. The backend also checks the password against known data breaches -- if it appears in a breach, it will be rejected and the user must choose a different one.

### 4. `POST /auth/register/personal-info`

The user fills in their personal details: first name, last name, date of birth (YYYY-MM-DD format), and gender. The user must be at least 18 years old -- the backend enforces this automatically. Send the `registration_token` with these fields.

### 5. `POST /auth/register/account-type`

The user selects whether their account is `individual` (personal) or `corporate` (business). This determines which profile type will be associated with their account. Send the `registration_token` and `account_type`.

### 6. `POST /auth/register/complete`

The final registration step. Send the `registration_token`. The backend activates the account, creates an internal accounting wallet, registers the user transparently with our financial partner (TransFi -- this is invisible to the user and requires no extra action), and returns a full set of tokens (access token + refresh token) along with the user's profile data. From this point on, the user is fully logged in.

**Note for frontend:** The financial partner registration is done silently in the background. You do not need to handle it -- just store the tokens and take the user to their home screen.

---

## Part 2 -- Login

### 7. `POST /auth/login`

Standard login. The user provides their email or phone number, password, and which app they're logging into (`app_context`: `user`, `teller`, or `admin`). If the credentials are correct and 2FA is not enabled, the response contains the access token and refresh token immediately. If 2FA is enabled, the response will say `requires_2fa: true` and include a `temp_token` -- the user must complete step 8 before they get their access token.

**Important:** The `app_context` field acts as a security gate. A regular user cannot log into the teller or admin app. If they try, the login is silently rejected with "Access denied" (no details given, for security reasons).

### 8. `POST /auth/login/2fa`

Only called if step 7 returned `requires_2fa: true`. The user sends their `temp_token` and a 6-digit 2FA code. The code can come from their authenticator app (TOTP), an SMS code, or a backup code. On success, returns the same access token + refresh token as a normal login.

### 9. `POST /auth/refresh`

Access tokens expire after 15 minutes. When a request fails with 401, call this endpoint with the `refresh_token` to get a new access token without making the user log in again. The old refresh token is invalidated and a new one is issued -- always update both tokens in local storage. The refresh token itself lasts 30 days.

---

## Part 3 -- Password Management

### 10. `POST /auth/forgot-password`

The user provides their email or phone. The backend sends a reset OTP to that contact. The response is always a success message even if the identifier is not found -- this is intentional to prevent attackers from discovering which accounts exist.

### 11. `POST /auth/reset-password`

The user provides their identifier (email/phone), the OTP from the reset message, and their new password. On success, all existing sessions are revoked -- the user must log in again on all devices.

### 12. `POST /auth/change-password` _(protected)_

For logged-in users who want to change their password. They provide their current password and the new one. On success, all sessions on all devices are revoked for security.

---

## Part 4 -- Two-Factor Authentication (2FA)

### 13. `POST /auth/2fa/totp/setup` _(protected)_

Starts the process of enabling authenticator-app 2FA. Returns a QR code image (base64 PNG) and a text secret. Show the QR code to the user -- they scan it with an app like Google Authenticator. The setup is not complete until step 14 is called.

### 14. `POST /auth/2fa/totp/confirm` _(protected)_

The user enters the 6-digit code from their authenticator app to prove the setup worked. On success, 2FA is activated and 8 single-use backup codes are returned. Show these backup codes to the user exactly once and instruct them to save them somewhere safe -- they cannot be retrieved again.

### 15. `POST /auth/2fa/totp/disable` _(protected)_

Disables 2FA. Requires both the current password and a valid authenticator code to prevent someone else from turning off 2FA without the user's knowledge.

---

## Part 5 -- Session Management

### 16. `GET /auth/sessions` _(protected)_

Returns a list of all active login sessions for the user, showing the device name, operating system, IP address, and when each session was last used. One session will be marked as `is_current: true`.

### 17. `DELETE /auth/sessions/:id` _(protected)_

Remotely logs out a specific session (e.g., the user sees an unfamiliar device and wants to remove it). Calling this revokes the refresh token for that session.

### 18. `POST /auth/logout` _(protected)_

Logs out the current session only. Invalidates the current refresh token and flags the session as revoked.

### 19. `POST /auth/logout-all` _(protected)_

Logs out all sessions on all devices simultaneously -- useful if the user thinks their account has been compromised.

---

## Part 6 -- User Profile

These endpoints are for users to view and update their own information after logging in.

### 20. `GET /users/me` _(protected)_

Returns the complete profile of the currently logged-in user -- account details, verification status, KYC tier, and their associated profile document (individual or corporate). This is the "who am I" endpoint -- call it right after login to populate the app with user data.

### 21. `GET /users/me/completion` _(protected)_

Returns a percentage (0-100) showing how complete the user's profile is, plus a list of missing fields and a note about what they need to do to reach the next KYC tier. Use this to show a "complete your profile" prompt in the app.

### 22. `POST /users/me/avatar` _(protected)_

Uploads a profile photo. Send as `multipart/form-data` with the file in a field named `avatar`. Accepted formats: JPEG, PNG, WebP. Maximum size: 5 MB. Returns the URL of the stored image.

### 23. `PUT /users/me/profile` _(protected -- individual users only)_

Updates the individual user's profile details: ID type and number, ID expiry, nationality, place of birth, address, occupation, employer, source of funds, and PEP (politically exposed person) status. Only fields that are provided are updated -- you can send just one field at a time.

**Once identity verification has been passed (or while documents are under review), the identity fields are LOCKED** -- id_type, id_number, id_country, nationality and place_of_birth return `422 IDENTITY_LOCKED` if you try to CHANGE them (re-sending the same value is fine, so you can keep PUTting the whole form). `id_expiry` may only move to a later date; `pep` may be switched on but not off. Address, occupation, employer and source of funds stay editable. `GET /users/me` returns `identity_locked` and `locked_fields` so you can grey the right inputs out. Corrections go through Syka support. See the 2026-09-20 change-log entry.

---

## Part 7 -- Corporate Profile (Business Accounts Only)

These endpoints are only for users who selected `corporate` as their account type.

### 24. `GET /users/me/corporate` _(protected)_

Returns the company profile: company name, registration number, country, business type, registered and operating addresses, and lists of directors and beneficial owners.

### 25. `PUT /users/me/corporate` _(protected)_

Updates the company profile details -- company name, registration number, country, registration date, business type, industry, website, tax ID, and both addresses.

**After the business is verified, the registered identity is LOCKED** -- company name, registration number, registration country, registration date, business type and tax ID return `422 IDENTITY_LOCKED` on a change (an unchanged echo is fine). Trading name, industry, website and both addresses stay editable.

### 26. `POST /users/me/corporate/directors` _(protected)_

Adds a company director to the profile. Provide the director's name, nationality, date of birth, ID type and number, and their role (e.g., CEO, Director). Each director gets a unique ID that is used to update or remove them later.

**On a VERIFIED business, adding, changing or removing a director or beneficial owner is allowed but pauses sending**: the change is recorded and the account gets an identity review, so payments return `422 IDENTITY_REVIEW_REQUIRED` until a compliance officer clears it. Ownership is exactly what business verification checks, and it legitimately changes -- so it is reviewed rather than frozen.

### 27. `PUT /users/me/corporate/directors/:director_id` _(protected)_

Updates a specific director's details. Use the `director_id` returned when the director was added.

### 28. `DELETE /users/me/corporate/directors/:director_id` _(protected)_

Removes a director from the company profile.

### 29. `POST /users/me/corporate/ubos` _(protected)_

Adds an Ultimate Beneficial Owner (UBO) -- a person who owns 25% or more of the company. Provide their name, nationality, date of birth, ownership percentage, and whether they are a politically exposed person. UBOs are a regulatory requirement for corporate KYB.

### 30. `DELETE /users/me/corporate/ubos/:ubo_id` _(protected)_

Removes a UBO from the company profile.

---

## Part 8 -- Admin: User Management

These endpoints are only accessible to admin users (logged in with `app_context: admin`).

### 31. `GET /admin/users` _(admin only)_

Returns a paginated list of all users on the platform. Supports filtering by account type, status, KYC status, KYC tier, country, and free-text search (email, phone, or name). Supports sorting and pagination via query parameters.

### 32. `GET /admin/users/:user_id` _(admin only)_

Returns the full details of a specific user including their profile, KYC tier, status, and any admin notes attached to the account.

### 33. `PUT /admin/users/:user_id/status` _(admin only)_

Changes a user's account status to `active`, `suspended`, `frozen`, or `closed`. A reason must be provided and is stored in the audit log.

### 34. `PUT /admin/users/:user_id/kyc-tier` _(admin/super-admin only)_

Manually overrides a user's KYC tier and status. Used by compliance officers to approve or reject KYC applications, or by admins to make exceptions.

### 35. `GET /admin/users/:user_id/notes` _(admin only)_

Returns all internal notes that admins have written about this user. Notes are never visible to the user themselves.

### 36. `POST /admin/users/:user_id/notes` _(admin only)_

Adds an internal note to a user's account. Useful for compliance officers and support agents to document decisions or observations.

### 37. `POST /admin/users/tellers` _(admin/super-admin only)_

Creates a new teller account. Tellers cannot self-register -- they can only be created by an admin. The response includes a one-time temporary password that must be communicated to the teller securely (e.g., via a secure internal message). The teller must change this password on first login.

Optional `role`: `TELLER` (default) or `TELLER_SUPERVISOR`; anything else is rejected with `400`. The response echoes the `role` that was created. !! `TELLER_SUPERVISOR` currently has exactly the same access as `TELLER` -- it is a reporting label, not an extra permission set.

---

## Part 9 -- Health Check

### 38. `GET /health` _(public, no auth)_

Returns the live status of all backend dependencies -- MongoDB and Redis. Responds with `"status": "ok"` when both are up, or `"status": "degraded"` if either is down. Use this in your app's startup sequence to check if the backend is reachable before making any API calls.

---

## Part 10 -- KYC / KYB Verification

**How KYC works:** When a user needs to verify their identity, the backend generates a hosted verification URL provided by our KYC partner (Sumsub, via TransFi). Open this URL in a WebView or browser -- the user submits their documents there. When complete, TransFi fires a webhook to the backend and the user's KYC tier is updated automatically. **The app never handles documents or identity data directly.**

**Individual users** use `/kyc/` endpoints (Tier 1 and Tier 2).  
**Corporate accounts** use `/kyb/` endpoints (Standard and Advanced).

### 39. `GET /kyc/status` _(protected)_

Returns the user's current KYC state. Call this on the profile/verification screen and again after the user closes the WebView to show the updated result.

```
Response fields:
  kyc_tier:         0-4         <- current verified tier
  kyc_status:       "not_started" | "in_progress" | "pending_review" | "approved" | "rejected"
  next_action:      "initiate_kyc_tier1" | "awaiting_verification" | "awaiting_review" |
                    "resubmit_kyc" | "kyc_tier1_complete" | "kyc_complete"
  has_transfi_user: true/false  <- must be true before KYC can start
```

### 40. `POST /kyc/tier1/initiate` _(protected -- individual only)_

Starts Tier 1 identity verification (government ID + selfie liveness check). Returns a `verify_url` hosted by Sumsub. Open this in a WebView or browser. When the user completes (or abandons) verification, close the WebView and re-fetch `/kyc/status`.

```
Response:
  verify_url:  "https://sumsub.com/..."   <- open in WebView
  expires_in:  "12h"
  message:     "Open the verify_url to complete your identity verification."
```

**Possible errors:**

- `409 KYC_ALREADY_IN_PROGRESS` -- a verification is already running; do not re-initiate, just show current status
- `422 PARTNER_NOT_REGISTERED` -- TransFi registration is still completing (try again in a few seconds)
- `422 USE_KYB_ENDPOINT` -- this is a corporate account; use `/kyb/standard/initiate` instead

### 41. `POST /kyc/tier2/initiate` _(protected -- individual only)_

Starts Tier 2 enhanced verification. Same response shape as Tier 1. Only available after Tier 1 is approved (`kyc_tier >= 1`).

### 42. `POST /kyb/standard/initiate` _(protected -- corporate only)_

Starts standard KYB (business verification Level 1) -- incorporates company documents, directors, and UBO identities. Returns a `verify_url`. Corporate accounts only.

### 43. `POST /kyb/advanced/initiate` _(protected -- corporate only)_

Starts advanced KYB (Level 2) -- deeper compliance and financial verification. Only available after standard KYB is approved. Returns a `verify_url`.

**KYC flow for the UI:**

1. Call `GET /kyc/status` -- check `next_action`
2. If `initiate_kyc_tier1` -> call `POST /kyc/tier1/initiate` -> open `verify_url` in WebView
3. When user closes WebView -> call `GET /kyc/status` again
4. If `kyc_status` is still `in_progress` -> show "Verification in progress -- we'll notify you" screen (result can take up to 60 seconds via webhook)
5. If `kyc_status` is `approved` -> show success, unlock next features

---

## Part 11 -- Wallets

**Note:** In the MVP, each user has a single virtual fiat wallet created automatically at registration, in their home currency. **The balance is permanently `0.00`.** There is therefore no wallet-to-wallet currency conversion and cannot be one -- see "Why there is no wallet-to-wallet conversion" near the top of this guide for what to build a conversion screen on instead. No code path credits or debits a user wallet -- `CreditWallet`/`DebitWallet` exist but have no callers -- and `GET /wallets/{currency}/ledger` returns an empty list, because the double-entry ledger posts against internal settlement accounts rather than user wallets. Users never see stablecoins here. **Do not build balance-dependent UI on this field:** no "insufficient funds" gating, no top-up affordance, no spendable-balance display. Money movement happens through TransFi's checkout flow (see Part 12); Syka never holds customer funds.

### 44. `GET /wallets` _(protected)_

Returns all wallets for the authenticated user. Currently one wallet per user, in their home currency (determined by country at registration).

```
Response (array):
  id:          "abc123"
  currency:    "USD"
  balance:     "0.00"      <- string, not number (avoid float precision issues).
                              ALWAYS "0.00" -- see the note above.
  is_primary:  true
  status:      "active"
  created_at:  "2026-05-19T10:00:00Z"
```

### 45. `GET /wallets/:currency` _(protected)_

Returns the wallet for a specific currency (e.g., `GET /wallets/USD`). Returns 404 if no wallet exists for that currency.

### 46. `GET /wallets/:currency/ledger` _(protected)_

Returns a paginated credit/debit history for the specified wallet. Use this for the transaction history / account statement screen.

```
Query params:  ?page=1&limit=20
Response (array of entries):
  id:              "entry123"
  entry_type:      "debit" | "credit"
  amount:          "100.00"
  currency:        "USD"
  description:     "Sent to Jane Doe"
  running_balance: "150.00"    <- balance after this entry
  reference:       "TX-abc789"
  created_at:      "2026-05-19T10:00:00Z"
```

**Note on balance values:** All monetary amounts are returned as strings (e.g., `"250.00"`) to avoid floating-point precision issues on the frontend. Parse with your platform's decimal library, not `parseFloat`.

---

## Part 12 -- Sending Money (Transactions) _(coming soon -- Phase 3)_

This is the core of the app -- the flow that happens when a user sends money internationally. The flow has two stages: **quote** (see the rate and fees) then **send** (commit the transaction).

### How the payment flow works

When a user sends money, they do not pay the app directly. Instead:

1. The app gets a quote and the user confirms
2. The backend creates a payment order and returns a `checkout_url`
3. The user's app opens this URL (in a WebView or browser redirect) -- this is the payment page hosted by our financial partner (TransFi)
4. The user pays via their local method (bank transfer, mobile money, card, etc.) on that page
5. The backend is notified via webhook that payment is received
6. The money is automatically forwarded to the recipient
7. The user and recipient both get a notification

**The app never handles actual payment details** -- card numbers, bank account details, etc. are all captured by TransFi's secure hosted page.

### 47. `POST /transactions/quote` _(protected)_

Prices a send and locks the rate. The response carries the exchange rate, our platform fee, what the
recipient receives, and a `quote_id` valid for **~90 seconds** -- pass it to `/transactions/send`.
Always show this to the user before they confirm. (Unauthenticated? Use `GET /exchange-rates` for a
preview; it issues no `quote_id` and cannot be sent.)

```jsonc
{
  "send_currency": "GHS",
  "receive_currency": "USD",

  // Provide EXACTLY ONE of these:
  "send_amount": "100.00", // price by what the sender pays
  // "receive_amount": "13.00",   // or price so the recipient gets exactly this

  // Optional rails. Passing send_payment_* prices the collection leg on the rail
  // actually charged AND locks the quote to it -- see section 48.
  "send_payment_code": "mtn", // deposit rail  (how the SENDER pays)
  "send_payment_type": "local_wallet",
  "receive_payment_code": "ach", // withdraw rail (how the RECIPIENT is paid)
  "receive_payment_type": "bank_transfer",
}
```

```
Response:
  quote_id          "QT-..."          <- pass this to /transactions/send
  send_amount       / send_currency
  receive_amount    / receive_currency  <- what the recipient gets
  rate                                  <- receive per 1 unit sent, includes our FX markup
  fee / platform_fee                    <- OUR fee, in the send currency
  provider_fee, provider_fee_payin, provider_fee_payout
                                        <- what the provider charges US; already netted
                                          into the amounts, never added on top. Display only.
  total_cost                            <- what the sender actually pays
  expires_at
```

!! `settle_currency` / `settle_amount` are the internal stablecoin leg. Never show them to a user --
the crypto rail is invisible by design.

### 48. `POST /transactions/send` _(protected)_

Creates a send transaction and returns the checkout URL for the user to complete payment. Requires an `Idempotency-Key` header -- a UUID you generate fresh for each new send attempt.

**Two payment rails, don't mix them up.** `send_payment_*` is how the **sender pays you**;
`beneficiary.payment_*` is how the **recipient is paid**. Both come from
`GET /config/payment-methods` -- with `direction=deposit` for the sender and `direction=withdraw`
for the recipient.

```jsonc
Header:  Idempotency-Key: <new UUID>
Body:
{
  "quote_id":          "QT-abc123",          // from POST /transactions/quote (~90s TTL)
  "purpose_code":      "friends_and_family_transfer",  // GET /config/purpose-codes

  // How the SENDER funds it -- direction=deposit, currency = send_currency.
  "send_payment_type": "local_wallet",       // REQUIRED  (method.type)
  "send_payment_code": "mtn",                // optional  (method.code)

  // The recipient: EITHER a saved beneficiary...
  "beneficiary_id":    "665f...",
  // ...OR an inline one (direction=withdraw, currency = receive_currency):
  "beneficiary": {
    "name":            "Jane Doe",
    "type":            "individual",         // or "business"
    "country":         "GH",                 // ISO alpha-2
    "payment_code":    "mtn",
    "payment_type":    "local_wallet",       // bank_transfer | card | local_wallet
    "payout_details":  { "firstName": "Jane", "lastName": "Doe", "phone": "...", "phoneCode": "+233" }
  }
}
```

`payout_details` is corridor-specific -- build it from the chosen method's `fields` (see the typed
schema note in this guide), not from a fixed list.

```
Response (201):
  reference:         "TX-xyz789"
  status:            "PENDING"
  checkout_url:      "https://.../pay?paytoken=..."   <- open this in a WebView
  send_amount / receive_amount / fee / total_cost
```

**After opening the checkout URL:** The user completes payment on TransFi's page. When they're done (or if they abandon), close the WebView. The transaction status is updated automatically by the backend -- no polling needed. Re-fetch the transaction to show current status.

### 49. `GET /transactions` _(protected)_

Returns the user's transaction history (paginated). Supports filtering by status, date range, and currency. Use this for the transaction history / activity screen.

### 50. `GET /transactions/{reference}` _(protected)_

Returns full details of a single transaction including status, amounts, recipient, and fees. Use this for the transaction detail screen and to check if a pending transaction has completed.

**Transaction statuses:**

- `INITIATED` -- transaction created, awaiting payment
- `PENDING` -- payment received, processing
- `PROCESSING` -- payout to recipient in progress
- `COMPLETED` -- recipient received funds [x]
- `FAILED` -- transaction failed; refund initiated
- `ON_HOLD` -- held by compliance for review
- `REVERSED` -- reversed by an admin (compensating ledger; refund handled by support)

### 50a. `GET /transactions/{reference}/tracking` _(protected)_

Returns an **ordered lifecycle timeline** for the transaction (each event has `status`, a human `label`, and `at` timestamp): created -> payment collection started/settled -> payout started/settled -> completed/failed. Use this to render a step tracker on the transaction screen.

### 51. `GET /transactions/{reference}/receipt` _(protected)_

Returns the receipt data (reference, amounts, fee, rate, recipient, date) for a **COMPLETED** transaction -- for the "download/share receipt" feature. Returns **422** if the transaction is not yet completed. PDF rendering is a frontend concern; this returns the structured fields.

### 52. `POST /transactions/{reference}/cancel` _(protected)_ -- **(coming soon)**

Will cancel a transaction still in `INITIATED` status (before the user has paid). Not yet deployed.

---

## Part 13 -- Beneficiaries (Saved Recipients) _(coming soon -- Phase 3)_

### 53. `GET /beneficiaries` _(protected)_

Returns the user's saved recipients. Use this to populate a "Send again" or "Saved contacts" list.

### 54. `POST /beneficiaries` _(protected)_

Saves a recipient for future use -- name, country, delivery method, and payment details (bank account, mobile number, etc.).

### 55. `GET /beneficiaries/:id` _(protected)_

Returns details for a specific saved recipient.

### 56. `PUT /beneficiaries/:id` _(protected)_

Updates a saved recipient's details.

### 57. `DELETE /beneficiaries/:id` _(protected)_

Removes a saved recipient.

---

## Part 14 -- Teller App: Send Money on Behalf of Customer _(live)_

These endpoints are **only for the Teller App** (`app_context: teller`, role `TELLER` or
`TELLER_SUPERVISOR`). They are NOT for the User App.

**How teller transactions differ:** when a customer walks into a physical office they pay cash to the
teller. The teller records it; the backend pays the recipient from our **pre-funded TransFi float** (no
online checkout -- there is no payin leg). The cash stays in the office drawer and later reimburses the
float. **The customer is the sender of record and must be KYC-approved** (create + verify them first --
see Part 8 and the KYC flow). Cash deposits to a _customer wallet_ (custodial top-up) are not part of
this wave.

### 58. `POST /teller/shifts/start` _(teller only)_

Opens the teller's shift and cash drawer. Body (optional): `opening_float` (starting cash) and
`currency`. Required before any teller transaction. Returns the shift, including its `id`.

### 59. `POST /teller/transactions/create` _(teller only -- needs `Idempotency-Key` header)_

Sends money on behalf of a walk-in customer who paid cash. The backend prices the corridor (with our
fee), creates a `TELLER_SEND` transaction with a **payout leg funded from our float**, and records the
cash against the teller's open shift. The recipient is paid once the payout settles (driven by webhook,
like a normal send). The transaction also appears in `GET /transactions` and `GET /admin/transactions`.

```
Body:
  customer_user_id:  "665f...c12"        <- an existing, KYC-approved customer
  amount_received:   "200.00"            <- cash taken from the customer (send currency)
  send_currency:     "GHS"
  receive_currency:  "CAD"
  purpose_code:      "family_support"
  beneficiary: {                          <- same shape as a mobile send beneficiary
    name, type, country, payment_code, payment_type, payout_details{...}
  }

Errors: 422 KYC_REQUIRED (customer not verified), 422 NO_OPEN_SHIFT (start a shift first).
```

### 60. `GET /teller/transactions/summary` _(teller only)_

Returns the running cash position of the open shift: `opening_float`, `send_count`, `send_cash_total`,
and the `expected_close` (opening float + cash collected). Use it for end-of-day reconciliation.

### 61. `POST /teller/shifts/end` _(teller only)_

Closes the shift. Body: `declared_close` (the teller's counted cash). The backend computes
`expected_close` and `variance` (declared - expected) and stores them on the shift for the supervisor.

> **Deferred (not in this wave):** custodial cash-in / cash-out that credits or debits a customer wallet
> balance. Wallets remain non-custodial (pass-through) in the MVP.

---

## Part 15 -- Admin: Fee Rules _(live)_

These endpoints are only for the Admin App (admin / super-admin / finance roles). They let admins
control how the platform charges fees without any code deployment. A fee rule has **matchers**
(send/receive country + currency, user type -- all optional, blank = "any"), a **model**, and
**parameters**. The highest-priority active rule whose matchers all match a quote wins; if none match,
only the provider fee applies.

**Fee models:** `flat` (fixed `flat_amount`), `percentage` (`percentage`, e.g. `0.01` = 1%),
`combo` (flat + percentage), `tiered` (`tiers[]` of `{min_amount, max_amount, flat, percentage}`),
`fx_markup` (`markup_rate`, hidden in the rate -- the recipient receives slightly less). The first four
are charged **on top** (the sender's `total_cost` = send amount + fee); `fx_markup` is invisible in the
fee line and reflected in the quoted rate instead.

### 63. `GET /admin/config/fee-rules` _(admin only)_

Returns all fee rules (active and inactive), highest priority first -- the corridors, model, parameters,
priority, and active flag.

### 64. `POST /admin/config/fee-rules` _(admin only)_

Creates a new fee rule. Provide a `name`, optional matchers, a `model`, and the parameters for that
model. The rule takes effect immediately on the next transaction quote.

### 65. `PUT /admin/config/fee-rules/:id` _(admin only)_

Updates a fee rule (full replace of matchers, model, and parameters).

### 66. `PUT /admin/config/fee-rules/:id/toggle` _(admin only)_

Enables or disables a fee rule without deleting it. Body: `{ "active": true|false }`.

### 67. `DELETE /admin/config/fee-rules/:id` _(admin only)_

Permanently deletes a fee rule.

---

## Part 16 -- Admin: KYC Management _(coming soon -- Phase 2)_

### 68. `GET /admin/kyc/pending` _(compliance officer / admin)_

Returns a list of KYC/KYB applications that are in `manual_review` status and require a human decision.

### 69. `PUT /admin/kyc/:application_id/approve` _(compliance officer / admin)_

Approves a KYC/KYB application and upgrades the user's tier. A reason and approver ID are recorded in the audit log.

### 70. `PUT /admin/kyc/:application_id/reject` _(compliance officer / admin)_

Rejects a KYC/KYB application. A reason must be provided. The user receives a notification and can resubmit.

---

## Part 18 -- Onramp & Offramp (Buy & Sell Crypto) _(BUILT, DISABLED)_

!! **These routes are NOT mounted in the launch build.** They require
`ONRAMP_ENABLED=true`, which defaults to false (`cmd/api/main.go`). With the
flag off, every endpoint below returns **404**. The launch product is
fiat-in / fiat-out remittance only, and we tell partners and regulators that
end users never buy, sell or hold crypto -- that is only true while this is
off. Do not build UI against Part 18 without confirming the flag is on in the
environment you are targeting. Everything below is accurate for when it is.

These endpoints let a user **buy crypto with fiat** (onramp) or **sell crypto for fiat** (offramp)
directly -- separate from the fiat->fiat remittance flow. They are **KYC-gated**: the user must be active
with approved KYC (same gate as sending money). Like remittances, the app never handles the actual
payment -- the user pays on TransFi's hosted page (onramp) or sends crypto to a deposit address
(offramp), and the backend is driven to completion by webhooks.

**Crypto token codes:** the `crypto_currency` field is TransFi's token code (e.g. `USDCPOLYGON`,
`USDTTRON`). Always fetch valid codes from the `.../options` endpoint -- do not hardcode them.

### Onramp -- buy crypto

#### `GET /onramp/options` _(protected)_

Returns the fiat currencies the user can pay with and the crypto tokens/networks they can buy
(`fiat_currencies`, `crypto_tokens[]`). Use it to populate the buy screen's pickers.

#### `POST /onramp/quote` _(protected)_

Prices a purchase. Send `source_currency` (fiat), `source_amount`, `crypto_currency` (token code), and
optionally `network`, `payment_code`, `payment_type`. Returns `crypto_amount` (what they'll receive),
`rate`, `platform_fee`, `provider_fee`, and `total_cost` (what they pay). Preview only -- nothing is
created. Show this before they confirm.

#### `POST /onramp/initiate` _(protected -- needs `Idempotency-Key` header)_

Creates the order. Send the quote fields plus `wallet_address` (where the crypto is delivered) and a
`purpose_code`. The wallet address is sanity-checked per network. Returns a `checkout_url` -- open it in
a WebView for the user to pay the fiat. When payment settles, TransFi delivers the crypto to the wallet
and the backend marks the order `COMPLETED` (the user gets an in-app notification). No polling needed.

#### `GET /onramp/{reference}/status` _(protected)_

Returns the order's current status (`INITIATED` -> `PENDING` -> `COMPLETED` / `FAILED`).

### Offramp -- sell crypto

#### `GET /offramp/options` _(protected)_

Returns the crypto tokens the user can sell and the fiat currencies they can receive.

#### `POST /offramp/quote` _(protected)_

Prices a sale. Send `crypto_currency` (token), `crypto_amount` (what they'll send), `dest_currency`
(fiat), and optionally `payment_code`, `payment_type`. Returns `dest_amount` (fiat they receive, after
our fee), `rate`, `platform_fee`, `provider_fee`.

#### `POST /offramp/initiate` _(protected -- needs `Idempotency-Key` header)_

Creates the order. Send the quote fields plus `recipient_details` (the bank fields for the fiat payout --
fetch the required set from the payment-methods config) and a `purpose_code`. Returns a
`deposit_address` and `deposit_amount` -- the user must send that much crypto to that address. Once the
crypto arrives, TransFi pays the fiat and the backend marks the order `COMPLETED`.

#### `GET /offramp/{reference}/status` _(protected)_

Same status shape as onramp.

**How the fee works (both):** explicit fees (flat/percentage/combo/tiered) are charged on top for
onramp (the buyer's `total_cost` = fiat + fee); for offramp and for `fx_markup` rules the fee is taken
from the output (the user receives slightly less crypto/fiat). All of this is reflected in the quote
before the user confirms.

---

## Part 19 -- Merchant App (`/api/v1/merchant/*`) _(live)_

For channel-partner staff serving **their own** customers, individual or corporate. Log in with
`app_context: "merchant"`; the account will be `MERCHANT_STAFF` or `MERCHANT_MANAGER`.

Everything below is scoped to the caller's own merchant. Another merchant's customer, payment,
branch, staff member or approval returns **404** -- not 403, so ids cannot be probed.

### Getting set up (2026-10-01)

| Method | Path                          | Notes                                                       |
| ------ | ----------------------------- | ----------------------------------------------------------- |
| GET    | `/merchant/onboarding`        | Setup checklist. Read `can_transact` as well as `completed` |
| GET    | `/merchant/profile`           | The organisation's own record, including `referral_code`    |
| GET    | `/merchant/roles`             | The two roles and their permissions                         |
| POST   | `/merchant/staff`             | **Manager.** Invite a team member; temp password shown once |
| GET    | `/merchant/settings/controls` | Approval thresholds + the range they may be set in          |
| PUT    | `/merchant/settings/controls` | **Manager.** The thresholds that gate every payment         |

Businesses apply to join at `/api/v1/merchant-applications/*` on the public website -- see the
change log. An administrator reviews and onboards them, which is what creates the first manager
login.

### Customers

| Method   | Path                                                   | Notes                                                                                                                                                                                                                                                                                                                                        |
| -------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET      | `/merchant/customers`                                  | `?q=&status=&type=&risk=&branch_id=&page=&limit=`. **`risk` filters the returned page only** -- risk ratings are in a separate database and the pagination total is unfiltered.                                                                                                                                                              |
| POST     | `/merchant/customers`                                  | Registers an individual OR a business in ONE body. `customer_type` defaults to `corporate`. Corporate: `business`, `registered_address`, `contact`, `directors[]`, `ubos[]`, `compliance`. Individual: `individual{country_code,dob}`, `registered_address`, `contact`, `compliance`. Mixing the two shapes is `400 CUSTOMER_TYPE_MISMATCH`. |
| GET      | `/merchant/customers/export`                           | `?format=csv\|xlsx`. Capped at 100,000 rows -- a larger export is refused, never truncated.                                                                                                                                                                                                                                                  |
| GET      | `/merchant/customers/{id}`                             | Profile, KYC/risk, limits with live usage, block state, payment rollup.                                                                                                                                                                                                                                                                      |
| PUT      | `/merchant/customers/{id}`                             | Only customers this merchant registered. A self-registered customer returns `403 CUSTOMER_NOT_EDITABLE`.                                                                                                                                                                                                                                     |
| POST     | `/merchant/customers/{id}/block`                       | **Manager.** `{blocked, reason}` -- a toggle, both directions need a reason.                                                                                                                                                                                                                                                                 |
| PUT      | `/merchant/customers/{id}/limits`                      | **Manager.** `{single_txn, daily, monthly, currency}` as decimal **strings**.                                                                                                                                                                                                                                                                |
| GET      | `/merchant/customers/{id}/transactions`                | Payments **with this merchant**, plus a rollup.                                                                                                                                                                                                                                                                                              |
| GET      | `/merchant/customers/{id}/activity`                    | This merchant's payments and notes, merged.                                                                                                                                                                                                                                                                                                  |
| GET/POST | `/merchant/customers/{id}/notes`                       | Append-only; the author's name is snapshotted.                                                                                                                                                                                                                                                                                               |
| GET/POST | `/merchant/customers/{id}/documents`                   | The merchant's OWN copies. Multipart, 10 MB, PDF/image/Word/Excel.                                                                                                                                                                                                                                                                           |
| GET      | `/merchant/customers/{id}/documents/{doc_id}/download` | 302 to a 15-minute signed link.                                                                                                                                                                                                                                                                                                              |
| POST     | `/merchant/customers/{id}/kyc-renewal-reminder`        | One, or many via `customer_ids[]`.                                                                                                                                                                                                                                                                                                           |

**Registration returns the temporary password once.** It is not retrievable afterwards. A director
or wallet that failed to save comes back in `warnings[]` rather than failing the whole registration.
If the payment provider was unreachable, `kyb.status` is `blocked_provider_registration` -- that
customer cannot transact until it is retried.

**Limits ARE enforced**, on this path only. `422 LIMIT_EXCEEDED` carries `limit_type`, `limit`,
`used`, `remaining`, `requested`, `currency` and `period`. Daily and monthly are calendar periods in
UTC. A payment awaiting checkout or approval already counts; a cancelled or rejected one gives the
headroom back. A ceiling set in a different currency from the payment is refused
(`422 LIMIT_CURRENCY_MISMATCH`), never ignored.

### Payments

```
POST /merchant/payments/quote          -> lock a rate for one customer (~90s)
POST /merchant/payments                -> read `action`; needs Idempotency-Key
POST /merchant/payments/security-check -> password re-auth for high-value payments
GET  /merchant/payments                -> ?status=&branch_id=&staff_id=&customer_id=&from=&to=
GET  /merchant/payments/{reference}    -> live processing stages (polls the provider)
GET  /merchant/payments/{reference}/receipt
```

`POST /merchant/payments` is a union -- **always read `action`**:

- **`processed`** (201) -- `payment.checkout_url` is the customer's checkout.
- **`queued_for_approval`** (202) -- waiting on a manager. No funds, no checkout yet.
- **`security_check_required`** (200) -- nothing was written. Call `/payments/security-check` with
  the staff member's password, then resubmit the identical request with the returned
  `security_token`. The token is single-use, expires in 5 minutes, and is bound to that exact
  customer and quote.

Refusals are NOT in the union: `422 AMOUNT_BLOCKED`, `422 LIMIT_EXCEEDED`, `403 CUSTOMER_BLOCKED`.

`GET /merchant/payments/{reference}` also asks the provider for the order's true state when the
payment is unfinished and has not been checked in the last 20 seconds -- so a payment whose webhook
was lost still advances for whoever is watching it.

### Approvals

```
GET  /merchant/approvals              -> ?status=&branch_id= plus per-status counts
GET  /merchant/approvals/{id}         -> detail + `blocked_by` + `stale`
POST /merchant/approvals/{id}/approve       (manager)
POST /merchant/approvals/{id}/reject        (manager, notes >= 5 chars)
POST /merchant/approvals/{id}/request-info  (manager, decides nothing)
```

`pending` and `info_requested` are both **open** -- asking the submitter a question does not decide
the payment, and it can still be approved afterwards.

Two fields on the detail your UI must handle:

- **`blocked_by: ["compliance"]`** -- Syka is also holding this payment. Approving records the
  decision but the payment stays `ON_HOLD` until Syka's review clears it.
- **`stale: true`** -- the locked rate has aged past the merchant's approval window. Approving
  returns `422 QUOTE_TOO_STALE`; the staff member must submit the payment again at the current rate.

Two managers deciding at once is safe: one wins, the other gets `409 ALREADY_DECIDED`. A rejection
**cancels** the payment (no money was collected) and returns the customer's limit headroom.

### Reports

Seven fixed reports plus an export, all sharing `?from=&to=&period=&branch_id=&staff_id=`:

```
GET /merchant/reports/transaction-summary
GET /merchant/reports/customer-activity
GET /merchant/reports/performance?staffId=
GET /merchant/reports/revenue?period=&branch=
GET /merchant/reports/trend-analysis
GET /merchant/reports/branch-performance      (manager)
GET /merchant/reports/compliance
GET /merchant/reports/{type}/export?format=csv|xlsx|pdf
```

Money columns are **USDC settled amounts** -- the only unit that can be added across corridors. Send
volumes are listed per currency and never summed together. Settled and fee figures count only
completed payments. The window defaults to the current calendar month and may not exceed 366 days;
an over-long window is refused, never truncated.

**Custom reports:**

```
GET  /merchant/reports/templates          -> saved templates + schedules + the OPTIONS CATALOGUE
POST /merchant/reports/templates          -> save {name, config}
POST /merchant/reports/custom/generate    -> {metrics[], group_by[], filters{}, from, to, output_format}
POST /merchant/reports/custom/schedule    -> {name, template_id|config, format, frequency, recipients[]}
```

Build your picker from the `options` block of `GET /reports/templates` -- it is generated from the
same tables the server validates against, so it cannot offer something the server rejects. It also
carries the limits (2 groupings, 6 metrics, 5,000 rows, 366 days). An unrecognised metric,
grouping or filter is a **400**, never ignored: silently dropping a filter would return _more_ than
you asked for.

Scheduled runs cover the period that has just **closed** -- a daily report delivered on the 5th
covers the 4th -- so a delivered figure never changes afterwards.

### Organisation

```
GET /merchant/branches            -> ?include_inactive=true
GET /merchant/staff               -> ?branch_id=
GET /merchant/dashboard/manager   (manager)
```

Branches and staff accounts are created by **Syka**, not from this app
(`POST /admin/merchants/{id}/branches`, `POST /admin/merchants/{id}/staff`). A merchant with no
branches works fine -- its customers and payments are simply recorded without one and report as
"unattributed".

---

## Part 17 -- Webhook Setup (DevOps Only)

This is **not a frontend endpoint** -- it is a server-to-server callback used by our financial partner (TransFi) to notify us of events. Frontend developers do not call this.

### `POST /webhooks/transfi` _(no auth -- public, secured by HMAC signature)_

TransFi calls this endpoint when payment or KYC events occur (e.g., "payment received", "KYC approved", "transfer sent"). The backend validates the signature, acknowledges immediately, and processes the event asynchronously.

**For DevOps:** Configure this URL in the TransFi dashboard (Settings -> Integration): `https://your-domain.com/api/v1/webhooks/transfi`. Also set the webhook secret in `TRANSFI_WEBHOOK_SECRET`.

---

## Key Concepts for Frontend Developers

**Access token vs Refresh token:**  
After login, you receive two tokens. The access token is short-lived (15 minutes) and goes in every API request header. The refresh token is long-lived (30 days) and is only used to get a new access token when the old one expires. Never send the refresh token in regular API calls.

**app_context:**  
Every login must specify which app the user is logging into: `user` (mobile app), `teller` (desktop app), `admin` (web app), or `merchant` (channel-partner app). Using the wrong context will cause the login to fail -- this is a security feature, not a bug. A merchant account can only ever reach `/api/v1/merchant/*`, and every request it makes is additionally scoped to that merchant's own customers, payments and reports.

**KYC tier:**  
Each user has a KYC tier (0-4) that controls what they can do on the platform. Tier 0 is the bare minimum (phone verified). Higher tiers unlock higher transaction limits. When a user tries to do something that requires a higher tier, the API returns a **422** -- either `KYC_TIER_INSUFFICIENT` (with a `details` object containing `current_tier` and `required_tier`) or `KYC_UPGRADE_REQUIRED`. Use these to show a "verify your identity" prompt and redirect to the KYC flow.

**How money moves -- the payment flow:**  
When a user initiates a send, they do NOT pay the Syka app. Instead, our backend generates a checkout URL hosted by our financial partner (TransFi). The user pays on that page. The money goes directly to TransFi -- we never handle the funds. This means: (a) you don't need to build a payment form, (b) the app just needs to open the checkout URL in a WebView, and (c) you can trust that the payment is secure because it is handled by a regulated entity.

**Transaction quote TTL:**  
Exchange rates change constantly. When you get a quote (`GET /transactions/quote`), it is valid for 90 seconds. If the user takes longer than 90 seconds to confirm, the quote expires and you must re-fetch it before proceeding. Show a countdown timer on the confirmation screen. (This paragraph said 60 seconds until 2026-09-09 and was wrong -- a timer built on it expired 30s early. The authoritative value is `quoteTTL` in `internal/transaction/service.go`, and the `expires_at` on the quote response is always the real deadline: prefer it over any hardcoded number.)

**Idempotency:**  
Payment endpoints (`POST /transactions/send`) require an `Idempotency-Key` header -- a UUID you generate on the frontend. If the same request is sent twice (e.g., because the user tapped "Send" twice or the connection dropped and retried), the backend returns the original response instead of creating a duplicate transaction. Generate a fresh UUID for each new send attempt. Reuse the same UUID if you are retrying a failed network request for the same attempt.

**Error format:**  
All errors follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_OTP",
    "message": "The OTP provided is incorrect or has expired"
  }
}
```

Use the `code` field in your code (it never changes). Use the `message` field to display to the user (it may be updated). Common codes to handle:

- `KYC_UPGRADE_REQUIRED` -- user needs to verify identity; show KYC prompt
- `QUOTE_EXPIRED` -- re-fetch the quote and show user the new rate
- `INSUFFICIENT_BALANCE` -- user's balance is too low; show top-up prompt
- `VELOCITY_LIMIT` -- unusual activity detected; show "try again in 24 hours" message
- `MANUAL_REVIEW` -- transaction under compliance review; show "we'll notify you" screen
