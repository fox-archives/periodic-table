# periodic table

## introduction

modern website that elegantly shows the periodic table and the properties of each element in an interactive user interface built for mobile and desktop

![periodic table image](./periodic-table.png)

## prerequisites

- `node`
- `yarn`
- `make`
- `wolframscript`

## setup

```sh
git clone https://github.com/eankeen/periodic-table
cd periodic-table
make bootstrap
sudo docker-compose up
```

## release

ensure you have no staged changes

```sh
make all

# or do it manually
make build/light
make release release=patch
make deploy
```
