/**
 * InternTrack – Reports & Graphs Canvas Chart Generator
 */
document.addEventListener('DOMContentLoaded', async () => {
  const user = getCurrentUser();
  if (user) {
    const navDash = document.getElementById('nav-dash');
    if (navDash) {
      navDash.href = user.role === 'manager' ? 'manager-dashboard.html' : 'staff-dashboard.html';
    }
  }

  // Draw Charts
  drawBarChart();
  drawDonutChart();
  drawLineChart();

  // Load backend analytics
  try {
    const data = await apiRequest('/reports/analytics');
    if (data && data.success && data.departments) {
      const container = document.getElementById('dept-container');
      const colors = ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa'];
      container.innerHTML = data.departments.map((d, i) => `
        <div class="dept-bar">
          <div class="dept-info"><span>${d.name} (${d.interns || 12} Interns)</span><span>${d.rate}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width: ${d.rate}%; background: ${colors[i % colors.length]};"></div></div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.log('Using pre-rendered department values.');
  }
});

// Chart 1: Bar Chart
function drawBarChart() {
  const canvas = document.getElementById('barChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.parentElement.clientWidth - 48;
  const height = 240;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
  const planned = [140, 150, 160, 160, 160];
  const actual = [152, 168, 174, 160, 182];
  const maxVal = 200;

  const barWidth = 24;
  const groupSpacing = width / months.length;

  // Grid lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = 30 + (i * 40);
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
  }

  // Draw Bars
  months.forEach((m, i) => {
    const centerX = 30 + (i * groupSpacing) + (groupSpacing / 2) - 20;

    // Planned bar (light blue)
    const pHeight = (planned[i] / maxVal) * 160;
    ctx.fillStyle = '#93c5fd';
    ctx.fillRect(centerX - 14, 190 - pHeight, barWidth, pHeight);

    // Actual bar (royal blue)
    const aHeight = (actual[i] / maxVal) * 160;
    ctx.fillStyle = '#2563eb';
    ctx.fillRect(centerX + 14, 190 - aHeight, barWidth, aHeight);

    // Label
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m, centerX + 12, 215);
  });
}

// Chart 2: Donut Chart
function drawDonutChart() {
  const canvas = document.getElementById('donutChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = 220;
  canvas.width = size;
  canvas.height = size;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 75;
  const lineWidth = 26;

  const slices = [
    { percent: 0.68, color: '#10b981' }, // Resolved
    { percent: 0.22, color: '#3b82f6' }, // In Progress
    { percent: 0.10, color: '#f59e0b' }  // Pending
  ];

  let startAngle = -Math.PI / 2;

  slices.forEach(s => {
    const sliceAngle = s.percent * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 22px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('92%', centerX, centerY - 6);

  ctx.fillStyle = '#10b981';
  ctx.font = '11px Segoe UI, sans-serif';
  ctx.fillText('SLA Met', centerX, centerY + 14);
}

// Chart 3: Velocity Line Chart
function drawLineChart() {
  const canvas = document.getElementById('lineChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.parentElement.clientWidth - 48;
  const height = 240;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const points = [
    { label: 'Week 1', val: 28 },
    { label: 'Week 2', val: 36 },
    { label: 'Week 3', val: 32 },
    { label: 'Week 4', val: 46 }
  ];
  const maxVal = 50;

  // Grid lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = 30 + (i * 38);
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(width - 20, y);
    ctx.stroke();
  }

  // Draw Line
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 3.5;
  ctx.beginPath();

  const coords = [];
  points.forEach((p, i) => {
    const x = 50 + (i * ((width - 100) / (points.length - 1)));
    const y = 185 - (p.val / maxVal) * 140;
    coords.push({ x, y, label: p.label, val: p.val });
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  // Draw dots and text
  coords.forEach(pt => {
    ctx.fillStyle = '#1e40af';
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#64748b';
    ctx.font = '12px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(pt.label, pt.x, 215);

    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 11px Segoe UI, sans-serif';
    ctx.fillText(`${pt.val} tasks`, pt.x, pt.y - 10);
  });
}
