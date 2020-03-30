const graphql =require ('graphql');
const {GraphQLObjectType,GraphQLSchema,GraphQLString,GraphQLID,GraphQLInt}=graphql;
const _=require('lodash');
//ddummy data
var books=[
    {name:'name of the wind',genre:'fantasy',id:'1'},
    {name:'air',genre:'horror',id:'2'},
    {name:'ben',genre:'nothing',id:'3'},
]
var authors=[
    {name:"ben",age:26,id:'1'},
    {name:"riki",age:6,id:'2'},
    {name:"franklin",age:2,id:'3'},
]
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
id:{type:GraphQLID},
name:{type:GraphQLString},
age:{type:GraphQLInt}
    })
})
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{
                id:{
                    type:GraphQLID
                }
            },
            resolve(parent,args){
                //code to get data from db
               return  _.find(books,{id:args.id});
            }
        } ,
        author:{
            type:AuthorType,
            args:{ id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id});
            }
        }
    }
}

);
module.exports=new GraphQLSchema({
    query:RootQuery
})