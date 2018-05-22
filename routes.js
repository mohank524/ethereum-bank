const routes = require('next-routes')();

routes
.add('/bank/:address', '/bank/new')
.add('/bank/:address/loan/new', '/bank/loan/new')
.add('/bank/:address/loan/show', '/bank/loan/show')
.add('/bank/:address/final', '/bank/loan/new')
.add('/bank/show', '/bank/show');

module.exports = routes;
