var express = require("express");
var app = express();
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");

app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
    fs.readdir('./uploads', function (err, data) {
        if (err) throw err; 
        res.render('mainvscode', { files: data })
    })
})

app.get("/files/:abhy", function (req, res) {
    fs.readdir('./uploads', function (err, data) {
        if (err) throw err;
        fs.readFile(`./uploads/${req.params.abhy}`, 'utf8', function (err, magic) {
            if (err) throw err;
            res.render('abhinamnahipata', { files: data, truck: magic,filename:req.params.abhy})
        });
    })
})

app.get("/newfile",function(req,res){
    fs.writeFile(`./uploads/${req.query.filename}`, "", (err) => {
        if (err) throw err;
        res.redirect("/");
    });

})

app.get("/filedata/:filename",function(req,res){
    fs.writeFile(`./uploads/${req.params.filename}`, req.query.filedata , (err) => {
        if (err) throw err;
        res.redirect("back");
    });

})


app.listen(3000);