const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Site Stats</title>
<link rel="stylesheet" href="/style.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js"></script>
</head>
<body>
  <div class="dash-header">
    <h1>Site Stats</h1>
    <div><a href="/">&larr; Back to site</a></div>
  </div>

  <div class="stats-row" id="stats-row">
    <div class="stat-card"><div class="value" id="stat-total">–</div><div class="label">Total Visits</div></div>
    <div class="stat-card"><div class="value" id="stat-unique">–</div><div class="label">Unique IPs</div></div>
    <div class="stat-card"><div class="value" id="stat-top-country">–</div><div class="label">Top Country</div></div>
    <div class="stat-card"><div class="value" id="stat-top-device">–</div><div class="label">Top Device Type</div></div>
  </div>

  <div class="charts-row">
    <div class="chart-card">
      <h3>Visits by Device Type</h3>
      <canvas id="deviceChart"></canvas>
    </div>
    <div class="chart-card">
      <h3>Visits by Country</h3>
      <canvas id="countryChart"></canvas>
    </div>
  </div>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>IP Address</th>
          <th>Location</th>
          <th>Device Type</th>
          <th>Device Model</th>
          <th>OS</th>
          <th>Browser</th>
        </tr>
      </thead>
      <tbody id="visits-body">
        <tr><td colspan="7">Loading…</td></tr>
      </tbody>
    </table>
  </div>

  <script src="/insights.js"></script>
</body>
</html>`;

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
