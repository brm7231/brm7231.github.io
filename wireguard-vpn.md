# WireGuard VPN on Docker Through DigitalOcean Install:
## Update Linux and Install Docker:
~~~
# apt update
# apt upgrade
# apt install docker.io docker-compose
~~~
## Check That Docker is Installed Properly, and Start Docker:
~~~
# service docker status
# service docker start
~~~
## Setup WireGuard:
~~~
# mkdir -p ~/wireguard/
# mkdir -p ~/wireguard/config/
# nano ~/wireguard/docker-compose.yml
~~~
## Edit the Docker-Compose File:
~~~
version: '3.3'
services:
  wireguard:
    container_name: wireguard
    image: linuxserver/wireguard
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/Chicago
      - SERVERURL=147.182.174.236
      - SERVERPORT=51820
      - PEERS=pc1,pc2,phone1
      - PEERDNS=auto
      - INTERNAL_SUBNET=10.0.0.0
    ports:
      - 51820:51820/udp
    volumes:
      - type: bind
        source: ./config/
        target: /config/
      - type: bind
        source: /lib/modules
        target: /lib/modules
    restart: always
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.conf.all.src_valid_mark=1
~~~
## Start WireGuard:
~~~
# cd ~/wireguard/
# docker-compose up -d
~~~
## Install WireGuard on Phone and Laptop:
Install for phone and laptop.
## Find QR Code:
~~~
# docker-compose logs -f wireguard
~~~
## Add VPN Through WireGuard App:
Select the add button on the app, and select "Scan From QR Code". Scan the QR code from the terminal.
## Copy the Config File for a Peer to Your Laptop:
~~~
# cat ~/wireguard/config/peer_pc1/peer_pc1.conf
~~~
Copy the text from the config file.
Click "Add Tunnel" -> "Add Empty Tunnel", and paste the copied text.
