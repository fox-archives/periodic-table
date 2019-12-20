.PHONY: all generate build test dist

all: generate build dist

# wolframscript executes relevant `.wls` files in `./wolfram-data-groups`,
# making json files of all the data
generate:
	@sh ./generate.sh

# transforms raw atom proeprty data (from `.json` files created) to something
# usable for the website (includes debugs, and *not* minified)
build:
	@yarn build

# tests the raw build output from `make build`
test:
	@yarn test

# builds dist files (minified version of `build` with 'debug' properties removed)
dist:
	@yarn dist 
