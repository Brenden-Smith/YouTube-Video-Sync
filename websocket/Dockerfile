FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY index.ts ./

EXPOSE 3001
ENV PORT 3001

RUN bun install
CMD ["bun", "index.ts"]