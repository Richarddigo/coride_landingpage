// Initialize language system
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initApp();
});

// Main app initialization
function initApp() {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            translatePage(lang);
        });
    });

    // CTA Buttons
    const ctaButtons = [
        document.getElementById('headerCtaBtn'),
        document.getElementById('mainCtaBtn'),
        document.getElementById('footerCtaBtn')
    ];

    ctaButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', openWaitlistModal);
        }
    });

    // Modal controls
    const modal = document.getElementById('waitlistModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');

    modalClose.addEventListener('click', closeWaitlistModal);
    modalOverlay.addEventListener('click', closeWaitlistModal);

    // Form submission
    const form = document.getElementById('waitlistForm');
    form.addEventListener('submit', handleFormSubmit);

    // Load counter from storage (inicia en 127 si es primera vez)
    loadCounter();

    // Animated counter
    animateCounter();

    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}

// Modal functions
function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Track modal open
    trackEvent('open_waitlist_modal');
}

function closeWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Form handling
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        flight: document.getElementById('flight').value,
        beta: document.getElementById('beta').checked,
        timestamp: new Date().toISOString(),
        language: localStorage.getItem('corideLanguage') || 'en'
    };

    // Save to localStorage as backup
    saveToWaitlist(formData);

    // Send to Formspree
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Track conversion
            trackEvent('waitlist_signup', {
                email: formData.email,
                has_flight: !!formData.flight
            });

            // Track Facebook Pixel conversion (if available)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Waitlist Signup',
                    status: 'completed'
                });
            }

            // Show success message
            showSuccessMessage();

            // Update counter
            updateCounter();
        } else {
            alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    }
}

// Save waitlist data
function saveToWaitlist(data) {
    // Get existing waitlist
    let waitlist = [];
    try {
        const stored = localStorage.getItem('corideWaitlist');
        if (stored) {
            waitlist = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading waitlist:', e);
    }

    // Add new entry
    waitlist.push(data);

    // Save back to localStorage
    try {
        localStorage.setItem('corideWaitlist', JSON.stringify(waitlist));
        console.log('✅ Waitlist entry saved:', data);

        // In production, also send to your backend
        // sendToBackend(data);
    } catch (e) {
        console.error('Error saving to waitlist:', e);
    }
}

// Show success message
function showSuccessMessage() {
    const form = document.querySelector('.waitlist-form');
    const success = document.getElementById('successMessage');

    form.style.display = 'none';
    success.classList.add('active');

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        success.classList.remove('active');
        closeWaitlistModal();
    }, 3000);
}

// Counter animation
function animateCounter() {
    const counter = document.getElementById('counterUsers');
    const target = parseInt(counter.textContent);
    let current = 0;
    const increment = Math.ceil(target / 50);
    const duration = 2000;
    const stepTime = duration / (target / increment);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = current;
        }
    }, stepTime);
}

// Update counter after signup
function updateCounter() {
    const counter = document.getElementById('counterUsers');
    const current = parseInt(counter.textContent);
    counter.textContent = current + 1;

    // Save to localStorage
    localStorage.setItem('corideUserCount', current + 1);
}

// Load counter from localStorage on init
function loadCounter() {
    const counter = document.getElementById('counterUsers');
    const saved = localStorage.getItem('corideUserCount');

    if (saved) {
        counter.textContent = saved;
    } else {
        // Iniciar con 127 testers existentes
        counter.textContent = '127';
        localStorage.setItem('corideUserCount', '127');
    }
}

// Analytics tracking helper
function trackEvent(eventName, params = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', eventName, params);
    }

    // Console log for debugging
    console.log('📊 Event tracked:', eventName, params);
}

// Smooth scroll for anchor links (if you add them)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track scroll depth
let scrollDepth = 0;
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    // Track 25%, 50%, 75%, 100% scroll milestones
    if (scrollPercent > 25 && scrollDepth < 25) {
        scrollDepth = 25;
        trackEvent('scroll_depth', { depth: '25%' });
    } else if (scrollPercent > 50 && scrollDepth < 50) {
        scrollDepth = 50;
        trackEvent('scroll_depth', { depth: '50%' });
    } else if (scrollPercent > 75 && scrollDepth < 75) {
        scrollDepth = 75;
        trackEvent('scroll_depth', { depth: '75%' });
    } else if (scrollPercent > 95 && scrollDepth < 100) {
        scrollDepth = 100;
        trackEvent('scroll_depth', { depth: '100%' });
    }
});

// Function to export waitlist data (for admin use)
function exportWaitlist() {
    try {
        const waitlist = JSON.parse(localStorage.getItem('corideWaitlist') || '[]');
        const dataStr = JSON.stringify(waitlist, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `coride-waitlist-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        console.log('✅ Waitlist exported');
    } catch (e) {
        console.error('Error exporting waitlist:', e);
    }
}

// Make exportWaitlist available globally for console use
window.exportWaitlist = exportWaitlist;

// Show console message for developers
console.log(`
╔═══════════════════════════════════════╗
║   🚀 Coride MVP - Landing Page       ║
║   Built for validation testing        ║
╠═══════════════════════════════════════╣
║   Commands:                           ║
║   → exportWaitlist() - Export signups ║
║   → localStorage.clear() - Reset data ║
╚═══════════════════════════════════════╝
`);
