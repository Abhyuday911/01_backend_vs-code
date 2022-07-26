var express = require("express");
var app = express();
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");
// var compiler = require("compilex");
const { c, cpp, node, python, java } = require('compile-run');
var compile_run = require('compile-run');

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
            res.render('abhinamnahipata', { files: data, truck: magic, output: "", filename: req.params.abhy })
        });
    })
})

app.get("/newfile", function (req, res) {
    fs.writeFile(`./uploads/${req.query.filename}`, "", (err) => {
        if (err) throw err;
        res.redirect(`/files/${req.query.filename}`);
    });

})

app.get("/filedata/:filename", function (req, res) {
    fs.writeFile(`./uploads/${req.params.filename}`, req.query.filedata, (err) => {
        if (err) throw err;
        res.redirect(`/files/${req.params.filename}`);
        // res.redirect("back")
    });

})

//`/files/${req.params.filename}`

app.get("/delete/:filename", function (req, res) {
    fs.unlink(`./uploads/${req.params.filename}`, (err) => {
        if (err) throw err;
        res.redirect("/");
    });

})

app.get("/refresh", function (req, res) {
    res.redirect("back")
})


app.get("/compilecode/:filename", function (req, res) {
    var code = req.query.code;
    var input = 2;
    var lang = "cpp";
    if (lang === "c" || lang === "cpp") {
        let resultPromise = cpp.runFile(`./uploads/${req.params.filename}`, { stdin: '3\n2 ' });
        resultPromise
            .then(result => {
                
                fs.readdir('./uploads', function (err, data) {
                    if (err) throw err;
                    fs.readFile(`./uploads/${req.params.filename}`, 'utf8', function (err, magic) {
                        if (err) throw err;
                        res.render('abhinamnahipata', { files: data, truck: magic, output: result.stdout, filename: req.params.filename })
                    });
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
});


app.listen(3000);