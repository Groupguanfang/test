const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use("*", (req, res, next) => {
  // 从请求中提取 URL
  let targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("No URL provided");
  }

  // 创建代理中间件
  let proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    logLevel: "debug",
    followRedirects: true,
    pathRewrite: {
      [`^/`]: "", // 删除代理路径的前缀
    },
  });

  // 使用代理中间件处理请求
  return proxy(req, res, next);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
