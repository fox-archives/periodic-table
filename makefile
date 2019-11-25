.PHONY: all build/light build/full deploy

all: build/light deploy

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

deploy:
	cd backend && gcloud app deploy backend.yaml --project turnkey-science-250806 
