const { default: mongoose } = require("mongoose");
const shortUrl = require("../model/shortUrl");
const handleSubmitUrl = async (req, res) => {
  const { domain } = req.body;
  const userId = req.userId;
//   console.log("userId:", userId);
//   console.log("Is valid ObjectId?", mongoose.Types.ObjectId.isValid(userId));
// console.log("userId",userId)
  function getRandomString(n) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let result = [];

    // Add two numbers to the result array
    for (let i = 0; i < 2; i++) {
      result.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }

    // Fill the rest of the result array with random letters
    for (let i = 2; i < n; i++) {
      result.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }
    // Convert the array back to a string
    return result.join("");
  }
   try{
     const urlString = getRandomString(7);
      const url = await shortUrl.create({
      shortUrl: urlString,
      urlToRedirect: domain,
      user: new mongoose.Types.ObjectId(userId),
     clicks: 0,
    });
    // console.log(url)
    res.status(201).json({ message: "short url successfuly created",urlString:urlString });
   }

   catch(err){
    console.error("Error creating short URL:", err);
    res.status(500).json({ message: "Failed to create short url" });
   }
    

    
  
};

module.exports = handleSubmitUrl;
