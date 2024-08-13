install: 
		npm ci

publish:
		npm publish --dry-run

gendiff:
		node bin/gendiff.js

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

test:
	npm test
