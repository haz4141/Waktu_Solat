// Prayer Streak Tracker

export class StreakTracker {
    constructor() {
        this.storageKey = 'prayerStreak';
        this.todayKey = 'todayPrayers';
        this.loadData();
    }
    
    loadData() {
        // Load streak data
        const streakData = localStorage.getItem(this.storageKey);
        if (streakData) {
            this.streakData = JSON.parse(streakData);
        } else {
            this.streakData = {
                current: 0,
                longest: 0,
                lastDate: null
            };
        }
        
        // Load today's prayers
        const todayData = localStorage.getItem(this.todayKey);
        const today = new Date().toDateString();
        
        if (todayData) {
            const parsed = JSON.parse(todayData);
            if (parsed.date === today) {
                this.todayPrayers = parsed.prayers;
            } else {
                // New day, check if we need to update streak
                this.checkStreakContinuity(parsed);
                this.todayPrayers = this.getEmptyDayPrayers();
                this.saveTodayPrayers();
            }
        } else {
            this.todayPrayers = this.getEmptyDayPrayers();
            this.saveTodayPrayers();
        }
    }
    
    getEmptyDayPrayers() {
        return {
            'Subuh': false,
            'Zohor': false,
            'Asar': false,
            'Maghrib': false,
            'Isyak': false
        };
    }
    
    checkStreakContinuity(previousData) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (previousData.date === yesterdayStr) {
            // Check if all prayers were completed yesterday
            const allCompleted = Object.values(previousData.prayers).every(p => p === true);
            
            if (allCompleted) {
                // Continue streak
                this.streakData.current += 1;
                if (this.streakData.current > this.streakData.longest) {
                    this.streakData.longest = this.streakData.current;
                }
            } else {
                // Streak broken
                this.streakData.current = 0;
            }
        } else {
            // More than one day gap, streak broken
            this.streakData.current = 0;
        }
        
        this.streakData.lastDate = previousData.date;
        this.saveStreakData();
    }
    
    markPrayed(prayerName) {
        // Only track main 5 prayers
        const trackablePrayers = ['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'];
        if (!trackablePrayers.includes(prayerName)) {
            return;
        }
        
        this.todayPrayers[prayerName] = true;
        this.saveTodayPrayers();
        
        // Check if this completes all prayers for today
        const allCompleted = trackablePrayers.every(p => this.todayPrayers[p]);
        if (allCompleted) {
            this.celebrateCompletion();
        }
    }
    
    isPrayed(prayerName) {
        return this.todayPrayers[prayerName] || false;
    }
    
    getTodayProgress() {
        const trackablePrayers = ['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'];
        const completed = trackablePrayers.filter(p => this.todayPrayers[p]).length;
        return {
            completed,
            total: trackablePrayers.length,
            percentage: (completed / trackablePrayers.length) * 100
        };
    }
    
    getCurrentStreak() {
        return this.streakData.current;
    }
    
    getLongestStreak() {
        return this.streakData.longest;
    }
    
    saveTodayPrayers() {
        const today = new Date().toDateString();
        localStorage.setItem(this.todayKey, JSON.stringify({
            date: today,
            prayers: this.todayPrayers
        }));
    }
    
    saveStreakData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.streakData));
    }
    
    celebrateCompletion() {
        // Show celebration message
        const container = document.getElementById('streak-container');
        if (container) {
            container.classList.add('streak-celebrate');
            setTimeout(() => {
                container.classList.remove('streak-celebrate');
            }, 500);
        }
    }
    
    getMotivationalMessage() {
        const streak = this.streakData.current;
        const progress = this.getTodayProgress();
        
        if (progress.completed === progress.total) {
            return '🎉 Tahniah! Anda telah sempurna hari ini!';
        } else if (streak >= 30) {
            return `🔥 Hebat! ${streak} hari berturut-turut!`;
        } else if (streak >= 7) {
            return `✨ Bagus! ${streak} hari streak!`;
        } else if (progress.completed >= 3) {
            return '💪 Teruskan usaha anda!';
        } else if (progress.completed >= 1) {
            return '👍 Permulaan yang baik!';
        } else {
            return '🕌 Jom mulakan hari dengan solat!';
        }
    }
    
    renderUI() {
        const container = document.getElementById('streak-container');
        if (!container) return;
        
        const progress = this.getTodayProgress();
        const message = this.getMotivationalMessage();
        const streak = this.getCurrentStreak();
        
        container.innerHTML = `
            <div class="streak-header">
                <h3>📊 Pencapaian Hari Ini</h3>
            </div>
            <div class="streak-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="progress-text">${progress.completed}/${progress.total} solat</div>
            </div>
            <div class="streak-counter ${streak > 0 ? 'streak-fire' : ''}">
                🔥 <strong>${streak}</strong> hari berturut-turut
            </div>
            <div class="streak-message">${message}</div>
            <div class="prayer-checklist">
                ${this.renderChecklistItems()}
            </div>
        `;
        
        // Add event listeners for check buttons
        container.querySelectorAll('.check-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prayerName = e.target.dataset.prayer;
                this.markPrayed(prayerName);
                this.renderUI();
                
                // Update prayer times display
                const event = new CustomEvent('prayerChecked', { detail: { prayer: prayerName } });
                document.dispatchEvent(event);
            });
        });
    }
    
    renderChecklistItems() {
        const prayers = ['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'];
        return prayers.map(prayer => {
            const checked = this.isPrayed(prayer);
            return `
                <div class="checklist-item ${checked ? 'checked' : ''}">
                    <button class="check-btn" data-prayer="${prayer}" ${checked ? 'disabled' : ''}>
                        ${checked ? '✓' : '○'}
                    </button>
                    <span>${prayer}</span>
                </div>
            `;
        }).join('');
    }
}

