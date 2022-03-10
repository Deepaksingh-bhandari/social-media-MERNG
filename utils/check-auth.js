const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../config')


module.exports=(context)=>{
    const authHeader= context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1]
        if(token)
        {
            try{
                console.log(token,typeof(token),SECRETKEY)
                const user= jwt.verify(token,SECRETKEY)
                console.log(user)
                return user;
            // ,(err,user)=>{
                    //  if(!user)
                    //  throw new AuthenticationError('Invalid/Expired Token')
                    //  else 
                // })
            }
            catch(err){
                console.log("Error ",err)
                throw new AuthenticationError('Invalid/Expired Token found')
            }
        }
        throw new Error('Authentication token must be \'Bearer [token]')
    }
    throw new Error('Authorization header must be provided')
}