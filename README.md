## Deploy

### Frontend

$ python deploy.py frontend

### API

On laptop

```
$ python deploy.py api
```

On ec2 instance

```
cd nexxtrack-api
aws s3 sync s3://nexxtrack-api/current .
aws s3 cp s3://nexxtrack-api/database/tracklists_0610.db api/
docker-compose build --no-cache
docker-compose start -d
```