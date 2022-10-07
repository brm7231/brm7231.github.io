# Home Project:
This is documentation for my home lab, including brilliant successes, demoralizing failures, and hours of laborious sysadmin hell.

## General:
My home network is configured using virtual machines deployed through <a href="https://www.proxmox.com/en/proxmox-ve">Proxmox VE</a>:

<img src="/Media/PVE Login.png">

## Repos Setup:
The first thing to do is to set up the non enterprise sources for updates so that I can get updates for Proxmox.
* `# mv /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.list.d/pve-enterprise.list.disabled`
* `# echo "deb http://download.proxmox.com/debian/pve buster pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list`


## IP Addressing/Internet:
This is how to set up the IP address for Proxmox. In my case, I needed to update the static IP that I was using, because I switched subnets.
* Change IP address and gateway address `# vim /etc/network/interfaces`
* Also change `/etc/hosts` to reflect the IP address change

## DNS:
### External DNS:
This issue arose when, halfway through setting up the server, I was forced to switch to a router on a different subnet. This broke DNS since it was referencing the intial router at `192.168.1.254`, and the router it is now connected to is `192.168.86.1`.

If pve DNS is not resolving correctly, check `/etc/resolv.conf` and make sure the correct DNS server is being used (should be same as router IP most likely).
### Internal DNS:
Setup `dnsmasq`:
* configure `/etc/hosts` file appropriately
* `# service dnsmasq restart`

For Windows to use DNS
* Deprecated:
  * `netsh`
  * `interface ip show config`
  * `interface ip set dns "[adapter name]" static [DNS IP address]`
  * If you have issues with static DNS servers not being removed when you set the adapter back to using DHCP, check the registry under `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces` and clear the static DNS servers that have been setup for the appropriate adapter
* Best:
  * Make the router use the DNS server, with a different backup DNS server

## Machines:
* Machines might best be created as ballooning - memory can be given a minimum and maximum.
