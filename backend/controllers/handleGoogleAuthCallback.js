const jwt = require("jsonwebtoken");
const handleGoogleAuthCallback = (req, res) => {
  try {
    const token = jwt.sign(
      { id: req.user.id, displayName: req.user.firstName },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.cookie("userId", token, { maxAge: 24 * 60 * 60 * 1000,httpOnly:true });
    res.redirect(`${process.env.SITE_URL}`);
  } catch (err) {
    res.redirect(`${process.env.SITE_URL}login`);
  }
};

module.exports = handleGoogleAuthCallback;
