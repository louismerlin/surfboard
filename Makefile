.PHONY=build
build: Dockerfile config.yaml
	docker build -t surfboard .

.PHONY=start
start: build
	docker run --rm -p 6464:6464 \
		-v "${PWD}/src:/usr/src/surfboard/src" \
		-v "${PWD}/parse_scoreboard.py:/usr/src/surfboard/src/parse_scoreboard.py" \
		-it surfboard 
