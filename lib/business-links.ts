const optionalUrl = (value: string | undefined) => value?.trim() || undefined;

export const personalLinks = {
  signup: optionalUrl(
    process.env.NEXT_PUBLIC_SYKA_PERSONAL_SIGNUP_URL ?? process.env.NEXT_PUBLIC_SYKA_SIGNUP_URL,
  ),
};

export const businessLinks = {
  signup: "/business/merchant/registration",
  sales: optionalUrl(process.env.NEXT_PUBLIC_SYKA_SALES_URL) ?? "mailto:support@sykabank.com",
  googlePlay: optionalUrl(process.env.NEXT_PUBLIC_SYKA_GOOGLE_PLAY_URL),
  appStore: optionalUrl(process.env.NEXT_PUBLIC_SYKA_APP_STORE_URL),
  docs: optionalUrl(process.env.NEXT_PUBLIC_SYKA_DOCS_URL),
};

export const companyLinks = {
  about: optionalUrl(process.env.NEXT_PUBLIC_SYKA_ABOUT_URL),
  blog: optionalUrl(process.env.NEXT_PUBLIC_SYKA_BLOG_URL),
  press: optionalUrl(process.env.NEXT_PUBLIC_SYKA_PRESS_URL),
  careers: optionalUrl(process.env.NEXT_PUBLIC_SYKA_CAREERS_URL),
  community: optionalUrl(process.env.NEXT_PUBLIC_SYKA_COMMUNITY_URL),
};

export const transparencyLinks = {
  terms: optionalUrl(process.env.NEXT_PUBLIC_SYKA_TERMS_URL),
  privacy: optionalUrl(process.env.NEXT_PUBLIC_SYKA_PRIVACY_URL),
  cookies: optionalUrl(process.env.NEXT_PUBLIC_SYKA_COOKIE_URL),
};
