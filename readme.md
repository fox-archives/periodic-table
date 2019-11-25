# periodic table

## introduction

modern website that elegantly shows the periodic table and the properties of each element in an interactive user interface built for mobile and desktop.

![periodic table image](./periodic-table.png)

## setup

```sh
git clone https://github.com/eankeen/periodic-table
cd periodic-table
./bootstrap.sh
```

## browser compatibility

not intended to support internet explorer or opera.

element   | edge    | firefox | chrome    | safari    | ios safari
----      | ----    | ------- | -------   | ------    | -----------
flexbox   | 12+     | 28+     | 21+*, 29+ | 6.1+*, 9+ | 7*, 9+
grid      | 16+     | 52+     | 57+       | 10.1+     | 10.3+
es5       | 12+     | 21+     | 23+       | 6+        | 6+
es6       | 15+     | 54+     | 51+       | 10+       | 10+

\* supports with extension -moz, -webkit, etc.

## notes

for devleopment, use `sudo docker-compose up`, which will spin up all containers specified in respective `dockerfile.development` files.

for prod we only have `./backend`, no database crap, called `dockerfile.production`, which is the only one we should be deploying.
