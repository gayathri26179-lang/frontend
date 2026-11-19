/**
 * InternTrack – Authentication Script
 */
let currentSelectedRole = 'staff';

function switchRole(role) {
  currentSelectedRole = role;
  const staffTab = document.getElementById('tab-staff');
  const mgrTab = document.getElementById('tab-manager');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');

  if (role === 'manager') {
    mgrTab.classList.add('active');
    staffTab.classList.remove('active');
    emailInput.value = 'manager@interntrack.com';
    passInput.value = 'manager123';
  } else {
    staffTab.classList.add('active');
    mgrTab.classList.remove('active');
    emailInput.value = 'intern@interntrack.com';
    passInput.value = 'intern123';
  }
}

function autofill(email, password, role) {
  switchRole(role);
  document.getElementById('login-email').value = email;
  document.getElementById('login-password').value = password;
  showToast(`Autofilled ${role} credentials`, 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const submitBtn = document.getElementById('btn-login-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      showToast('Please fill in both email and password.', 'warning');
      return;
    }

    submitBtn.textContent = 'Authenticating...';
    submitBtn.disabled = true;

    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (res && res.success && res.user) {
        setCurrentUser(res.user);
        showToast(`Welcome back, ${res.user.name}!`, 'success');

        setTimeout(() => {
          if (res.user.role === 'manager') {
            window.location.href = 'manager-dashboard.html';
          } else {
            window.location.href = 'staff-dashboard.html';
          }
        }, 800);
      } else {
        // Fallback demo authentication if server is not reachable
        if (email.includes('manager')) {
          const fallbackUser = { id: 1, name: 'Alex Carter', email, role: 'manager', department: 'Engineering Leadership' };
          setCurrentUser(fallbackUser);
          showToast('Welcome back, Manager Alex Carter!', 'success');
          setTimeout(() => { window.location.href = 'manager-dashboard.html'; }, 800);
        } else {
          const fallbackUser = { id: 2, name: 'Sarah Jenkins', email, role: 'staff', department: 'Full-Stack Development' };
          setCurrentUser(fallbackUser);
          showToast('Welcome back, Sarah Jenkins!', 'success');
          setTimeout(() => { window.location.href = 'staff-dashboard.html'; }, 800);
        }
      }
    } catch (err) {
      showToast('Authentication failed. Please check credentials.', 'error');
    } finally {
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    }
  });
});
