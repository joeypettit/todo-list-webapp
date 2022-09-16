const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const shoeRouter = require('./routes/todo.router');

app.use(express.urlencoded({extended: true}));

// Static File Server
app.use(express.static('server/public'));






// Start server
app.listen(PORT, () =>{
    console.log('Listening on', PORT);
});