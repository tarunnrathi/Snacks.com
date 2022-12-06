#Stage 0, "build-stage", based on Node.js, to build and compile the frontend # Test
FROM node:14.14.0 as builder

COPY . ./

RUN npm install

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /build /usr/share/nginx/html
COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY conf/authnginx/htpasswd /etc/nginx/authnginx/htpasswd

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

