// eslint-disable-next-line @typescript-eslint/no-var-requires
const basic = require("@debbl/eslint-config-basic");

module.exports = {
  extends: [
    "@debbl/eslint-config-react",
    "next/core-web-vitals",
    "@debbl/eslint-config-prettier",
  ],
  overrides: basic.overrides,
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: 80,
      },
    ],
  },
};
