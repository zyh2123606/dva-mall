module.exports = {
    'POST /api/get-detail-by-id': function (req, res) {
        let data = {
            1001: {
                name: '无限蓝牙耳机',
                amount: 1000,
                colors: [{
                    color_id: 100,
                    color: '白色'
                }, {
                    color_id: 200,
                    color: '黑色'
                }, {
                    color_id: 300,
                    color: '金色'
                }, {
                    color_id: 400,
                    color: '蓝色'
                }]
            }
        }
        setTimeout(() => {
            res.json({
                result: true,
                data: data[1001],
                msg: '',
                errorcode: ''
            });
        }, 1000);
    },
    'POST /api/get-my-order': function (req, res) {
        let data = {
            1001: {
                amount: 2,
                data: [{
                    orderCode: 'ORDER10067854567898',
                    status: 1,
                    product_count: 1,
                    goodsInfo: [{
                        goodsName: '小米手机最新款，不要998不要698只有88',
                        imgurl: 'https://2e.zol-img.com.cn/product/192_100x75/618/cegGc5GCdPxxo.jpg',
                        Money: 3874,
                        Amount: 2
                    }, {
                        goodsName: '大米手机最新款，不要998不要698只有88',
                        imgurl: 'https://2e.zol-img.com.cn/product/192_100x75/618/cegGc5GCdPxxo.jpg',
                        Money: 6778,
                        Amount: 1
                    }]
                }, {
                    orderCode: 'ORDER20045894567389HK',
                    status: 2,
                    product_count: 2,
                    goodsInfo: [{
                        goodsName: '小米手机最新款，不要998不要698只有88',
                        imgurl: 'https://2e.zol-img.com.cn/product/192_100x75/618/cegGc5GCdPxxo.jpg',
                        Money: 3874,
                        Amount: 2
                    }]
                }, {
                    orderCode: 'ORDER20045894567389HK',
                    status: 3,
                    product_count: 2,
                    goodsInfo: [{
                        goodsName: '小米手机最新款，不要998不要698只有88',
                        imgurl: 'https://2e.zol-img.com.cn/product/192_100x75/618/cegGc5GCdPxxo.jpg',
                        Money: 3874,
                        Amount: 2
                    }]
                }]
            }
        }
        setTimeout(() => {
            res.json({
                result: true,
                data: data[1001],
                msg: 'success',
                errorcode: '0'
            });
        }, 1000);
    }
}
