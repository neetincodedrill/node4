const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db  =  require("./db");
var cors = require('cors')


app.use(cors())

db.connectToServer(function(err){
    var user = require('./routes/user')
    app.use('/users',user)

    app.listen(port,() => {
        console.log('Server is running at port ' + port);
    })
})