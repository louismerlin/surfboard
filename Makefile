.PHONY=build
build: Dockerfile config.yaml
	docker build -t surfboard .

.PHONY=start
start: build
	docker run --rm -p 6464:6464 -v "${PWD}/src:/usr/src/surfboard/src" -it surfboard 
