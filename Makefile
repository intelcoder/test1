update: FORCE
	@echo ">>> Removing node_modules and package-lock.json"
	rm package-lock.json && rm -rf node_modules
	@echo ">>> Installing node modules"
	npm i

FORCE:
