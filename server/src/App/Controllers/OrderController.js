const Order = require('../Models/Order');


class OrderController {
    async getAll(req, res) {
        await Order.find()
        .populate("listItemOrder")
        .populate({
            path:"listItemOrder",
            populate:{path: 'productID'}
        })
        .sort({ createdAt: -1 })
        .then((orders) => {
            res.status(200).json({success:true,orders})
        })
        .catch((err) => {
            res.status(500).json({success: false, message: err.message});
        });
        
    }
    async detail(req, res) {
        const { id } = req.query
        console.log(id)
        await Order.find({_id: id})
        .populate("listItemOrder")
        .populate({
            path:"listItemOrder",
            populate:{path: 'productID'}
        })
        .sort({ createdAt: 1 })
        .then((order) => {
            res.status(200).json({success:true,order})
        })
        .catch((err) => {
            res.status(500).json({success: false, message: err.message});
        });
    }
    async update(req,res) {
        let update = { $set: req.body };
        await Order.updateOne({_id:req.body.id},update)
        .then((data) => {
            console.log(data);
            res.status(200).json({success:true});
        })
        .catch((error)=> {
            console.log(error);
            res.status(400).json({success:false,message: error.message});
        })
    }
    
}

module.exports = new OrderController;