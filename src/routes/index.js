const { Router } = require('express');


routes.use((_, res) => {
  response(res, { status: false, message: 'Route not found' }, 404);
});

module.exports = routes;
