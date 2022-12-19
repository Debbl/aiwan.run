module.exports = {
  extends: [
    "next/core-web-vitals",
    "@debbl/eslint-config-react",
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
