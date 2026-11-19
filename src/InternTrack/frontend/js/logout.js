/**
 * InternTrack – Logout Script
 */
document.addEventListener('DOMContentLoaded', () => {
  // Clear user from local storage
  clearSession();
  showToast('You have been logged out securely.', 'info');

  let seconds = 10;
  const countdownEl = document.getElementById('countdown');

  const interval = setInterval(() => {
    seconds--;
    if (countdownEl) countdownEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href = 'index.html';
    }
  }, 1000);
});
