const userModel = require('../model/user')



const registerUser = async(req , res) =>{
    const {username , firstName , lastName , email , password} = req.body;
    console.log("body:" , req.body)
    try{
        if(username && firstName && email && password){
            await userModel.create({
                username:username,
                firstName:firstName,
                lastName:lastName, 
                email:email,
                password:password
            })
            return res.status(201).json({message:"User Successfuly created"})
        }
        else{
            res.status(401).json({message:"enter valid input"})
            // console.log(req.body)
        }
    }
    catch(error){
        if(error.code === 11000){
            res.send("Email address already exist")
        }
        else{
            res.json({message:"something went wrong"})
        }
    }
}


module.exports = registerUser