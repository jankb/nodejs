
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
npm install
npm start
```
### Run test
```
$ curl 31.187.72.203:8080/id/1000001
```
Or, if on localhost:
```
$ curl localhost:8080/id/1000001
```
