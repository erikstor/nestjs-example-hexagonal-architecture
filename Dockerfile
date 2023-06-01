#build stage
FROM node:alpine AS build
WORKDIR /home/ubuntu/projects/microservice-usuarios
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#prod stage
FROM node:alpine
WORKDIR /home/ubuntu/projects/microservice-usuarios
ENV ENVIRONMENT=production
COPY --from=build /home/ubuntu/projects/microservice-usuarios/dist/ ./dist
COPY package*.json ./
RUN npm install --only=production
RUN rm package*.json
EXPOSE 5000

CMD ["node", "dist/src/main.js"]
