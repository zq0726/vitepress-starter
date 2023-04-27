# GitHub/Gitee 常用操作

## 获取私人令牌

**GitHub：**

1、登录 `GitHub` 账号；

2、通过路径 `用户头像` → `Settings` 进入 `Developer setting`；

3、选择 `Personal access tokens` 选项后点击 `Generate new token`；

4、`Note` 字段可以随意填写；例如：ACCESS_TOKEN；

5、`Select scopes` 字段根据需求进行勾选；

- repo 字段为必选字段，请您直接勾选；
- admin:repo_hook 字段为可选字段，用于自动生成 webhook；

> 当需要 Gitee 自动从 GitHub 同步仓库时，建议勾选。

6、点击 `Generate token` 生成私人令牌；

7、复制私人令牌并妥善保管。

**Gitee：**

1、登录 `Gitee` 账号；

2、通过路径 `用户头像` → `设置` 进入 `私人令牌`；

3、点击 `生成新令牌`；

4、`私人令牌描述` 字段可以随意填写；例如：ACCESS_TOKEN；

5、`权限` 字段根据需求进行勾选；

6、点击 `提交` 生成私人令牌；

7、复制私人令牌并妥善保管。

## 获取和设置 SSH

命令行生成秘钥

```shell
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f gh-pages -N ""

# 常用
ssh-keygen -t rsa -C "$(git config user.email)"
```

得到两个文件：

- `gh-pages.pub` 是公钥
- `gh-pages` 是私钥

**GitHub：**

1、登录 `GitHub` 账号；

2、通过路径 `用户头像` → `Settings` 进入 `SSH and GPG keys` 配置 `SSH公钥`，点击 `New SSH key`；

3、`Title` 字段可以随意填写；例如：SSH_PUBLIC_KEY；

4、输入秘钥，点击 `Add SSH Key`。

**GItee：**

1、登录 `Gitee` 账号；

2、通过路径 `用户头像` → `设置` 进入 `SSH公钥` 配置 `SSH公钥`；

3、`标题` 字段可以随意填写；例如：SSH_PUBLIC_KEY；

4、输入秘钥，点击 `确定`。

::: details 参数说明

```haml
-t：指定生成密钥的类型，默认使用 SSH2d 的 rsa

-f：指定生成密钥的文件名，默认 id_rsa （私钥 id_rsa ，公钥i d_rsa.pub）

-P：提供旧密码，空表示不需要密码（-P ''）

-N：提供新密码，空表示不需要密码（-N ''）

-b：指定密钥长度（bits），RSA 最小要求 768 位，默认是2048位；DSA 密钥必须是 1024 位（FIPS 1862 标准规定）

-C：提供一个新注释

-R hostname：从 known_hosta （.ssh目录下）文件中删除所有属于 hostname 的密钥
```

:::

## 查看秘钥文件夹位置（路径地址）

1、输入 `cd ~/.ssh` 进入到 .ssh 文件夹

2、输入 `ls` 查看 .ssh 文件夹里面有 `id_rsa` `id_rsa.pub` `known_hosts` 文件

3、输入 `pwd` 查看 .ssh 文件路径位置地址

## GitHub 设置 SSH Deploy Key

> 在 `个人设置` 中配置了公钥就可以不用设置仓库的 Deploy Key

前往个人设置

- 通过路径：`用户头像 → Settings -> SSH and GPG keys` 添加公钥

前往代码仓库设置

- 通过路径： `仓库 -> Settings -> Deploy Keys` 添加公钥，并且勾选 `Allow write access`

[参考链接](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-create-ssh-deploy-key)
