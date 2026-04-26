.DEFAULT_GOAL := help

help: # Display this help message using comment parsing
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install project dependencies
	rm -rf node_modules
	rm -rf .astro
	rm -rf dist
	npm install
	npm dedupe

run: verify-content ## Start the development server (Astro)
	npm run dev

build: ## Build the production bundle
	npm run build

check: ## Enforce coding standards and pure functions
	-npm run lint --fix
	-npm run type-check

format: ## Run Prettier to ensure consistent code aesthetics
	npm run format

clean: ## Remove build artifacts and temporary cache
	rm -rf dist
	rm -rf .astro
	rm -rf node_modules

unused: ## Find dead code and unused dependencies
	npm run knip

verify-content: # Check 1:1 language parity in modules
	chmod +x scripts/verify-content.sh
	./scripts/verify-content.sh

seed: ## Run the shell script to generate the initial knowledge graph
	chmod +x scripts/seed-content.sh
	./scripts/seed-content.sh

.PHONY: help install run build preview check format clean seed unused
