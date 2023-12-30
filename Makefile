run: 
	pnpm dev

migrate:
	npx prisma migrate dev

.PHONY: run migrate
	