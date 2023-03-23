module.exports = {
  singleQuote: true,
  tabWidth: 4,
  importOrder: [
    "^react$",
    "^next",
    "aws-amplify",
    "^react-icons",
    "<THIRD_PARTY_MODULES>",
    "^@abstraction|@components|@consts|@contexts|@hooks|@models|@requests|@theme|@styles|@utils|@mocks|@icons|@features",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};
