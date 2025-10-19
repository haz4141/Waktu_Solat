// Dynamic Theme Controller

export class ThemeController {
    constructor() {
        this.storageKey = 'themeMode';
        this.loadSettings();
        this.currentTheme = null;
    }
    
    loadSettings() {
        const saved = localStorage.getItem(this.storageKey);
        this.mode = saved || 'dynamic'; // 'dynamic' or 'static'
    }
    
    saveSettings() {
        localStorage.setItem(this.storageKey, this.mode);
    }
    
    setMode(mode) {
        this.mode = mode;
        this.saveSettings();
    }
    
    updateTheme(prayerTimes) {
        if (this.mode !== 'dynamic') {
            document.body.className = '';
            return;
        }
        
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        const prayers = [
            { name: 'subuh', time: prayerTimes.subuh || prayerTimes.fajr, theme: 'theme-subuh' },
            { name: 'syuruk', time: prayerTimes.syuruk || prayerTimes.sunrise, theme: 'theme-syuruk' },
            { name: 'zohor', time: prayerTimes.zohor || prayerTimes.dhuhr, theme: 'theme-zohor' },
            { name: 'asar', time: prayerTimes.asar || prayerTimes.asr, theme: 'theme-asar' },
            { name: 'maghrib', time: prayerTimes.maghrib, theme: 'theme-maghrib' },
            { name: 'isyak', time: prayerTimes.isyak || prayerTimes.isha, theme: 'theme-isyak' }
        ].filter(p => p.time);
        
        // Determine current theme based on time
        let activeTheme = 'theme-isyak'; // Default to night theme
        
        for (let i = 0; i < prayers.length; i++) {
            const prayer = prayers[i];
            const nextPrayer = prayers[i + 1];
            
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;
            
            if (nextPrayer) {
                const [nextHours, nextMinutes] = nextPrayer.time.split(':').map(Number);
                const nextPrayerMinutes = nextHours * 60 + nextMinutes;
                
                if (currentMinutes >= prayerMinutes && currentMinutes < nextPrayerMinutes) {
                    activeTheme = prayer.theme;
                    break;
                }
            } else {
                // After last prayer until midnight
                if (currentMinutes >= prayerMinutes) {
                    activeTheme = prayer.theme;
                    break;
                }
            }
        }
        
        // Check if before first prayer (midnight to subuh)
        if (prayers[0]) {
            const [firstHours, firstMinutes] = prayers[0].time.split(':').map(Number);
            const firstPrayerMinutes = firstHours * 60 + firstMinutes;
            
            if (currentMinutes < firstPrayerMinutes) {
                activeTheme = 'theme-isyak'; // Night theme
            }
        }
        
        // Apply theme
        if (this.currentTheme !== activeTheme) {
            document.body.className = activeTheme;
            this.currentTheme = activeTheme;
        }
    }
    
    renderToggleUI() {
        const container = document.getElementById('theme-toggle-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="theme-toggle">
                <button class="theme-toggle-btn" id="theme-toggle-btn" title="Tetapan Tema">
                    🎨
                </button>
            </div>
            <div class="theme-settings" id="theme-settings">
                <h4>Pilih Tema</h4>
                <div class="theme-option">
                    <input type="radio" id="theme-dynamic" name="theme-mode" value="dynamic" ${this.mode === 'dynamic' ? 'checked' : ''}>
                    <label for="theme-dynamic">Dinamik (Berubah mengikut waktu)</label>
                </div>
                <div class="theme-option">
                    <input type="radio" id="theme-static" name="theme-mode" value="static" ${this.mode === 'static' ? 'checked' : ''}>
                    <label for="theme-static">Statik (Ungu sahaja)</label>
                </div>
            </div>
        `;
        
        // Add event listeners
        const toggleBtn = document.getElementById('theme-toggle-btn');
        const settingsPanel = document.getElementById('theme-settings');
        
        if (toggleBtn && settingsPanel) {
            toggleBtn.addEventListener('click', () => {
                settingsPanel.classList.toggle('show');
            });
            
            // Close when clicking outside
            document.addEventListener('click', (e) => {
                if (!toggleBtn.contains(e.target) && !settingsPanel.contains(e.target)) {
                    settingsPanel.classList.remove('show');
                }
            });
        }
        
        // Radio button listeners
        document.querySelectorAll('input[name="theme-mode"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.setMode(e.target.value);
                if (settingsPanel) {
                    settingsPanel.classList.remove('show');
                }
            });
        });
    }
}

