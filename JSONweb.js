const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = 'DATA.json'

app.get('/update', (req, res) => {
  
  res.send('Data Accepted');
  fs.readFile(path,function(err,data){if(err){console.error(err);}var weather = JSON.parse(data);addData(req.query.temp,weather)});
  console.log(req.query.temp);
  
})

app.listen(port, () => {
  console.log('Example app listening at http://localhost:'+port);
  fs.readFile(path,function(err,data){
    if(err){console.error(err);}
    if(!fs.existsSync(path))
      console.log("DATA file not detected. Automatically generate new data JSON file.")
      newJSON();
  })
})

function addData(obj, weather){
  var tmp = {temp:obj, date:new Date()};
  weather.datas.push(tmp);
  weather.savtime = getTime();
  fs.writeFile(path,JSON.stringify(weather),function(err){if(err)console.error(err)});

}

function getTime(){

  var now = new Date();
  var year = now.getFullYear();
  var month = ('0' + now.getMonth()).slice(-2);
  var date = ('0' + now.getDate()).slice(-2);
  var hours = ('0' + now.getHours()).slice(-2);
  var minutes = ('0' + now.getMinutes()).slice(-2);
  var seconds = ('0' + now.getSeconds()).slice(-2);
  var tstring = 'Lastly Saved : ' + year + month + date + '_' + hours + minutes + seconds;
  return tstring;
}

function newJSON(){

  var weather = { savtime:'',datas:[]};
  fs.writeFile(path, JSON.stringify(weather),function(err){if(err)console.error(err)});
  return weather;

}