module.exports = {
    env: {
        BACKEND_URL: 'http://localhost:5000'
    },
    webpackDevMiddleware: config => {
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        }
        return config
      }
  }