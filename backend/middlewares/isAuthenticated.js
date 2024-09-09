const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  try {
    const { userId } = req.cookies;
    // console.log(userId)
    if (!userId) return res.status(401).json({ message: "No token Provided" });
    const decode = await jwt.verify(userId, process.env.JWT_SECRET);

    if(decode){
      req.userId = decode.id;
      next();
    }else{
      return res.status(401).json({ message: 'Invalid or expired token1' });
    }

  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAuthenticated;
