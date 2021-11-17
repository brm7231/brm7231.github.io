# OpenVas Install:
## Update Linux and Install Docker
~~~
# sudo apt update
# sudo apt upgrade
# sudo apt install docker.io
~~~
## Check That Docker is Installed Properly, and Start Docker:
~~~
# sudo service docker status
# sudo service docker start
~~~
## Download and Run OpenVas:
~~~
# sudo docker run -d -p 443:443 --name openvas mikesplain/openvas
~~~
## Open Web Browser to Display OpenVas:
Go to https://localhost and enter username: `admin`, password: `admin`

## Docker-Compose File:
docker-compose.yml
~~~
version: '3.3'
services:
    openvas:
        ports:
            - '443:443'
        container_name: openvas
        image: mikesplain/openvas
~~~

## Images:
Docker Start Screen:

![Docker Start Screen](/Media/OpenVas-Dashboard.jpg)

Running Scan:

![Running Scan](/Media/OpenVas-Running.jpg)

After Scan:

![After Scan](/Media/OpenVas-Finished.jpg)
