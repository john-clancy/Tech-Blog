// add dependancies
const express= require('express');
const routes= require('./routes');
const sequelize= require('./connection');

const app= express()
const PORT = process.env.PORT || 3001;

app.use(express.json());

//turn on routes
app.use(routes);
//server connection
sequelize.sync({force: true})
.then((=> {
    app.listen(PORT,()=>
    console.log('Now listening'));
}));