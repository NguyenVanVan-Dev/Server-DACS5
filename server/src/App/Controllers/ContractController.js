
const Contract = require('../Models/Contract')

class ContractController {
    //[POST] /contract/store
    async store(req, res){
        const {name, email,wallet,address} = req.body;
        console.log(name);
        const contract = await Contract.findOne({ name })
        let listError = {};
        
        try {
            if(contract){
                listError ={
                    name:"Contract already in use, please add another Contract!"
                }
                return res.status(400).json({success:false, message:"Add Contract Failure!",listError})
            }
            const contractSave  = new Contract({ 
                name,
                email,
                wallet,
                address,
            });
            await  contractSave.save()
                    .then((result)=>{
                        res.status(200).json({success:true,message:"Add Contract Successfully "});
                    })
                    .catch((error)=>{
                        console.log(error.errors)
                        listError = {
                            name:error.errors.name ? error.errors.name.message : '',
                            email:error.errors.email ? error.errors.email.message : '',
                            wallet:error.errors.wallet ? error.errors.wallet.message  : '',
                            address:error.errors.address ? error.errors.address.message  : ''
                        };
                        res.status(403).json({success:false,message:"Add Contract Failure!",listError});
                    });
        } catch (error) {
            res.status(500).json({success:false,message:"Internal Server Error"})
        }
    }
    //[GET] /contract/show
    async show(req,res){
        let contract ;
        try {     
            contract = await Contract.find();
            if(contract){
                res.status(200).json({success:true,contract});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }
    //[DELETE] /contract/delete/:id
    async delete(req,res){
        const  {id} = req.query;
        if(!id){
          res.status(403).json({success:false,message:"Delete Contract Failure , Infomation not found"});
        }
        try {
          await  Contract.deleteOne({ _id: id })
                              .then((result)=>{
                                  res.status(200).json({success:true,message:"Delete Contract Successfully "});
                              })
        } catch (error) {
          console.log(error)
          res.status(500).json({success:false,message:"Internal Server Error"})
        }
      }
}


module.exports = new ContractController;