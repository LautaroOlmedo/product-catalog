# Product Catalog – Frontend (React)
This project is a React Single Page Application (SPA) containerized with Docker and served using Nginx.
It is configured to properly support client-side routing (React Router) and production-ready static asset caching.
**Tech Stack**

React (Create React App)
TypeScript
Docker (multi-stage build)
Nginx (static file server)
Axios (API communication)

**Docker Overview**

The application uses a multi-stage Docker build:
Build stage
Uses Node.js to install dependencies and build the React app.
Runtime stage
Uses Nginx to serve the compiled static files.
This approach keeps the final image small, fast, and secure.

**Dockerfile Explanation**

FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

* Build Stage (node:20)

Installs dependencies using npm install

Builds the production-ready React app using npm run build

Outputs static files into the /build directory
🔹 Runtime Stage (nginx:alpine)
Uses Nginx to serve static files
Copies a custom nginx.conf
Serves the React build from /usr/share/nginx/html
🌐 Nginx Configuration (SPA Support)
The nginx.conf file is required to properly handle React Router routes.
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # React Router SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets caching
    location ~* \.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff2?|eot|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Disable cache for index.html
    location = /index.html {
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
        expires 0;
    }

    # Error handling
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
*Why this configuration is important*
Allows direct navigation to routes like:
/
/products/123
Prevents Nginx from returning 404 on client-side routes
Caches static assets efficiently
Ensures new deployments always load the latest version
⚙️ Environment Variables
API base URLs are configured using environment variables.
Create a .env file in the project root:
REACT_APP_PRODUCTS_URL=http://localhost:8080/api/products
REACT_APP_ORDERS_URL=http://localhost:8080/api/orders
*Important:*
Environment variables must start with REACT_APP_ to be accessible in the frontend.
After changing .env, restart the development or rebuild the Docker image.
*How to Run the App with Docker*
* Build the image
docker build -t product-catalog .
* Run the container
docker run -p 80:80 product-catalog
* Open in browser
http://localhost
Client-side routes will also work correctly:
http://localhost/products/123
*Local Development (without Docker)*
npm install
npm start
App will be available at:
http://localhost:3000
