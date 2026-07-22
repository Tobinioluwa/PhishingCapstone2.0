const { logVisit } = require("./_lib/track");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bright Path Consulting</title>
<link rel="stylesheet" href="/style.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav">
      <div class="logo">Bright Path <span>Consulting</span></div>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Strategy that moves with you.</h1>
      <p>We help growing teams make clearer decisions, faster — through practical advice, not jargon.</p>
      <a class="btn" href="mailto:hello@brightpathconsulting.example">Get in touch</a>
    </div>
  </section>

  <section class="features">
    <div class="container grid">
      <div class="card">
        <h3>Business Strategy</h3>
        <p>Clear roadmaps built around what your team can actually execute.</p>
      </div>
      <div class="card">
        <h3>Operations</h3>
        <p>Streamlined processes that cut down on wasted time and effort.</p>
      </div>
      <div class="card">
        <h3>Growth Planning</h3>
        <p>Sustainable plans for scaling without losing what makes you good.</p>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Bright Path Consulting. All rights reserved. <a href="/stats" class="quiet-link">·</a></p>
    </div>
  </footer>
</body>
</html>`;

module.exports = async (req, res) => {
  await logVisit(req, "/");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
