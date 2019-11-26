.PHONY: all generate build dist

all: generate build dist

# wolframscript executes relevant `.wls` files in `./wolfram-data-groups`,
# making json files of all the data
generate:
	./generate.sh

# transforms raw atom proeprty data (from `.json` files created) to something
# usable for the website (includes debugs, and *not* minified)
build:
	yarn build

# builds dist files (minified version of `build` with 'debug' properties removed)
dist:
	yarn dist 
