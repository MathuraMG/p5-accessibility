module.exports = {
    env: {
        browser: true,
        amd: true,
        es6: true
    },
    extends: ['eslint:recommended', 'p5js'],
    plugins: [],
    rules: {
        'no-cond-assign': 2,
        'eqeqeq': [2, 'smart'],
        'no-global-assign': 0,
        'no-use-before-define': [
            2,
            {
                functions: false,
                variables: false
            }
        ],
        'no-caller': 2,
        'no-undef': 2,
        'no-unused-vars': [2, {
            args: 'all',
            vars: 'local'
        }],
        'no-empty': 2,
        'no-console': 0,
        'no-var': 2,
        'quotes': [2, 'backtick'],
        'prefer-arrow-callback': 2,
        'arrow-body-style': [2, 'as-needed'],
        'curly': 'error',
        'dot-notation': [2, {
            allowKeywords: false
        }],
        'constructor-super': 2,
        'object-shorthand': 2,
        'prefer-const': 2
    }
};