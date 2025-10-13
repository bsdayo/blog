---
slug: build-custom-debian-based-pve-lxc-templates
title: 制作基于 Debian 的自定义 Proxmox VE LXC 容器模板
tags: [proxmox, lxc]
category: tutorial
created: 2025-08-29 16:20:35 +08:00
---

最近 [Debian 13 (`trixie`) 正式发布了](https://www.debian.org/News/2025/20250809)，Proxmox VE 紧随其后也[发布了基于 Debain 13 的 9.0 版本](https://www.proxmox.com/en/about/company-details/press-releases/proxmox-virtual-environment-9-0)。但官方仓库中的 Debian LXC 模板却迟迟没有更新，还停留在 Debian 12。

试了一下 [linuxcontainers.org 的镜像](https://images.linuxcontainers.org/)，发现[在创建容器的配置网络阶段会报错](https://forum.proxmox.com/threads/debian-13-lxc-template.169469/#post-790580)。另一方面正好最近在折腾性能监控一类的事情，需要在系统镜像中预装一个 [node_exporter](https://github.com/prometheus/node_exporter/)，于是打算自己动手丰衣足食（

查阅了一些资料也是完成了，下面是步骤。

## 准备工作

由于工具需要 Proxmox VE 的环境，以下操作需要在宿主系统中完成。

官方使用 [DAB (Debian Appliance Builder)](https://pve.proxmox.com/wiki/Debian_Appliance_Builder) 来构建基于 Debian 的 LXC 模板，我们先安装它：

```shell
apt install dab
```

随后建立一个工作目录：

```shell
mkdir -p dab/debian-13-custom
cd dab/debian-13-custom
```

## 创建 DAB 配置文件

新建一个 `dab.conf`，写入以下内容：

```text
Suite: trixie
Architecture: amd64
Source: https://mirrors.ustc.edu.cn/debian SUITE main contrib
Source: https://mirrors.ustc.edu.cn/debian SUITE-updates main contrib
Source: https://mirrors.ustc.edu.cn/debian-security SUITE-security main contrib
CacheDir: ../cache
Name: debian-13-custom
Version: 13.0
Section: system
Maintainer: yourname <yourname@example.com>
Infopage: https://example.com/
Description: Debian 13 w/ node_exporter
 Base Debian 13 system with node_exporter installed.
```

- `Suite`：对应 Debian 版本代号，如 `trixie`、`bookworm`
- `Architecture`：目标架构，可选 `amd64`、`i386`
- `Source`：设置软件包镜像源。如果对你来说没有 _某种网络问题_ 的影响，可以删去。其中的 `SUITE` 为占位符，会被自动替换为上面配置的 `Suite`。这里配置的镜像源也会被直接写入 `/etc/apt/source.list.d/debian.sources`
- `CacheDir`：下载缓存目录，默认为当前目录下的 `cache` 目录
- `Name`：模板名称，不能包含下划线 `_` 和其他特殊字符
- `Version`：模板版本
- `Section`：模板分类，例如 Proxmox VE 自带的 `mail`、`system`
- `Maintainer`：维护者信息，格式为 `username <email>`
- `Infopage`：模板信息链接
- `Description`：接在其后的为模板的简短描述，下一行（需以一个空格开头）为模板的详细描述

所有配置项的详细说明可以通过 `man dab` 查看。

## 制作并打包模板

依次执行以下命令：

```shell
dab init
dab bootstrap

# 此时 rootfs 目录已经创建完成，可以根据自己的需求对文件系统进行修改

# 如果要安装软件包，可以使用 dab install 命令
# dab install pkg1 pkg2 ...
# dab install prometheus-node-exporter

dab finalize
```

然后当前目录下会多出 `debian-13-custom_13.0_amd64.tar.gz`，即为我们制作的镜像。随后可以将其移动到 `/var/lib/vz/template/cache/`，就可以在 Proxmox VE 的管理 UI 上看到了。

最后一步可以更改为 `dab finalize --compressor zstd`，会将模板压缩为 `.tar.zst`，尺寸会小很多。

使用新的模板创建一个 LXC 容器，网络配置不再失败了，也预装好了想要的软件包，对以后来说就是开箱即用的体验。

最后附上自己写的模板：[GitHub](https://github.com/bsdayo/pve-lxc-templates)
