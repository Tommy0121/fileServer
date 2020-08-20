const { createProxyMiddleware } = require('http-proxy-middleware');

// import proxy from 'http-proxy-middleware'

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:3999",
            changeOrigin: true
        })
    );
};