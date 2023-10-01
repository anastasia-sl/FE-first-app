const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', (req, res, next) => {
            console.log("Proxy triggered", req.path);
            next();
        },
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        }));
};
