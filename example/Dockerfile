FROM alpine:latest
ARG KEYPAD
RUN apk update && apk add curl
RUN curl --silent --fail "http://${KEYPAD}/secret/key"
