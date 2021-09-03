// app.js
const express = require('express')
const app = express()
const port = 3000

//Setting template engine as handlebars
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


//I.ConsoleMessage middleware
var consoleMessage =function (req,res,next){
  
  //Step IA.Get timestamp
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
  //return all time unit values  within this string array
  req.requestTime = yyyy+'-'+mm+'-'+dd+' '+hr+':'+min+':'+sec;

  //Step IB.Obtain http method
  req.httpMethod = req.method;
  
  //Step IC.Obtain Url
  req.routesUrl = req.url;
  
  //Step ID.Combine these 3 params together before using it
  req.consoleMessage = req.requestTime +' | '+req.httpMethod+' from '+req.routesUrl;  
  next();
}


//Step IE.Using middleware
app.use(consoleMessage);

//   GET /
app.get('/', (req, res) => {
  const text ='列出全部Todo';
  //Display console Message on index.hbs
  var msg = req.consoleMessage
 
  //Console out message
  console.log(req.consoleMessage)
  res.render('index',{text,msg})
})

//GET /new
app.get('/new', (req, res) => {
  const text = '新增 Todo 頁面';
  var msg = req.consoleMessage
  console.log(req.consoleMessage)
  res.render('index',{text,msg})
})
 
//GET :/id
app.get('/:id', (req, res) => {
  const text ='顯示一筆 Todo' ;
  var msg = req.consoleMessage
  console.log(req.consoleMessage)
  res.render('index',{text,msg})
 
})

//New  create post
app.post('/', (req, res) => {
  const text ='新增一筆 Todo';
  var msg = req.consoleMessage
  console.log(req.consoleMessage)
  res.render('index',{text,msg})
 
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})