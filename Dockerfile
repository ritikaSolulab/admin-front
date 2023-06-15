FROM node:18.16.0

WORKDIR /usr/src/app

COPY . .
RUN npm install
ENV HOST 0.0.0.0

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
