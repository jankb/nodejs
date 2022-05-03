
### Run docker for database
```
$ docker run -e POSTGRES_USER=testuser -d --name kodetest-db -p5432:5432 produksjonsplass.db
```
### Run test
```
$ curl -v -H "accept: application/json" 31.187.72.203:8080/id/1000001
```
