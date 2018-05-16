const routes = require('next-routes')();

routes
.add('/bank/new', '/bank/new')
.add('/bank/receive', '/bank/receive')
.add('/bank/show', '/bank/show');

module.exports = routes;
