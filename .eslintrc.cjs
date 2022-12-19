module.exports = {
  extends: [
    "@debbl/eslint-config-react",
    "next/core-web-vitals",
    "@debbl/eslint-config-prettier",
  ],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        printWidth: 80,
      },
    ],
  },
};
