const postResolvers=require('./posts')
const userResolvers=require('./users')
const commentResolvers=require('./comments')

// Resolvers resolves the query & returns output 
module.exports={

    // Modifiers- runs everytime a query or mutation returns a Post
    Post:{
        likeCount:(parent)=>{
            console.log(parent)
            return parent.likes.length
        },
        commentCount:(parent)=>parent.comments.length
    },
    Query:{
        ...postResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...postResolvers.Subscription
    }
}