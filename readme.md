# Periodic Table

## Introduction

Modern website that elegantly shows the periodic table and the properties of each element in an interactive user interface built for mobile and desktop.

![Periodic Table Image](./periodic-table.png)

## Setup

```sh
git clone https://github.com/eankeen/periodic-table
cd periodic-table
./bootstrap.sh
```

## Browser Compatibility

Not intended to support Internet Explorer or Opera.

Element   | Edge    | Firefox | Chrome    | Safari    | iOS Safari
----      | ----    | ------- | -------   | ------    | -----------
Flexbox   | 12+     | 28+     | 21+*, 29+ | 6.1+*, 9+ | 7*, 9+
Grid      | 16+     | 52+     | 57+       | 10.1+     | 10.3+
ES5       | 12+     | 21+     | 23+       | 6+        | 6+
ES6       | 15+     | 54+     | 51+       | 10+       | 10+

\* Supports with extension -moz, -webkit, etc.

## DevOps Workflow

For devleopment, use `sudo docker-compose up`, which will spin up all containers specified in respective `dockerfile.development` files.

For prod we only have `./backend`, no database crap, called `dockerfile.production`, which is the only one we should be depploying.