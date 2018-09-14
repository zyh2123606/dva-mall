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
    }
}