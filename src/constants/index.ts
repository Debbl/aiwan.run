/* eslint-disable n/prefer-global/process */

export const CWD = process.cwd()
export const isDev = process.env.NODE_ENV === 'development'
export const domain = isDev
  ? process.env.__NEXT_PRIVATE_ORIGIN!
  : 'https://aiwan.run'

export const WEBSITE = {
  authors: [{ name: 'Brendan Dash', url: domain }],
  domain,
  email: 'me@aiwan.run',
}
