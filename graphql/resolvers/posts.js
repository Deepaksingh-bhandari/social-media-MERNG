const { AuthenticationError } = require('apollo-server-express');
const Post = require('../../models/Post')
const checkAuth= require('../../utils/check-auth')
const { PubSub } =require('graphql-subscriptions');

const pubsub = new PubSub();

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt:-1});    //sort sorts the result in descending order here
                console.log("posts", posts)
                return posts;
            }
            catch (err) {
                throw new Error(err)
            }
        },

        async getPost(_,{postId}) {
            const post = await Post.findById(postId);
            try {
                if (post)
                    return post
                else
                    throw new Error('Post not Found')
                }
                catch(err){
                throw new Error(err)

            }
            
        }
    },
    Mutation:{
        async createPost(_,{body},context){
            const user= checkAuth(context)
            console.log("user from posts",user)
            if(body.trim()===''){
                throw new Error('Post body must not be empty')
            }
            const newPost = new Post({
                body,
                id:user.id,
                userName:user.userName,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save();

            // Publishing a post to the subscribed user
            pubsub.publish('NEW_POST',{
                newPost: post
            })
            console.log("Saved Post",post)
            return post;
        },

        async deletePost(_,{postId},context){
            const user= checkAuth(context)
            try{
                const post = await Post.findById(postId);
                if(user.userName===post.userName)
                {
                    post.delete()
                    return "Post deleted succesfully"
                }
                else 
                {throw new AuthenticationError("Action not allowed")}
            }
            catch(err){
                throw new Error(err)
            }
        },

        async likePost(_,{postId},context){
            const {userName}=checkAuth(context)
            const post= await Post.findById(postId)

            if(post){
                console.log("post",post)
                if(post.likes?.find(like=>like.userName===userName)){
                    // Post Already liked, unlike it
                    post.likes=post.likes.filter(like=>like.userName !==userName);
                    await post.save();
                }
                else{
                    // Post not liked,like it
                    post.likes?.push({
                      userName: userName,
                      createdAt: new Date().toISOString()
                    })
                }
                await post.save()
                return post;
                
            }
            else{
                throw new AuthenticationError('Post not found')
            }
        }
    },
    Subscription:{
        newPost:{
            subscribe:(_,__,___)=> pubsub.asyncIterator('NEW_POST')
        }
    }
}