# Arch Linux Installation:
## Install Arch.iso File
---
* Download, and make sure to verify the signature
## Boot in UEFI:
Add `firmware="efi"` to the vmx file.
Now, boot the VM.
## Verify Boot Mode:
Type the following command:
~~~
# ls /sys/firmware/efi/efivars
~~~
If no errors occur, the system is booted in UEFI mode.
## Check Network Connection:
Type the following commands; the first to list network interface, and if the network interface you want is listed and enabled, run the second command to verify the connection. 
~~~
# ip link
# ping archlinux.org
~~~
## Update the System Clock:
Run the first command below, and then the second, to ensure that the clock is synchronized:
~~~
# timedatectl set-ntp true
# timedatectl status
# timedatectl set-timezone America/Chicago
~~~
## Partition the Disks:
* Identify the block devices
    * ~~~
        # fdisk -l
        ~~~
* Create 2 partitions:
    * 1st partition:
      ~~~
      # fdisk /dev/sda
      n
      p
      1
      (empty)
      1025000
      ~~~
      ~~~
      t
      1
      uefi
      ~~~
    * 2nd partition:
      ~~~
      n
      p
      2
      (empty)
      (empty)
      ~~~
## Create Swap Disk:
~~~
# cfdisk
~~~
Resize /dev/sda2 to 18.5 GB. Create a new partition, sda3 and change the type to Linux swap.
~~~
# mkswap /dev/sda3
# swapon /dev/sda3
~~~
## Format the Partitions:
~~~
# mkfs.fat -F32 /dev/sda1
# mkfs.ext4 /dev/sda2
~~~
## Mount the File Systems:
~~~
# mount /dev/sda2 /mnt
# mkdir /mnt/boot
# mount /dev/sda1 /mnt/boot
~~~
## Install the Linux Kernel:
~~~
# reflector
# pacstrap /mnt base linux linux-firmware
~~~
## Install the Network Manager
~~~
# pacman -S networkmanager
# systemctl enable NetworkManager
~~~
## Generate Fstab File:
~~~
# genfstab -U /mnt >> /mnt/etc/fstab
~~~
## Change Root Into New System:
~~~
# arch-chroot /mnt
~~~
## Install Nano:
~~~
# pacman -S nano
~~~
## Set Time Zone:
~~~
# ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime
# hwclock --systohc
~~~
## Localization:
~~~
# locale-gen
~~~
Edit `/etc/locale.gen` using nano and uncomment "en_US.UTF-8 UTF-8"
~~~
# echo "LANG=en_US.UTF-8" > /etc/locale.conf
~~~
## Create Hostname File:
~~~
# echo "McDonald_Arch" > /etc/hostname
~~~
## Set Root Password:
~~~
# passwd 
(Enter a password)
~~~
## Enable Microcode Updates:
~~~
# pacman -S amd-ucode
~~~
## Install a Boot Loader:
~~~
# pacman -S grub efibootmgr
# grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
# grub-mkconfig -o /boot/grub/grub.cfg
~~~
## Install Display Server:
~~~
# pacman -S xorg-server xorg-apps xorg-xinit
~~~
## Install Display Drivers:
~~~
# pacman -S xf86-video-vesa
~~~
## Install Display Manager for KDE:
~~~
# pacman -S sddm
~~~
## Install KDE Desktop Environment:
~~~
# pacman -S plasma kde-applications
~~~
## Configure Graphical Boot:
~~~
# systemctl enable sddm
~~~
## Add Locate:
~~~
# pacman -S mlocate
~~~
## Add Zsh:
~~~
# pacman -S zsh
~~~
## Add Color to Terminal:
~~~
# nano /etc/nanorc
~~~
Uncomment the line that says `include "/usr/share/nano/*.nanorc"`
## Add SSH:
~~~
# pacman -S openssh
~~~
## Install sudo:
~~~
# pacman -S sudo
~~~
## Install vim (for editing sudoers file):
~~~
# pacman -S vim
~~~
## Add Users:
~~~
# useradd -m blake
# useradd -m sal
# useradd -m codi
# groupadd sudo
# usermod -a -G sudo blake
# usermod -a -G sudo sal
# usermod -a -G sudo codi
# passwd sal
(Enter the password: GraceHopper1906)
# passwd codi
(Enter the password: GraceHopper1906)
# passwd -e sal
# passwd -e codi
# visudo
~~~
Uncomment `%sudo ALL=(ALL) ALL`.
## Reboot:
Reboot the machine, and everything should be good to go!
