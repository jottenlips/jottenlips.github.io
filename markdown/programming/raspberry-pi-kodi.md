# Raspberry Pi Media Server with Kodi and ExFAT Drive

I wrote this so I won't forget the steps to make our media server in case I have to format my SD card. A lot of the resources to do this were scattered around the internet, so I thought I would compile them into my own post.

Materials:

>- Raspberry Pi 3

>- 16GB MicroSD

>- TV

>- HDMI Cable

>- Keyboard

>- 2 USB Cables

>- 1TB External Drive



# Install Raspberry Pi Lite OS

1. Get the [Raspberry Pi image installer](https://www.raspberrypi.com/software/)

2. Write Raspberry PI OS Lite to the 16GB MicroSD. 

3. Plug in Raspberry Pi with the SD card, keyboard, and TV hooked up

4. Login

```bash
raspberrypi logi: pi
Password: raspberry
```

# Setup WIFI


```bash
sudo raspi-config
```

1. Localisation Options

2. WLAN Country Set...

3. Pick country

You may also want to localize your keyboard while in this menu.

4. Finish and Reboot

5. Finish setup in terminal

```bash
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

```bash
country=US
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
# add wifi name and password
network={
 ssid="YOURWIFI"
 psk="YOURPASSWORD"
}
```

click `Ctrl X`, `Y`, `Enter`

```bash
reboot
```

# Setup SSH 

>- (optional but makes copy pasting commands from the web much easier)

>- With SSH enabled you can login to your raspberry pi from other computers

```bash
sudo raspi-config
```

1. Go to interface options

2. Enable SSH

Open the terminal on another computer and enter

```
arp -a
```

This should show you the pi@raspberry on your network. Mine is `raspberrypi.attlocal.net`.

Which means to ssh into this computer I can run this command:

```
ssh pi@raspberrypi.attlocal.net
```

Now you can run commands from another computer.

# Add movies to external drive

1. Format your external hard drive to ExFAT

2. Add your movies from your computer to it that you have obtained legally

# Install Kodi, exfat-fuse, and fsauto

1. Install dependencies

```
sudo apt-get update
```

```
sudo apt-get install kodi
```

```
sudo apt-get install exfat-fuse exfat-utils
```

2. Reboot and plug in your external hard drive to the usb port

```
reboot
```

# Auto mount your external hard drive

1. Install autofs

```
sudo apt-get install autofs
```


2. Configure with your drive info

```bash
sudo nano /etc/auto.master
```

Add this to the file

```bash
/media  /etc/auto.usb  --timeout=60 --ghost
```

click `Ctrl X`, `Y`, `Enter`


3. Find the UUID of your hard drive and add it to auto.usb

```
sudo blkid
```

Copy the UUID of your drive

```bash
sudo nano /etc/auto.usb
```

add this line

```
movies -fstype=auto,uid-pi,gid=pi,rw UUID=YOUR-UUID
```

click `Ctrl X`, `Y`, `Enter`

Restart autofs

```
sudo systemctl restart autofs.service
```

# Make Kodi boot on start

```bash
sudo crontab -e
```

Pick nano, or whichever editor you like.

add this line:

```bash
@reboot kodi --standalone
```

If you are using `nano`, you know the drill: `Ctrl X`, `Y`, `Enter`

```
reboot
```

# Add Movie Metadata

1. Go to movies, Click `Enter files section`

2. Click `+ Add videos` and then `Browse` into folder where your movies are

3. Set the directory contains type to `movies` for scraping data

4. Click options in the lower left corner to `Update library` under `Actions`

When you go back to the movies screen you should see all of the metadata for the movies on your drive.

# Setup Remote

1. Go to `Settings` via the gear icon, then => `Service Settings` => `Control`

2. Toggle `Allow remote control via HTTP` and `Toggle remote control from applications on other systems`

3. Download the Kodi app on the Apple or Android store. 

4. Click `Find Kodi` on the mobile app and enter your username and password: `pi` and `raspberry` if you still haven't reset the password. You can and should change the password for your raspberry pi user via the `raspi-config` command. 


🍿 Congrats! You are now running your own media server on a raspberry pi! 🍿