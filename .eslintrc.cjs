const tsConfiguration =
	process.env.ESLINT_FAST === 'true'
		? 'plugin:@typescript-eslint/recommended'
		: 'plugin:@typescript-eslint/recommended-type-checked';

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/jsx-runtime'
	],
	parserOptions: {
		ecmaVersion: 2022,
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		'no-console': [
			'error',
			{
				allow: ['error']
			}
		],
		'prettier/prettier': ['error', {}, { usePrettierrc: true }]
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	overrides: [
		{
			files: ['**/*.{ts,tsx,mts,cts}'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: true
			},
			extends: [tsConfiguration, 'plugin:import/typescript'],
			settings: {
				'import/resolver': {
					typescript: {}
				}
			}
		},
		{
			files: ['**/*.cjs'],
			env: {
				node: true
			}
		}
	]
};
