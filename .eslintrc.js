module.exports = {
    env: {
        browser: true
    },
    extends: [
        "standard"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "no-unused-vars": "off",
        "accessor-pairs": "off",
        "import/export": "off",
        "no-trailing-spaces": "off",
        eqeqeq: "off",
        "no-use-before-define": "off",
        // "space-before-function-paren": ["error", "never"],
        "no-redeclare": "off",
        camelcase: "off", 
        "no-void": "off",
        "no-inner-declarations": "off",
        "space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }],
        "no-prototype-builtins": "off",
        "no-return-assign": "off"
    }
};
