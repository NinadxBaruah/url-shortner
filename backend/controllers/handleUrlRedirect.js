const shortUrl = require("../model/shortUrl");

const handleUrlRedirect = async (req, res) => {
  const shortUrlId = req.params.shortUrlId; // Correct parameter name
  console.log(shortUrlId)

  try {
    // Find the short URL in the database
    const urlRecord = await shortUrl.findOne({ shortUrl: shortUrlId });

    if (urlRecord) {
      // If found, redirect to the original URL
      urlRecord.clicks += 1;
      await urlRecord.save();
      res.status(200).json({redirectUrl:urlRecord.urlToRedirect})
    } else {
      // If not found, send a 404 error
      res.status(404).json({ message: 'Short URL not found' });
    }
  } catch (error) {
    console.error('Error handling URL redirect:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = handleUrlRedirect;
