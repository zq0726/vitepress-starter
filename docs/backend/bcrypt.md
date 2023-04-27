# bcrypt

```shell
const bcrypt = require("bcrypt");
```

## 生成密码

```shell

/**
 *  进行加盐加密
 *   password { string } 密码
 *   saltLength { number }  盐的长度
 */
const encrypt = (password, saltLength = 10) => {
  let salt = bcrypt.genSaltSync(saltLength);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
};
```

## 解析密码

```shell
/**
 *  检查密码与加盐后的密码是否相同
 *  password  { string } 不加盐的密码
 *  hash      { string } 加盐后的密码
 */
const decrypt = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
```

## 导出

```shell
module.exports = {
  encrypt,
  decrypt,
};

```
