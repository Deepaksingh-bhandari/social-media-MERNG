const {gql}= require('apollo-server-express')
// const {gql}= require('graph-ql')      //can import from graph-ql or apollo-server

const typeDefs=gql`
type Post{
    id: ID!
    body: String!
    createdAt:String!
    userName:String!
    comments: [Comment]!
    likes: [Like]!
    likeCount:Int!
    commentCount:Int!
}
type User{
    id: ID!
    email:String!
    token:String!
    userName: String!
    createdAt:String!
}
type Comment{
    id: ID!
    createdAt: String!
    userName: String!
    body: String!
}
type Like{
    id: ID!
    createdAt:String!
    userName: String!
}
input RegisterInput{
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
}
type Query{
    getPosts: [Post]     #excalmation mark shows that the porperty is required
    getPost(postId:ID):Post!
}
type Mutation{
    # For Users Sign-in/ Login
    register(registerInput: RegisterInput):User!          #accepts registerInput of RegisterInput type & returns User
    login(userName:String!,password:String!):User!        #accepts userName & Pwd & returns User
    
    # For Post creation/deletion   
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!

    #For comment creation/deletion
    createComment(postId: String!,body:String!):Post!
    deleteComment(postId: String!,commentId:String!):Post!

    #For Like/unlike
    likePost(postId:ID!):Post!
}
# To implement the pub sub model
type Subscription{
    newPost: Post!
}
`
module.exports = typeDefs