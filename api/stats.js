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

    // Visits grouped by calendar day (last 14 days, oldest first) for an activity chart
    const byDayMap = {};
    for (const v of visits) {
      const day = v.timestamp.slice(0, 10); // YYYY-MM-DD
      byDayMap[day] = (byDayMap[day] || 0) + 1;
    }
    const today = new Date();
    const last14 = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      last14.push({ day: key, count: byDayMap[key] || 0 });
    }

    res.status(200).json({
      total,
      uniqueIps,
      byDeviceType: countBy("deviceType"),
      byBrowser: countBy("browser"),
      byOs: countBy("os"),
      byDay: last14,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load stats" });
  }
};
