const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Site Analytics</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.4/chart.umd.min.js"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f172a;color:#e2e8f0;min-height:100vh;}

/* HEADER */
.header{background:#1e293b;border-bottom:1px solid #334155;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;}
.header-logo{font-size:1.2rem;font-weight:800;color:#fff;}
.header-logo span{color:#22c55e;}
.back-link{font-size:0.85rem;color:#94a3b8;padding:8px 16px;border:1px solid #334155;border-radius:8px;transition:all .2s;}
.back-link:hover{color:#fff;border-color:#22c55e;}
a{text-decoration:none;}

/* SUMMARY CARDS */
.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;padding:24px;}
.s-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;position:relative;overflow:hidden;}
.s-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#22c55e,#16a34a);}
.s-value{font-size:2rem;font-weight:800;color:#22c55e;line-height:1;}
.s-label{font-size:0.8rem;color:#64748b;margin-top:6px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;}
.s-sub{font-size:0.75rem;color:#475569;margin-top:4px;}
@media(max-width:768px){.summary{grid-template-columns:repeat(2,1fr);}}
@media(max-width:400px){.summary{grid-template-columns:1fr;}}

/* CHARTS */
.charts{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:0 24px 24px;}
.chart-box{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;}
.chart-title{font-size:0.85rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;margin-bottom:16px;}
.chart-wrap{position:relative;height:220px;}
.chart-wrap canvas{position:absolute;top:0;left:0;width:100%!important;height:100%!important;}
@media(max-width:640px){.charts{grid-template-columns:1fr;}}

/* TABLE */
.table-section{padding:0 24px 24px;}
.table-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.table-title{font-size:0.85rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;}
.table-count{font-size:0.8rem;color:#475569;background:#1e293b;padding:4px 10px;border-radius:100px;border:1px solid #334155;}
.table-wrap{background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden;}
.table-scroll{overflow-x:auto;}
table{width:100%;border-collapse:collapse;font-size:0.82rem;}
thead th{background:#0f172a;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:.5px;font-size:0.72rem;padding:12px 16px;text-align:left;white-space:nowrap;}
tbody tr{border-bottom:1px solid #1e293b;}
tbody tr:last-child{border-bottom:none;}
tbody td{padding:12px 16px;color:#cbd5e1;white-space:nowrap;}
tbody tr:hover td{background:rgba(34,197,94,.04);}
.badge{display:inline-block;padding:2px 8px;border-radius:100px;font-size:0.72rem;font-weight:600;}
.badge-mobile{background:rgba(34,197,94,.15);color:#86efac;}
.badge-desktop{background:rgba(59,130,246,.15);color:#93c5fd;}
.badge-tablet{background:rgba(251,191,36,.15);color:#fcd34d;}
.time-cell{color:#64748b;font-size:0.78rem;}
.ip-cell{font-family:monospace;color:#a78bfa;}
.loading{padding:40px;text-align:center;color:#475569;}
.no-data{padding:40px;text-align:center;color:#475569;}

/* STATUS */
.status-bar{display:flex;align-items:center;gap:8px;padding:0 24px 16px;font-size:0.8rem;color:#475569;}
.status-dot{width:8px;height:8px;background:#22c55e;border-radius:50%;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
</style>
</head>
<body>

<div class="header">
  <div class="header-logo">Cirv<span>ee</span> <span style="font-weight:400;color:#475569;font-size:0.9rem;">/ Analytics</span></div>
  <a href="/" class="back-link">← Back to site</a>
</div>

<div class="summary">
  <div class="s-card">
    <div class="s-value" id="v-total">–</div>
    <div class="s-label">Total Visits</div>
    <div class="s-sub">All time page loads</div>
  </div>
  <div class="s-card">
    <div class="s-value" id="v-unique">–</div>
    <div class="s-label">Unique Visitors</div>
    <div class="s-sub">Distinct IP addresses</div>
  </div>
  <div class="s-card">
    <div class="s-value" id="v-country">–</div>
    <div class="s-label">Top Country</div>
    <div class="s-sub">Most visits from</div>
  </div>
  <div class="s-card">
    <div class="s-value" id="v-device">–</div>
    <div class="s-label">Top Device</div>
    <div class="s-sub">Most common type</div>
  </div>
</div>

<div class="charts">
  <div class="chart-box">
    <div class="chart-title">Visits by Device Type</div>
    <div class="chart-wrap"><canvas id="c-device"></canvas></div>
  </div>
  <div class="chart-box">
    <div class="chart-title">Browser Breakdown</div>
    <div class="chart-wrap"><canvas id="c-browser"></canvas></div>
  </div>
  <div class="chart-box">
    <div class="chart-title">Operating Systems</div>
    <div class="chart-wrap"><canvas id="c-os"></canvas></div>
  </div>
  <div class="chart-box">
    <div class="chart-title">Visits by Country</div>
    <div class="chart-wrap"><canvas id="c-country"></canvas></div>
  </div>
</div>

<div class="table-section">
  <div class="table-header">
    <div class="table-title">Recent Visitors</div>
    <div class="table-count" id="tbl-count">Loading…</div>
  </div>
  <div class="table-wrap">
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>IP Address</th>
            <th>Country</th>
            <th>Device</th>
            <th>OS</th>
            <th>Browser</th>
          </tr>
        </thead>
        <tbody id="tbl-body">
          <tr><td colspan="6" class="loading">Loading visitor data…</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div style="padding:16px 24px 40px;display:flex;align-items:center;gap:8px;font-size:0.75rem;color:#334155;">
  <div class="status-dot"></div>
  Live — refreshes every 15 seconds
</div>

<script>
const COLORS = ['#22c55e','#3b82f6','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#84cc16'];
const charts = {};

function esc(s){
  return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function badgeDevice(d){
  const t=(d||'').toLowerCase();
  if(t==='mobile') return '<span class="badge badge-mobile">📱 mobile</span>';
  if(t==='tablet') return '<span class="badge badge-tablet">📟 tablet</span>';
  return '<span class="badge badge-desktop">🖥 desktop</span>';
}

function makeChart(id, type, labels, data, opts={}){
  const ctx = document.getElementById(id);
  if(!ctx) return;
  if(charts[id]) charts[id].destroy();
  const isBar = type==='bar';
  charts[id] = new Chart(ctx, {
    type,
    data:{
      labels,
      datasets:[{
        data,
        backgroundColor: isBar ? COLORS[0] : COLORS,
        borderColor: isBar ? '#22c55e' : 'transparent',
        borderWidth: isBar ? 0 : 0,
        borderRadius: isBar ? 6 : 0,
      }]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{ position:'bottom', labels:{ color:'#94a3b8', boxWidth:10, padding:12, font:{size:11} } },
        tooltip:{ callbacks:{ label:(ctx)=>' '+ctx.parsed+(isBar?'':'')+' visits' } }
      },
      scales: isBar ? {
        x:{ ticks:{color:'#64748b',font:{size:10}}, grid:{color:'#1e293b'} },
        y:{ ticks:{color:'#64748b',font:{size:10},precision:0}, grid:{color:'#334155'}, beginAtZero:true }
      } : {},
      ...opts
    }
  });
}

async function refresh(){
  try {
    const [statsRes, visitsRes] = await Promise.all([fetch('/api/stats'), fetch('/api/visits')]);
    const stats = await statsRes.json();
    const visits = await visitsRes.json();

    // Summary cards
    document.getElementById('v-total').textContent = stats.total || 0;
    document.getElementById('v-unique').textContent = stats.uniqueIps || 0;
    const topC = Object.entries(stats.byCountry||{}).sort((a,b)=>b[1]-a[1])[0];
    document.getElementById('v-country').textContent = topC ? topC[0] : '–';
    const topD = Object.entries(stats.byDeviceType||{}).sort((a,b)=>b[1]-a[1])[0];
    document.getElementById('v-device').textContent = topD ? topD[0] : '–';

    // Charts
    const sort = obj => Object.entries(obj||{}).sort((a,b)=>b[1]-a[1]);
    
    const dev = sort(stats.byDeviceType).slice(0,6);
    makeChart('c-device','doughnut',dev.map(e=>e[0]),dev.map(e=>e[1]));
    
    const br = sort(stats.byBrowser).slice(0,6);
    makeChart('c-browser','doughnut',br.map(e=>e[0]),br.map(e=>e[1]));
    
    const os = sort(stats.byOs).slice(0,6);
    makeChart('c-os','doughnut',os.map(e=>e[0]),os.map(e=>e[1]));
    
    const co = sort(stats.byCountry).slice(0,8);
    makeChart('c-country','bar',co.map(e=>e[0]),co.map(e=>e[1]));

    // Table
    document.getElementById('tbl-count').textContent = visits.length + ' records';
    if(!visits.length){
      document.getElementById('tbl-body').innerHTML = '<tr><td colspan="6" class="no-data">No visits yet — share your site link!</td></tr>';
      return;
    }
    document.getElementById('tbl-body').innerHTML = visits.map(v=>{
      const t = new Date(v.timestamp);
      const time = t.toLocaleDateString()+' '+t.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
      const country = [v.city, v.country].filter(Boolean).filter(x=>x!=='Unknown'&&x!=='Local/Private IP').join(', ') || v.country || '–';
      return \`<tr>
        <td class="time-cell">\${esc(time)}</td>
        <td class="ip-cell">\${esc(v.ip)}</td>
        <td>\${esc(country)}</td>
        <td>\${badgeDevice(v.deviceType)}</td>
        <td>\${esc(v.os||'–')}</td>
        <td>\${esc(v.browser||'–')}</td>
      </tr>\`;
    }).join('');
  } catch(e) {
    console.error('Refresh error:',e);
  }
}

refresh();
setInterval(refresh, 15000);
</script>
</body>
</html>`;

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
