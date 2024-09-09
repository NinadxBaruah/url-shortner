const handleAuthCheck = (req , res)  =>{
  res.status(200).json({isLogIn:true})
} 



module.exports = handleAuthCheck;