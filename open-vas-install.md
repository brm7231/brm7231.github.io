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

# sudo apt install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

sudo usermod -aG docker admin
![image](https://user-images.githubusercontent.com/56270953/142140967-3b72fd89-3c9a-4fbc-b885-b85432629ad8.png)

~~~
