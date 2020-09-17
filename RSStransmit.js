const addr = 'http://justlook.iptime.org:3000/update?temp=';
var request = require("request")
var parseString = require('xml2js').parseString;
i = 0

function doit () {
	
	request("http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=1144068000", function(err,res,body){
	
		if(err)
			console.error('kma error'+err);
		else{
			
			parseString(body, function(err, result){
				if(err)
					console.error(err);
				var weather = result.rss.channel[0].item[0].description[0].body[0].data[0].temp;
				console.log(weather);
				
				request(addr+weather, function(err,res, body) {
				if(err)
					console.error(err);
				else
					console.log(body)
				})

				
				request("https://api.thingspeak.com/update?api_key=JBFKFKUF2QCPSL3B&field3="+weather, function(err,res,body){
				if(err)
					console.error(err)
				else
					console.log(body)
				})
			})
		}
	
	})
	
	if(i++ > 10) return
	setTimeout(doit, 6000000);
}

console.log("ready")
doit()