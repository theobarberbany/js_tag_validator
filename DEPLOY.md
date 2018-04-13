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

    >> The python script will only refresh the cache if it is an hour old.




