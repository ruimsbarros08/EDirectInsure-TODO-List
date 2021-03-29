# EDirectInsure TODO list

## Requirements
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Documentation

To install

```
docker run --rm -v "$PWD":/app -w /app node:14-alpine npm install
```

To run

```
docker-compose up
```

To test frontend
```
docker run --rm -v "$PWD":/app -w /app timbru31/node-chrome:14 node_modules/@angular/cli/bin/ng test
```
