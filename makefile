.PHONY: all bootstrap build/light build/full release deploy

all: build/light release deploy

bootstrap:
	yarn install
	yarn lerna bootstrap

build/light:
	cd frontend && yarn prod
	yarn transferFrontend

build/full:
	cd wolfram && cd wolfram-data-groups && ./generate.sh
	cd wolfram && yarn transform
	cd wolfram && yarn test
	yarn transferWolfram
	cd frontend && yarn prod
	yarn transferFrontend

# release can be of major, minor, patch, premajor, preminor, prepatch, prerelease
release ?= minor
release:	
	lerna version $(release) --yes

deploy:
	cd backend && gcloud app deploy backend.yaml --project turnkey-science-250806 
