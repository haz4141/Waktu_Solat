// Main Application Controller

import { zones, prayerOrder, fetchPrayerTimes, formatHijriDate } from './prayer-data.js';
import { PrayerClock } from './clock.js';
import { StreakTracker } from './streak-tracker.js';
import { PrayerNotifications } from './notifications.js';
import { ThemeController } from './themes.js';
import { QiblaCompass } from './qibla.js';

class WaktuSolatApp {
    constructor() {
        this.currentZone = '';
        this.prayerData = null;
        this.clock = null;
        this.streakTracker = null;
        this.notifications = null;
        this.themeController = null;
        this.qibla = null;
    }
    
    async init() {
        // Initialize components
        this.clock = new PrayerClock('clock-canvas', 'clock-center');
        this.streakTracker = new StreakTracker();
        this.notifications = new PrayerNotifications();
        this.themeController = new ThemeController();
        this.qibla = new QiblaCompass();
        
        // Load zones
        this.loadZones();
        
        // Render UIs
        this.streakTracker.renderUI();
        this.notifications.renderSettingsUI();
        this.themeController.renderToggleUI();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize Qibla (optional, user can click to activate)
        document.getElementById('qibla-compact')?.addEventListener('click', () => {
            this.qibla.initialize();
        });
        
        // Refresh every minute
        setInterval(() => {
            if (this.currentZone && this.prayerData) {
                this.clock.draw();
                this.themeController.updateTheme(this.prayerData);
            }
        }, 60000);
    }
    
    loadZones() {
        try {
            const select = document.getElementById('zone-select');
            select.innerHTML = '<option value="">-- Pilih Lokasi --</option>';
            
            // Group by state
            const groupedZones = {};
            zones.forEach(zone => {
                const state = zone.negeri;
                if (!groupedZones[state]) {
                    groupedZones[state] = [];
                }
                groupedZones[state].push(zone);
            });

            // Add options by state
            Object.keys(groupedZones).sort().forEach(state => {
                const optgroup = document.createElement('optgroup');
                optgroup.label = state;
                
                groupedZones[state].forEach(zone => {
                    const option = document.createElement('option');
                    option.value = zone.zone;
                    option.textContent = zone.lokasi;
                    optgroup.appendChild(option);
                });
                
                select.appendChild(optgroup);
            });

            // Set default zone (Kuala Lumpur)
            select.value = 'WLY01';
            this.currentZone = 'WLY01';
            this.loadPrayerTimes(this.currentZone);
            
        } catch (error) {
            console.error('Error loading zones:', error);
            document.getElementById('zone-select').innerHTML = 
                '<option value="">Ralat memuat lokasi</option>';
        }
    }
    
    async loadPrayerTimes(zone) {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const content = document.getElementById('content');

        loading.style.display = 'block';
        error.style.display = 'none';
        content.style.display = 'none';

        try {
            this.prayerData = await fetchPrayerTimes(zone);
            this.displayPrayerTimes(this.prayerData, zone);
            
            // Update clock
            if (this.clock) {
                this.clock.setPrayerTimes(this.prayerData);
            }
            
            // Schedule notifications
            if (this.notifications && this.notifications.isEnabled()) {
                this.notifications.schedulePrayerNotifications(this.prayerData);
            }
            
            // Update theme
            if (this.themeController) {
                this.themeController.updateTheme(this.prayerData);
            }
            
        } catch (err) {
            console.error('Error:', err);
            console.error('Error details:', err.stack);
            
            let errorMsg = err.message;
            if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
                errorMsg = 'Tidak dapat sambung ke server. Sila semak sambungan internet anda';
            } else if (err.message.includes('CORS')) {
                errorMsg = 'Masalah kebenaran API. Cuba lagi sebentar lagi';
            }
            
            error.textContent = '❌ ' + errorMsg + '.';
            error.style.display = 'block';
            loading.style.display = 'none';
        }
    }
    
    displayPrayerTimes(data, zone) {
        const content = document.getElementById('content');
        const loading = document.getElementById('loading');

        console.log('Displaying prayer data:', data);

        // Update date
        const date = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = 
            date.toLocaleDateString('ms-MY', options);
        
        const hijriRaw = data.hijri || data.date_hijri || data.hijriDate || '';
        document.getElementById('hijri-date').textContent = formatHijriDate(hijriRaw);

        // Update location
        const zoneInfo = zones.find(z => z.zone === zone);
        if (zoneInfo) {
            document.getElementById('location-name').textContent = zoneInfo.lokasi;
            document.getElementById('location-detail').textContent = 
                `${zoneInfo.negeri} • Zon ${zone}`;
        }

        // Display prayer times
        const prayerTimesContainer = document.getElementById('prayer-times');
        prayerTimesContainer.innerHTML = '';

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        prayerOrder.forEach(prayer => {
            let time = null;
            let foundKey = null;
            
            // Try each possible key for this prayer
            for (const key of prayer.keys) {
                if (data[key]) {
                    time = data[key];
                    foundKey = key;
                    break;
                }
            }
            
            // Handle if time is not a string
            if (time && typeof time === 'object') {
                time = time.time || time.value || null;
            }
            
            if (time && typeof time === 'string') {
                const div = document.createElement('div');
                div.className = 'prayer-item';
                
                // Check if prayed
                const isPrayed = this.streakTracker && this.streakTracker.isPrayed(prayer.display);
                if (isPrayed) {
                    div.classList.add('completed');
                }
                
                // Highlight if within next prayer window
                if (foundKey && this.isCurrentPrayer(foundKey, currentTimeInMinutes, data)) {
                    div.classList.add('current');
                }
                
                div.innerHTML = `
                    <div class="prayer-name">${prayer.display}</div>
                    <div class="prayer-time">${time}</div>
                    ${isPrayed ? '<div style="font-size: 2rem;">✓</div>' : ''}
                `;
                
                prayerTimesContainer.appendChild(div);
            }
        });

        loading.style.display = 'none';
        content.style.display = 'block';
    }
    
    isCurrentPrayer(prayerKey, currentTimeInMinutes, data) {
        // Find current prayer in the order
        let currentIndex = -1;
        for (let i = 0; i < prayerOrder.length; i++) {
            if (prayerOrder[i].keys.includes(prayerKey)) {
                currentIndex = i;
                break;
            }
        }
        
        if (currentIndex === -1) return false;
        
        // Get current prayer time
        let currentPrayerTimeStr = data[prayerKey];
        if (currentPrayerTimeStr && typeof currentPrayerTimeStr === 'object') {
            currentPrayerTimeStr = currentPrayerTimeStr.time || currentPrayerTimeStr.value || '';
        }
        
        const currentPrayerTime = this.timeToMinutes(currentPrayerTimeStr);
        
        // Find next prayer time
        let nextPrayerTime = 24 * 60;
        for (let i = currentIndex + 1; i < prayerOrder.length; i++) {
            for (const key of prayerOrder[i].keys) {
                let timeStr = data[key];
                if (timeStr && typeof timeStr === 'object') {
                    timeStr = timeStr.time || timeStr.value || '';
                }
                if (timeStr && typeof timeStr === 'string') {
                    nextPrayerTime = this.timeToMinutes(timeStr);
                    break;
                }
            }
            if (nextPrayerTime < 24 * 60) break;
        }
        
        return currentTimeInMinutes >= currentPrayerTime && currentTimeInMinutes < nextPrayerTime;
    }
    
    timeToMinutes(timeStr) {
        if (!timeStr || typeof timeStr !== 'string') return 0;
        const parts = timeStr.split(':');
        if (parts.length < 2) return 0;
        const [hour, minute] = parts.map(Number);
        return hour * 60 + minute;
    }
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    findNearestZone(userLat, userLng) {
        let nearestZone = null;
        let minDistance = Infinity;

        zones.forEach(zone => {
            if (zone.lat && zone.lng) {
                const distance = this.calculateDistance(userLat, userLng, zone.lat, zone.lng);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestZone = zone;
                }
            }
        });

        return nearestZone;
    }
    
    detectUserLocation() {
        const btn = document.getElementById('detect-location');
        const status = document.getElementById('location-status');

        if (!navigator.geolocation) {
            status.textContent = '❌ Pelayar anda tidak menyokong geolocation';
            status.className = 'location-status error';
            status.style.display = 'block';
            return;
        }

        btn.disabled = true;
        btn.textContent = '📍 Mengesan lokasi...';
        status.textContent = '🔍 Sedang mengesan lokasi anda...';
        status.className = 'location-status info';
        status.style.display = 'block';

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('User location:', latitude, longitude);

                const nearestZone = this.findNearestZone(latitude, longitude);

                if (nearestZone) {
                    document.getElementById('zone-select').value = nearestZone.zone;
                    this.currentZone = nearestZone.zone;
                    this.loadPrayerTimes(nearestZone.zone);

                    status.textContent = `✅ Lokasi dikesan: ${nearestZone.lokasi}`;
                    status.className = 'location-status success';

                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 3000);
                } else {
                    status.textContent = '❌ Tidak dapat menentukan zon';
                    status.className = 'location-status error';
                }

                btn.disabled = false;
                btn.textContent = '📍 Kesan Lokasi Saya';
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errorMsg = '';

                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = '❌ Akses lokasi ditolak. Sila benarkan akses lokasi pada pelayar anda.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = '❌ Maklumat lokasi tidak tersedia.';
                        break;
                    case error.TIMEOUT:
                        errorMsg = '❌ Masa tamat untuk mengesan lokasi.';
                        break;
                    default:
                        errorMsg = '❌ Ralat mengesan lokasi.';
                }

                status.textContent = errorMsg;
                status.className = 'location-status error';
                btn.disabled = false;
                btn.textContent = '📍 Kesan Lokasi Saya';
            }
        );
    }
    
    setupEventListeners() {
        // Zone selection
        document.getElementById('zone-select').addEventListener('change', (e) => {
            const zone = e.target.value;
            if (zone) {
                this.currentZone = zone;
                this.loadPrayerTimes(zone);
            }
        });

        // Detect location button
        document.getElementById('detect-location').addEventListener('click', () => {
            this.detectUserLocation();
        });
        
        // Prayer checked event
        document.addEventListener('prayerChecked', () => {
            // Refresh display to show checkmarks
            if (this.currentZone && this.prayerData) {
                this.displayPrayerTimes(this.prayerData, this.currentZone);
            }
        });
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new WaktuSolatApp();
        app.init();
    });
} else {
    const app = new WaktuSolatApp();
    app.init();
}

