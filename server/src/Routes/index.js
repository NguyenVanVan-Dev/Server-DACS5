
const categoryRouter = require('./category');
const productRouter = require('./product');
const authRouter = require('./auth');
const siteRouter = require('./site');
const contractRouter = require('./contract');
const checkoutRouter = require('./checkout');
const orderRouter = require('./order');
function route(app){

    app.use('/api', authRouter);
    app.use('/product', productRouter);
    app.use('/category', categoryRouter);
    app.use('/contract', contractRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/order', orderRouter);
    app.use('/', siteRouter);
    
}

module.exports = route