const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../../config')
const { UserInputError } = require('apollo-server-express')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

generateToken=(user)=>{
    return  jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, SECRETKEY, { expiresIn: '5h' })
}

module.exports = {
    Mutation: {
        // register(parent,args,context,info)       //parent--> value of previous query/step  args---> argument values  context-->   info--> metadata
        async register(_, { registerInput: { userName, email, password, confirmPassword } }, context, info)       //parent--> value of previous query/step  args---> argument values  context-->   info--> metadata
        {

            // Validate User Data
            const { valid, errors } = validateRegisterInput(userName, email, password, confirmPassword)
            if (!valid)
                throw new UserInputError('Errors', { errors })

            // Make sure user doesn't already exist
            const user = await User.findOne({ userName })
            if (user) {
                console.log("Existing user", user)
                throw new UserInputError('This UserName is taken', {
                    errors: {
                        userName: "This user Name is taken"
                    }
                })
            }

            // Hash Password & create auth token
            password = await bcrypt.hash(password, 12)
            const newUser = new User({
                userName,
                password,
                email,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save();
            const token=generateToken(res)

            // const token = jwt.sign({
            //     id: res.id,
            //     email: res.email,
            //     userName: res.userName
            // }, SECRETKEY, { expiresIn: '1h' })

            // console.log("User",res,res._doc,user)
            return {
                ...res._doc,     //_doc contains the data in JSON format
                id: res._id,
                token
            }
        },

        async login(_,{userName,password}){
            const {errors,valid}=validateLoginInput(userName,password)
            const user = await User.findOne({userName})
            
            if(!valid){
                throw new UserInputError('Errors',{errors})                
            }
            if(!user){
                errors.general='User not found'
                throw new UserInputError('User not found',{errors})
            }

            const match = await bcrypt.compare(password,user.password)
            if(!match){
                errors.general='Wrong credentials'
                throw new UserInputError('Wrong credentials',{errors})
            }
            
            const token=generateToken(user)
            return {
                ...user._doc,     //_doc contains the data in JSON format
                id: user._id,
                token
            }
        }

    },
    // Query: {
    //     async getPosts() {
    //         try {
    //             const users = await User.find();
    //             console.log("posts", users)
    //             return users;
    //         }
    //         catch (err) {
    //             throw new Error(err)
    //         }
    //     }
    // }
}