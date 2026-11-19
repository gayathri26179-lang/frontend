/**
 * InternTrack – Staff Dashboard Script
 */
document.addEventListener('DOMContentLoaded', async () => {
  const user = requireAuth('staff');
  if (!user) return;

  // Set Profile UI
  document.getElementById('staff-name').textContent = user.name;
  document.getElementById('staff-dept').textContent = `${user.department || 'Software Development'} (Intern)`;
  document.getElementById('staff-avatar').textContent = user.name.split(' ').map(n=>n[0]).join('').substring(0,2);

  await loadStaffData(user.id);

  // Handle raise ticket
  const ticketForm = document.getElementById('raise-ticket-form');
  if (ticketForm) {
    ticketForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('tck-title').value.trim();
      const category = document.getElementById('tck-cat').value;
      const priority = document.getElementById('tck-priority').value;
      const description = document.getElementById('tck-desc').value.trim();

      const res = await apiRequest('/tickets', {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          title,
          category,
          priority,
          description
        })
      });

      if (res && res.success) {
        showToast(`Ticket ${res.ticket_code} created successfully!`, 'success');
        document.getElementById('ticket-modal').style.display = 'none';
        ticketForm.reset();
        await loadStaffData(user.id);
      }
    });
  }
});

async function loadStaffData(userId) {
  try {
    const overview = await apiRequest(`/staff/overview?user_id=${userId}`);
    if (overview && overview.success) {
      document.getElementById('staff-hours').textContent = `${overview.metrics.totalHours}h`;
      document.getElementById('staff-tasks').textContent = overview.metrics.completedTasks;
      document.getElementById('staff-tickets').textContent = overview.metrics.openTickets;
      document.getElementById('staff-progress').textContent = `${overview.metrics.milestoneProgress}%`;

      // Render Activities
      const actTbody = document.getElementById('staff-activities-tbody');
      if (overview.recentActivities && overview.recentActivities.length > 0) {
        actTbody.innerHTML = overview.recentActivities.map(a => `
          <tr>
            <td><strong>${a.activity_date}</strong></td>
            <td>
              <div style="font-weight:600; color:#0f172a;">${a.title}</div>
              <div style="font-size:12px; color:#64748b;">${a.description || ''}</div>
            </td>
            <td><span class="badge badge-info">${a.category}</span></td>
            <td><strong>${a.hours_spent}h</strong></td>
            <td>
              <span class="badge ${a.status === 'Approved' ? 'badge-success' : a.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">
                ${a.status}
              </span>
            </td>
          </tr>
        `).join('');
      } else {
        actTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">No activities logged yet.</td></tr>`;
      }

      // Render Tickets
      const tckTbody = document.getElementById('staff-tickets-tbody');
      if (overview.recentTickets && overview.recentTickets.length > 0) {
        tckTbody.innerHTML = overview.recentTickets.map(t => `
          <tr>
            <td><code style="font-weight:700; color:#2563eb;">${t.ticket_code}</code></td>
            <td>
              <div style="font-weight:600; color:#0f172a;">${t.title}</div>
              <div style="font-size:12px; color:#64748b;">${t.description || ''}</div>
            </td>
            <td>${t.category}</td>
            <td>
              <span class="badge ${t.priority === 'Urgent' || t.priority === 'High' ? 'badge-danger' : 'badge-warning'}">
                ${t.priority}
              </span>
            </td>
            <td>
              <span class="badge ${t.status === 'Resolved' ? 'badge-success' : t.status === 'In Progress' ? 'badge-info' : 'badge-warning'}">
                ${t.status}
              </span>
            </td>
          </tr>
        `).join('');
      } else {
        tckTbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#64748b;">No support tickets open.</td></tr>`;
      }
    }
  } catch (err) {
    console.error('Failed to load staff data:', err);
  }
}
