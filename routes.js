const routes = require('next-routes')();

routes
.add('/bank/send', '/bank/send')
.add('/bank/receive', '/bank/receive');

module.exports = routes;
