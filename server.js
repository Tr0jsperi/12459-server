const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (error, req, res, next) {
  if(error instanceof SyntaxError){
    return res.status(500).send({
      'success': false,
      'message':'Invalid Data',
      'data': null,
    });
  } else {
    next()
  }
})

app.post('/12459row', (req, res) => {
  return FindData(res, req.body.mode,req.body.head)
})

app.post('/12459dn', (req, res) => {
  return ListDN(res, req.body.mode)
})

app.post('/12459tname', (req, res) => {
  return TableName(res)
})

app.use(function(req, res, next) {
  res.status(501)
  res.json({
    'success': false,
    'message':'Invalid Request',
    'data': null,
  })
  next()
})




app.listen(9009, () => {
  console.log('Server started on port 9009')
})

//接收请求，返回指定管径对应的管件尺寸
function FindData(res, mode,head) {

  try {
    let Row = ReadData(head,mode)
    return res.status(200).send({
      success: true,
      message: '',
      data: Row
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: 'Find None',
      data: null
    })    
  }
}

//查询函数
//输入参数：管径；查询管件类别
//返回参数：对应管径的管件尺寸数据
function ReadData (tarstr,tnum){
  if (tnum < 2 || tnum > 12){
    throw "Wrong mode"; 
  }
  var fs=require("fs"); 
  var filePath = "./res/table"+tnum+".json"
  var data=fs.readFileSync(filePath,"utf-8"); 
  jsonparsed = JSON.parse(data)
  for (i=0 ;i<jsonparsed.length;i++)
  {
    if (jsonparsed[i].v1 == tarstr){
      return jsonparsed[i]
    }
  }
  throw "Cannot find "+tarstr; 
  return ""
}

//接收请求，返回指定类型管件的公称尺寸列表
function ListDN (res, mode) {

  try {
    let DNL = ReadList(mode)
    return res.status(200).send({
      success: true,
      message: '',
      data: DNL
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: 'Wrong Mode',
      data: null
    })    
  }
}

//查询函数
//输入参数：查询管件类别
//返回参数：管径公称尺寸列表
function ReadList (tnum){
  if (tnum < 2 || tnum > 12){
    throw "Wrong mode"; 
  }
  var fs=require("fs"); 
  var filePath = "./res/table"+tnum+".json"
  var data=fs.readFileSync(filePath,"utf-8"); 
  jsonparsed = JSON.parse(data)
  var dn = []
  for (i=0 ;i<jsonparsed.length;i++)
  {
    dn.push(jsonparsed[i].v1)
  }
  if (dn == []){
    throw "Wrong Mode"; 
  }
  return JSON.stringify(dn)
}

//接收请求，返回管件名称列表
function TableName (res) {

  try {
    let TableName = ReadTableName()
    return res.status(200).send({
      success: true,
      message: '',
      data: TableName
    })
  } catch (error) {
    console.log(error)
    return res.status(400).send({
      success: false,
      message: 'Cannot ReadList pip fittings',
      data: null
    })    
  }
}

//查询函数
//输入参数：无
//返回参数：管件名称列表
function ReadTableName (){
  var fs=require("fs"); 
  var filePath = "./res/tablename.json"
  var data=fs.readFileSync(filePath,"utf-8"); 
  //jsonparsed = JSON.parse(data)
  return data
}


