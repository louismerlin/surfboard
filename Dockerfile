FROM python:3.9.5-alpine

WORKDIR /usr/src/surfboard/src

RUN pip install flask pyyaml requests

ENV FLASK_APP=surfboard

COPY config.yaml /usr/src/surfboard

CMD ["flask", "run", "--reload", "--port", "6464", "--host", "0.0.0.0", "--lazy-loading"]
