run: 
	pnpm dev

migrate:
	npx primsa db push

.PHONY:
	run migrate
	