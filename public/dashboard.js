async function loadStats() {
  const res = await fetch("/api/stats");
  const stats = await res.json();

  document.getElementById("stat-total").textContent = stats.total;
  document.getElementById("stat-unique").textContent = stats.uniqueIps;

  const topCountry = Object.entries(stats.byCountry).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("stat-top-country").textContent = topCountry ? topCountry[0] : "–";

  const topDevice = Object.entries(stats.byDeviceType).sort((a, b) => b[1] - a[1])[0];
  document.getElementById("stat-top-device").textContent = topDevice ? topDevice[0] : "–";
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

async function loadVisits() {
  const res = await fetch("/api/visits");
  const visits = await res.json();
  const tbody = document.getElementById("visits-body");

  if (!visits.length) {
    tbody.innerHTML = `<tr><td colspan="8">No visits recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = visits
    .map((v) => {
      const time = new Date(v.timestamp).toLocaleString();
      const location = [v.city, v.region, v.country].filter(Boolean).join(", ");
      return `<tr>
        <td>${escapeHtml(time)}</td>
        <td>${escapeHtml(v.path)}</td>
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

// Auto-refresh every 15 seconds so new visits show up live
setInterval(() => {
  loadStats();
  loadVisits();
}, 15000);
