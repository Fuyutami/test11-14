const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
	app.use(
		'/sdapi/v1/txt2img',
		createProxyMiddleware({
			target: 'http://127.0.0.1:7860',
			changeOrigin: true,
		})
	)
}
