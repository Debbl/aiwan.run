// eslint-disable-next-line n/prefer-global/process
export const CWD = process.cwd()
// eslint-disable-next-line n/prefer-global/process
export const isDev = process.env.NODE_ENV === 'development'

export const WEBSITE = {
  title: `Brendan Dash's Blog, a place to share my thoughts and ideas`,
  authors: [{ name: 'Brendan Dash (Debbl)', url: 'https://aiwan.run/' }],
  description: `Brendan Dash's personal website, a place to share my thoughts and ideas`,
  // eslint-disable-next-line n/prefer-global/process
  domain: isDev ? process.env.__NEXT_PRIVATE_ORIGIN! : 'https://aiwan.run',
  email: 'me@aiwan.run',
}
