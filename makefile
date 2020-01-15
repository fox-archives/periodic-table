.PHONY: all bootstrap build/light build/full release deploy

default: build/full

all: build/light release deploy

bootstrap:
	yarn install
	yarn lerna bootstrap

build/light:
	cd frontend && yarn prod
	yarn transferFrontend

build/wolfram:
	cd wolfram && make build
	cd wolfram && make dist
	cd wolfram && yarn test
	yarn transferWolfram

build/full:
	cd frontend && yarn prod
	yarn transferFrontend
	cd wolfram && make generate
	cd wolfram && make build
	cd wolfram && make dist
	cd wolfram && yarn test
	yarn transferWolfram

# release can be of major, minor, patch, premajor, preminor,
# prepatch, and prerelease
release ?= patch
release:
	yarn lerna version $(release) --yes

deploy:
	cd backend && gcloud app deploy backend.yaml \
		--project turnkey-science-250806 --verbosity=info \
		--quiet
