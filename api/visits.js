const { getVisits } = require("./_lib/track");

module.exports = async (req, res) => {
  try {
    const visits = await getVisits();
    // Always return an array — never an error object the frontend can't .map()
    res.status(200).json(Array.isArray(visits) ? visits : []);
  } catch (err) {
    console.error("visits error:", err);
    res.status(200).json([]); // Return empty array, not error object
  }
};