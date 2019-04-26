var express = require('express')
var multer = require('multer');
var app = express();
var path=require('path');
var ejs = require('ejs');


app.set('view engine', 'ejs');
app.use(express.static('./resources'));

 
 
//ROUTES WILL GO HERE
app.get('/', (req, res) => res.render('form'));

 

app.listen(3000, () => console.log('Server started on port 3000'));


app.use(express.static('./resources'));

//storage for uploaded file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'resources/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})
 
var upload = multer({ storage: storage })



app.post('/uploads', upload.single('myImage'), (req, res, next) => {
  var file = req.file
  if (!file) {
    var error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})
