// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		parser: 'babel-eslint'
	},
	env: {
		browser: true,
	},
	extends: [
		// https://github.com/standard/standard/blob/master/docs/RULES-en.md
		'eslint-config-egg',
	],
	// add your custom rules here
	rules: {
        // 强制使用一致的缩进, 4个空格
        'indent': ["error", 4],
        // 语句强制分号结尾
        "semi": ["always"], 
        // see https://github.com/eslint/eslint/issues/6274
        'generator-star-spacing': 'off',
        'babel/generator-star-spacing': 'off',
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
};
