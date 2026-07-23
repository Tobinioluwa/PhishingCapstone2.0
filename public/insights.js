let activityChart, deviceChart;

const palette = ["#2f6f5e", "#c98a3e", "#7d6bab", "#c85c5c", "#4a90a4", "#a3a3a3", "#d1b04f"];

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function renderActivityChart(labels, data) {
  const ctx = document.getElementById("activityChart").getContext("2d");
  if (activityChart) activityChart.destroy();
  activityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Visits",
        data,
        borderColor: "#2f6f5e",
        backgroundColor: "rgba(47, 111, 94, 0.12)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
        x: { ticks: { font: { size: 10 } } },
      },
    },
  });
}

function renderDeviceChart(labels, data) {
  const ctx = document.getElementById("deviceChart").getContext("2d");
  if (deviceChart) deviceChart.destroy();
  if (!labels.length) return;
  deviceChart = new Chart(ctx, {
    type: "doughnut",
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
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
    },
  });
}

async function loadStats() {
  const res = await fetch("/api/stats");
  const stats = await res.json();

  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-unique").textContent = stats.uniqueIps;

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry = stats.byDay.find((d) => d.day === todayKey);
  document.getElementById("stat-today").textContent = todayEntry ? todayEntry.count : 0;

  const topDevice = Object.entries(stats.byDeviceType).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("stat-top-device").textContent = topDevice ? topDevice[0] : "–";

  const dayLabels = stats.byDay.map((d) => {
    const [, m, day] = d.day.split("-");
    return `${m}/${day}`;
  });
  renderActivityChart(dayLabels, stats.byDay.map((d) => d.count));

  const deviceEntries = Object.entries(stats.byDeviceType).sort((a, b) => b[1] - a[1]);
  renderDeviceChart(deviceEntries.map((e) => e[0]), deviceEntries.map((e) => e[1]));
}

async function loadVisits() {
  const res = await fetch("/api/visits");
  const visits = await res.json();
  const tbody = document.getElementById("visits-body");

  if (!visits.length) {
    tbody.innerHTML = `<tr><td colspan="5">No visits recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = visits
    .map((v) => {
      const time = new Date(v.timestamp).toLocaleString();
      return `<tr>
        <td>${escapeHtml(time)}</td>
        <td>${escapeHtml(v.ip)}</td>
        <td>${escapeHtml(v.deviceType)}</td>
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
