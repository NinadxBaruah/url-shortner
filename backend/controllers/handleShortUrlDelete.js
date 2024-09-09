const shortUrl = require("../model/shortUrl");

const handleShortUrlDelete = async (req, res) => {
  const userId = req.userId; // Extract userId from the request
  const shortUrlFromClient = req.params.shortUrlId; // Extract shortUrl from the request parameters

  if (!shortUrlFromClient) {
    return res.status(400).json({ message: "shortUrl is required!" });
  }

  try {
    // Find and delete the URL matching both shortUrl and userId
    const result = await shortUrl.deleteOne({
      shortUrl: shortUrlFromClient,
      user: userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "URL not found or not authorized to delete!" });
    }

    res
      .status(200)
      .json({ message: "URL deleted successfully", url: shortUrlFromClient });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleShortUrlDelete;
