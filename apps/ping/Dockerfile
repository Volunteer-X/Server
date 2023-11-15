FROM node:18-alpine As base

WORKDIR /usr/src/volunteerx

FROM base AS development

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:gen:ping

RUN npm run build

FROM base AS production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production --omit=dev

COPY --from=development /usr/src/volunteerx/dist ./dist

CMD [ "node", "dist/apps/ping/main"]



