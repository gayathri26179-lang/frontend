/**
 * InternTrack – Manager Dashboard Script
 */
document.addEventListener('DOMContentLoaded', async () => {
  const user = requireAuth('manager');
  if (!user) return;

  // Render User profile
  document.getElementById('mgr-name').textContent = user.name;
  document.getElementById('mgr-dept').textContent = `${user.department || 'Management'} (Manager)`;
  document.getElementById('mgr-avatar').textContent = user.name.split(' ').map(n=>n[0]).join('').substring(0,2);

  await loadManagerData();
});

async function loadManagerData() {
  try {
    const statsData = await apiRequest('/manager/stats');
    if (statsData && statsData.success) {
      document.getElementById('kpi-interns').textContent = statsData.stats.totalInterns || 48;
      document.getElementById('kpi-tickets').textContent = statsData.stats.pendingTickets || 14;
      document.getElementById('kpi-activities').textContent = statsData.stats.pendingActivities || 36;
      document.getElementById('kpi-certs').textContent = statsData.stats.approvedCerts || 29;
    }

    // Load Activities
    const actData = await apiRequest('/activities');
    const actTbody = document.getElementById('manager-activities-tbody');
    if (actData && actData.success && actData.activities.length > 0) {
      actTbody.innerHTML = actData.activities.map(act => `
        <tr>
          <td><strong>${act.activity_date}</strong></td>
          <td>
            <div style="font-weight:600; color:#0f172a;">${act.title}</div>
            <div style="font-size:12px; color:#64748b;">${act.description || 'No extra notes'}</div>
          </td>
          <td><span class="badge badge-info">${act.category}</span></td>
          <td><strong>${act.hours_spent}h</strong></td>
          <td>
            <span class="badge ${act.status === 'Approved' ? 'badge-success' : act.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">
              ${act.status}
            </span>
          </td>
          <td>
            ${act.status === 'Pending' ? `
              <div style="display:flex; gap:6px;">
                <button onclick="reviewActivity(${act.id}, 'Approved')" class="btn btn-primary btn-sm" style="background:#10b981; padding:4px 8px; font-size:12px;">Approve</button>
                <button onclick="reviewActivity(${act.id}, 'Rejected')" class="btn btn-outline btn-sm" style="color:#ef4444; border-color:#ef4444; padding:4px 8px; font-size:12px;">Reject</button>
              </div>
            ` : `<span style="font-size:12px; color:#64748b;">Reviewed ✓</span>`}
          </td>
        </tr>
      `).join('');
    }

    // Load Tickets
    const ticketData = await apiRequest('/tickets');
    const ticketTbody = document.getElementById('manager-tickets-tbody');
    if (ticketData && ticketData.success && ticketData.tickets.length > 0) {
      ticketTbody.innerHTML = ticketData.tickets.map(tck => `
        <tr>
          <td><code style="font-weight:700; color:#2563eb;">${tck.ticket_code}</code></td>
          <td>
            <div style="font-weight:600; color:#0f172a;">${tck.title}</div>
            <div style="font-size:12px; color:#64748b;">${tck.description}</div>
          </td>
          <td>${tck.category}</td>
          <td>
            <span class="badge ${tck.priority === 'Urgent' || tck.priority === 'High' ? 'badge-danger' : 'badge-warning'}">
              ${tck.priority}
            </span>
          </td>
          <td>
            <span class="badge ${tck.status === 'Resolved' ? 'badge-success' : tck.status === 'In Progress' ? 'badge-info' : 'badge-warning'}">
              ${tck.status}
            </span>
          </td>
          <td>
            ${tck.status !== 'Resolved' ? `
              <button onclick="resolveTicket(${tck.id})" class="btn btn-outline btn-sm" style="padding:4px 8px; font-size:12px;">Mark Resolved</button>
            ` : `<span style="color:#10b981; font-size:12px; font-weight:600;">Closed</span>`}
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load manager records:', err);
  }
}

async function reviewActivity(id, status) {
  showToast(`Updating activity #${id} to ${status}...`, 'info');
  const res = await apiRequest(`/activities/${id}/review`, {
    method: 'PUT',
    body: JSON.stringify({ status, comment: `Reviewed by manager as ${status}` })
  });
  if (res && res.success) {
    showToast(`Activity successfully marked as ${status}!`, 'success');
    await loadManagerData();
  }
}

async function resolveTicket(id) {
  showToast(`Resolving ticket #${id}...`, 'info');
  const res = await apiRequest(`/tickets/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status: 'Resolved' })
  });
  if (res && res.success) {
    showToast(`Ticket #${id} resolved!`, 'success');
    await loadManagerData();
  }
}
