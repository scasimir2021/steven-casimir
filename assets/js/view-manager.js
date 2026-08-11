export class ViewManager {
  constructor(siteConfig, onChange) {
    this.config = siteConfig;
    this.onChange = onChange;
    this.currentView = null;
    this.manualView = null;
    this.timer = null;
  }

  start() {
    const params = new URLSearchParams(location.search);
    const requested = params.get('view');
    const valid = this.config.views.some(v => v.id === requested);
    if (valid) this.manualView = requested;
    this.apply();
    this.timer = setInterval(() => this.apply(), 60_000);
  }

  autoViewForNow(date = new Date()) {
    const hour = date.getHours();
    const slot = this.config.autoView.slots.find(s => hour >= s.fromHour && hour <= s.toHour);
    return slot?.view || this.config.views[0].id;
  }

  apply() {
    const next = this.manualView || this.autoViewForNow();
    if (next === this.currentView) return;
    this.currentView = next;
    this.onChange(next);
  }

  setManual(value) {
    this.manualView = value === 'auto' ? null : value;
    localStorage.setItem('steven-portfolio-view', value);
    this.currentView = null;
    this.apply();
  }

  cycle() {
    const ids = this.config.views.map(v => v.id);
    const idx = ids.indexOf(this.currentView);
    this.setManual(ids[(idx + 1) % ids.length]);
  }
}
