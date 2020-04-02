const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema')
const Mongoose=require('mongoose');
import {graphqlExpress,graphiqlExpress}from 'apollo-server-express';
const dbURI='mongodb+srv://ben:ben12345@cluster0-o79ou.mongodb.net/test?retryWrites=true&w=majority';
Mongoose.connect(dbURI,{ useNewUrlParser: true ,useUnifiedTopology: true } ,function(err){    
    if(err){
    console.log('Some problem with the connection ' +err)   
    } 
    else {
    console.log('The Mongoose connection is ready')  
    }
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))
app.use('/',graphiqlExpress({endpointURL:'/graphql'}))
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server started on port: ${process.env.PORT || 3000}`);
  });
