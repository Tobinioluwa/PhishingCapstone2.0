let deviceChart, countryChart;

const palette = ["#2f6f5e", "#c98a3e", "#7d6bab", "#c85c5c", "#4a90a4", "#a3a3a3", "#d1b04f"];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function renderChart(canvasId, existingChart, labels, data, type) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  if (existingChart) existingChart.destroy();
  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => palette[i % palette.length]),
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
      scales: type === "bar" ? { y: { beginAtZero: true, ticks: { precision: 0 } } } : {},
    },
  });
}

async function loadStats() {
  const res = await fetch("/api/stats");
  const stats = await res.json();

  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-unique").textContent = stats.uniqueIps;

  const topCountry = Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("stat-top-country").textContent = topCountry ? topCountry[0] : "–";

  const topDevice = Object.entries(stats.byDeviceType).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("stat-top-device").textContent = topDevice ? topDevice[0] : "–";

  const deviceEntries = Object.entries(stats.byDeviceType).sort((a, b) => b[1] - a[1]);
  deviceChart = renderChart("deviceChart", deviceChart, deviceEntries.map(e => e[0]), deviceEntries.map(e => e[1]), "doughnut");

  const countryEntries = Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 8);
  countryChart = renderChart("countryChart", countryChart, countryEntries.map(e => e[0]), countryEntries.map(e => e[1]), "bar");
}

async function loadVisits() {
  const res = await fetch("/api/visits");
  const visits = await res.json();
  const tbody = document.getElementById("visits-body");

  if (!visits.length) {
    tbody.innerHTML = `<tr><td colspan="7">No visits recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = visits
    .map((v) => {
      const time = new Date(v.timestamp).toLocaleString();
      const location = [v.city, v.region, v.country].filter(Boolean).join(", ");
      return `<tr>
        <td>${escapeHtml(time)}</td>
        <td>${escapeHtml(v.ip)}</td>
        <td>${escapeHtml(location)}</td>
        <td>${escapeHtml(v.deviceType)}</td>
        <td>${escapeHtml(v.deviceModel)}</td>
        <td>${escapeHtml(v.os)}</td>
        <td>${escapeHtml(v.browser)}</td>
      </tr>`;
    })
    .join("");
}

loadStats();
loadVisits();

setInterval(() => {
  loadStats();
  loadVisits();
}, 15000);
