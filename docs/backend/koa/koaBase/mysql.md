# 添加配置 mysql

> 安装依赖 pnpm add mysql2 sequelize

- [sequelize 地址](https://www.sequelize.cn/)

## sequelize 配置 mysal

> src/db/seq.js

```shell
const { Sequelize } = require("sequelize");
const {
  MYSQL_DB,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
} = require("../config/config.default");
const seq = new Sequelize(MYSQL_DB, MYSQL_USERNAME, MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  timezone: "+08:00",
});

/**
 * 测试连接
 */
// try {
//   seq.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

module.exports = seq;
```

## koa 中使用

> 添加 server model 文件夹

- server 数据库 server
- model 数据库 model

### server/test.server.js

```shell
const Test = require("../model/test.model");

class TestService {
  testList = async () => {
    try {
      const res = await Test.findAll();

      return res;
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = new TestService();
```

### model/test.model.js

```shell
const { DataTypes } = require("sequelize");

const seq = require("../db/seq");
//创建模型
const Test = seq.define(
  "test",
  {
    //id 会被自动创建
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名，唯一",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "密码",
    },
    sex: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: 0,
      comment: "0 男",
    },
  },
  {
    tableName: "user", //数据表名字
  }
);

module.exports = Test;

// Test.sync({ force: true });
// 模型同步;

```
