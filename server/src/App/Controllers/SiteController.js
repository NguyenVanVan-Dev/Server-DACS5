
class SiteController {

    async index( req,res) {
        res.status(200).json({message: " xin chao"});
    }
}
module.exports = new SiteController;