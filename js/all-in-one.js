// ===== WAKTU SOLAT MALAYSIA - ALL FEATURES IN ONE =====
// Complete implementation with all 5 unique features!

const API_BASE = 'https://api.waktusolat.app';

// ===== DATA =====
const zones = [
    { zone: 'JHR01', negeri: 'Johor', lokasi: 'Pulau Aur dan Pulau Pemanggil', lat: 2.45, lng: 104.52 },
    { zone: 'JHR02', negeri: 'Johor', lokasi: 'Johor Bahru, Kota Tinggi, Mersing, Kulai', lat: 1.4927, lng: 103.7414 },
    { zone: 'JHR03', negeri: 'Johor', lokasi: 'Kluang dan Pontian', lat: 2.0333, lng: 103.3167 },
    { zone: 'JHR04', negeri: 'Johor', lokasi: 'Batu Pahat, Muar, Segamat, Gemas Johor, Tangkak', lat: 1.8500, lng: 102.9333 },
    { zone: 'KDH01', negeri: 'Kedah', lokasi: 'Kota Setar, Kubang Pasu, Pokok Sena', lat: 6.1248, lng: 100.3678 },
    { zone: 'KDH02', negeri: 'Kedah', lokasi: 'Kuala Muda, Yan, Pendang', lat: 5.7716, lng: 100.4786 },
    { zone: 'KDH03', negeri: 'Kedah', lokasi: 'Padang Terap, Sik', lat: 6.3000, lng: 100.8000 },
    { zone: 'KDH04', negeri: 'Kedah', lokasi: 'Baling', lat: 5.6667, lng: 100.9167 },
    { zone: 'KDH05', negeri: 'Kedah', lokasi: 'Bandar Baharu, Kulim', lat: 5.3667, lng: 100.5667 },
    { zone: 'KDH06', negeri: 'Kedah', lokasi: 'Langkawi', lat: 6.3500, lng: 99.8000 },
    { zone: 'KDH07', negeri: 'Kedah', lokasi: 'Gunung Jerai', lat: 5.7833, lng: 100.4167 },
    { zone: 'KTN01', negeri: 'Kelantan', lokasi: 'Kota Bharu, Bachok, Pasir Puteh, Tumpat, Pasir Mas, Tanah Merah, Machang, Kuala Krai', lat: 6.1256, lng: 102.2381 },
    { zone: 'KTN03', negeri: 'Kelantan', lokasi: 'Jeli, Gua Musang (Mukim Chiku)', lat: 5.7000, lng: 101.9500 },
    { zone: 'MLK01', negeri: 'Melaka', lokasi: 'Seluruh Negeri Melaka', lat: 2.1896, lng: 102.2501 },
    { zone: 'NGS01', negeri: 'Negeri Sembilan', lokasi: 'Tampin, Jempol', lat: 2.4667, lng: 102.2333 },
    { zone: 'NGS02', negeri: 'Negeri Sembilan', lokasi: 'Jelebu, Kuala Pilah, Rembau, Port Dickson, Seremban', lat: 2.7258, lng: 101.9424 },
    { zone: 'PHG01', negeri: 'Pahang', lokasi: 'Pulau Tioman', lat: 2.8167, lng: 104.1667 },
    { zone: 'PHG02', negeri: 'Pahang', lokasi: 'Kuantan, Pekan, Rompin, Muadzam Shah', lat: 3.8077, lng: 103.3260 },
    { zone: 'PHG03', negeri: 'Pahang', lokasi: 'Jerantut, Temerloh, Maran, Bera, Chenor, Jengka', lat: 3.5000, lng: 102.4167 },
    { zone: 'PHG04', negeri: 'Pahang', lokasi: 'Bentong, Lipis, Raub', lat: 3.5167, lng: 101.9000 },
    { zone: 'PHG05', negeri: 'Pahang', lokasi: 'Genting Highlands, Bukit Tinggi, Cameron Highlands', lat: 4.4667, lng: 101.3833 },
    { zone: 'PHG06', negeri: 'Pahang', lokasi: 'Bukit Fraser', lat: 3.7167, lng: 101.7333 },
    { zone: 'PLS01', negeri: 'Perlis', lokasi: 'Kangar, Padang Besar, Arau', lat: 6.4414, lng: 100.1986 },
    { zone: 'PNG01', negeri: 'Pulau Pinang', lokasi: 'Seluruh Negeri Pulau Pinang', lat: 5.4141, lng: 100.3288 },
    { zone: 'PRK01', negeri: 'Perak', lokasi: 'Tapah, Slim River, Tanjung Malim', lat: 3.8667, lng: 101.2667 },
    { zone: 'PRK02', negeri: 'Perak', lokasi: 'Kuala Kangsar, Sg. Siput, Ipoh, Batu Gajah, Kampar', lat: 4.5975, lng: 101.0901 },
    { zone: 'PRK03', negeri: 'Perak', lokasi: 'Lenggong, Pengkalan Hulu, Grik', lat: 5.3833, lng: 100.9833 },
    { zone: 'PRK04', negeri: 'Perak', lokasi: 'Temengor, Belum', lat: 5.5833, lng: 101.4167 },
    { zone: 'PRK05', negeri: 'Perak', lokasi: 'Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor', lat: 4.0333, lng: 100.9667 },
    { zone: 'PRK06', negeri: 'Perak', lokasi: 'Selama, Taiping, Bagan Serai, Parit Buntar', lat: 5.0000, lng: 100.7333 },
    { zone: 'PRK07', negeri: 'Perak', lokasi: 'Bukit Larut', lat: 4.8667, lng: 100.7833 },
    { zone: 'SBH01', negeri: 'Sabah', lokasi: 'Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan', lat: 5.8389, lng: 118.1178 },
    { zone: 'SBH02', negeri: 'Sabah', lokasi: 'Bandar Sabah, Ranau, Kota Kinabalu, Tuaran, Penampang, Papar', lat: 5.9804, lng: 116.0735 },
    { zone: 'SBH03', negeri: 'Sabah', lokasi: 'Lahad Datu, Kunak, Silabukan, Tungku, Sahabat, Semporna', lat: 5.0320, lng: 118.3400 },
    { zone: 'SBH04', negeri: 'Sabah', lokasi: 'Tawau, Balong, Merotai, Kalabakan', lat: 4.2481, lng: 117.8933 },
    { zone: 'SBH05', negeri: 'Sabah', lokasi: 'Kudat, Kota Marudu, Pitas, Pulau Banggi', lat: 6.8833, lng: 116.8333 },
    { zone: 'SBH06', negeri: 'Sabah', lokasi: 'Gunung Kinabalu', lat: 6.0750, lng: 116.5583 },
    { zone: 'SBH07', negeri: 'Sabah', lokasi: 'Bahagian Sandakan (Barat), Pinangah, Terusan, Beluran', lat: 5.9550, lng: 117.4217 },
    { zone: 'SBH08', negeri: 'Sabah', lokasi: 'Putatan, Penampang, Kota Kinabalu, Tuaran, Semporna', lat: 5.9167, lng: 116.0667 },
    { zone: 'SBH09', negeri: 'Sabah', lokasi: 'Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston', lat: 5.3667, lng: 115.7500 },
    { zone: 'SWK01', negeri: 'Sarawak', lokasi: 'Limbang, Lawas, Sundar, Trusan', lat: 4.7500, lng: 115.0000 },
    { zone: 'SWK02', negeri: 'Sarawak', lokasi: 'Miri, Niah, Bekenu, Sibuti, Marudi', lat: 4.3900, lng: 113.9910 },
    { zone: 'SWK03', negeri: 'Sarawak', lokasi: 'Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu', lat: 3.1667, lng: 113.0333 },
    { zone: 'SWK04', negeri: 'Sarawak', lokasi: 'Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit', lat: 2.3000, lng: 111.8167 },
    { zone: 'SWK05', negeri: 'Sarawak', lokasi: 'Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai', lat: 2.1167, lng: 111.5167 },
    { zone: 'SWK06', negeri: 'Sarawak', lokasi: 'Kabong, Lingga, Sri Aman, Engkilili, Betong, Spaoh, Pusa, Saratok, Roban, Debak', lat: 1.2400, lng: 111.4600 },
    { zone: 'SWK07', negeri: 'Sarawak', lokasi: 'Serian, Simunjan, Samarahan, Sebuyau, Meludam', lat: 1.2000, lng: 110.5500 },
    { zone: 'SWK08', negeri: 'Sarawak', lokasi: 'Kuching, Bau, Lundu, Sematan', lat: 1.5533, lng: 110.3593 },
    { zone: 'SWK09', negeri: 'Sarawak', lokasi: 'Zon Khas (Kampung Patarikan)', lat: 1.4833, lng: 110.3667 },
    { zone: 'SGR01', negeri: 'Selangor', lokasi: 'Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Rawang, S.Alam', lat: 3.0738, lng: 101.5183 },
    { zone: 'SGR02', negeri: 'Selangor', lokasi: 'Kuala Selangor, Sabak Bernam', lat: 3.6667, lng: 101.1167 },
    { zone: 'SGR03', negeri: 'Selangor', lokasi: 'Klang, Kuala Langat', lat: 3.0333, lng: 101.4500 },
    { zone: 'TRG01', negeri: 'Terengganu', lokasi: 'Kuala Terengganu, Marang, Kuala Nerus', lat: 5.3302, lng: 103.1408 },
    { zone: 'TRG02', negeri: 'Terengganu', lokasi: 'Besut, Setiu', lat: 5.8167, lng: 102.5667 },
    { zone: 'TRG03', negeri: 'Terengganu', lokasi: 'Dungun, Kemaman', lat: 4.7544, lng: 103.4169 },
    { zone: 'TRG04', negeri: 'Terengganu', lokasi: 'Hulu Terengganu', lat: 5.0167, lng: 102.9333 },
    { zone: 'WLY01', negeri: 'Wilayah Persekutuan', lokasi: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },
    { zone: 'WLY02', negeri: 'Wilayah Persekutuan', lokasi: 'Labuan', lat: 5.2831, lng: 115.2308 },
    { zone: 'WLY03', negeri: 'Wilayah Persekutuan', lokasi: 'Putrajaya', lat: 2.9264, lng: 101.6964 }
];

const prayerOrder = [
    { keys: ['imsak'], display: 'Imsak' },
    { keys: ['subuh', 'fajr'], display: 'Subuh' },
    { keys: ['syuruk', 'sunrise'], display: 'Syuruk' },
    { keys: ['zohor', 'dhuhr'], display: 'Zohor' },
    { keys: ['asar', 'asr'], display: 'Asar' },
    { keys: ['maghrib'], display: 'Maghrib' },
    { keys: ['isyak', 'isha'], display: 'Isyak' }
];

const hijriMonths = {
    '01': 'Muharram', '02': 'Safar', '03': 'Rabiul Awal', '04': 'Rabiul Akhir',
    '05': 'Jamadil Awal', '06': 'Jamadil Akhir', '07': 'Rejab', '08': 'Syaaban',
    '09': 'Ramadan', '10': 'Syawal', '11': 'Zulkaedah', '12': 'Zulhijjah'
};

// ===== GLOBAL STATE =====
let currentZone = 'WLY01';
let prayerData = null;
let prayerClock = null;
let streakTracker = null;
let notifications = null;
let themeController = null;

// ===== FEATURE 1: CIRCULAR PRAYER CLOCK (KILLER FEATURE!) =====
class PrayerClock {
    constructor(canvasId, centerDivId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.centerDiv = document.getElementById(centerDivId);
        this.prayerTimes = null;
        this.animationFrame = null;
        
        this.colors = {
            'Imsak': '#9b59b6', 'Subuh': '#b993d6', 'Syuruk': '#f39c12',
            'Zohor': '#3498db', 'Asar': '#e67e22', 'Maghrib': '#e74c3c', 'Isyak': '#2c3e50'
        };
        
        this.setupCanvas();
    }
    
    setupCanvas() {
        if (!this.canvas || !this.canvas.parentElement) return;
        
        try {
            const size = Math.min(this.canvas.parentElement.clientWidth - 40, 350);
            this.canvas.width = size;
            this.canvas.height = size;
            this.canvas.style.width = size + 'px';
            this.canvas.style.height = size + 'px';
            this.centerX = size / 2;
            this.centerY = size / 2;
            this.radius = (size / 2) - 30;
        } catch (error) {
            console.error('Error in setupCanvas:', error);
        }
    }
    
    setPrayerTimes(data) {
        this.prayerTimes = data;
        this.draw();
        this.startAnimation();
    }
    
    timeToAngle(timeStr) {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return (totalMinutes / (24 * 60)) * 2 * Math.PI - Math.PI / 2;
    }
    
    getCurrentTimeAngle() {
        const now = new Date();
        const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        return (totalSeconds / (24 * 3600)) * 2 * Math.PI - Math.PI / 2;
    }
    
    draw() {
        if (!this.prayerTimes || !this.ctx || !this.canvas) return;
        
        try {
            const ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const prayers = [
            { name: 'Imsak', time: this.prayerTimes.imsak },
            { name: 'Subuh', time: this.prayerTimes.subuh || this.prayerTimes.fajr },
            { name: 'Syuruk', time: this.prayerTimes.syuruk || this.prayerTimes.sunrise },
            { name: 'Zohor', time: this.prayerTimes.zohor || this.prayerTimes.dhuhr },
            { name: 'Asar', time: this.prayerTimes.asar || this.prayerTimes.asr },
            { name: 'Maghrib', time: this.prayerTimes.maghrib },
            { name: 'Isyak', time: this.prayerTimes.isyak || this.prayerTimes.isha }
        ].filter(p => p.time);
        
        // Draw prayer segments
        for (let i = 0; i < prayers.length; i++) {
            const prayer = prayers[i];
            const nextPrayer = prayers[i + 1];
            
            const startAngle = this.timeToAngle(prayer.time);
            const endAngle = nextPrayer ? this.timeToAngle(nextPrayer.time) : this.timeToAngle(prayer.time) + (2 * Math.PI);
            
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            ctx.lineWidth = 40;
            ctx.strokeStyle = this.colors[prayer.name];
            ctx.stroke();
            
            // Draw labels
            const midAngle = (startAngle + endAngle) / 2;
            const labelRadius = this.radius - 60;
            const labelX = this.centerX + Math.cos(midAngle) * labelRadius;
            const labelY = this.centerY + Math.sin(midAngle) * labelRadius;
            
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(prayer.name, labelX, labelY);
            ctx.fillText(prayer.time, labelX, labelY + 15);
        }
        
        // Draw current time needle
        const currentAngle = this.getCurrentTimeAngle();
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.centerY);
        ctx.lineTo(
            this.centerX + Math.cos(currentAngle) * (this.radius + 10),
            this.centerY + Math.sin(currentAngle) * (this.radius + 10)
        );
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fff';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 5;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius * 0.55, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        
        this.updateCountdown();
        
        } catch (error) {
            console.error('Error in draw():', error);
        }
    }
    
    getNextPrayer() {
        if (!this.prayerTimes) return null;
        
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        const prayers = [
            { name: 'Imsak', time: this.prayerTimes.imsak },
            { name: 'Subuh', time: this.prayerTimes.subuh || this.prayerTimes.fajr },
            { name: 'Syuruk', time: this.prayerTimes.syuruk || this.prayerTimes.sunrise },
            { name: 'Zohor', time: this.prayerTimes.zohor || this.prayerTimes.dhuhr },
            { name: 'Asar', time: this.prayerTimes.asar || this.prayerTimes.asr },
            { name: 'Maghrib', time: this.prayerTimes.maghrib },
            { name: 'Isyak', time: this.prayerTimes.isyak || this.prayerTimes.isha }
        ].filter(p => p.time);
        
        for (const prayer of prayers) {
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;
            
            if (prayerMinutes > currentMinutes) {
                return { ...prayer, minutes: prayerMinutes };
            }
        }
        
        return prayers[0] ? { ...prayers[0], tomorrow: true } : null;
    }
    
    updateCountdown() {
        const nextPrayer = this.getNextPrayer();
        if (!nextPrayer || !this.centerDiv) return;
        
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
        
        let diffMinutes;
        if (nextPrayer.tomorrow) {
            diffMinutes = (24 * 60) - currentMinutes + nextPrayer.minutes;
        } else {
            diffMinutes = nextPrayer.minutes - currentMinutes;
        }
        
        const hours = Math.floor(diffMinutes / 60);
        const minutes = Math.floor(diffMinutes % 60);
        const seconds = Math.floor((diffMinutes * 60) % 60);
        
        this.centerDiv.innerHTML = `
            <div class="next-prayer-label">Solat Seterusnya</div>
            <div class="next-prayer-name">${nextPrayer.name}</div>
            <div class="countdown-timer">${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}</div>
            <div class="countdown-label">${nextPrayer.time}</div>
        `;
    }
    
    startAnimation() {
        const animate = () => {
            this.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }
    
    stop() {
        if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    }
}

// ===== FEATURE 2: STREAK TRACKER =====
class StreakTracker {
    constructor() {
        this.storageKey = 'prayerStreak';
        this.todayKey = 'todayPrayers';
        this.loadData();
    }
    
    loadData() {
        const streakData = localStorage.getItem(this.storageKey);
        this.streakData = streakData ? JSON.parse(streakData) : { current: 0, longest: 0, lastDate: null };
        
        const todayData = localStorage.getItem(this.todayKey);
        const today = new Date().toDateString();
        
        if (todayData) {
            const parsed = JSON.parse(todayData);
            if (parsed.date === today) {
                this.todayPrayers = parsed.prayers;
            } else {
                this.checkStreakContinuity(parsed);
                this.todayPrayers = { 'Subuh': false, 'Zohor': false, 'Asar': false, 'Maghrib': false, 'Isyak': false };
                this.saveTodayPrayers();
            }
        } else {
            this.todayPrayers = { 'Subuh': false, 'Zohor': false, 'Asar': false, 'Maghrib': false, 'Isyak': false };
            this.saveTodayPrayers();
        }
    }
    
    checkStreakContinuity(previousData) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (previousData.date === yesterday.toDateString()) {
            const allCompleted = Object.values(previousData.prayers).every(p => p);
            if (allCompleted) {
                this.streakData.current += 1;
                if (this.streakData.current > this.streakData.longest) {
                    this.streakData.longest = this.streakData.current;
                }
            } else {
                this.streakData.current = 0;
            }
        } else {
            this.streakData.current = 0;
        }
        
        this.streakData.lastDate = previousData.date;
        localStorage.setItem(this.storageKey, JSON.stringify(this.streakData));
    }
    
    markPrayed(prayerName) {
        this.todayPrayers[prayerName] = true;
        this.saveTodayPrayers();
        
        const allCompleted = ['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'].every(p => this.todayPrayers[p]);
        if (allCompleted) {
            const container = document.getElementById('streak-container');
            if (container) {
                container.classList.add('streak-celebrate');
                setTimeout(() => container.classList.remove('streak-celebrate'), 500);
            }
        }
    }
    
    saveTodayPrayers() {
        localStorage.setItem(this.todayKey, JSON.stringify({
            date: new Date().toDateString(),
            prayers: this.todayPrayers
        }));
    }
    
    renderUI() {
        const container = document.getElementById('streak-container');
        if (!container) return;
        
        const progress = this.getTodayProgress();
        const message = this.getMotivationalMessage();
        
        container.innerHTML = `
            <div class="streak-header"><h3>📊 Pencapaian Hari Ini</h3></div>
            <div class="streak-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="progress-text">${progress.completed}/${progress.total} solat</div>
            </div>
            <div class="streak-counter ${this.streakData.current > 0 ? 'streak-fire' : ''}">
                🔥 <strong>${this.streakData.current}</strong> hari berturut-turut
            </div>
            <div class="streak-message">${message}</div>
            <div class="prayer-checklist">
                ${['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'].map(prayer => {
                    const checked = this.todayPrayers[prayer];
                    return `
                        <div class="checklist-item ${checked ? 'checked' : ''}">
                            <button class="check-btn" data-prayer="${prayer}" ${checked ? 'disabled' : ''}>
                                ${checked ? '✓' : '○'}
                            </button>
                            <span>${prayer}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        container.querySelectorAll('.check-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prayerName = e.target.dataset.prayer;
                this.markPrayed(prayerName);
                this.renderUI();
                document.dispatchEvent(new CustomEvent('prayerChecked', { detail: { prayer: prayerName } }));
            });
        });
    }
    
    getTodayProgress() {
        const completed = ['Subuh', 'Zohor', 'Asar', 'Maghrib', 'Isyak'].filter(p => this.todayPrayers[p]).length;
        return { completed, total: 5, percentage: (completed / 5) * 100 };
    }
    
    getMotivationalMessage() {
        const streak = this.streakData.current;
        const progress = this.getTodayProgress();
        
        if (progress.completed === 5) return '🎉 Tahniah! Anda telah sempurna hari ini!';
        if (streak >= 30) return `🔥 Hebat! ${streak} hari berturut-turut!`;
        if (streak >= 7) return `✨ Bagus! ${streak} hari streak!`;
        if (progress.completed >= 3) return '💪 Teruskan usaha anda!';
        if (progress.completed >= 1) return '👍 Permulaan yang baik!';
        return '🕌 Jom mulakan hari dengan solat!';
    }
}

// ===== FEATURE 3: NOTIFICATIONS =====
class PrayerNotifications {
    constructor() {
        this.storageKey = 'notificationSettings';
        const saved = localStorage.getItem(this.storageKey);
        this.settings = saved ? JSON.parse(saved) : { enabled: false, reminderMinutes: 15, sound: true };
        this.scheduledNotifications = [];
    }
    
    async requestPermission() {
        if (!('Notification' in window)) {
            alert('Pelayar tidak menyokong notifikasi');
            return false;
        }
        
        if (Notification.permission === 'granted') {
            this.settings.enabled = true;
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
            return true;
        }
        
        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.settings.enabled = true;
                localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
                this.showNotification('Notifikasi Diaktifkan', 'Anda akan menerima peringatan waktu solat', false);
                return true;
            }
        }
        return false;
    }
    
    showNotification(title, body, playSound = true) {
        if (Notification.permission === 'granted') {
            const notification = new Notification(title, { body, icon: '🕌', badge: '🕌' });
            notification.onclick = () => { window.focus(); notification.close(); };
            setTimeout(() => notification.close(), 10000);
        }
    }
    
    schedulePrayerNotifications(prayerTimes) {
        this.clearScheduledNotifications();
        
        if (!this.settings.enabled || Notification.permission !== 'granted') return;
        
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
            
            if (prayerTime > now) {
                const notificationTime = new Date(prayerTime.getTime() - reminderMs);
                
                if (notificationTime > now) {
                    const timeoutId = setTimeout(() => {
                        this.showNotification(`⏰ Solat ${prayer.name}`, `Dalam ${this.settings.reminderMinutes} minit lagi (${prayer.time})`, true);
                    }, notificationTime - now);
                    this.scheduledNotifications.push(timeoutId);
                }
                
                const exactTimeoutId = setTimeout(() => {
                    this.showNotification(`🕌 Masuk Waktu ${prayer.name}`, `Sekarang waktu solat ${prayer.name} (${prayer.time})`, true);
                }, prayerTime - now);
                this.scheduledNotifications.push(exactTimeoutId);
            }
        });
    }
    
    clearScheduledNotifications() {
        this.scheduledNotifications.forEach(id => clearTimeout(id));
        this.scheduledNotifications = [];
    }
    
    renderSettingsUI() {
        const container = document.getElementById('notification-settings');
        if (!container) return;
        
        const isEnabled = this.settings.enabled && Notification.permission === 'granted';
        const canRequest = Notification.permission !== 'denied';
        
        container.innerHTML = `
            <div class="settings-header"><h3>🔔 Tetapan Notifikasi</h3></div>
            ${!isEnabled && canRequest ? '<button class="enable-notifications-btn" id="enable-notifications">Aktifkan Notifikasi</button>' : ''}
            ${isEnabled ? `
                <div class="settings-group">
                    <label>Peringatan sebelum:</label>
                    <select id="reminder-minutes">
                        ${[5, 10, 15, 30].map(m => `<option value="${m}" ${this.settings.reminderMinutes === m ? 'selected' : ''}>${m} minit</option>`).join('')}
                    </select>
                </div>
                <div class="settings-group">
                    <label><input type="checkbox" id="sound-toggle" ${this.settings.sound ? 'checked' : ''}> Bunyi notifikasi</label>
                </div>
                <button class="disable-notifications-btn" id="disable-notifications">Matikan Notifikasi</button>
            ` : ''}
            ${Notification.permission === 'denied' ? '<div class="notification-denied">⚠️ Notifikasi dihalang. Sila benarkan di tetapan pelayar.</div>' : ''}
        `;
        
        document.getElementById('enable-notifications')?.addEventListener('click', async () => {
            if (await this.requestPermission()) this.renderSettingsUI();
        });
        
        document.getElementById('disable-notifications')?.addEventListener('click', () => {
            this.settings.enabled = false;
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
            this.clearScheduledNotifications();
            this.renderSettingsUI();
        });
        
        document.getElementById('reminder-minutes')?.addEventListener('change', (e) => {
            this.settings.reminderMinutes = parseInt(e.target.value);
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        });
        
        document.getElementById('sound-toggle')?.addEventListener('change', () => {
            this.settings.sound = !this.settings.sound;
            localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        });
    }
}

// ===== FEATURE 4: DYNAMIC THEMES =====
class ThemeController {
    constructor() {
        this.storageKey = 'themeMode';
        this.mode = 'static'; // Force static mode
        this.currentTheme = null;
    }
    
    updateTheme(prayerTimes) {
        // Always use static theme
        document.body.className = '';
        return;
        
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
        
        let activeTheme = 'theme-isyak';
        
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
            } else if (currentMinutes >= prayerMinutes) {
                activeTheme = prayer.theme;
                break;
            }
        }
        
        if (prayers[0]) {
            const [firstHours, firstMinutes] = prayers[0].time.split(':').map(Number);
            if (currentMinutes < firstHours * 60 + firstMinutes) activeTheme = 'theme-isyak';
        }
        
        if (this.currentTheme !== activeTheme) {
            document.body.className = activeTheme;
            this.currentTheme = activeTheme;
        }
    }
    
    renderToggleUI() {
        // Theme toggle hidden - using static purple theme
        const container = document.getElementById('theme-toggle-container');
        if (container) {
            container.innerHTML = '';
        }
    }
}

// ===== FEATURE 5: AR QIBLA FINDER (Like Google's) =====
let qiblaFinder = null;

class ARQiblaFinder {
    constructor() {
        this.userLocation = null;
        this.qiblaDirection = null;
        this.deviceHeading = 0;
        this.isActive = false;
        this.videoStream = null;
        this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
    
    calculateQibla(userLat, userLng) {
        const kaaba = { lat: 21.4225, lng: 39.8262 };
        
        const lat1 = userLat * Math.PI / 180;
        const lat2 = kaaba.lat * Math.PI / 180;
        const dLng = (kaaba.lng - userLng) * Math.PI / 180;
        
        const y = Math.sin(dLng);
        const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
        let qibla = Math.atan2(y, x) * 180 / Math.PI;
        qibla = (qibla + 360) % 360;
        
        const R = 6371;
        const dLat = (kaaba.lat - userLat) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(userLat * Math.PI / 180) * Math.cos(kaaba.lat * Math.PI / 180) *
                 Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        return { direction: qibla, distance: distance };
    }
    
    async open() {
        if (!navigator.geolocation) {
            alert('Pelayar tidak menyokong geolocation');
            return;
        }
        
        try {
            // Get user location
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            this.userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            const qiblaData = this.calculateQibla(this.userLocation.lat, this.userLocation.lng);
            this.qiblaDirection = qiblaData.direction;
            
            // Create fullscreen AR view
            this.createARView(qiblaData);
            
        } catch (error) {
            alert('Tidak dapat mengesan lokasi. Sila benarkan akses lokasi.');
        }
    }
    
    createARView(qiblaData) {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.id = 'qibla-ar-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 10000;
            display: flex;
            flex-direction: column;
        `;
        
        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 20px;
            background: rgba(107, 70, 193, 0.9);
            color: white;
            text-align: center;
            position: relative;
        `;
        header.innerHTML = `
            <button onclick="qiblaFinder.close()" style="position: absolute; left: 20px; top: 20px; background: rgba(255,255,255,0.2); border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer;">✕ Tutup</button>
            <h2 style="margin: 0;">🕋 Arah Kiblat</h2>
            <p style="margin: 5px 0 0 0; font-size: 0.9rem;">Arah: <strong>${Math.round(qiblaData.direction)}°</strong> | Jarak: <strong>${Math.round(qiblaData.distance).toLocaleString()} km</strong></p>
        `;
        
        // Main content area
        const content = document.createElement('div');
        content.style.cssText = `
            flex: 1;
            position: relative;
            overflow: hidden;
        `;
        
        if (this.isMobile) {
            // Mobile: Camera + AR Compass
            this.setupCameraView(content, qiblaData);
        } else {
            // Desktop: Map View
            this.setupMapView(content, qiblaData);
        }
        
        overlay.appendChild(header);
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        this.isActive = true;
        
        // Start compass tracking if mobile
        if (this.isMobile) {
            this.startCompassTracking(content);
        }
    }
    
    async setupCameraView(container, qiblaData) {
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || window.innerHeight;
        const cx = width / 2;
        const cy = height / 2;
        
        container.innerHTML = `
            <video id="qibla-camera" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
            <div id="qibla-compass-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="position: absolute;">
                    <!-- Compass circles -->
                    <circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
                    <circle cx="${cx}" cy="${cy}" r="100" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
                    
                    <!-- Direction markers -->
                    <text x="${cx}" y="${cy - 140}" text-anchor="middle" fill="white" font-size="24" font-weight="bold">N</text>
                    <text x="${cx + 140}" y="${cy + 8}" text-anchor="middle" fill="white" font-size="20">E</text>
                    <text x="${cx}" y="${cy + 160}" text-anchor="middle" fill="white" font-size="20">S</text>
                    <text x="${cx - 140}" y="${cy + 8}" text-anchor="middle" fill="white" font-size="20">W</text>
                    
                    <!-- Qibla arrow (will be rotated by JavaScript) -->
                    <g id="qibla-arrow" style="transform-origin: ${cx}px ${cy}px;">
                        <path d="M ${cx} ${cy - 90} L ${cx - 12} ${cy - 30} L ${cx} ${cy - 35} L ${cx + 12} ${cy - 30} Z" fill="#10b981" stroke="white" stroke-width="3"/>
                        <circle cx="${cx}" cy="${cy}" r="10" fill="#10b981" stroke="white" stroke-width="3"/>
                        <text x="${cx}" y="${cy - 100}" text-anchor="middle" fill="white" font-size="24" font-weight="bold">🕋</text>
                    </g>
                </svg>
                
                <div style="position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(107, 70, 193, 0.95); padding: 20px 30px; border-radius: 15px; color: white; text-align: center; max-width: 90%; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                    <div style="font-size: 1.3rem; font-weight: bold; margin-bottom: 8px;">Pusingkan Telefon ke Arah Kiblat</div>
                    <div style="font-size: 1rem;">Bila anak panah hijau 🕋 menghala ke atas = Arah Kiblat ✓</div>
                </div>
            </div>
        `;
        
        try {
            const video = document.getElementById('qibla-camera');
            this.videoStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            video.srcObject = this.videoStream;
        } catch (error) {
            container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: white; text-align: center; padding: 20px;">❌ Tidak dapat mengakses kamera. Sila benarkan akses kamera.</div>';
        }
    }
    
    setupMapView(container, qiblaData) {
        container.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; color: white; padding: 40px;">
                <div style="background: rgba(107, 70, 193, 0.9); padding: 40px; border-radius: 20px; text-align: center; max-width: 500px;">
                    <div style="font-size: 5rem; margin-bottom: 20px;">🧭</div>
                    <h3 style="font-size: 2rem; margin-bottom: 15px;">Arah Kiblat</h3>
                    <div style="font-size: 3rem; font-weight: bold; color: #10b981; margin: 20px 0;">${Math.round(qiblaData.direction)}°</div>
                    <div style="font-size: 1.2rem; margin-bottom: 10px;">Jarak ke Kaabah:</div>
                    <div style="font-size: 1.5rem; font-weight: bold;">${Math.round(qiblaData.distance).toLocaleString()} km</div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.3); border-radius: 10px;">
                        <p style="margin: 0; font-size: 0.95rem;">Gunakan kompas dan hadapkan ke arah ${Math.round(qiblaData.direction)}° dari Utara.</p>
                        <p style="margin: 10px 0 0 0; font-size: 0.85rem; opacity: 0.8;">Lokasi anda: ${this.userLocation.lat.toFixed(4)}, ${this.userLocation.lng.toFixed(4)}</p>
                    </div>
                    
                    <div style="margin-top: 30px; font-size: 0.9rem; opacity: 0.7;">
                        💡 Tip: Gunakan aplikasi kompas pada telefon untuk ketepatan lebih baik
                    </div>
                </div>
            </div>
        `;
    }
    
    startCompassTracking(container) {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', (event) => {
                if (!this.isActive) return;
                
                let heading = event.alpha; // Compass heading
                if (heading !== null) {
                    // Calculate rotation for arrow
                    const arrowRotation = this.qiblaDirection - heading;
                    const arrow = document.getElementById('qibla-arrow');
                    if (arrow) {
                        arrow.style.transform = `rotate(${arrowRotation}deg)`;
                        arrow.style.transformOrigin = 'center';
                    }
                }
            });
        }
    }
    
    close() {
        this.isActive = false;
        
        // Stop camera stream
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
            this.videoStream = null;
        }
        
        // Remove overlay
        const overlay = document.getElementById('qibla-ar-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
}

function initQibla() {
    qiblaFinder = new ARQiblaFinder();
    
    const compact = document.getElementById('qibla-compact');
    if (compact) {
        compact.addEventListener('click', () => {
            qiblaFinder.open();
        });
    }
}

// ===== HELPER FUNCTIONS =====
async function fetchPrayerTimes(zone) {
    const response = await fetch(`https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=${zone}`);
    const data = await response.json();
    return data.prayerTime ? data.prayerTime[0] : (data.data ? data.data[0] : data);
}

function formatHijriDate(hijriStr) {
    if (!hijriStr) return '';
    const parts = hijriStr.split('-');
    if (parts.length === 3) {
        const [year, month, day] = parts[0].length === 4 ? parts : [parts[2], parts[1], parts[0]];
        return `${parseInt(day)} ${hijriMonths[month] || month} ${year}`;
    }
    return hijriStr;
}

// ===== MAIN APP INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 App initializing...');
    
    try {
        // Initialize all features with error handling
        const canvas = document.getElementById('clock-canvas');
        const center = document.getElementById('clock-center');
        
        if (canvas && center) {
            prayerClock = new PrayerClock('clock-canvas', 'clock-center');
            console.log('✅ Prayer clock initialized');
        } else {
            console.warn('⚠️ Clock elements not found');
        }
        
        streakTracker = new StreakTracker();
        notifications = new PrayerNotifications();
        themeController = new ThemeController();
        console.log('✅ Features initialized');
        
        // Render UIs
        streakTracker.renderUI();
        notifications.renderSettingsUI();
        themeController.renderToggleUI();
        initQibla();
        console.log('✅ UIs rendered');
        
        // Load zones and setup event listeners
        loadZones();
        console.log('✅ Zones loaded');
        
        const detectBtn = document.getElementById('detect-location');
        const zoneSelect = document.getElementById('zone-select');
        
        if (detectBtn) {
            detectBtn.addEventListener('click', detectLocation);
        }
        
        if (zoneSelect) {
            zoneSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    currentZone = e.target.value;
                    loadPrayerTimes(e.target.value);
                }
            });
        }
        
        // Listen for prayer check-ins
        document.addEventListener('prayerChecked', () => {
            if (currentZone && prayerData) {
                displayPrayerTimes(prayerData, currentZone);
            }
        });
        
        // Refresh every minute
        setInterval(() => {
            if (currentZone && prayerData) {
                if (prayerClock) prayerClock.draw();
                themeController.updateTheme(prayerData);
            }
        }, 60000);
        
        console.log('✅ App fully initialized!');
        
    } catch (error) {
        console.error('❌ Initialization error:', error);
        alert('Ralat memulakan aplikasi: ' + error.message);
    }
});

function loadZones() {
    const select = document.getElementById('zone-select');
    select.innerHTML = '<option value="">-- Pilih Lokasi --</option>';
    
    const grouped = {};
    zones.forEach(z => {
        if (!grouped[z.negeri]) grouped[z.negeri] = [];
        grouped[z.negeri].push(z);
    });
    
    Object.keys(grouped).sort().forEach(negeri => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = negeri;
        grouped[negeri].forEach(z => {
            const opt = document.createElement('option');
            opt.value = z.zone;
            opt.textContent = z.lokasi;
            optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
    });
    
    select.value = 'WLY01';
    loadPrayerTimes('WLY01');
}

async function loadPrayerTimes(zone) {
    console.log('🔄 Loading prayer times for zone:', zone);
    
    const loading = document.getElementById('loading');
    const content = document.getElementById('content');
    const error = document.getElementById('error');
    
    if (loading) loading.style.display = 'block';
    if (content) content.style.display = 'none';
    if (error) error.style.display = 'none';
    
    try {
        prayerData = await fetchPrayerTimes(zone);
        console.log('✅ Prayer data received:', prayerData);
        
        displayPrayerTimes(prayerData, zone);
        
        // Update all features
        if (prayerClock) {
            prayerClock.setPrayerTimes(prayerData);
            console.log('✅ Clock updated');
        }
        if (notifications && notifications.settings.enabled) {
            notifications.schedulePrayerNotifications(prayerData);
        }
        if (themeController) {
            themeController.updateTheme(prayerData);
        }
        
    } catch (err) {
        console.error('❌ Error loading prayer times:', err);
        if (error) {
            error.textContent = '❌ Gagal memuat waktu solat. Sila cuba lagi. (' + err.message + ')';
            error.style.display = 'block';
        }
        if (loading) loading.style.display = 'none';
    }
}

function displayPrayerTimes(data, zone) {
    console.log('📅 Displaying prayer times for zone:', zone);
    
    try {
        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('ms-MY', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
        }
        
        const hijriEl = document.getElementById('hijri-date');
        if (hijriEl) {
            hijriEl.textContent = formatHijriDate(data.hijri || data.hijriDate || '');
        }
    
        const zoneInfo = zones.find(z => z.zone === zone);
        if (zoneInfo) {
            const locNameEl = document.getElementById('location-name');
            const locDetailEl = document.getElementById('location-detail');
            if (locNameEl) locNameEl.textContent = zoneInfo.lokasi;
            if (locDetailEl) locDetailEl.textContent = `${zoneInfo.negeri} • Zon ${zone}`;
        }
        
        const container = document.getElementById('prayer-times');
        if (container) {
            container.innerHTML = '';
            
            prayerOrder.forEach(prayer => {
                let time = null;
                for (const key of prayer.keys) {
                    if (data[key]) {
                        time = typeof data[key] === 'object' ? data[key].time : data[key];
                        break;
                    }
                }
                
                if (time) {
                    const div = document.createElement('div');
                    div.className = 'prayer-item';
                    div.innerHTML = `
                        <div class="prayer-name">${prayer.display}</div>
                        <div class="prayer-time">${time}</div>
                    `;
                    container.appendChild(div);
                }
            });
        }
        
        const loadingEl = document.getElementById('loading');
        const contentEl = document.getElementById('content');
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block';
        
        console.log('✅ Prayer times displayed successfully');
        
    } catch (error) {
        console.error('❌ Error in displayPrayerTimes:', error);
    }
}

function detectLocation() {
    const btn = document.getElementById('detect-location');
    const status = document.getElementById('location-status');
    
    if (!navigator.geolocation) {
        status.textContent = '❌ Pelayar tidak menyokong geolocation';
        status.className = 'location-status error';
        status.style.display = 'block';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = '📍 Mengesan...';
    status.textContent = '🔍 Mengesan lokasi...';
    status.className = 'location-status info';
    status.style.display = 'block';
    
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            let nearest = zones[0];
            let minDist = Infinity;
            
            zones.forEach(z => {
                if (z.lat && z.lng) {
                    const dist = Math.sqrt(Math.pow(latitude - z.lat, 2) + Math.pow(longitude - z.lng, 2));
                    if (dist < minDist) {
                        minDist = dist;
                        nearest = z;
                    }
                }
            });
            
            document.getElementById('zone-select').value = nearest.zone;
            currentZone = nearest.zone;
            loadPrayerTimes(nearest.zone);
            
            status.textContent = `✅ Lokasi: ${nearest.lokasi}`;
            status.className = 'location-status success';
            btn.disabled = false;
            btn.textContent = '📍 Kesan Lokasi Saya';
            setTimeout(() => status.style.display = 'none', 3000);
        },
        (err) => {
            status.textContent = '❌ Tidak dapat mengesan lokasi';
            status.className = 'location-status error';
            btn.disabled = false;
            btn.textContent = '📍 Kesan Lokasi Saya';
        }
    );
}
