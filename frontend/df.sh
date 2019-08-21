#!/bin/sh

sudo docker run -it -p 8080:8080 --mount type=bind,src="$(pwd)",dst=/app pt/frontend:default

