# Installs Node.js image
FROM node:16.13.1-alpine3.14

RUN npm install
# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY ./src ./src

# Installs all packages
RUN npx prisma generate

RUN npx prisma db seed

# Runs the dev npm script to build & start the server
CMD npm run dev