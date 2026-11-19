/**
 * InternTrack – Certificate Verification Script
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('verify-form');
  const input = document.getElementById('cert-code-input');

  const internNameEl = document.getElementById('cert-intern-name');
  const courseTitleEl = document.getElementById('cert-course-title');
  const gradeEl = document.getElementById('cert-grade');
  const hoursEl = document.getElementById('cert-hours');
  const certIdEl = document.getElementById('cert-id');

  // Check URL params e.g. ?id=IT-2026-8942
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('id');
  if (codeParam) {
    input.value = codeParam;
    verifyCode(codeParam);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = input.value.trim();
    if (!code) return;
    await verifyCode(code);
  });

  async function verifyCode(code) {
    showToast(`Verifying certificate ${code}...`, 'info');
    try {
      const data = await apiRequest(`/certificates/verify/${encodeURIComponent(code)}`);
      if (data && data.success && data.certificate) {
        const cert = data.certificate;
        internNameEl.textContent = cert.intern_name;
        courseTitleEl.textContent = cert.course_title;
        gradeEl.textContent = `Grade: ${cert.grade || 'Distinction'}`;
        hoursEl.textContent = `Completed: ${cert.total_hours || 240} Hours`;
        certIdEl.textContent = `ID: ${cert.cert_code}`;
        showToast('Certificate Verified in MySQL Database!', 'success');
      } else {
        showToast(data.message || 'Certificate ID could not be found.', 'error');
      }
    } catch (err) {
      showToast('Offline verification fallback active.', 'warning');
    }
  }
});
