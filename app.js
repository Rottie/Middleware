// app.js
const express = require('express')
const app = express()
const port = 3000


var requestTime = function (req, res, next) {
  req.requestTime = new Date();
  
  //Get year,month,day,hour,min,seconds
  var dd = req.requestTime.getDate();
  var mm = req.requestTime.getMonth()+1; 
  var yyyy = req.requestTime.getFullYear();
  var hr = req.requestTime.getHours();
  var min = req.requestTime.getMinutes();
  var sec = req.requestTime.getSeconds();


  //If value day,month,hour,minutes,seconds less than 0,will add '0' string before display out
  if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
  if(hr<10) 
{
    hr='0'+hr;
}
 if(min<10) 
{
    min='0'+min;
} 
 if(sec<10) 
{
    sec='0'+sec;
} 

//return all values  with this string array
  req.requestTime = yyyy+'-'+mm+'-'+dd+' '+hr+':'+min+':'+sec;
  next()
}


var httpMethod = function (req, res, next) {
  req.httpMethod = req.method;
  next()
}

var routesUrl = function (req, res, next) {
  req.routesUrl = req.url;
  next()
}


app.use(requestTime)
app.use(httpMethod)
app.use(routesUrl)

app.get('/', (req, res) => {

    var responseText = req.requestTime +' | '+req.httpMethod+' from '+req.routesUrl;
   
  res.send(responseText)
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})
 
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})