const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');
const Web3 = require('web3');
require('dotenv').config();
const abi = require("../../../ABI.json"); //address Ropsten network Etherscan 0x9ED09DA23dB437ebc515E05CE40661c5A6b7E371 
class SiteController {

    async index( req,res) {
        const data = {
            title: " Xin chào! Đây là đồ án cơ sở 5 của mình rất vui khi bạn vào xem nó ",
            desc: " Đây là phần server của đồ án này mình sử dụng NodeJS Express để xây dựng ra nó",
            api:" Sau đây là 1 số API mình đùng để trả dữ liệu cho Client",
            dataUrl: {
                "All product show in client": "https://ecom-block.herokuapp.com/product/show",
                "All category show in client":"https://ecom-block.herokuapp.com/category/show",
                "Other Api" : " Mình có sử dụng Authorization nên còn một số APi phải đăng nhập mới có thể sử dụng"
            },
            info:"bạn có thể truy cập vào trang admin thông quan URL : http://ecommerce-blockchian-19it290.surge.sh/admin/login or nhấn vào biểu tượng market tại home page (topbar) ",
            info1:"trang quản trị mình dùng để CRUD category, product, địa chỉ ví và thông tin nhà cung cấp sản phẩm, các giao dịch chuyển tiền cho nhà cung cấp sản phẩm",
            info2:"hiện tại mình chỉ đang phát triển vẫn còn 1 số lỗi ở client và server dự định hoàn thành trước 31/5",
            info3:"mình dùng web3 và ganache để deploy và test smartcontrat nên phần thanh toán bằng ETH và add product bạn vẫn chưa dùng được đâu nhé",
            info4:"mình đang cố gắng học thêm để có thể deploy smartcntract lên rinkynetwork của Etherscan để mọi người có thể sử dụng được các chức năng chính của website này",
            info5:"Smartcontract mình tự buil bằng truffle nó chỉ đơn giãn thôi tầm 8 function và 1 vài uint, mapping, và struct dùng để lưu các thông tin khi có transaction",
            info6:"mình đang cố gắng hơn trong con đường làm lâp trình viên bằng cách học những gì mình thích và cần, thoãi mái với cuộc sống, hạn chế tiêu cực nhất có thể...Mình không giỏi nhưng mình sẽ cố gắng hết mức hè hè",
            info7:"Cảm ơn vì đã ghé thăm đồ án của mình <3",
        }
        res.status(200).json({data});
    }
    async testRelay(req,res) {
        const credentials = { apiKey: process.env.REPLAY_API , apiSecret: process.env.REPLAY_SECRET_KEY };
        const provider = new DefenderRelayProvider(credentials, { speed: 'fast' });
        const web3 = new Web3(provider);
        const [from] = await web3.eth.getAccounts();
        const OganiManager = new web3.eth.Contract(abi, "0x9ED09DA23dB437ebc515E05CE40661c5A6b7E371", { from });
        const tx = await OganiManager.methods.userPaymentOrder("ecommerce-blockchian-0901").send({
            value:web3.utils.toWei("0.01", "ether")
        });
        
        res.status(200).json({message: "Success!",tx});
    }
}
module.exports = new SiteController;