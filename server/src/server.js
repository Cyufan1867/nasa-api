// 导⼊ http 模块，⽤于创建 HTTP 服务器
const http = require('http');
// 引⼊应⽤程序配置，这⾥指向了⼀个 './app' ⽂件
const app = require('./app');
// 定义服务器端⼝号，优先使⽤环境变量中的 PORT，若未定义则默认使⽤ 8000 端⼝
const PORT = process.env.PORT || 8000;
// 使⽤ http 模块的 createServer ⽅法创建⼀个服务器实例，并传⼊应⽤程序对象（app）
const server = http.createServer(app);
// 监听指定的端⼝号，启动服务器，并在成功启动后打印提⽰信息
server.listen(PORT, () => {
    console.log(`NASA-API运⾏于${PORT}端⼝〜`); // 输出正在监听的端⼝号
});