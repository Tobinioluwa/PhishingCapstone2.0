const { getVisits } = require("./_lib/track");

module.exports = async (req, res) => {
  try {
    const visits = await getVisits();
    const total = visits.length;
    const uniqueIps = new Set(visits.map((v) => v.ip)).size;

    const countBy = (key) =>
      visits.reduce((acc, v) => {
        const k = v[key] || "Unknown";
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      }, {});

    res.status(200).json({
      total,
      uniqueIps,
      byDeviceType: countBy("deviceType"),
      byCountry: countBy("country"),
      byBrowser: countBy("browser"),
      byOs: countBy("os"),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load stats" });
  }
};
