FROM node:18

# For dev debugging purposes
# apt update && apt install net-tools

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# * please notice that its not needed if we work with dev container, as the source are mounted from the host
COPY . .

# build app for production with minification
#RUN npm run build
ENV PORT=8085

EXPOSE 8085


CMD ["tail", "-f", "/dev/null" ]
# CMD ["npm", "run", "serve" ]
