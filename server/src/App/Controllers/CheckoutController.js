
const Order = require('../Models/Order');
const OrderItems = require('../Models/OrderItem');

class CheckoutController {

    async store(req,res){
        let listError = {};
        const { firstName,lastName,streetAddress,apartmentAddress,city,country,sdt,email, notes, cart, totalETH,totalVND} = req.body;
        const newOrder  = new Order({firstName,lastName,streetAddress,apartmentAddress,city,country,sdt,email, notes, totalETH,totalVND});
        const cartItems = JSON.parse(cart);
        await newOrder.save()
                .then((result)=>{
                    for (let i = 0; i < cartItems.length; i++) {
                        let orderItem = cartItems[i];
                        let prepareOrderItem =  new OrderItems({orderID: result._id,productID:orderItem._id,qty: orderItem.quantity,price:orderItem.price})
                        prepareOrderItem.save().then((data)=>{
                            
                        });
                    }
                    res.status(200).json({success:true,message:"Add Order Successfully ",orderID:result._id});
                })
                .catch((error)=>{
                    listError = {
                        ...listError,
                        firstName:error.errors.firstName ? error.errors.firstName.message : '',
                        lastName:error.errors.lastName ? error.errors.lastName.message : '',
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
                return false;
    }

    async populateData(req,res){
        let products = {} ;
        products = await OrderItems.find()
        .populate('orderID')
        .populate('productID')
        .sort({ createdAt: 1 }).limit(3);
        if(products){
            res.status(200).json({success:true,products});
        }
    }
}

module.exports = new CheckoutController;