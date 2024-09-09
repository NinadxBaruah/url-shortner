const userModel = require('../model/user');

const CheckUser = async (req, res) => {
  // console.log(req.cookies)
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "The username is required" });

  if (username) {
    try{
        const user = await userModel.findOne({ username: username });
        if (user) {
          return res.status(200).json({ isUnique: false });
        } else {
          return res.status(200).json({ isUnique: true });
        }
    }catch(err){
        res.status(401).json({error:"Something Went Wrong!"})
    }

  }
};

module.exports = CheckUser;