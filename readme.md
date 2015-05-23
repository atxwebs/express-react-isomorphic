# Express React Isomorphic

Starter project for running React.


### Application

Expects mongodb, redis and petecoop/nginx-proxy to already be running.

live
```
docker-compose -f docker-production.yml up -d
```

dev

make sure node_modules is empty first, apart from linked folders
```
docker-compose up -d
```

### .git/hooks/post-update

```
#!/bin/sh
cd ..
docker-compose -f docker-production.yml build && \
  docker-compose -f docker-production.yml up -d && \
  docker rmi $(docker images -f "dangling=true" -q)
```
