// eslint-disable-next-line n/prefer-global/process
export const isDev = process.env.NODE_ENV === "development";
// eslint-disable-next-line n/prefer-global/process
export const CWD = process.cwd();

export const WEBSITE = {
  title: "Brendan Dash",
  authors: [{ name: "Brendan Dash (Debbl)", url: "https://aiwan.run/" }],
  description: "Brendan Dash's personal website",
  // eslint-disable-next-line n/prefer-global/process
  domain: isDev ? process.env.__NEXT_PRIVATE_ORIGIN! : "https://aiwan.run",
};
