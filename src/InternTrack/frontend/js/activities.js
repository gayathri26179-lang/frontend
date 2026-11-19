/**
 * InternTrack – Daily Activities Script
 */
let allActivities = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  currentUser = requireAuth();
  if (!currentUser) return;

  // Set user profile
  document.getElementById('act-user-name').textContent = currentUser.name;
  document.getElementById('act-user-role').textContent = `${currentUser.department || 'Cohort'} (${currentUser.role === 'manager' ? 'Manager' : 'Intern'})`;
  document.getElementById('act-avatar').textContent = currentUser.name.split(' ').map(n=>n[0]).join('').substring(0,2);

  // Set dashboard link based on role
  const navDash = document.getElementById('nav-dashboard');
  if (navDash) {
    navDash.href = currentUser.role === 'manager' ? 'manager-dashboard.html' : 'staff-dashboard.html';
  }

  // Pre-fill today's date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('act-date').value = today;

  await loadActivities();

  // Handle form submit
  const form = document.getElementById('activity-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('act-date').value;
    const title = document.getElementById('act-title').value.trim();
    const category = document.getElementById('act-cat').value;
    const hours = parseFloat(document.getElementById('act-hours').value);
    const description = document.getElementById('act-desc').value.trim();

    const submitBtn = document.getElementById('btn-submit-activity');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    try {
      const res = await apiRequest('/activities', {
        method: 'POST',
        body: JSON.stringify({
          user_id: currentUser.id,
          activity_date: date,
          title,
          category,
          hours_spent: hours,
          description
        })
      });

      if (res && res.success) {
        showToast('Activity successfully logged and submitted!', 'success');
        document.getElementById('act-title').value = '';
        document.getElementById('act-desc').value = '';
        await loadActivities();
      } else {
        showToast('Activity logged locally in session fallback.', 'info');
      }
    } catch (err) {
      showToast('Error saving activity log.', 'error');
    } finally {
      submitBtn.textContent = 'Submit Activity for Manager Review';
      submitBtn.disabled = false;
    }
  });
});

async function loadActivities() {
  try {
    const url = currentUser.role === 'manager' ? '/activities' : `/activities?user_id=${currentUser.id}`;
    const res = await apiRequest(url);
    if (res && res.success && res.activities) {
      allActivities = res.activities;
      renderTable(allActivities);
    }
  } catch (err) {
    console.error('Failed to load activities:', err);
  }
}

function renderTable(activities) {
  const tbody = document.getElementById('activities-table-body');
  if (!activities || activities.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#64748b;">No activities match this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = activities.map(act => `
    <tr>
      <td><strong>${act.activity_date}</strong></td>
      <td>
        <div style="font-weight:600; color:#0f172a;">${act.title}</div>
        <div style="font-size:12px; color:#64748b;">${act.description || 'No additional notes provided'}</div>
      </td>
      <td><span class="badge badge-info">${act.category}</span></td>
      <td><strong>${act.hours_spent} hrs</strong></td>
      <td>
        <span class="badge ${act.status === 'Approved' ? 'badge-success' : act.status === 'Rejected' ? 'badge-danger' : 'badge-warning'}">
          ${act.status}
        </span>
      </td>
      <td>
        <span style="font-size:12px; color:#475569;">
          ${act.manager_comment || (act.status === 'Pending' ? '<em>Awaiting review</em>' : 'Standard compliance approval')}
        </span>
      </td>
    </tr>
  `).join('');
}

function filterActivities(status) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (status === 'All') {
    document.getElementById('f-all').classList.add('active');
    renderTable(allActivities);
  } else if (status === 'Approved') {
    document.getElementById('f-app').classList.add('active');
    renderTable(allActivities.filter(a => a.status === 'Approved'));
  } else if (status === 'Pending') {
    document.getElementById('f-pen').classList.add('active');
    renderTable(allActivities.filter(a => a.status === 'Pending'));
  }
}
