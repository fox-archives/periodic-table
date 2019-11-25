# periodic table

## introduction

modern website that elegantly shows the periodic table and the properties of each element in an interactive user interface built for mobile and desktop.

![periodic table image](./periodic-table.png)

## setup

```sh
git clone https://github.com/eankeen/periodic-table
cd periodic-table && make bootstrap
sudo docker-compose up
```

## release

ensure you have no staged changes

```sh
make all release=minor

# or do it manually
make build/light
make release
make deploy
```

## todo for pipeline

- add stats to see how much browser support app has

## notes

`sudo docker-compose up`, spins up all containers specified in respective `dockerfile.development` files.
