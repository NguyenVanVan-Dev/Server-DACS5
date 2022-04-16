const categoryModle = require('../Models/Category')



class CategoryController {
    //[POST] /category/store
    async store(req, res){
        let listError = {};
        const category = await categoryModle.findOne({ name: req.body.name })
        try {
            if(category){
                listError ={
                    name:"Category already in use, please add another category!"
                }
                return res.status(400).json({success:false, message:"Add Category Failure!",listError})
            }
            const categorySave  = new categoryModle(req.body);
            await  categorySave.save()
                    .then((result)=>{
                        res.status(200).json({success:true,message:"Add Category Successfully "});
                    })
                    .catch((error)=>{
                        listError = {
                            name:error.errors.name ? error.errors.name.message : '',
                            keyword:error.errors.keyword ? error.errors.keyword.message : '',
                            desc:error.errors.desc ? error.errors.desc.message  : '',
                            slug:error.errors.slug ? error.errors.slug.message  : ''
                        };
                        res.status(400).json({success:false,message:"Add CategoryFailure!",listError});
                    });
        } catch (error) {
            res.status(500).json({success:false,message:"Internal Server Error"});
        }
    }
    //[GET] /category/show
    async show(req,res){
        // console.log(this.detail(req,res));
        let whoCall = req.query.whoCall;
        let type = req.query.type;
        let category ;
        try {
            if(whoCall == 'admin'){
                category = await categoryModle.find();
            }else {
                switch (type) {
                    case 'featured':
                        category = await categoryModle.find({display:1}).limit(4);
                        break;
                    default:
                        category = await categoryModle.find({display:1});
                        break;
                }
            }
            if(category){
                res.status(200).json({success:true,category});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }
    //[GET] /category/detail
    async detail(req,res){
        let id = req.query.id
        console.log(req.query.id)
        try {
            const category = await categoryModle.findOne({_id:id});
            if(category){
                res.status(200).json({success:true,category});
            }
            else
            {
                res.status(403).json({success:false,message:"Category not Found"});
            }
        } catch (error) {
            res.status(500).json({success:false,error});
        }
    }
    //[PUT] /category/update/:id
    async update(req,res){
        let listError = {};
        try {
            const opts = { runValidators: true };
            await  categoryModle.updateOne({ _id: req.body.id },{ $set: req.body},opts)
                    .then((result)=>{
                        res.status(200).json({success:true,message:"Update Category Successfully "});
                    })
                    .catch((error)=>{
                        listError = {
                            name:error.errors.name ? error.errors.name.message : '',
                            keyword:error.errors.keyword ? error.errors.keyword.message : '',
                            desc:error.errors.desc ? error.errors.desc.message  : '',
                            slug:error.errors.slug ? error.errors.slug.message  : ''
                        };
                        res.status(403).json({success:false,message:"Update Category Failure!",listError});
                    });
        } catch (error) {
            res.status(500).json({success:false,message:"Internal Server Error"})
        }
    }
    async delete(req,res){
      const  {id} = req.query;
      if(!id){
        res.status(403).json({success:false,message:"Delete Category Failure , Infomation not found"});
      }
      try {
        await  categoryModle.deleteOne({ _id: id })
                            .then((result)=>{
                                res.status(200).json({success:true,message:"Delete Category Successfully "});
                            })
      } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
      }
    }
}


module.exports = new CategoryController;