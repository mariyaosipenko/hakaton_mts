# Compile stage
FROM golang:1.19 AS build-env

ADD . /converter
WORKDIR /converter

RUN go build -o /server

# Final stage
FROM debian:buster

EXPOSE 8002

WORKDIR /
COPY --from=build-env /server /

CMD ["/server"]