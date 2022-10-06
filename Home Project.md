# Home Project:
This is documentation for my home lab, including brilliant successes, demoralizing failures, and hours of laborious sysadmin hell.

## General:
My home network is configured using virtual machines deployed through Proxmox VE: 

## Repos Setup:
* `# mv /etc/apt/sources.list.d/pve-enterprise.list /etc/apt/sources.list.d/pve-enterprise.list.disabled`
* `# echo "deb http://download.proxmox.com/debian/pve buster pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list`

## DNS:
### External DNS:
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

## Internet:
Changed router or different network?
* Change IP address and gateway address `/etc/network/interfaces`
* Also change `/etc/hosts` to reflect the IP address change

## Machines:
* Machines might best be created as ballooning - memory can be given a minimum and maximum.
