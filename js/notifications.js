// Prayer Notifications System

export class PrayerNotifications {
    constructor() {
        this.storageKey = 'notificationSettings';
        this.loadSettings();
        this.scheduledNotifications = [];
    }
    
    loadSettings() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.settings = JSON.parse(saved);
        } else {
            this.settings = {
                enabled: false,
                reminderMinutes: 15,
                sound: true
            };
        }
    }
    
    saveSettings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
    }
    
    async requestPermission() {
        if (!('Notification' in window)) {
            alert('Pelayar anda tidak menyokong notifikasi');
            return false;
        }
        
        if (Notification.permission === 'granted') {
            this.settings.enabled = true;
            this.saveSettings();
            return true;
        }
        
        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.settings.enabled = true;
                this.saveSettings();
                this.showTestNotification();
                return true;
            }
        }
        
        return false;
    }
    
    showTestNotification() {
        this.showNotification('Notifikasi Diaktifkan', 'Anda akan menerima peringatan untuk waktu solat', false);
    }
    
    showNotification(title, body, playSound = true) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, {
                body: body,
                icon: '🕌',
                badge: '🕌',
                tag: 'prayer-notification',
                requireInteraction: false
            });
            
            if (playSound && this.settings.sound) {
                this.playNotificationSound();
            }
            
            notification.onclick = () => {
                window.focus();
                notification.close();
            };
            
            // Auto close after 10 seconds
            setTimeout(() => notification.close(), 10000);
        }
    }
    
    playNotificationSound() {
        // Try to play notification sound
        try {
            const audio = new Audio('assets/sounds/notification.mp3');
            audio.volume = 0.5;
            audio.play().catch(err => {
                console.log('Could not play sound:', err);
            });
        } catch (err) {
            console.log('Sound not available');
        }
    }
    
    schedulePrayerNotifications(prayerTimes) {
        // Clear existing scheduled notifications
        this.clearScheduledNotifications();
        
        if (!this.settings.enabled || Notification.permission !== 'granted') {
            return;
        }
        
        const prayers = [
            { name: 'Subuh', time: prayerTimes.subuh || prayerTimes.fajr },
            { name: 'Zohor', time: prayerTimes.zohor || prayerTimes.dhuhr },
            { name: 'Asar', time: prayerTimes.asar || prayerTimes.asr },
            { name: 'Maghrib', time: prayerTimes.maghrib },
            { name: 'Isyak', time: prayerTimes.isyak || prayerTimes.isha }
        ].filter(p => p.time);
        
        const now = new Date();
        const reminderMs = this.settings.reminderMinutes * 60 * 1000;
        
        prayers.forEach(prayer => {
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerTime = new Date();
            prayerTime.setHours(hours, minutes, 0, 0);
            
            // Only schedule if prayer time hasn't passed
            if (prayerTime > now) {
                const notificationTime = new Date(prayerTime.getTime() - reminderMs);
                
                if (notificationTime > now) {
                    const timeUntilNotification = notificationTime - now;
                    
                    const timeoutId = setTimeout(() => {
                        this.showNotification(
                            `⏰ Solat ${prayer.name}`,
                            `Dalam ${this.settings.reminderMinutes} minit lagi (${prayer.time})`,
                            true
                        );
                    }, timeUntilNotification);
                    
                    this.scheduledNotifications.push(timeoutId);
                }
                
                // Also schedule notification at exact prayer time
                const timeUntilPrayer = prayerTime - now;
                if (timeUntilPrayer > 0) {
                    const exactTimeoutId = setTimeout(() => {
                        this.showNotification(
                            `🕌 Masuk Waktu ${prayer.name}`,
                            `Sekarang waktu solat ${prayer.name} (${prayer.time})`,
                            true
                        );
                    }, timeUntilPrayer);
                    
                    this.scheduledNotifications.push(exactTimeoutId);
                }
            }
        });
    }
    
    clearScheduledNotifications() {
        this.scheduledNotifications.forEach(id => clearTimeout(id));
        this.scheduledNotifications = [];
    }
    
    setReminderMinutes(minutes) {
        this.settings.reminderMinutes = minutes;
        this.saveSettings();
    }
    
    toggleSound() {
        this.settings.sound = !this.settings.sound;
        this.saveSettings();
    }
    
    disable() {
        this.settings.enabled = false;
        this.saveSettings();
        this.clearScheduledNotifications();
    }
    
    isEnabled() {
        return this.settings.enabled && Notification.permission === 'granted';
    }
    
    renderSettingsUI() {
        const container = document.getElementById('notification-settings');
        if (!container) return;
        
        const isEnabled = this.isEnabled();
        const canRequest = Notification.permission !== 'denied';
        
        container.innerHTML = `
            <div class="settings-header">
                <h3>🔔 Tetapan Notifikasi</h3>
            </div>
            
            ${!isEnabled && canRequest ? `
                <button class="enable-notifications-btn" id="enable-notifications">
                    Aktifkan Notifikasi
                </button>
            ` : ''}
            
            ${isEnabled ? `
                <div class="settings-group">
                    <label>Peringatan sebelum:</label>
                    <select id="reminder-minutes">
                        <option value="5" ${this.settings.reminderMinutes === 5 ? 'selected' : ''}>5 minit</option>
                        <option value="10" ${this.settings.reminderMinutes === 10 ? 'selected' : ''}>10 minit</option>
                        <option value="15" ${this.settings.reminderMinutes === 15 ? 'selected' : ''}>15 minit</option>
                        <option value="30" ${this.settings.reminderMinutes === 30 ? 'selected' : ''}>30 minit</option>
                    </select>
                </div>
                
                <div class="settings-group">
                    <label>
                        <input type="checkbox" id="sound-toggle" ${this.settings.sound ? 'checked' : ''}>
                        Bunyi notifikasi
                    </label>
                </div>
                
                <button class="disable-notifications-btn" id="disable-notifications">
                    Matikan Notifikasi
                </button>
            ` : ''}
            
            ${Notification.permission === 'denied' ? `
                <div class="notification-denied">
                    ⚠️ Notifikasi dihalang. Sila benarkan notifikasi di tetapan pelayar anda.
                </div>
            ` : ''}
        `;
        
        // Add event listeners
        const enableBtn = document.getElementById('enable-notifications');
        if (enableBtn) {
            enableBtn.addEventListener('click', async () => {
                const granted = await this.requestPermission();
                if (granted) {
                    this.renderSettingsUI();
                }
            });
        }
        
        const disableBtn = document.getElementById('disable-notifications');
        if (disableBtn) {
            disableBtn.addEventListener('click', () => {
                this.disable();
                this.renderSettingsUI();
            });
        }
        
        const reminderSelect = document.getElementById('reminder-minutes');
        if (reminderSelect) {
            reminderSelect.addEventListener('change', (e) => {
                this.setReminderMinutes(parseInt(e.target.value));
            });
        }
        
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.addEventListener('change', () => {
                this.toggleSound();
            });
        }
    }
}

