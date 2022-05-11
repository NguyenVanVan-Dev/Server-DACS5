const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');
const Web3 = require('web3');
require('dotenv').config();
const abi = require("../../../ABI.json"); // address Ropsten Ethscan 0x9ED09DA23dB437ebc515E05CE40661c5A6b7E371
const OganiABI_V2 = require("../../../OganiABI_V2.json"); // address Ropsten Ethscan 0x4bE6Da0e943adc8397B923A3562a0bfDf850909A
const Order = require('../Models/Order');
const OrderItems = require('../Models/OrderItem');

class CheckoutController {
    //[POST] /checkout/store
    async store(req,res){
        let listError = {};
        const newOrder  = new Order(req.body);
        const cartItems = JSON.parse(req.body.cart);
        await newOrder.save()
                .then((result)=>{
                    res.status(200).json({success:true,message:"Add Order Successfully ",orderID:result._id});
                })
                .catch((error)=>{
                    listError = {
                        ...listError,
                        name:error.errors.name ? error.errors.name.message : '',
                        streetAddress:error.errors.streetAddress ? error.errors.streetAddress.message  : '',
                        apartmentAddress:error.errors.apartmentAddress ? error.errors.apartmentAddress.message  : '',
                        city:error.errors.city ? error.errors.city.message  : '',
                        country:error.errors.country ? error.errors.country.message  : '',
                        sdt:error.errors.sdt ? error.errors.sdt.message  : '',
                        email:error.errors.email ? error.errors.email.message  : '',
                        notes:error.errors.notes ? error.errors.notes.message  : '',
                        total:error.errors.total ? error.errors.total.message  : '',
                    };
                    res.status(400).json({success:false,message:"Add Product Failure!",listError});
                });
                for (let i = 0; i < cartItems.length; i++) {
                    let orderItem = cartItems[i];
                    let prepareOrderItem =  new OrderItems({orderID: newOrder._id,productID:orderItem._id,qty: orderItem.quantity,price:orderItem.price})
                    prepareOrderItem.save().then((data)=>{
                        Order.findOne({_id:newOrder._id}, (err, order) => {
                            if (order) {
                                order.listItemOrder.push(data);
                                order.save();
                            }
                        });
                    });
                }
                return false;
    }
    //[GET] /checkout/order-placed
    async get(req,res) {
        const { email } = req.query
        let orders = await Order.find({email})
        if(orders){
            res.status(200).json({success:true,orders});
        }
    }
    //[GET] /checkout/order-detail
    async detail(req,res) {
        const { id } = req.query
        let listItem =  await OrderItems.find({orderID:id}).populate('productID')
        res.status(200).json({success: true, listItem}) 
    }
    async delete(req, res) {
        const { id, wallet} = req.body
        await Order.findOne({_id:id})
        .then((data) => {
            this.refundsMoneyOrder(wallet, data.totalETH) 
        })
        .then((data) =>  Order.deleteOne({_id:id}))
        .then((data) => { res.status(200).json({success: true})})
        .catch((error) =>  {
            console.log(error)
            res.status(400).json({success:false,error: error});
        });
           
    }
    async refundsMoneyOrder(addressReceve, amount) {
        const credentials = { apiKey: process.env.REPLAY_API , apiSecret: process.env.REPLAY_SECRET_KEY };
        const provider = new DefenderRelayProvider(credentials, { speed: 'fast' });
        const web3 = new Web3(provider);
        const amountETH =  web3.utils.toWei(amount.toString(), "ether");
        const [from] = await web3.eth.getAccounts();
        const OganiManager = new web3.eth.Contract(OganiABI_V2, "0x4bE6Da0e943adc8397B923A3562a0bfDf850909A",{ from });
        return await OganiManager.methods.refundsOrderUser(addressReceve.toString(), amountETH).send();
    }
    async populateData(req,res){
        let products =  await OrderItems.find({email:"van666@gmail.com"})
        .populate("listItemOrder")
        .populate({
            path:"listItemOrder",
            populate:{path: 'productID'}
        })
        .sort({ createdAt: 1 });
        if(products){
            res.status(200).json({success:true,products});
        }
    }
}

module.exports = new CheckoutController;