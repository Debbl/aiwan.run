---
title: Raspberry Pi Setup
description: Raspberry Pi initialization and usage guide, including SSH connection configuration, wireless network settings, VNC remote desktop, extended function enablement, and basic configuration.
date: 2021-08-30T09:22:23.000Z
duration: 8min
keywords:
  - Raspberry Pi
  - Boot
  - Use
  - SSH
  - VNC
  - Camera
  - Extended Function
---

### SSH Connection

- With screen

  - Directly use the mouse to click to operate

- No screen wired network

  - In the root directory of the SD card (boot), create an `SSH` file (file with no content)

  - Get the IP address of the Raspberry Pi

  - Use the SSH connection tool to connect to the Raspberry Pi

- No screen wireless network

  - Enable SSH, that is, create an `SSH` file in the root directory of the SD card in the second step

  - In the root directory of the SD card (boot), create a `wpa_supplicant.conf` file (this file is used to add wireless connection)

    ```text title="config"
    ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
    update_config=1
    country=GB
    # Modify the configuration below
    network={
      ssid="Wi-Fi name"
      psk="Wi-Fi password"
      key_mgmt=WPA-PSK
    }
    ```

  - Use the SSH connection tool

### Extended function

- SSH
- VNC
- Camera
- etc.

Enter the terminal

```bash
sudo raspi-config
```

### Connect VNC

- Mouse operation

- Directly enter the terminal, this is temporary and can only open one at a time

  ```bash
  vncserver
  ```

  ```
  # 1 is the port, geometry is the resolution
  vncserver :1 -geometry 800x480
  ```

  > The Raspberry Pi 4B default does not have resolution settings, so the first time VNC is used may not be displayed, you need to configure it

  ![DisplayOptions](./images/display-options.png)

  ![Resolution](./images/resolution.png)

  ![Resolution Mode](./images/resolution-mode.png)

- Use the command `sudo respi-config` to open VNC

### Supplement

#### View basic configuration and pins

```bash
pinout
```
