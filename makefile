.PHONY: all bootstrap up build/light build/full release deploy

default: build/full

all: build/light release deploy

# core
bootstrap:
	yarn install
	yarn lerna bootstrap

# up
up:
	UID="$(shell id -u)" GID="$(shell id -g)" docker-compose up

# build
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


# common
lint:
	yarn lerna run lint

lint-fix:
	yarn lerna run lint:fix

test:
	yarn lerna run test


# core (final)
# release can be of major, minor, patch, premajor, preminor,
# prepatch, and prerelease
release ?= patch
release:
	git checkout dev
	yarn lerna version $(release) --yes
	git push origin dev
	git checkout master
	git merge dev
	git checkout dev
	git push origin master

deploy:
	git checkout master
	cd backend && gcloud app deploy backend.yaml \
		--project turnkey-science-250806 --verbosity=info \
		--quiet
	git checkout dev
