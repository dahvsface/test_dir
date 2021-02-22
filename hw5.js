// Course: CS290 - Web Development
// Student Name: Dave Huston
// Assignment: HW5: GET and POST checker
// Description:

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 6946);

var tablify = function(object) {
    {
        //Declare variable
        var list = '<ul>';
        //Loop until end
        for (var key in object)
        {
            //Set parameters
            list += '<li><strong style="font-family: monospace;">' + key + '</strong>: ' + object[key] + '</li>';
        }
        //Return
        return list + '</ul>';
    }
}
app.get('/',function(req,res){
    res.render('get');

    var table = document.createElement('table');
    table += '<table><tbody><tr>';
    table += '<td>url: ' + req.url + '</td>';
    table += '<td>body: ' + tablify(req.body) + '</td>';
    table += '</tr></tbody></table>';
    res.send(table);
});

app.post('/',function(req,res){
    res.render('post');
    
    var table = document.createElement('table');
    table += '<table><tbody><tr>';
    table += '<td>url: ' + req.url + '</td>';
    table += '<td>body: ' + tablify(req.body) + '</td>';
    table += '</tr></tbody></table>';
    res.send(table);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
