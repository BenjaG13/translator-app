FROM caddy:alpine

RUN apk add --no-cache libcap-setcap \
 && setcap -r /usr/bin/caddy \
 && getcap /usr/bin/caddy || true

COPY Caddyfile.prod /etc/caddy/Caddyfile