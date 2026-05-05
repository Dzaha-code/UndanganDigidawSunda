/* ============================================
   UNDANGAN JATUKRAMI - JavaScript
   ============================================ */

// ============ COVER OPENING ============
const coverElement = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
const openButton = document.getElementById('openInvitation');
const musicToggle = document.getElementById('musicToggle');

openButton.addEventListener('click', () => {
    coverElement.classList.add('opened');
    mainContent.classList.add('visible');
    musicToggle.classList.add('visible');
    
    // Smooth scroll to top of main content
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
});

// ============ GUEST NAME FROM URL PARAMETER ============
// Contoh: index.html?to=Pak+Asep
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('to');
    if (guestName) {
        const greeting = document.getElementById('guestGreeting');
        greeting.textContent = `Kepada Yth. ${decodeURIComponent(guestName.replace(/\+/g, ' '))}`;
    }
}
getGuestName();

// ============ COUNTDOWN TIMER ============
// Ganti tanggal di handap luyu sareng tanggal akad nikah
const weddingDate = new Date('2026-08-15T08:00:00+07:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============ ADD TO CALENDAR ============
document.getElementById('addToCalendar').addEventListener('click', () => {
    // Format: Google Calendar event link
    const eventTitle = 'Pernikahan Wangi & Galih';
    const eventDetails = 'Akad Nikah & Walimatul Urs';
    const eventLocation = 'Gedung Sasana Budaya Ganesha, Bandung';
    const startDate = '20260815T010000Z'; // UTC: 08:00 WIB = 01:00 UTC
    const endDate = '20260815T070000Z';   // UTC: 14:00 WIB = 07:00 UTC
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;
    
    window.open(calendarUrl, '_blank');
});

// ============ RSVP FORM ============
const rsvpForm = document.getElementById('rsvpForm');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('rsvpName').value,
        attendance: document.getElementById('rsvpAttendance').value,
        guests: document.getElementById('rsvpGuests').value,
        timestamp: new Date().toISOString()
    };
    
    // CATETAN: Pikeun produksi, kintunkeun data ka backend (Google Sheets, Firebase, dsb.)
    // Contoh: kirim ka Google Sheets via Apps Script Web App
    // fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', { method: 'POST', body: JSON.stringify(formData) });
    
    console.log('RSVP Submitted:', formData);
    
    // Simpen ka localStorage pikeun demo
    const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    rsvps.push(formData);
    localStorage.setItem('rsvps', JSON.stringify(rsvps));
    
    alert(`Hatur nuhun, ${formData.name}! Konfirmasi anjeun parantos kacatet.`);
    rsvpForm.reset();
});

// ============ GUESTBOOK ============
const guestbookForm = document.getElementById('guestbookForm');
const messagesList = document.getElementById('messagesList');

function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'nembé waé';
    if (diffMins < 60) return `${diffMins} menit ka pengker`;
    if (diffHours < 24) return `${diffHours} jam ka pengker`;
    return `${diffDays} dinten ka pengker`;
}

function renderMessage(name, message, timestamp) {
    const div = document.createElement('div');
    div.className = 'message-item';
    div.innerHTML = `
        <div class="message-header">
            <strong>${escapeHtml(name)}</strong>
            <span class="message-time">${timeAgo(timestamp)}</span>
        </div>
        <p class="message-text">${escapeHtml(message)}</p>
    `;
    messagesList.insertBefore(div, messagesList.firstChild);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Muat pesen ti localStorage (pikeun demo)
const savedMessages = JSON.parse(localStorage.getItem('guestbook') || '[]');
savedMessages.forEach(msg => renderMessage(msg.name, msg.message, msg.timestamp));

guestbookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('gbName').value.trim();
    const message = document.getElementById('gbMessage').value.trim();
    
    if (!name || !message) return;
    
    const timestamp = new Date().toISOString();
    
    // Render pesen anyar
    renderMessage(name, message, timestamp);
    
    // Simpen ka localStorage (pikeun produksi, kintunkeun ka backend)
    const messages = JSON.parse(localStorage.getItem('guestbook') || '[]');
    messages.push({ name, message, timestamp });
    localStorage.setItem('guestbook', JSON.stringify(messages));
    
    guestbookForm.reset();
});

// ============ MUSIC TOGGLE (placeholder) ============
let musicPlaying = false;
// Pikeun ngagunakeun audio anu sabenerna, tambahkeun:
// const bgMusic = new Audio('path/to/your-music.mp3');
// bgMusic.loop = true;

musicToggle.addEventListener('click', () => {
    musicPlaying = !musicPlaying;
    musicToggle.classList.toggle('playing', musicPlaying);
    
    // if (musicPlaying) bgMusic.play();
    // else bgMusic.pause();
    
    console.log('Music:', musicPlaying ? 'Playing' : 'Paused');
});

// ============ SCROLL REVEAL ANIMATION ============
const sections = document.querySelectorAll('.section');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ============ COPY TEXT (kanggo amplop digital, upami diperyogikeun) ============
function copyToClipboard(text, label = 'Téks') {
    navigator.clipboard.writeText(text).then(() => {
        alert(`${label} parantos disalin!`);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Tiasa dipanggil tina tombol nu nambihkeun fitur amplop digital
window.copyAccount = (accountNumber, bankName) => {
    copyToClipboard(accountNumber, `Nomer rékening ${bankName}`);
};
