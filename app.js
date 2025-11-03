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

    // Feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }

    // Load counter from Supabase
    loadCounterFromDatabase();

    // Animated counter
    setTimeout(() => animateCounter(), 500);

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

// Form handling with Supabase
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value.trim().toLowerCase(),
        flight: document.getElementById('flight').value || null,
        beta_tester: document.getElementById('beta').checked,
        language: localStorage.getItem('corideLanguage') || 'en'
    };

    try {
        // Save to localStorage as backup
        saveToWaitlist(formData);

        // Check if Supabase is configured
        if (typeof supabase === 'undefined' || SUPABASE_URL === 'TU_PROJECT_URL_AQUI') {
            throw new Error('Supabase no configurado');
        }

        // Save to Supabase database
        const { data, error } = await supabase
            .from('waitlist')
            .insert([formData])
            .select();

        if (error) {
            // Check if it's a duplicate email error
            if (error.code === '23505') {
                const currentLang = localStorage.getItem('corideLanguage') || 'en';
                const duplicateMessage = translations[currentLang].form.duplicate;
                alert(duplicateMessage);
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                return;
            }
            throw error;
        }

        // Send email via Web3Forms (optional, solo si está configurado)
        if (form.querySelector('[name="access_key"]')?.value !== 'YOUR_ACCESS_KEY_HERE') {
            try {
                const formDataToSend = new FormData(form);
                formDataToSend.append('Idioma', formData.language);
                formDataToSend.append('Beta Tester', formData.beta_tester ? 'Sí' : 'No');

                await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formDataToSend
                });
            } catch (emailError) {
                console.log('Email notification not sent:', emailError);
            }
        }

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

        // Reload counter from database
        await loadCounterFromDatabase();

        // Reset form
        form.reset();

    } catch (error) {
        console.error('Error:', error);

        if (error.message === 'Supabase no configurado') {
            alert('⚠️ Base de datos no configurada. Los datos se han guardado localmente.\n\nPor favor, configura Supabase siguiendo las instrucciones en SETUP-SUPABASE.md');
        } else {
            alert('Hubo un error al enviar el formulario. Los datos se han guardado localmente como backup.');
        }

        // Show success anyway (data is in localStorage)
        showSuccessMessage();
        form.reset();

    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}// Save waitlist data
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

// Load counter from Supabase database
async function loadCounterFromDatabase() {
    const counter = document.getElementById('counterUsers');

    try {
        // Check if Supabase is configured
        if (typeof supabase === 'undefined' || SUPABASE_URL === 'TU_PROJECT_URL_AQUI') {
            // Fallback to localStorage
            loadCounterFromLocalStorage();
            return;
        }

        // Get count from Supabase
        const { count, error } = await supabase
            .from('waitlist')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // Add base of 127 existing testers
        const totalCount = 127 + (count || 0);
        counter.textContent = totalCount;

        // Save to localStorage as cache
        localStorage.setItem('corideUserCount', totalCount);

    } catch (error) {
        console.error('Error loading counter from database:', error);
        // Fallback to localStorage
        loadCounterFromLocalStorage();
    }
}

// Fallback: Load counter from localStorage
function loadCounterFromLocalStorage() {
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

// Download all users from database (for admin use)
async function downloadAllUsers() {
    try {
        if (typeof supabase === 'undefined' || SUPABASE_URL === 'TU_PROJECT_URL_AQUI') {
            alert('Supabase no configurado. Por favor configura la base de datos primero.');
            return;
        }

        const { data, error } = await supabase
            .from('waitlist')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Create CSV content
        let csvContent = 'ID,Nombre,Email,Vuelo,Beta Tester,Idioma,Fecha\n';
        data.forEach(row => {
            csvContent += `${row.id},"${row.name}","${row.email}","${row.flight || ''}",${row.beta_tester ? 'Sí' : 'No'},${row.language},"${new Date(row.created_at).toLocaleString()}"\n`;
        });

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `coride-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);

        console.log(`✅ Descargados ${data.length} registros`);
    } catch (error) {
        console.error('Error downloading users:', error);
        alert('Error al descargar la lista de usuarios. Revisa la consola para más detalles.');
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

// Feedback form handling
async function handleFeedbackSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('.feedback-submit');
    const originalText = submitButton.textContent;

    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    const feedbackData = {
        name: document.getElementById('feedback-name').value,
        email: document.getElementById('feedback-email').value,
        message: document.getElementById('feedback-message').value,
        updates: document.getElementById('feedback-updates').checked,
        timestamp: new Date().toISOString(),
        language: localStorage.getItem('corideLanguage') || 'en',
        source: 'landing_page'
    };

    try {
        // Save to localStorage as backup
        saveFeedbackToLocal(feedbackData);

        // TODO: Replace with your actual endpoint
        // For now, we'll simulate a successful submission
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedbackData)
        }).catch(() => {
            // If endpoint doesn't exist, continue anyway (for MVP)
            return { ok: true };
        });

        // Show success message
        form.style.display = 'none';
        const successDiv = document.getElementById('feedbackSuccess');
        successDiv.classList.add('active');

        // Track feedback submission
        trackEvent('feedback_submitted', {
            has_updates_consent: feedbackData.updates
        });

        // Reset form after 5 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            successDiv.classList.remove('active');
        }, 5000);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbenos directamente.');
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

// Save feedback to localStorage
function saveFeedbackToLocal(data) {
    try {
        const feedback = JSON.parse(localStorage.getItem('corideFeedback') || '[]');
        feedback.push(data);
        localStorage.setItem('corideFeedback', JSON.stringify(feedback));
    } catch (e) {
        console.error('Error saving feedback to localStorage:', e);
    }
}

// Export feedback function (for admin use)
function exportFeedback() {
    const feedback = JSON.parse(localStorage.getItem('corideFeedback') || '[]');

    if (feedback.length === 0) {
        console.log('No feedback data to export');
        return;
    }

    const dataStr = JSON.stringify(feedback, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coride-feedback-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    console.log(`✅ Exported ${feedback.length} feedback entries`);
}

// Make functions available globally for console use
window.exportWaitlist = exportWaitlist;
window.exportFeedback = exportFeedback;

// Show console message for developers
console.log(`
╔═══════════════════════════════════════╗
║   🚀 Coride MVP - Landing Page       ║
║   Built for validation testing        ║
╠═══════════════════════════════════════╣
║   Commands:                           ║
║   → exportWaitlist() - Export signups ║
║   → exportFeedback() - Export feedback║
║   → localStorage.clear() - Reset data ║
╚═══════════════════════════════════════╝
`);
