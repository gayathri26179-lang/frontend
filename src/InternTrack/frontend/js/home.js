/**
 * InternTrack – Home Page Script
 */
document.addEventListener('DOMContentLoaded', async () => {
  const badge = document.getElementById('api-status-badge');
  
  try {
    const health = await apiRequest('/health');
    if (health && health.status === 'online') {
      badge.textContent = '🟢 Server & DB Online';
      badge.className = 'badge badge-success';
    } else {
      badge.textContent = '🟡 Demo Mode';
      badge.className = 'badge badge-warning';
    }
  } catch (e) {
    badge.textContent = '⚪ Local Client Mode';
    badge.className = 'badge badge-info';
  }

  // Animate statistics counter
  const counters = [
    { id: 'stat-interns', target: 540, prefix: '', suffix: '+' },
    { id: 'stat-tickets', target: 1248, prefix: '', suffix: '+' },
    { id: 'stat-rate', target: 99.4, prefix: '', suffix: '%' }
  ];

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (!el) return;
    let count = 0;
    const step = c.target / 40;
    const interval = setInterval(() => {
      count += step;
      if (count >= c.target) {
        count = c.target;
        clearInterval(interval);
      }
      el.textContent = `${c.prefix}${c.target % 1 === 0 ? Math.floor(count) : count.toFixed(1)}${c.suffix}`;
    }, 25);
  });
});
