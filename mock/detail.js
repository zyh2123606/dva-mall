module.exports = {
	'POST /api/get-detail-by-id': function(req, res){
		let data = {
            1001: {
                name: '无限蓝牙耳机',
                amount: 1000,
                colors: [{
                    color_id: 100,
                    color: '白色'
                },{
                    color_id: 200,
                    color: '黑色'
                },{
                    color_id: 300,
                    color: '金色'
                },{
                    color_id: 400,
                    color: '蓝色'
                }]
            }
        }
		setTimeout(()=>{
			res.json({
				result: true,
				data: data[1001],
				msg: '',
				errorcode: ''
			});
		}, 1000);
    },
    'GET /api/goods/getGoodsInfo':function(req,res){
        let data = {
            1001:{
            typeId:1,
            typeName:'无线蓝牙耳机',
            title:'无线蓝牙耳机 待机99999小时',
            logoPath:'',
            typeUnit:'个',
            goodsTypeAttrList:[
                {
                    attrId:1,
                    attrName:'颜色',
                    attrValList:[
                        {
                            attrValId:88,
                            attrCode:'白色',
                            selected:0
                        },
                        {
                            attrValId:89,
                            attrCode:'黑色',
                            selected:0
                        },
                        {
                            attrValId:90,
                            attrCode:'蓝色',
                            selected:1
                        },
                        {
                            attrValId:91,
                            attrCode:'金色',
                            selected:0
                        },
                    ]
                },
                {
                    attrId:2,
                    attrName:'容量',
                    attrValList:[
                        
                    ]
                }
            ],
            goodsPicList:[
                {
                    picId:12,
                    picPath:'',
                    picName:'详情一',
                    showSort:1
                },
                {
                    picId:13,
                    picPath:'',
                    picName:'详情二',
                    showSort:2
                },
                {
                    picId:13,
                    picPath:'',
                    picName:'详情三',
                    showSort:3
                },
                {
                    picId:14,
                    picPath:'',
                    picName:'详情四',
                    showSort:4
                }
            ],
            defaultSkuId:3,
            defaultSkuPrice:999900003
            }
        }
		setTimeout(()=>{
			res.json({
				hasnext: false,
				data: data[1001],
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 1000);
    },
    'POST /api/goods/getSkuInfo':function(req,res){
        let data = {
            1001:{
                id:1,
                deptId:1,
                goodsName:'无线蓝牙耳机 待机99999小时',
                salePrice:999900001,
                sharePrice:999900001,
                saleNum:99
            },
            1002:{
                id:2,
                deptId:1,
                goodsName:'无线蓝牙耳机 待机99999小时',
                salePrice:999900002,
                sharePrice:999900004,
                saleNum:12
            },
            1003:{
                id:3,
                deptId:1,
                goodsName:'无线蓝牙耳机 待机99999小时',
                salePrice:999900003,
                sharePrice:999900003,
                saleNum:77
            },
            1004:{

                id:4,
                deptId:1,
                goodsName:'无线蓝牙耳机 待机99999小时',
                salePrice:999900004,
                sharePrice:999900004,
                saleNum:44
            },
        }
		setTimeout(()=>{
            let dataResult={}
            const {typeId,attrList}=req.body
            console.log(attrList)
            switch(Number.parseInt(attrList[0].attrValld)){
                case 88:
                    dataResult=data[1001];
                    break;
                case 89:
                    dataResult=data[1002];
                    break;
                case 90:
                    dataResult=data[1003];
                    break;
                case 91:
                    dataResult=data[1004];
                    break;
                default:
                    break
            }
			res.json({
				hasnext: false,
				data: dataResult,
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 200);
    },
    'POST /api/orders/addCart':function(req,res){
        
		setTimeout(()=>{
			res.json({
				hasnext: false,
				data: null,
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 200);
    },
    'GET /api/orders/myCartList':function(req,res){
        let data = {
            1001:[
                {
                    cartId:1,
                    skuId:1,
                    goodsName:'无线蓝牙耳机 待机99999小时',
                    logoPath:'',
                    skuAttr:[],
                    amount:99,
                    price:999900001,
                    totalMoney:99999999999
                },
                {
                    cartId:2,
                    skuId:1,
                    goodsName:'无线蓝牙耳机 待机99999小时',
                    logoPath:'',
                    skuAttr:[],
                    amount:99,
                    price:999900001,
                    totalMoney:99999999999
                },
                {
                    cartId:3,
                    skuId:1,
                    goodsName:'无线蓝牙耳机 待机99999小时',
                    logoPath:'',
                    skuAttr:[],
                    amount:99,
                    price:999900001,
                    totalMoney:99999999999
                }
            ],
        }
		setTimeout(()=>{
			res.json({
				hasnext: false,
				data: data[1001],
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 200);
    },
    'GET /api/dept/getAdoptDeptList':function(req,res){
        let data = {
            1001:[
                {
                    deptId:1,
                    deptName:'自提门店1',
                    deptAddress:'云南省昆明市和五华区XXX1',
                    deptTel:'11111111',
                    deptManager:'张三',
                    deptLatitude:234.11,
                    saleNum:9,
                    sharePrice:99999000.4,
                    distance:7.9
                },
                {
                    deptId:2,
                    deptName:'自提门店2',
                    deptAddress:'云南省昆明市和五华区XXX2',
                    deptTel:'11111112',
                    deptManager:'李四',
                    deptLatitude:234.11,
                    saleNum:10,
                    sharePrice:99999000.4,
                    distance:9.9
                },
                {
                    deptId:3,
                    deptName:'自提门店3',
                    deptAddress:'云南省昆明市和五华区XXX3',
                    deptTel:'11111113',
                    deptManager:'王五',
                    deptLatitude:234.11,
                    saleNum:9,
                    sharePrice:99999000.4,
                    distance:12.9
                }
            ],
        }
		setTimeout(()=>{
			res.json({
				hasnext: false,
				data: data[1001],
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 200);
    },
    'GET /api/mem/addr/getList':function(req,res){
        let data = {
            1001:[
                {
                    id:1,
                    memId:1,
                    defaultFlag:2,
                    deptTel:'11111111',
                    province:1,
                    city:1,
                    county:1,
                    address:'云南省昆明市五华区moumou接到',
                    receiver:'张三',
                    tel:'15908891121'
                },
                {
                    id:2,
                    memId:1,
                    defaultFlag:1,
                    deptTel:'222222',
                    province:1,
                    city:1,
                    county:1,
                    address:'云南省昆明市盘龙区昆明同德广场',
                    receiver:'李四',
                    tel:'1830987890'
                },
                {
                    id:1,
                    memId:1,
                    defaultFlag:2,
                    deptTel:'3333333',
                    province:1,
                    city:1,
                    county:1,
                    address:'云南省昆明市XXXXXXX',
                    receiver:'张学友',
                    tel:'13988822222'
                },
            ],
        }
		setTimeout(()=>{
			res.json({
				hasnext: false,
				data: data[1001],
				msg: '成功',
                code: '1111',
                result:true
			});
		}, 200);
    }
}