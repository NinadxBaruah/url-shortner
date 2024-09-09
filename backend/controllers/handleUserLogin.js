const userModel = require("../model/user");
const {v4:uuidv4} = require('uuid')
const {setJwtToken , verifyJwtToken } = require('../service/auth')
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.comparePassword(password, function (error, isMatch) {
      if (error) {
        return res
          .stauts(500)
          .json({ message: "Something went wrong", error: error });
      }
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "enter vaild email or password" });
      }

      
      const token = setJwtToken(user);
      return res
  .status(200)
  .cookie('userId', token, {
    httpOnly: true,
    // sameSite: 'None',
    secure: false,
 // Change this to true, even for localhost
    maxAge: 24 * 60 * 60 * 1000
  })
  .json({ message: "Login Successful" });
      // res.status(200).json({ message: "Login Successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const userLoginPage = (req,res) =>{
  res.render('register')
}

module.exports = {userLogin , userLoginPage};
