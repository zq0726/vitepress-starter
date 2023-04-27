# JsonWebToke 的使用

```shell
const jwt = require("jsonwebtoken");
const { tokenSecret, expiresIn } = require("../config/public");
```

## 生成 token

```shell
/**
 * 生成token
 * @param {*} info
 */
const sign = (info) => {
  return jwt.sign(info, tokenSecret, { expiresIn: expiresIn });
};
```

## 解析 token

```shell
/**
 * 解密
 *
 */
const decoded = (token) => {
  let tokenInfo = jwt.verify(token, tokenSecret);
  return tokenInfo;
};
```

## 导出方法

```shell
module.exports = {
  sign,
  decoded,
};

```
