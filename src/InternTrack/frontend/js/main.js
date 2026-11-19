/**
 * InternTrack – Universal Client Helper & State Handler
 */

const API_BASE_URL = window.location.origin.includes('5000') 
  ? '/api' 
  : 'http://localhost:5000/api';

// Toast Notification System
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '24px';
    toastContainer.style.right = '24px';
    toastContainer.style.zIndex = '9999';
    toastContainer.style.display = 'flex';
    toastContainer.style.flexDirection = 'column';
    toastContainer.style.gap = '10px';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgColors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#2563eb'
  };

  toast.style.background = bgColors[type] || bgColors.info;
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.fontSize = '14px';
  toast.style.fontWeight = '600';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.transition = 'all 0.3s ease';

  toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span> ${message}`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// User Session Management
function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('it_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  localStorage.setItem('it_user', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('it_user');
}

// Check protected page
function requireAuth(allowedRole = null) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  if (allowedRole && user.role !== allowedRole) {
    // If manager tries to access staff dashboard or vice versa
    if (user.role === 'manager') {
      window.location.href = 'manager-dashboard.html';
    } else {
      window.location.href = 'staff-dashboard.html';
    }
    return null;
  }
  return user;
}

// Global API Fetch helper
async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`API call to ${endpoint} failed. Utilizing local fallback simulation.`);
    return { success: false, offline: true, message: err.message };
  }
}
