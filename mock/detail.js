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
    },
    'GET /api/goods/getGoodsInfo': function (req, res) {
        let data = {
            1001: {
                typeId: 1,
                typeName: '无线蓝牙耳机',
                title: '无线蓝牙耳机 待机99999小时',
                logoPath: '',
                typeUnit: '个',
                goodsTypeAttrList: [
                    {
                        attrId: 1,
                        attrName: '颜色',
                        attrValList: [
                            {
                                attrValId: 88,
                                attrCode: '白色',
                                selected: 0
                            },
                            {
                                attrValId: 89,
                                attrCode: '黑色',
                                selected: 0
                            },
                            {
                                attrValId: 90,
                                attrCode: '蓝色',
                                selected: 1
                            },
                            {
                                attrValId: 91,
                                attrCode: '金色',
                                selected: 0
                            },
                        ]
                    },
                    {
                        attrId: 2,
                        attrName: '容量',
                        attrValList: []
                    }
                ],
                goodsPicList: [
                    {
                        picId: 12,
                        picPath: '',
                        picName: '详情一',
                        showSort: 1
                    },
                    {
                        picId: 13,
                        picPath: '',
                        picName: '详情二',
                        showSort: 2
                    },
                    {
                        picId: 13,
                        picPath: '',
                        picName: '详情三',
                        showSort: 3
                    },
                    {
                        picId: 14,
                        picPath: '',
                        picName: '详情四',
                        showSort: 4
                    }
                ],
                defaultSkuId: 3,
                defaultSkuPrice: 999900003
            }
        }
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data[1001],
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 1000);
    },
    'POST /api/goods/getSkuInfo': function (req, res) {
        let data = {
            1001: {
                id: 1,
                deptId: 1,
                goodsName: '无线蓝牙耳机 待机99999小时',
                salePrice: 999900001,
                sharePrice: 999900001,
                saleNum: 99
            },
            1002: {
                id: 2,
                deptId: 1,
                goodsName: '无线蓝牙耳机 待机99999小时',
                salePrice: 999900002,
                sharePrice: 999900004,
                saleNum: 12
            },
            1003: {
                id: 3,
                deptId: 1,
                goodsName: '无线蓝牙耳机 待机99999小时',
                salePrice: 999900003,
                sharePrice: 999900003,
                saleNum: 77
            },
            1004: {

                id: 4,
                deptId: 1,
                goodsName: '无线蓝牙耳机 待机99999小时',
                salePrice: 999900004,
                sharePrice: 999900004,
                saleNum: 44
            },
        }
        setTimeout(() => {
            let dataResult = {}
            const {typeId, attrList} = req.body
            switch (Number.parseInt(attrList[0].attrValld)) {
                case 88:
                    dataResult = data[1001];
                    break;
                case 89:
                    dataResult = data[1002];
                    break;
                case 90:
                    dataResult = data[1003];
                    break;
                case 91:
                    dataResult = data[1004];
                    break;
                default:
                    break
            }
            res.json({
                hasnext: false,
                data: dataResult,
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'POST /api/cart/update': function (req, res) {
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: 2,
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'GET /api/cart/myCartList': function (req, res) {
        let data = {
            1001: [
                {
                    cartId: 1,
                    skuId: 1,
                    goodsName: '无线蓝牙耳机 待机99999小时',
                    logoPath: '',
                    attrList: [
                        {
                            attrId: 1,
                            baseAttrId: 1,
                            baseAttrName: '颜色',
                            attrValId: '12',
                            attrCode: '土豪金'
                        }
                    ],
                    amount: 99,
                    salePrice: 999900001,
                    totalMoney: 99999999999
                },
                {
                    cartId: 2,
                    skuId: 1,
                    goodsName: '无线蓝牙耳机 待机99999小时',
                    logoPath: '',
                    attrList: [
                        {
                            attrId: 1,
                            baseAttrId: 1,
                            baseAttrName: '颜色',
                            attrValId: '12',
                            attrCode: '土豪金'
                        }
                    ],
                    amount: 99,
                    salePrice: 999900001,
                    totalMoney: 99999999999
                }
            ],
        }

        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data[1001],
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'GET /api/dept/getAdoptDeptList': function (req, res) {
        let data = {
            1001: [
                {
                    deptId: 1,
                    deptName: '自提门店1',
                    deptAddress: '云南省昆明市和五华区XXX1',
                    deptTel: '11111111',
                    deptManager: '张三',
                    deptLatitude: 234.11,
                    saleNum: 9,
                    sharePrice: 99999000.4,
                    distance: 7.9
                },
                {
                    deptId: 2,
                    deptName: '自提门店2',
                    deptAddress: '云南省昆明市和五华区XXX2',
                    deptTel: '11111112',
                    deptManager: '李四',
                    deptLatitude: 234.11,
                    saleNum: 10,
                    sharePrice: 99999000.4,
                    distance: 9.9
                },
                {
                    deptId: 3,
                    deptName: '自提门店3',
                    deptAddress: '云南省昆明市和五华区XXX3',
                    deptTel: '11111113',
                    deptManager: '王五',
                    deptLatitude: 234.11,
                    saleNum: 9,
                    sharePrice: 99999000.4,
                    distance: 12.9
                }
            ],
        }
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data[1001],
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'GET /api/mem/addr/getList': function (req, res) {
        let data = {
            1001: [
                {
                    id: 1,
                    memId: 1,
                    defaultFlag: 2,
                    deptTel: '11111111',
                    province: 1,
                    city: 1,
                    county: 1,
                    address: '云南省昆明市五华区moumou接到',
                    receiver: '张三',
                    tel: '15908891121'
                },
                {
                    id: 2,
                    memId: 1,
                    defaultFlag: 1,
                    deptTel: '222222',
                    province: 1,
                    city: 1,
                    county: 1,
                    address: '云南省昆明市盘龙区昆明同德广场',
                    receiver: '李四',
                    tel: '1830987890'
                },
                {
                    id: 1,
                    memId: 1,
                    defaultFlag: 2,
                    deptTel: '3333333',
                    province: 1,
                    city: 1,
                    county: 1,
                    address: '云南省昆明市XXXXXXX',
                    receiver: '张学友',
                    tel: '13988822222'
                },
            ],
        }
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data[1001],
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'POST /api/orders/create': function (req, res) {
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: '153098786768576767',
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'POST /api/order/pay': function (req, res) {
        let data = {
            pickupCode: '789678777777',
            actualMoney: 89348593485,
            addrId: 1,
            deptId: 1,
            adoptDeptId: 1,
            dispatchWay: 2,
            freeMoney: 0,
            memId: 0,
            orderCode: 892384488448484,
            status: 2,
            totalMoney: 89348593485,
            createTime: '2018-09-09 12:12:12',
            updateTime: '2018-09-20 12:12:12',
        }
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data,
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'GET /api/mem/myaddr/getList': function (req, res) {
        let data = [
            {
                id: 1,
                memid: 8,
                defaultFlag: 2,
                province: 1,
                city: 1,
                county: 1,
                address: '云南省昆明市XXXXXXX',
                receiver: '张学友',
                tel: '13988822222'

            },
            {
                id: 2,
                memid: 8,
                defaultFlag: 1,
                province: 1,
                city: 1,
                county: 1,
                address: '云南省昆明市滨江西路51号',
                receiver: '张学友1',
                tel: '13988811111'
            }
        ]
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data,
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    },
    'GET /api/order/getList': function (req, res) {
        let data = {
            "code": "0000",
            "data": [
                {
                    "actualMoney": 2024400,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 1,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 2,
                            "attrList": [
                                {
                                    "attrCode": "128G",
                                    "attrId": 2,
                                    "attrValId": 16,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 1,
                                    "attrValId": 12,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XS 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1014700,
                            "skuId": 80,
                            "typeId": 15

                        },
                        {
                            "amount": 2,
                            "attrList": [
                                {
                                    "attrCode": "64G",
                                    "attrId": 2,
                                    "attrValId": 15,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 1,
                                    "attrValId": 12,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XS 土豪金 64G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1012200,
                            "skuId": 79,
                            "typeId": 15

                        }

                    ],
                    "id": 2,
                    "orderCode": "1537242365523660280",
                    "totalMoney": 2024400

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 3,
                    "memo": "",
                    "orderCode": "1537426415346254991",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 4,
                    "memo": "",
                    "orderCode": "1537426987014924430",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 5,
                    "memo": "",
                    "orderCode": "1537427097221666974",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 3,
                    "addressInfo": {
                        "address": "五华区云都国际",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 2,
                        "provinceName": "云南省",
                        "receiver": "张三",
                        "tel": "911"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 6,
                    "memo": "",
                    "orderCode": "1537427597971794186",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 7,
                    "memo": "",
                    "orderCode": "1537429779037302139",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 8,
                    "memo": "",
                    "orderCode": "1537430298771115734",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 9,
                    "memo": "",
                    "orderCode": "1537430337535808651",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 10,
                    "memo": "",
                    "orderCode": "1537435297193805940",
                    "totalMoney": 2050000

                },
                {
                    "actualMoney": 2050000,
                    "addrId": 2,
                    "addressInfo": {
                        "address": "五华区劝学巷",
                        "cityName": "昆明市",
                        "countyName": "五华区",
                        "defaultFlag": 1,
                        "provinceName": "云南省",
                        "receiver": "赵丽颖",
                        "tel": "119"

                    },
                    "adoptDeptId": 0,
                    "deptId": 1,
                    "deptName": "云南联通沃店",
                    "dispatchWay": 2,
                    "freeMoney": 0,
                    "goodsList": [
                        {
                            "amount": 1,
                            "attrList": [
                                {
                                    "attrCode": "土豪金",
                                    "attrId": 3,
                                    "attrValId": 18,
                                    "baseAttrId": 3,
                                    "baseAttrName": "颜色",
                                    "selected": 0

                                },
                                {
                                    "attrCode": "128G",
                                    "attrId": 4,
                                    "attrValId": 22,
                                    "baseAttrId": 4,
                                    "baseAttrName": "内存",
                                    "selected": 0

                                }

                            ],
                            "goodsName": "iphone XR 土豪金 128G",
                            "logoPath": "00000000000000000000000000000000",
                            "price": 1000000,
                            "skuId": 71,
                            "typeId": 16

                        }

                    ],
                    "id": 11,
                    "memo": "",
                    "orderCode": "1537435943877785163",
                    "totalMoney": 2050000

                }

            ],
            "hasNext": 0,
            "msg": "操作成功"
        }
        setTimeout(() => {
            res.json({
                hasnext: false,
                data: data,
                msg: '成功',
                code: '1111',
                result: true
            });
        }, 200);
    }

}

