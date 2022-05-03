
## Database
### Create docker 
```
$ docker build -t produksjonsplass-db ./ 
```
### Run docker for database
```
$ docker run -e POSTGRES_USER=testuser -d --name kodetest-db -p5432:5432 produksjonsplass.db
```

## Server
### Run server 
```
node index.js
```
### Run test
```
$ curl 31.187.72.203:8080/id/1000001
```
