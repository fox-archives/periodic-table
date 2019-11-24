.PHONY: deploy build/light build/full

build/light:
	yarn transferFrontend

build/full:
	yarn transferWolfram
	yarn transferFrontend
	yarn transferAll


deploy:
	cd backend && gcloud app deploy backend.yaml --project turnkey-science-250806 
