const { UserInputError, AuthenticationError } = require('apollo-server')
const Post = require('../../models/Post')
// const User = require('../../models/User')
const checkAuth = require('../../utils/check-auth')

module.exports={
    Mutation:{
        createComment: async (_,{postId,body},context)=>{
            console.log("Context for createComment",context)
            const {userName} = checkAuth(context)
            if(body.trim()===''){
                throw new UserInputError('Empy comment',{
                    errors:{
                        body: 'Comment must not be empty'
                    }
                })
            }
          const post = await Post.findById(postId);
          if(post){
              post.comments.unshift({
                body,
                userName,
                createdAt: new Date().toISOString()
              })
              await post.save()
              return post;
          }
          else{
              throw new UserInputError('Post not found')
          }
        },

        deleteComment: async (_,{postId,commentId},context)=>{
            const {userName} = checkAuth(context)
            const post= await Post.findById(postId)

            if(post){
                const commentIndex=post.comments.findIndex(c=>c.id===commentId)

                if(post.comments[commentIndex].userName===userName)
                    { 
                        post.comments.splice(commentIndex,1);
                        await post.save();
                        return post;
                    }
                else{
                    throw new AuthenticationError('Action not allowed')
                }
            }
            else{
                throw new UserInputError('Post not found')
            }

        }

    }
}