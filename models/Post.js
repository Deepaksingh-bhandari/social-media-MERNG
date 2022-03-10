const {model,Schema}= require('mongoose');

const postSchema=new Schema({
    body:String,
    userName: String,
    createdAt: String,
    comments:[
        {
            body:String,
            userName: String,
            createdAt: String,
        }
    ],
    likes:[
        {
            userName: String,
            createdAt: String,
        }
    ],
    user:[
        {
            // userName: String,
            // password: String,
            // email: String,
            // createdAt: String,
           type: Schema.Types.ObjectId,
           ref: 'User',     //Reference to users table
        }
    ],
    likeCount:Number,
    commentCount:Number,

})

module.exports=model('Post',postSchema)

