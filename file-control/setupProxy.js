// const proxy = require("http-proxy-middleware");

import proxy from 'http-proxy-middleware'

export default (app) => {
    app.use(
        proxy("/api/", {
            target: "localhost:3999",
            changeOrigin: true
        })
    );
};