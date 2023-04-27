# window

## 创建文件（夹）

```shell
# 创建文件夹
MDKIR [/S] [/Q] [drive:]path

#创建文件
type >nul name

```

## 删除文件（夹）

```shell
#删除文件夹
RMDIR [/S] [/Q] [drive:]path
#or
RD [/S] [/Q] [drive:]path

# 删除文件
DEL [/S] [/Q] [drive:]path

```

## 端口占用

- 查看所有端口的占用情况

```shell
netstat -ano
```

- 查看指定端口的占用情况

```shell
netstat -ano|findstr "端口"
```

- 查看 PID 对应的进程名

```shell
tasklist|findstr "PID"
```

- 结束进程

```shell
taskkill /f /t /im PID
```

## 打开 PowerShell

```shell
window + x
```
