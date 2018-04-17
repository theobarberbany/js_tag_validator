
## Cloud deployment. 


 * Build the docker image from the Dockerfile in the js_tag_validator repository.
    >> This creates a container that runs the latest build on port 3000. Port can be changed in dockerfile

* Deploy build behind webserver.

    >> If using container orchestration, an ingress controller can handle routing.
    >> Else, set up nginx as a reverse proxy and serve as needed. (Configuring https etc the normal nginx way)
    

* Set up crontab to automatically rebuild database, you will need python3 and the [python tag validator](https://github.com/theobarberbany/tag_validator) installed. The script connects to the warehouse internal database, so will need to be executed somewhere with access to that too.
    ```bash
    #!/usr/bin/env bash
    if [ "$(whoami)" != "root" ]
    then
    	sudo su -s "$0"
    	exit
    fi
    cd /var/www/cache
    python3 validator.py -d warehouse_ro
    json-minify cache.json > cache_min.json```

    
* chmod with `chmod +x script` and add to crontab with `crontab -e`
* The python script will only refresh the cache if it is an hour old.



## Using Docker compose and Vault

* Pull the required images from docker hub: `docker-compose pull`

* Create the required secrets in vault. I've added a top level directory called 'tag-validator' The required secrets are for the S3 gateway, nginx certificates and SQL Database users.
```bash
 $ vault write secret/tag-validator/nginx/cert value=@mycert.crt
 $ vault write secret/tag-validator/nginx/key value=@mykey.key
 
 $ vault write secret/tag-validator/s3/access_key value=<MYKEY>
 $ vault write secret/tag-validator/s3/secret_key value=<MYKEY>
 $ vault write secret/tag-validator/s3/gateway_url value=<GATEWAY_URL>

 $ vault write secret/tag-validator/db/db_host value=<host>
 $ vault write secret/tag-validator/db/db_name value=<name>
 $ vault write secret/tag-validator/db/db_port value=<portnum>
```
* Edit the `docker-compose.yaml` file to reflect different indexes if you've chosen different indexes to the ones above.
* (Optional) Add a user, or AppRole and policy to authenticate with vault that can only see the secrets under the top level tag-validator directory. 
* Obtain the client-token required by vault to authenticate. See [here](https://www.vaultproject.io/intro/getting-started/authentication.html) for an introduction to authentication and Vault.
* The docker-compose configuration file expects three environment variables to be set. 
```bash
export TOKEN=<Your client-token>
export VAULT_ADDR=https://vault.internal.yourcompany.ac.uk:8200
export SERV=domain.that.you.want.to.serve.on
```

* Run `docker-compose config` to check that the environment variables are being included correctly. If any fields are not filled, something is wrong. 

* Run `docker-compose up` and you should see something similar to the following: 

```bash
Creating network "testing_default" with driver "bridge"
Creating testing_nginx_1            ... done
Creating testing_validator_1        ... done
Creating testing_js-tag-validator_1 ... done
Creating testing_s3_1               ... done
Attaching to testing_validator_1, testing_s3_1, testing_nginx_1, testing_js-tag-validator_1
validator_1         | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/db/db_port : DBPORT
validator_1         | Vault Lookup: Override found for DBPORT
validator_1         | XXXX
validator_1         | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/db/db_name : DBNAME
validator_1         | Vault Lookup: Override found for DBNAME
validator_1         | XXXX
validator_1         | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/db/db_host : DBHOST
validator_1         | Vault Lookup: Override found for DBHOST
validator_1         | XXXX
s3_1                | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/s3/access_key : ACC_KEY
nginx_1             | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/nginx/ngnix.conf : /etc/nginx/ngnix.conf
s3_1                | Vault Lookup: Override found for ACC_KEY
s3_1                | XXXX
nginx_1             | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/nginx/default.conf : /etc/nginx/sites-enabled/default.conf
s3_1                | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/s3/secret_key : SEC_KEY
s3_1                | Vault Lookup: Override found for SEC_KEY
s3_1                | XXXX
s3_1                | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/s3/gateway_url : GATEWAY_URL
nginx_1             | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/nginx/ssl.conf : /etc/nginx/conf.d/ssl.conf
s3_1                | Vault Lookup: Override found for GATEWAY_URL
s3_1                | XXXX
nginx_1             | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/nginx/cert : /etc/pki/cert.crt
nginx_1             | Vault Lookup: Override found for /etc/pki/cert.crt
nginx_1             | Vault Lookup: http://vault.dnapipelines.sanger.ac.uk:8200/v1/secret/tag-validator/nginx/key : /etc/pki/key.key
nginx_1             | Vault Lookup: Override found for /etc/pki/key.key
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: using the "epoll" event method
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: nginx/1.10.3
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: OS: Linux 4.4.0-47-generic
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: getrlimit(RLIMIT_NOFILE): 1048576:1048576
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker processes
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker process 32
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker process 33
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker process 34
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker process 35
nginx_1             | 2018/04/17 08:59:22 [notice] 31#31: start worker process 36
s3_1                | [2018-04-17 08:59:22 +0000] [23] [INFO] Starting gunicorn 19.7.1
s3_1                | [2018-04-17 08:59:22 +0000] [23] [INFO] Listening at: http://0.0.0.0:8000 (23)
s3_1                | [2018-04-17 08:59:22 +0000] [23] [INFO] Using worker: sync
s3_1                | [2018-04-17 08:59:22 +0000] [26] [INFO] Booting worker with pid: 26
js-tag-validator_1  | serve: Running on port 3000
```

* Now you should be able to access the tag validator at the url provided in `${SERV}`. Now set up the cron job to use the tag-validator docker image brought up. Compose has mapped `/var/www/cache` inside the container to the `/cache` in the folder you brought everything up in. 
* Run `docker ps` to get the name of the container running the validator. Mine was testing_validator_1
 ```bash
    #!/usr/bin/env bash
    if [ "$(whoami)" != "root" ]
    then
    	sudo su -s "$0"
    	exit
    fi
    cd /cache
    docker exec -it testing_validator_1 validator -d warehouse_ro -c > cache_min.json
```
(The option -c outputs the contents of cache.json to std_out)
