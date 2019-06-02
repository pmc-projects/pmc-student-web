.PHONY: deploy

deploy:
	yarn build
	firebase deploy
