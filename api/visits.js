const { getVisits } = require("./_lib/track");

module.exports = async (req, res) => {
  try {
    const visits = await getVisits();
    res.status(200).json(visits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load visits" });
  }
};
