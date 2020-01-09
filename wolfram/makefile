.PHONY: all generate build test dist

all: generate build test dist

# wolframscript executes relevant `.wls` files in
# `./wolfram-data-groups` and `./build/atom-layout-data`,
# making json files of all the data
generate:
	@wolframscript -script generate.wls

# transforms raw atom proeprty data (from `.json` files created) to something
# usable for the website (outputs it to `./dist`)
build:
	@yarn build

# tests the raw build output from `make build`
test:
	@yarn test

# builds dist files (minified version of `build` with 'debug' properties removed)
dist:
	@yarn dist 
