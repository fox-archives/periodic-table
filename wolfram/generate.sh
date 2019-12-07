#!/bin/sh

set -e

cd wolfram-data-groups || exit

# for each item in wolfram-data-groups (skipping nuclear properties)
folders="basic-atom-properties material-properties \
  thermodynamic-properties electromagnetic-optical-properties \
  abundance-properties atomic-properties"
for item in $folders; do
  # if the item in wolfram-data-groups is a folder
  if test -d "$item"; then
    # move to directory (ex. abundance-properties, etc.)
    cd "$item" || exit
    echo "GENERATING $(echo "$item" | tr '[:lower:]' '[:upper:]')"

    # for each item in a category of atom properties
    for item2 in *.wls; do
      wolframscript -script "$item2"
    done

    echo
    cd ..
  fi
done

cd ..
