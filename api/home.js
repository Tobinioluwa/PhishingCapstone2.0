const { logVisit } = require("./_lib/track");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Cirvee — No Tech Skills? No Problem.</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;color:#1a1a2e;background:#fff;line-height:1.6;}
a{text-decoration:none;color:inherit;}

/* NAV */
.navbar{background:#fff;border-bottom:1px solid #eee;position:sticky;top:0;z-index:100;}
.nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:70px;}
.logo{font-size:1.5rem;font-weight:900;color:#1a1a2e;letter-spacing:-0.5px;}
.logo span{color:#22c55e;}
.nav-links{display:flex;gap:32px;align-items:center;}
.nav-links a{font-size:0.9rem;font-weight:500;color:#444;transition:color .2s;}
.nav-links a:hover{color:#22c55e;}
.nav-cta{background:#22c55e;color:#fff!important;padding:10px 22px;border-radius:8px;font-weight:600;font-size:0.9rem;}
.nav-cta:hover{background:#16a34a!important;}
.mobile-menu-btn{display:none;background:none;border:none;cursor:pointer;font-size:1.5rem;}
@media(max-width:768px){
  .nav-links{display:none;}
  .mobile-menu-btn{display:block;}
}

/* ANNOUNCEMENT BAR */
.announce{background:#22c55e;color:#fff;text-align:center;padding:10px;font-size:0.85rem;font-weight:600;}

/* HERO */
.hero{background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f172a 100%);color:#fff;padding:90px 24px 100px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;top:-50%;left:-20%;width:600px;height:600px;background:radial-gradient(circle,rgba(34,197,94,.15) 0%,transparent 70%);pointer-events:none;}
.hero::after{content:'';position:absolute;bottom:-30%;right:-10%;width:500px;height:500px;background:radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 70%);pointer-events:none;}
.hero-inner{max-width:800px;margin:0 auto;position:relative;z-index:1;}
.hero-badge{display:inline-block;background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#86efac;padding:6px 16px;border-radius:100px;font-size:0.8rem;font-weight:600;margin-bottom:24px;letter-spacing:.5px;}
.hero h1{font-size:clamp(2.2rem,5vw,3.8rem);font-weight:900;line-height:1.1;margin-bottom:12px;}
.hero h1 span{color:#22c55e;}
.hero h2{font-size:clamp(1.4rem,3vw,2.2rem);font-weight:700;color:#94a3b8;margin-bottom:20px;}
.hero p{font-size:1.05rem;color:#cbd5e1;max-width:600px;margin:0 auto 36px;}
.hero-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
.btn-primary{background:#22c55e;color:#fff;padding:14px 32px;border-radius:10px;font-weight:700;font-size:1rem;transition:all .2s;box-shadow:0 4px 20px rgba(34,197,94,.3);}
.btn-primary:hover{background:#16a34a;transform:translateY(-2px);}
.btn-secondary{background:rgba(255,255,255,.08);color:#fff;padding:14px 32px;border-radius:10px;font-weight:600;font-size:1rem;border:1px solid rgba(255,255,255,.2);transition:all .2s;}
.btn-secondary:hover{background:rgba(255,255,255,.15);}

/* TICKER */
.ticker-wrap{background:#f8fafc;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;padding:14px 0;overflow:hidden;}
.ticker{display:flex;animation:ticker 30s linear infinite;width:max-content;}
.ticker-item{white-space:nowrap;padding:0 32px;font-size:0.85rem;font-weight:600;color:#64748b;display:flex;align-items:center;gap:8px;}
.ticker-dot{width:6px;height:6px;background:#22c55e;border-radius:50%;}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}

/* COURSES */
.section{padding:80px 24px;}
.container{max-width:1200px;margin:0 auto;}
.section-label{font-size:0.8rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#22c55e;margin-bottom:12px;}
.section-title{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#0f172a;margin-bottom:16px;line-height:1.2;}
.section-sub{font-size:1rem;color:#64748b;max-width:600px;margin-bottom:48px;}
.courses-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;}
.course-card{border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;transition:all .3s;background:#fff;}
.course-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px rgba(0,0,0,.1);border-color:#22c55e;}
.course-img{height:160px;background:linear-gradient(135deg,#0f172a,#1e3a5f);display:flex;align-items:center;justify-content:center;font-size:3rem;}
.course-body{padding:20px;}
.course-school{font-size:0.75rem;font-weight:700;color:#22c55e;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
.course-name{font-size:1rem;font-weight:700;color:#0f172a;margin-bottom:8px;}
.course-meta{font-size:0.8rem;color:#94a3b8;display:flex;gap:12px;margin-bottom:16px;}
.course-btn{display:block;text-align:center;background:#0f172a;color:#fff;padding:10px;border-radius:8px;font-size:0.85rem;font-weight:600;transition:background .2s;}
.course-btn:hover{background:#22c55e;}

/* SCHOOLS */
.schools-section{background:#f8fafc;}
.schools-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
.school-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;transition:all .3s;}
.school-card:hover{border-color:#22c55e;box-shadow:0 8px 24px rgba(34,197,94,.1);}
.school-icon{font-size:2rem;margin-bottom:12px;}
.school-name{font-size:1rem;font-weight:700;color:#0f172a;margin-bottom:6px;}
.school-desc{font-size:0.85rem;color:#64748b;margin-bottom:16px;}
.school-link{font-size:0.85rem;font-weight:600;color:#22c55e;}

/* WHY CHOOSE US */
.why-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;}
.why-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:24px;display:flex;gap:16px;align-items:flex-start;}
.why-icon{width:44px;height:44px;background:#dcfce7;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;}
.why-title{font-size:0.95rem;font-weight:700;color:#0f172a;margin-bottom:4px;}
.why-desc{font-size:0.85rem;color:#64748b;}

/* STATS */
.stats-section{background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;padding:80px 24px;}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center;}
.stat-num{font-size:2.8rem;font-weight:900;color:#22c55e;line-height:1;}
.stat-label{font-size:0.9rem;color:#94a3b8;margin-top:6px;}
@media(max-width:640px){.stats-grid{grid-template-columns:repeat(2,1fr);}}

/* TESTIMONIALS */
.testimonials-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px;}
.testi-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px;}
.stars{color:#f59e0b;font-size:1rem;margin-bottom:12px;}
.testi-text{font-size:0.9rem;color:#374151;line-height:1.7;margin-bottom:16px;font-style:italic;}
.testi-author{font-size:0.85rem;font-weight:700;color:#0f172a;}
.testi-role{font-size:0.8rem;color:#64748b;}

/* FAQ */
.faq-section{background:#f8fafc;}
.faq-list{max-width:760px;}
details{background:#fff;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:12px;overflow:hidden;}
details summary{padding:18px 22px;font-size:0.95rem;font-weight:600;color:#0f172a;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;}
details summary::-webkit-details-marker{display:none;}
details summary::after{content:'+';font-size:1.3rem;color:#22c55e;transition:transform .2s;}
details[open] summary::after{transform:rotate(45deg);}
details p{padding:0 22px 18px;font-size:0.9rem;color:#64748b;line-height:1.7;}

/* CTA BANNER */
.cta-banner{background:#22c55e;padding:60px 24px;text-align:center;}
.cta-banner h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:800;color:#fff;margin-bottom:12px;}
.cta-banner p{color:rgba(255,255,255,.85);margin-bottom:28px;font-size:0.95rem;}
.btn-dark{background:#0f172a;color:#fff;padding:14px 36px;border-radius:10px;font-weight:700;font-size:1rem;transition:all .2s;display:inline-block;}
.btn-dark:hover{background:#1e293b;transform:translateY(-2px);}

/* FOOTER */
footer{background:#0f172a;color:#94a3b8;padding:60px 24px 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;}
.footer-brand .logo{color:#fff;font-size:1.4rem;display:block;margin-bottom:12px;}
.footer-brand p{font-size:0.85rem;line-height:1.7;}
.footer-col h4{color:#fff;font-size:0.9rem;font-weight:700;margin-bottom:16px;}
.footer-col a{display:block;font-size:0.85rem;color:#64748b;margin-bottom:8px;transition:color .2s;}
.footer-col a:hover{color:#22c55e;}
.footer-bottom{border-top:1px solid #1e293b;padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:gap;}
.footer-bottom p{font-size:0.8rem;}
.social-links{display:flex;gap:12px;}
.social-links a{width:34px;height:34px;background:#1e293b;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.8rem;color:#94a3b8;transition:all .2s;}
.social-links a:hover{background:#22c55e;color:#fff;}
.quiet-link{color:transparent;font-size:0.7rem;}
@media(max-width:768px){
  .footer-grid{grid-template-columns:1fr 1fr;}
  .footer-brand{grid-column:1/-1;}
}
</style>
</head>
<body>

<div class="announce">🎓 New Cohort starts July 22nd! Limited spots available — <strong>Enroll Now</strong></div>

<nav class="navbar">
  <div class="nav-inner">
    <a href="/" class="logo">Cirv<span>ee</span></a>
    <div class="nav-links">
      <a href="#">Start Learning</a>
      <a href="#">About</a>
      <a href="#">Collaborate</a>
      <a href="#">Explore</a>
      <a href="#">Contact Us</a>
      <a href="#" class="nav-cta">Enroll Now</a>
    </div>
    <button class="mobile-menu-btn">☰</button>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-badge">✨ Join 2,000+ Students Already Learning</div>
    <h1>No Tech Skills?<br/><span>No Problem.</span></h1>
    <h2>Let's fix that!</h2>
    <p>Learn the skills that get you paid. Cirvee makes tech simple, practical, and real. Join thousands already building their futures with us.</p>
    <div class="hero-btns">
      <a href="#" class="btn-primary">Join the Next Cohort</a>
      <a href="#courses" class="btn-secondary">View Courses</a>
    </div>
  </div>
</section>

<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker">
    <span class="ticker-item"><span class="ticker-dot"></span>Product Design</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Data Analysis</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Cybersecurity</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Software Engineering</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Digital Marketing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Frontend Development</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Project Management</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Artificial Intelligence</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Product Design</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Data Analysis</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Cybersecurity</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Software Engineering</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Digital Marketing</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Frontend Development</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Project Management</span>
    <span class="ticker-item"><span class="ticker-dot"></span>Artificial Intelligence</span>
  </div>
</div>

<!-- COURSES -->
<section class="section" id="courses">
  <div class="container">
    <p class="section-label">What We Offer</p>
    <h2 class="section-title">Courses you can pick from</h2>
    <p class="section-sub">Practical, hands-on programs designed to get you skilled and job-ready fast.</p>
    <div class="courses-grid">
      <div class="course-card">
        <div class="course-img">💻</div>
        <div class="course-body">
          <p class="course-school">School of Engineering</p>
          <p class="course-name">Full Stack Development</p>
          <p class="course-meta"><span>⏱ 7 Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
      <div class="course-card">
        <div class="course-img">🎨</div>
        <div class="course-body">
          <p class="course-school">School of Design</p>
          <p class="course-name">Product Design (UI/UX)</p>
          <p class="course-meta"><span>⏱ 3 Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
      <div class="course-card">
        <div class="course-img">📊</div>
        <div class="course-body">
          <p class="course-school">School of Data</p>
          <p class="course-name">Data Analysis</p>
          <p class="course-meta"><span>⏱ 4 Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
      <div class="course-card">
        <div class="course-img">🔐</div>
        <div class="course-body">
          <p class="course-school">School of Cybersecurity</p>
          <p class="course-name">Cybersecurity Professional</p>
          <p class="course-meta"><span>⏱ 7½ Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
      <div class="course-card">
        <div class="course-img">🤖</div>
        <div class="course-body">
          <p class="course-school">School of Data & AI</p>
          <p class="course-name">Artificial Intelligence</p>
          <p class="course-meta"><span>⏱ 3 Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
      <div class="course-card">
        <div class="course-img">📱</div>
        <div class="course-body">
          <p class="course-school">School of Engineering</p>
          <p class="course-name">Frontend Development</p>
          <p class="course-meta"><span>⏱ 3 Months</span><span>📍 Physical/Virtual</span></p>
          <a href="#" class="course-btn">Enroll Now</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- SCHOOLS -->
<section class="section schools-section">
  <div class="container">
    <p class="section-label">Our Structure</p>
    <h2 class="section-title">Explore our Schools</h2>
    <p class="section-sub">Every school is built around a career path, not just a subject.</p>
    <div class="schools-grid">
      <div class="school-card"><div class="school-icon">🎨</div><p class="school-name">School of Design & Products</p><p class="school-desc">Where creativity meets problem-solving.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">📊</div><p class="school-name">School of Data & AI</p><p class="school-desc">Turning data into decisions and algorithms into impact.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">💻</div><p class="school-name">School of Engineering</p><p class="school-desc">Building systems that power the digital world.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">🔐</div><p class="school-name">School of Cybersecurity</p><p class="school-desc">Defending the digital frontier.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">📋</div><p class="school-name">School of Management</p><p class="school-desc">Where leadership meets execution.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">🎬</div><p class="school-name">School of Creative Media</p><p class="school-desc">Create. Communicate. Captivate.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">🛠</div><p class="school-name">School of Productivity</p><p class="school-desc">Master essential tools for work, study, and life.</p><a href="#" class="school-link">See Courses →</a></div>
      <div class="school-card"><div class="school-icon">⚡</div><p class="school-name">Short / Crash Courses</p><p class="school-desc">Fast, practical, and hands-on micro-learning experiences.</p><a href="#" class="school-link">See Courses →</a></div>
    </div>
  </div>
</section>

<!-- WHY CHOOSE US -->
<section class="section">
  <div class="container">
    <p class="section-label">Why Cirvee</p>
    <h2 class="section-title">This isn't just another tech school</h2>
    <p class="section-sub">It's a place where beginners become pros. We don't talk at you — we walk with you until results speak.</p>
    <div class="why-grid">
      <div class="why-card"><div class="why-icon">🏆</div><div><p class="why-title">Learn from the Best</p><p class="why-desc">Our tutors are skilled, experienced, and genuinely care about your growth.</p></div></div>
      <div class="why-card"><div class="why-icon">🕐</div><div><p class="why-title">Flexibility in Learning</p><p class="why-desc">Join physically, virtually, or hybrid — learn on your own terms.</p></div></div>
      <div class="why-card"><div class="why-icon">🗂</div><div><p class="why-title">Portfolio Building</p><p class="why-desc">Work on real projects that actually get you noticed by employers.</p></div></div>
      <div class="why-card"><div class="why-icon">🤝</div><div><p class="why-title">Expand Your Network</p><p class="why-desc">Join a buzzing community of learners, mentors, and creators.</p></div></div>
      <div class="why-card"><div class="why-icon">📜</div><div><p class="why-title">Accredited Certification</p><p class="why-desc">Leave with a certificate that speaks for you anywhere you go.</p></div></div>
      <div class="why-card"><div class="why-icon">💼</div><div><p class="why-title">Job Referral Support</p><p class="why-desc">We actively recommend top students for real jobs and gigs.</p></div></div>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="stats-section">
  <div class="container">
    <div style="text-align:center;margin-bottom:48px;">
      <p class="section-label" style="color:#22c55e;">Our Impact</p>
      <h2 style="font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#fff;">A Journey of Achievement</h2>
    </div>
    <div class="stats-grid">
      <div><div class="stat-num">2000+</div><div class="stat-label">Students Trained</div></div>
      <div><div class="stat-num">12+</div><div class="stat-label">Courses Running</div></div>
      <div><div class="stat-num">1200+</div><div class="stat-label">Graduates Doing Great</div></div>
      <div><div class="stat-num">2+</div><div class="stat-label">Global Recognitions</div></div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section">
  <div class="container">
    <p class="section-label">Alumni Stories</p>
    <h2 class="section-title">Discover what our alumni are saying</h2>
    <p class="section-sub">Real people. Real results. Real transformation.</p>
    <div class="testimonials-grid">
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"Before Cirvee, I had no clue what UI/UX meant. Now I'm confidently designing interfaces and landing gigs."</p><p class="testi-author">Alex Sumbo</p><p class="testi-role">Cybersecurity Graduate</p></div>
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"The hands-on training made everything click. From learning Excel to Python, it all felt achievable here."</p><p class="testi-author">Olayinka Success</p><p class="testi-role">Product Designer</p></div>
      <div class="testi-card"><div class="stars">★★★★★</div><p class="testi-text">"I came in with zero experience and left with a full portfolio and my first freelance client. Cirvee changed my life."</p><p class="testi-author">Olasumbo Gbolahan</p><p class="testi-role">Data Analyst</p></div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="section faq-section">
  <div class="container">
    <p class="section-label">Got Questions?</p>
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div class="faq-list">
      <details><summary>Can I access the courses anytime, anywhere?</summary><p>Yes — you can learn from home, the office, or even on the go. Our courses are designed with flexibility in mind.</p></details>
      <details><summary>What courses are available, and who can take them?</summary><p>We offer a wide range of beginner-friendly and advanced digital courses. Whether you're new or experienced, there's something for you.</p></details>
      <details><summary>Will I receive a certificate upon completion?</summary><p>Yes. All our courses come with an industry-recognized certificate once you complete the program.</p></details>
      <details><summary>What kind of support is available during my course?</summary><p>You'll have access to tutors, peer communities, and hands-on help to guide your learning every step of the way.</p></details>
      <details><summary>Are flexible payments available?</summary><p>Yes — we offer installment options to make learning accessible to everyone.</p></details>
      <details><summary>Where is Cirvee located?</summary><p><strong>Lagos Campus:</strong> Cirvee Hub, 2 Bosun Adekoya Street, Victoria Island, Lagos.<br/><strong>Ibadan Campus:</strong> Comfort House, No. 6, Alafia Street, Opp. State Veterinary Hospital, Mokola, Ibadan.</p></details>
    </div>
  </div>
</section>

<!-- CTA BANNER -->
<section class="cta-banner">
  <div class="container">
    <h2>New cohort starts July 22nd!</h2>
    <p>Secure your spot now. Seats are filling fast across all schools.</p>
    <a href="#" class="btn-dark">Enroll Now →</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo">Cirv<span style="color:#22c55e;">ee</span></a>
        <p>No tech skills? No problem. We make tech simple, practical, and real for thousands of learners across Nigeria and beyond.</p>
        <p style="margin-top:12px;font-size:0.8rem;">hello@cirvee.com<br/>+234 704 700 7055</p>
      </div>
      <div class="footer-col"><h4>Company</h4><a href="#">About</a><a href="#">Careers</a><a href="#">Volunteer</a><a href="#">Testimonials</a></div>
      <div class="footer-col"><h4>Learning</h4><a href="#">All Courses</a><a href="#">Short Courses</a><a href="#">Corporate Training</a><a href="#">Learn Privately</a></div>
      <div class="footer-col"><h4>Connect</h4><a href="#">Blog</a><a href="#">Events</a><a href="#">Partner With Us</a><a href="#">Contact Us</a></div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Cirvee. All rights reserved. <a href="/stats" class="quiet-link">·</a></p>
      <div class="social-links">
        <a href="#">f</a><a href="#">in</a><a href="#">X</a><a href="#">yt</a><a href="#">tt</a>
      </div>
    </div>
  </div>
</footer>
</body>
</html>`;

module.exports = async (req, res) => {
  await logVisit(req, "/");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
};
