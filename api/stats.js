const { getVisits } = require("./_lib/track");

module.exports = async (req, res) => {
  try {
    const visits = await getVisits();
    const list = Array.isArray(visits) ? visits : [];
    const total = list.length;
    const uniqueIps = new Set(list.map((v) => v.ip)).size;
    const countBy = (key) =>
      list.reduce((acc, v) => {
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
    console.error("stats error:", err);
    res
      .status(200)
      .json({
        total: 0,
        uniqueIps: 0,
        byDeviceType: {},
        byCountry: {},
        byBrowser: {},
        byOs: {},
      });
  }
};