import { renderView } from './renderers.js';
import { ViewManager } from './view-manager.js';

const DATA_URL = 'data/portfolio.json';

async function loadData() {
  const res = await fetch(DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not load ${DATA_URL}: ${res.status}`);
  return res.json();
}

function socialLink(label, url, icon) {
  if (!url) return '';
  return `<a class="icon-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="${label}">${icon}</a>`;
}

function renderHeader(data, manager) {
  const p = data.profile;
  const header = document.querySelector('#global-header');
  header.innerHTML = `
    <a class="brand" href="#top" aria-label="${p.name} home">
      <img src="assets/svg/sc-monogram.svg" alt="" width="40" height="40" />
      <span><strong>${p.name}</strong><small>${p.roles.slice(0, 3).join(' • ')}</small></span>
    </a>
    <nav class="top-nav" aria-label="Primary">
      <a href="#about">About</a><a href="#skills">Skills</a><a href="#career">Career</a>
      <a href="#businesses">Businesses</a><a href="#projects">Projects</a><a href="#hobbies">Hobbies</a>
    </nav>
    <div class="header-actions">
      ${socialLink('GitHub', p.links.github, 'GH')}
      ${socialLink('LinkedIn', p.links.linkedin, 'in')}
      <label class="view-select-wrap" title="View style">
        <span class="sr-only">View style</span>
        <select id="view-select" class="view-select">
          <option value="auto">Auto</option>
          ${data.site.views.map(v => `<option value="${v.id}">${v.label}</option>`).join('')}
        </select>
      </label>
    </div>`;
  const select = header.querySelector('#view-select');
  select.value = manager.manualView || 'auto';
  select.addEventListener('change', () => manager.setManual(select.value));
}

function renderFooter(data, manager) {
  const footer = document.querySelector('#global-footer');
  footer.innerHTML = `
    <span>© ${new Date().getFullYear()} ${data.profile.name}. Built as one data model with four rotating views.</span>
    <span class="footer-mode">View: <strong id="footer-view">${manager.currentView}</strong> • <button class="text-button" id="next-view" type="button">switch now</button></span>`;
  footer.querySelector('#next-view').addEventListener('click', () => manager.cycle());
}

async function main() {
  try {
    const data = await loadData();
    window.__PORTFOLIO_DATA__ = data;
    const manager = new ViewManager(data.site, (view) => {
      document.querySelector('#site-shell').dataset.view = view;
      renderView(view, data, document.querySelector('#app'));
      renderHeader(data, manager);
      renderFooter(data, manager);
      document.querySelector('#footer-view').textContent = view;
      const qs = new URLSearchParams(location.search);
      if (qs.get('view')) history.replaceState(null, '', location.pathname + location.hash);
    });
    manager.start();
  } catch (err) {
    console.error(err);
    document.querySelector('#app').innerHTML = `<section class="fatal"><h1>Portfolio data could not load.</h1><p>${err.message}</p><p>Run the included local server instead of opening index.html directly.</p></section>`;
  }
}

main();
