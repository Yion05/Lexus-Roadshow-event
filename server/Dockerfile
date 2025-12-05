FROM oven/bun AS build

WORKDIR /server

COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./src ./src
COPY ./utils ./utils
COPY ./data ./data
COPY ./tmp ./tmp
COPY ./data ./data

ENV PORT=8080

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /server

COPY --from=build server/server server

ENV PORT=8080

CMD ["./server"]

EXPOSE 8080