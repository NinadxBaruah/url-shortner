const { default: mongoose } = require("mongoose");
const shortUrl = require("../model/shortUrl");

const handleGetUserLinks = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    // Find URLs and sort them by createdAt in descending order
    const urls = await shortUrl.find({ user: userId }).sort({ createdAt: -1 });
    if (!urls || urls.length === 0) {
      return res.status(404).json({ message: "URLs not found!" });
    }
    const responseUrl = urls.map((item) => ({
      domain: item.urlToRedirect,
      clicks: item.clicks,
      shortUrl: item.shortUrl
    }));
    res.status(200).json({ message: responseUrl });
  } catch (error) {
    console.error("Error fetching user links:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = handleGetUserLinks;
