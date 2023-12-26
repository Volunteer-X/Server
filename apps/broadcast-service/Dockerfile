FROM node:18-alpine As base

RUN apk add --no-cache libc6-compat

ENV NODE_OPTIONS=--max-old-space-size=8192

WORKDIR /usr/src/volunteerx

FROM base AS development

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run prisma:gen:users

RUN npm run build

FROM base AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./

RUN npm install --only=production --omit=dev

COPY --from=development /usr/src/volunteerx/dist ./dist

CMD [ "node", "dist/apps/broadcast-service/main"]