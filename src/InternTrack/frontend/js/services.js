/**
 * InternTrack – Services Page Script
 */
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('services-grid');

  try {
    const data = await apiRequest('/services');
    if (data && data.success && data.services && data.services.length > 0) {
      container.innerHTML = data.services.map(svc => `
        <div class="card">
          <div class="card-icon">${svc.icon || '💼'}</div>
          <h3 class="card-title">${svc.title}</h3>
          <span class="badge badge-info" style="margin-bottom: 12px;">${svc.category}</span>
          <p class="card-desc">${svc.description}</p>
        </div>
      `).join('');
    }
  } catch (err) {
    console.log('Using default services layout.');
  }
});
