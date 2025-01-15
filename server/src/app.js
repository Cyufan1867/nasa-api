// 导⼊ express 模块，⽤于创建和配置应⽤程序
const express = require('express');
// 创建⼀个 express 应⽤程序实例
const app = express();
// 使⽤ express 内置的中间件解析 JSON 格式的请求体
app.use(express.json());
// 导出应⽤程序实例，以便在其他⽂件中使⽤
module.exports = app;