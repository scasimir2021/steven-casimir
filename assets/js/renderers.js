const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const projectCard = (p) => `
  <article class="project-card">
    <div class="eyebrow">${esc(p.category)}</div>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.summary)}</p>
    <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
    <small class="status">${esc(p.status)}</small>
  </article>`;

const businessCard = (b) => `
  <article class="business-card">
    <img src="${b.mark}" alt="" width="50" height="50" />
    <div><div class="eyebrow">${esc(b.kind)}</div><h3>${esc(b.name)}</h3><p>${esc(b.summary)}</p>${b.url ? `<a href="${b.url}" target="_blank" rel="noopener">Visit ↗</a>` : ''}</div>
  </article>`;

const skillGroups = (data) => data.skills.map(g => `<section class="skill-group"><h3>${esc(g.group)}</h3><div class="chips">${g.items.map(x => `<span>${esc(x)}</span>`).join('')}</div></section>`).join('');

const careerTimeline = (data) => data.career.map(c => `
  <article class="timeline-item"><div class="timeline-dot"></div><div><div class="eyebrow">${esc(c.period)}</div><h3>${esc(c.role)}</h3><strong>${esc(c.company)}</strong><p>${esc(c.summary)}</p><ul>${c.highlights.slice(0,3).map(h => `<li>${esc(h)}</li>`).join('')}</ul></div></article>`).join('');

function heroBackground(data, variant) {
  // Each background already contains the subject, framed right. When one exists
  // the portrait element is dropped so he does not appear twice in one band.
  const map = (data.site && data.site.backgrounds) || {};
  return map[variant] || '';
}

function hero(data, variant = 'default') {
  const p = data.profile;
  const bg = heroBackground(data, variant);
  return `<section id="top" class="hero hero-${variant}${bg ? ' has-bg' : ''}"${
      bg ? ` style="background-image:url('${bg}')"` : ''}>
    <div class="hero-copy">
      <div class="eyebrow">${p.roles.map(esc).join(' • ')}</div>
      <h1>${esc(p.name)}</h1>
      <h2>${esc(p.tagline)}</h2>
      <p>${esc(p.summary)}</p>
      <div class="hero-actions"><a class="button primary" href="#projects">Explore my work</a><a class="button" href="#career">Career</a></div>
      <div class="mini-principles">${data.principles.slice(0,4).map(x => `<span>${esc(x.name)}</span>`).join('')}</div>
    </div>
    ${bg ? '' : `<div class="portrait-wrap"><img src="${p.heroImage}" alt="Portrait of ${esc(p.name)}" /></div>`}
  </section>`;
}

function commonDeepSections(data) {
  return `
  <section id="skills" class="section-block"><div class="section-heading"><span>Capabilities</span><h2>Skills & expertise</h2></div><div class="skill-grid">${skillGroups(data)}</div></section>
  <section id="career" class="section-block"><div class="section-heading"><span>Journey</span><h2>Professional career</h2></div><div class="timeline">${careerTimeline(data)}</div></section>
  <section id="projects" class="section-block"><div class="section-heading"><span>Lab + shipped work</span><h2>Projects, systems & research</h2><p>Public-safe inventory from the workbench. Some entries are shipped systems; others are research directions or concepts.</p></div><div class="project-grid">${data.projects.map(projectCard).join('')}</div></section>
  <section id="hobbies" class="section-block"><div class="section-heading"><span>Outside the day job</span><h2>Hobbies & side pursuits</h2></div><div class="hobby-grid">${data.hobbies.map(h => `<article><h3>${esc(h.name)}</h3><p>${esc(h.description)}</p></article>`).join('')}</div></section>`;
}

function cosmic(data) {
  return `${hero(data, 'cosmic')}
    <section id="about" class="cosmic-strip">
      <article><div class="eyebrow">About</div><h3>Builder at heart</h3><p>${esc(data.profile.headline)}</p></article>
      <article><div class="eyebrow">Research</div><h3>Always learning</h3><p>${esc(data.researchThemes.slice(0,3).join(' • '))}</p></article>
      <article><div class="eyebrow">Availability</div><h3>Open to impact</h3><p>${esc(data.profile.availability)}</p></article>
    </section>
    <section id="businesses" class="section-block"><div class="section-heading"><span>Ventures</span><h2>Businesses & platforms</h2></div><div class="business-grid">${data.businesses.map(businessCard).join('')}</div></section>
    ${commonDeepSections(data)}`;
}

function builder(data) {
  return `${hero(data, 'builder')}
    <section class="builder-grid" id="about">
      <article class="panel span-2"><div class="section-heading"><span>Professional</span><h2>Career snapshot</h2></div>${careerTimeline({career:data.career.slice(0,3)})}</article>
      <article class="panel"><div class="section-heading"><span>Skills</span><h2>Core stack</h2></div>${skillGroups({skills:data.skills.slice(0,4)})}</article>
      <article class="panel"><div class="section-heading"><span>Ventures</span><h2>Businesses</h2></div>${data.businesses.map(businessCard).join('')}</article>
      <article class="panel span-2"><div class="section-heading"><span>Building now</span><h2>Selected systems</h2></div><div class="project-grid compact">${data.projects.slice(0,8).map(projectCard).join('')}</div></article>
      <article class="panel"><div class="section-heading"><span>Principles</span><h2>How I build</h2></div>${data.principles.map(p => `<h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>`).join('')}</article>
    </section>
    ${commonDeepSections(data)}`;
}

function operator(data) {
  return `<div class="operator-shell">
    <aside class="operator-rail">
      <img src="assets/svg/sc-monogram.svg" alt="" class="rail-logo" />
      <div class="rail-label">Core focus</div>
      ${data.skills.slice(0,5).map(s => `<a href="#skills">${esc(s.group)}</a>`).join('')}
      <div class="rail-quote">${esc(data.profile.tagline)}</div>
    </aside>
    <div class="operator-main">${hero(data, 'operator')}
      <section id="about" class="operator-band">
        <div><div class="eyebrow">What I build</div><h2>Systems that cross software and the physical world.</h2></div>
        <div class="operator-badges">${data.researchThemes.slice(0,6).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
      </section>
      <section id="businesses" class="section-block"><div class="section-heading"><span>Businesses + platforms</span><h2>Operating, building, experimenting</h2></div><div class="business-grid">${data.businesses.map(businessCard).join('')}</div></section>
      ${commonDeepSections(data)}
    </div>
  </div>`;
}

function dashboard(data) {
  const featured = data.projects.slice(0,10);
  return `<div class="dash-layout">
    <aside class="dash-sidebar">
      <img src="assets/svg/sc-monogram.svg" alt="" class="rail-logo" />
      <h2>${esc(data.profile.name)}</h2><p>${esc(data.profile.roles.join(' • '))}</p>
      <nav><a href="#skills">⌁ Skills</a><a href="#businesses">▣ Businesses</a><a href="#projects">↗ Projects</a><a href="#career">◷ Career</a><a href="#hobbies">♡ Hobbies</a></nav>
      <div class="dash-status"><span>● Learning: always</span><span>● Building: daily</span><span>● Auto-view: on</span></div>
    </aside>
    <div class="dash-main">
      ${hero(data, 'dashboard')}
      <section id="about" class="dash-panels">
        <article class="panel span-2"><div class="section-heading"><span>Skills</span><h2>Systems map</h2></div>${skillGroups(data)}</article>
        <article class="panel"><div class="section-heading"><span>Ventures</span><h2>Businesses</h2></div>${data.businesses.map(businessCard).join('')}</article>
        <article class="panel"><div class="section-heading"><span>Projects</span><h2>Build queue</h2></div>${featured.map(p=>`<div class="dash-row"><strong>${esc(p.name)}</strong><span>${esc(p.status)}</span></div>`).join('')}</article>
        <article class="panel"><div class="section-heading"><span>Career</span><h2>Highlights</h2></div>${data.career.map(c=>`<div class="dash-row"><strong>${esc(c.company)}</strong><span>${esc(c.period)}</span></div>`).join('')}</article>
        <article class="panel"><div class="section-heading"><span>Research</span><h2>Current themes</h2></div>${data.researchThemes.map(r=>`<div class="dash-row"><strong>${esc(r)}</strong></div>`).join('')}</article>
      </section>
      ${commonDeepSections(data)}
    </div>
  </div>`;
}

export function renderView(view, data, el) {
  el.classList.add('view-transition-out');
  const renderer = { cosmic, builder, operator, dashboard }[view] || cosmic;
  requestAnimationFrame(() => {
    el.innerHTML = renderer(data);
    el.classList.remove('view-transition-out');
    el.classList.add('view-transition-in');
    setTimeout(() => el.classList.remove('view-transition-in'), 450);
  });
}
