// Prayer data and API management

const API_BASE = 'https://api.waktusolat.app';

// Senarai lengkap zon Malaysia (dari JAKIM) dengan koordinat
const zones = [
    // Johor
    { zone: 'JHR01', negeri: 'Johor', lokasi: 'Pulau Aur dan Pulau Pemanggil', lat: 2.45, lng: 104.52 },
    { zone: 'JHR02', negeri: 'Johor', lokasi: 'Johor Bahru, Kota Tinggi, Mersing, Kulai', lat: 1.4927, lng: 103.7414 },
    { zone: 'JHR03', negeri: 'Johor', lokasi: 'Kluang dan Pontian', lat: 2.0333, lng: 103.3167 },
    { zone: 'JHR04', negeri: 'Johor', lokasi: 'Batu Pahat, Muar, Segamat, Gemas Johor, Tangkak', lat: 1.8500, lng: 102.9333 },
    
    // Kedah
    { zone: 'KDH01', negeri: 'Kedah', lokasi: 'Kota Setar, Kubang Pasu, Pokok Sena', lat: 6.1248, lng: 100.3678 },
    { zone: 'KDH02', negeri: 'Kedah', lokasi: 'Kuala Muda, Yan, Pendang', lat: 5.7716, lng: 100.4786 },
    { zone: 'KDH03', negeri: 'Kedah', lokasi: 'Padang Terap, Sik', lat: 6.3000, lng: 100.8000 },
    { zone: 'KDH04', negeri: 'Kedah', lokasi: 'Baling', lat: 5.6667, lng: 100.9167 },
    { zone: 'KDH05', negeri: 'Kedah', lokasi: 'Bandar Baharu, Kulim', lat: 5.3667, lng: 100.5667 },
    { zone: 'KDH06', negeri: 'Kedah', lokasi: 'Langkawi', lat: 6.3500, lng: 99.8000 },
    { zone: 'KDH07', negeri: 'Kedah', lokasi: 'Gunung Jerai', lat: 5.7833, lng: 100.4167 },
    
    // Kelantan
    { zone: 'KTN01', negeri: 'Kelantan', lokasi: 'Kota Bharu, Bachok, Pasir Puteh, Tumpat, Pasir Mas, Tanah Merah, Machang, Kuala Krai', lat: 6.1256, lng: 102.2381 },
    { zone: 'KTN03', negeri: 'Kelantan', lokasi: 'Jeli, Gua Musang (Mukim Chiku)', lat: 5.7000, lng: 101.9500 },
    
    // Melaka
    { zone: 'MLK01', negeri: 'Melaka', lokasi: 'Seluruh Negeri Melaka', lat: 2.1896, lng: 102.2501 },
    
    // Negeri Sembilan
    { zone: 'NGS01', negeri: 'Negeri Sembilan', lokasi: 'Tampin, Jempol', lat: 2.4667, lng: 102.2333 },
    { zone: 'NGS02', negeri: 'Negeri Sembilan', lokasi: 'Jelebu, Kuala Pilah, Rembau, Port Dickson, Seremban', lat: 2.7258, lng: 101.9424 },
    
    // Pahang
    { zone: 'PHG01', negeri: 'Pahang', lokasi: 'Pulau Tioman', lat: 2.8167, lng: 104.1667 },
    { zone: 'PHG02', negeri: 'Pahang', lokasi: 'Kuantan, Pekan, Rompin, Muadzam Shah', lat: 3.8077, lng: 103.3260 },
    { zone: 'PHG03', negeri: 'Pahang', lokasi: 'Jerantut, Temerloh, Maran, Bera, Chenor, Jengka', lat: 3.5000, lng: 102.4167 },
    { zone: 'PHG04', negeri: 'Pahang', lokasi: 'Bentong, Lipis, Raub', lat: 3.5167, lng: 101.9000 },
    { zone: 'PHG05', negeri: 'Pahang', lokasi: 'Genting Highlands, Bukit Tinggi, Cameron Highlands', lat: 4.4667, lng: 101.3833 },
    { zone: 'PHG06', negeri: 'Pahang', lokasi: 'Bukit Fraser', lat: 3.7167, lng: 101.7333 },
    
    // Perlis
    { zone: 'PLS01', negeri: 'Perlis', lokasi: 'Kangar, Padang Besar, Arau', lat: 6.4414, lng: 100.1986 },
    
    // Pulau Pinang
    { zone: 'PNG01', negeri: 'Pulau Pinang', lokasi: 'Seluruh Negeri Pulau Pinang', lat: 5.4141, lng: 100.3288 },
    
    // Perak
    { zone: 'PRK01', negeri: 'Perak', lokasi: 'Tapah, Slim River, Tanjung Malim', lat: 3.8667, lng: 101.2667 },
    { zone: 'PRK02', negeri: 'Perak', lokasi: 'Kuala Kangsar, Sg. Siput, Ipoh, Batu Gajah, Kampar', lat: 4.5975, lng: 101.0901 },
    { zone: 'PRK03', negeri: 'Perak', lokasi: 'Lenggong, Pengkalan Hulu, Grik', lat: 5.3833, lng: 100.9833 },
    { zone: 'PRK04', negeri: 'Perak', lokasi: 'Temengor, Belum', lat: 5.5833, lng: 101.4167 },
    { zone: 'PRK05', negeri: 'Perak', lokasi: 'Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor', lat: 4.0333, lng: 100.9667 },
    { zone: 'PRK06', negeri: 'Perak', lokasi: 'Selama, Taiping, Bagan Serai, Parit Buntar', lat: 5.0000, lng: 100.7333 },
    { zone: 'PRK07', negeri: 'Perak', lokasi: 'Bukit Larut', lat: 4.8667, lng: 100.7833 },
    
    // Sabah
    { zone: 'SBH01', negeri: 'Sabah', lokasi: 'Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan', lat: 5.8389, lng: 118.1178 },
    { zone: 'SBH02', negeri: 'Sabah', lokasi: 'Bandar Sabah, Ranau, Kota Kinabalu, Tuaran, Penampang, Papar', lat: 5.9804, lng: 116.0735 },
    { zone: 'SBH03', negeri: 'Sabah', lokasi: 'Lahad Datu, Kunak, Silabukan, Tungku, Sahabat, Semporna', lat: 5.0320, lng: 118.3400 },
    { zone: 'SBH04', negeri: 'Sabah', lokasi: 'Tawau, Balong, Merotai, Kalabakan', lat: 4.2481, lng: 117.8933 },
    { zone: 'SBH05', negeri: 'Sabah', lokasi: 'Kudat, Kota Marudu, Pitas, Pulau Banggi', lat: 6.8833, lng: 116.8333 },
    { zone: 'SBH06', negeri: 'Sabah', lokasi: 'Gunung Kinabalu', lat: 6.0750, lng: 116.5583 },
    { zone: 'SBH07', negeri: 'Sabah', lokasi: 'Bahagian Sandakan (Barat), Pinangah, Terusan, Beluran', lat: 5.9550, lng: 117.4217 },
    { zone: 'SBH08', negeri: 'Sabah', lokasi: 'Putatan, Penampang, Kota Kinabalu, Tuaran, Semporna', lat: 5.9167, lng: 116.0667 },
    { zone: 'SBH09', negeri: 'Sabah', lokasi: 'Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston', lat: 5.3667, lng: 115.7500 },
    
    // Sarawak
    { zone: 'SWK01', negeri: 'Sarawak', lokasi: 'Limbang, Lawas, Sundar, Trusan', lat: 4.7500, lng: 115.0000 },
    { zone: 'SWK02', negeri: 'Sarawak', lokasi: 'Miri, Niah, Bekenu, Sibuti, Marudi', lat: 4.3900, lng: 113.9910 },
    { zone: 'SWK03', negeri: 'Sarawak', lokasi: 'Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu', lat: 3.1667, lng: 113.0333 },
    { zone: 'SWK04', negeri: 'Sarawak', lokasi: 'Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit', lat: 2.3000, lng: 111.8167 },
    { zone: 'SWK05', negeri: 'Sarawak', lokasi: 'Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai', lat: 2.1167, lng: 111.5167 },
    { zone: 'SWK06', negeri: 'Sarawak', lokasi: 'Kabong, Lingga, Sri Aman, Engkilili, Betong, Spaoh, Pusa, Saratok, Roban, Debak', lat: 1.2400, lng: 111.4600 },
    { zone: 'SWK07', negeri: 'Sarawak', lokasi: 'Serian, Simunjan, Samarahan, Sebuyau, Meludam', lat: 1.2000, lng: 110.5500 },
    { zone: 'SWK08', negeri: 'Sarawak', lokasi: 'Kuching, Bau, Lundu, Sematan', lat: 1.5533, lng: 110.3593 },
    { zone: 'SWK09', negeri: 'Sarawak', lokasi: 'Zon Khas (Kampung Patarikan)', lat: 1.4833, lng: 110.3667 },
    
    // Selangor
    { zone: 'SGR01', negeri: 'Selangor', lokasi: 'Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, Rawang, S.Alam', lat: 3.0738, lng: 101.5183 },
    { zone: 'SGR02', negeri: 'Selangor', lokasi: 'Kuala Selangor, Sabak Bernam', lat: 3.6667, lng: 101.1167 },
    { zone: 'SGR03', negeri: 'Selangor', lokasi: 'Klang, Kuala Langat', lat: 3.0333, lng: 101.4500 },
    
    // Terengganu
    { zone: 'TRG01', negeri: 'Terengganu', lokasi: 'Kuala Terengganu, Marang, Kuala Nerus', lat: 5.3302, lng: 103.1408 },
    { zone: 'TRG02', negeri: 'Terengganu', lokasi: 'Besut, Setiu', lat: 5.8167, lng: 102.5667 },
    { zone: 'TRG03', negeri: 'Terengganu', lokasi: 'Dungun, Kemaman', lat: 4.7544, lng: 103.4169 },
    { zone: 'TRG04', negeri: 'Terengganu', lokasi: 'Hulu Terengganu', lat: 5.0167, lng: 102.9333 },
    
    // Wilayah Persekutuan
    { zone: 'WLY01', negeri: 'Wilayah Persekutuan', lokasi: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },
    { zone: 'WLY02', negeri: 'Wilayah Persekutuan', lokasi: 'Labuan', lat: 5.2831, lng: 115.2308 },
    { zone: 'WLY03', negeri: 'Wilayah Persekutuan', lokasi: 'Putrajaya', lat: 2.9264, lng: 101.6964 }
];

// Prayer name mappings
const prayerNames = {
    'imsak': 'Imsak',
    'subuh': 'Subuh',
    'fajr': 'Subuh',
    'syuruk': 'Syuruk',
    'sunrise': 'Syuruk',
    'zohor': 'Zohor',
    'dhuhr': 'Zohor',
    'asar': 'Asar',
    'asr': 'Asar',
    'maghrib': 'Maghrib',
    'isyak': 'Isyak',
    'isha': 'Isyak'
};

// Order of prayers to display
const prayerOrder = [
    { keys: ['imsak'], display: 'Imsak' },
    { keys: ['subuh', 'fajr'], display: 'Subuh' },
    { keys: ['syuruk', 'sunrise'], display: 'Syuruk' },
    { keys: ['zohor', 'dhuhr'], display: 'Zohor' },
    { keys: ['asar', 'asr'], display: 'Asar' },
    { keys: ['maghrib'], display: 'Maghrib' },
    { keys: ['isyak', 'isha'], display: 'Isyak' }
];

// Hijri month names in Malay
const hijriMonths = {
    '01': 'Muharram',
    '02': 'Safar',
    '03': 'Rabiul Awal',
    '04': 'Rabiul Akhir',
    '05': 'Jamadil Awal',
    '06': 'Jamadil Akhir',
    '07': 'Rejab',
    '08': 'Syaaban',
    '09': 'Ramadan',
    '10': 'Syawal',
    '11': 'Zulkaedah',
    '12': 'Zulhijjah'
};

// Fetch prayer times from API
async function fetchPrayerTimes(zone) {
    try {
        // Try multiple possible endpoints
        let response;
        let apiUrl = `https://www.e-solat.gov.my/index.php?r=esolatApi/takwimsolat&period=today&zone=${zone}`;
        
        response = await fetch(apiUrl);
        if (!response.ok) {
            // Try alternative endpoint
            apiUrl = `${API_BASE}/v2/solat/${zone}`;
            response = await fetch(apiUrl);
        }
        
        if (!response.ok) throw new Error('Gagal memuat waktu solat');
        
        const data = await response.json();
        console.log('API Response:', data);
        console.log('API URL used:', apiUrl);
        
        // Handle different possible response structures
        let prayerData = null;
        
        // e-Solat API format
        if (data.prayerTime && Array.isArray(data.prayerTime) && data.prayerTime.length > 0) {
            prayerData = data.prayerTime[0];
        }
        // waktusolat.app format
        else if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            // Get today's date
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
            
            // Try to find today's data
            prayerData = data.data.find(item => {
                return item.date === todayStr || 
                       item.tarikh === todayStr ||
                       item.gregorian === todayStr;
            });
            
            // If not found, use first entry
            if (!prayerData) {
                prayerData = data.data[0];
            }
        } else if (data.data && !Array.isArray(data.data)) {
            prayerData = data.data;
        } else if (data.prayers) {
            prayerData = data.prayers[0] || data.prayers;
        } else if (Array.isArray(data) && data.length > 0) {
            prayerData = data[0];
        } else {
            prayerData = data;
        }
        
        if (!prayerData) {
            throw new Error('Tiada data waktu solat');
        }
        
        return prayerData;
        
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

// Format Hijri date to readable format
function formatHijriDate(hijriStr) {
    if (!hijriStr) return '';
    
    // Handle format like "1447-04-27" or "27-04-1447"
    const parts = hijriStr.split('-');
    if (parts.length === 3) {
        let day, month, year;
        
        // Check if format is YYYY-MM-DD or DD-MM-YYYY
        if (parts[0].length === 4) {
            // YYYY-MM-DD format
            year = parts[0];
            month = parts[1];
            day = parts[2];
        } else {
            // DD-MM-YYYY format
            day = parts[0];
            month = parts[1];
            year = parts[2];
        }
        
        const monthName = hijriMonths[month] || month;
        return `${parseInt(day)} ${monthName} ${year}`;
    }
    
    // If already formatted or unknown format, return as is
    return hijriStr;
}

// Circular Prayer Clock

class PrayerClock {
    constructor(canvasId, centerDivId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.centerDiv = document.getElementById(centerDivId);
        this.prayerTimes = null;
        this.currentTime = new Date();
        this.animationFrame = null;
        
        // Colors for each prayer
        this.colors = {
            'Imsak': '#9b59b6',
            'Subuh': '#b993d6',
            'Syuruk': '#f39c12',
            'Zohor': '#3498db',
            'Asar': '#e67e22',
            'Maghrib': '#e74c3c',
            'Isyak': '#2c3e50'
        };
        
        this.setupCanvas();
        this.setupMouseInteraction();
    }
    
    setupCanvas() {
        // Set canvas size
        const size = Math.min(this.canvas.parentElement.clientWidth - 40, 400);
        this.canvas.width = size;
        this.canvas.height = size;
        this.centerX = size / 2;
        this.centerY = size / 2;
        this.radius = size / 2 - 20;
    }
    
    setupMouseInteraction() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Check if mouse is over any prayer segment
            const angle = Math.atan2(y - this.centerY, x - this.centerX);
            const distance = Math.sqrt(Math.pow(x - this.centerX, 2) + Math.pow(y - this.centerY, 2));
            
            if (distance > this.radius * 0.6 && distance < this.radius) {
                this.canvas.style.cursor = 'pointer';
            } else {
                this.canvas.style.cursor = 'default';
            }
        });
    }
    
    setPrayerTimes(prayerData) {
        this.prayerTimes = prayerData;
        this.draw();
        this.startAnimation();
    }
    
    timeToAngle(timeStr) {
        if (!timeStr) return 0;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        // 0 degrees is at 12 o'clock (top), convert to radians
        return (totalMinutes / (24 * 60)) * 2 * Math.PI - Math.PI / 2;
    }
    
    getCurrentTimeAngle() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return (totalSeconds / (24 * 3600)) * 2 * Math.PI - Math.PI / 2;
    }
    
    draw() {
        if (!this.prayerTimes) return;
        
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw prayer segments
        const prayers = [
            { name: 'Imsak', time: this.prayerTimes.imsak },
            { name: 'Subuh', time: this.prayerTimes.subuh || this.prayerTimes.fajr },
            { name: 'Syuruk', time: this.prayerTimes.syuruk || this.prayerTimes.sunrise },
            { name: 'Zohor', time: this.prayerTimes.zohor || this.prayerTimes.dhuhr },
            { name: 'Asar', time: this.prayerTimes.asar || this.prayerTimes.asr },
            { name: 'Maghrib', time: this.prayerTimes.maghrib },
            { name: 'Isyak', time: this.prayerTimes.isyak || this.prayerTimes.isha }
        ].filter(p => p.time);
        
        // Draw each prayer segment
        for (let i = 0; i < prayers.length; i++) {
            const prayer = prayers[i];
            const nextPrayer = prayers[i + 1];
            
            const startAngle = this.timeToAngle(prayer.time);
            const endAngle = nextPrayer ? 
                this.timeToAngle(nextPrayer.time) : 
                this.timeToAngle(prayer.time) + (2 * Math.PI);
            
            // Draw arc
            ctx.beginPath();
            ctx.arc(this.centerX, this.centerY, this.radius, startAngle, endAngle);
            ctx.lineWidth = 40;
            ctx.strokeStyle = this.colors[prayer.name];
            ctx.stroke();
            
            // Draw prayer label
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
        
        // Draw current time indicator (needle)
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
        
        // Draw center dot
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        
        this.updateCountdown();
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
        
        // If no prayer found, next is tomorrow's Imsak
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
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Prayer Streak Tracker

class StreakTracker {
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
            return 'ðŸŽ‰ Tahniah! Anda telah sempurna hari ini!';
        } else if (streak >= 30) {
            return `ðŸ”¥ Hebat! ${streak} hari berturut-turut!`;
        } else if (streak >= 7) {
            return `âœ¨ Bagus! ${streak} hari streak!`;
        } else if (progress.completed >= 3) {
            return 'ðŸ’ª Teruskan usaha anda!';
        } else if (progress.completed >= 1) {
            return 'ðŸ‘ Permulaan yang baik!';
        } else {
            return 'ðŸ•Œ Jom mulakan hari dengan solat!';
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
                <h3>ðŸ“Š Pencapaian Hari Ini</h3>
            </div>
            <div class="streak-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                </div>
                <div class="progress-text">${progress.completed}/${progress.total} solat</div>
            </div>
            <div class="streak-counter ${streak > 0 ? 'streak-fire' : ''}">
                ðŸ”¥ <strong>${streak}</strong> hari berturut-turut
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
                        ${checked ? 'âœ“' : 'â—‹'}
                    </button>
                    <span>${prayer}</span>
                </div>
            `;
        }).join('');
    }
}

// Prayer Notifications System

class PrayerNotifications {
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
                icon: 'ðŸ•Œ',
                badge: 'ðŸ•Œ',
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
                            `â° Solat ${prayer.name}`,
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
                            `ðŸ•Œ Masuk Waktu ${prayer.name}`,
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
                <h3>ðŸ”” Tetapan Notifikasi</h3>
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
                    âš ï¸ Notifikasi dihalang. Sila benarkan notifikasi di tetapan pelayar anda.
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

// Dynamic Theme Controller

class ThemeController {
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
                    ðŸŽ¨
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

// Qibla Compass Widget

class QiblaCompass {
    constructor() {
        this.kaaba = { lat: 21.4225, lng: 39.8262 }; // Mecca coordinates
        this.userLocation = null;
        this.qiblaDirection = null;
        this.deviceHeading = 0;
        this.isExpanded = false;
    }
    
    calculateQiblaDirection(userLat, userLng) {
        // Convert to radians
        const lat1 = userLat * Math.PI / 180;
        const lat2 = this.kaaba.lat * Math.PI / 180;
        const dLng = (this.kaaba.lng - userLng) * Math.PI / 180;
        
        // Calculate qibla direction using Haversine formula
        const y = Math.sin(dLng);
        const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(dLng);
        let qibla = Math.atan2(y, x) * 180 / Math.PI;
        
        // Normalize to 0-360
        qibla = (qibla + 360) % 360;
        
        return qibla;
    }
    
    calculateDistance(userLat, userLng) {
        const R = 6371; // Earth's radius in km
        const dLat = (this.kaaba.lat - userLat) * Math.PI / 180;
        const dLng = (this.kaaba.lng - userLng) * Math.PI / 180;
        
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(userLat * Math.PI / 180) * Math.cos(this.kaaba.lat * Math.PI / 180) *
                 Math.sin(dLng/2) * Math.sin(dLng/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }
    
    async getUserLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation tidak disokong'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.qiblaDirection = this.calculateQiblaDirection(
                        this.userLocation.lat,
                        this.userLocation.lng
                    );
                    resolve(this.userLocation);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
    
    startCompass() {
        if ('DeviceOrientationEvent' in window) {
            window.addEventListener('deviceorientation', (event) => {
                if (event.alpha !== null) {
                    this.deviceHeading = event.alpha;
                    this.updateCompassUI();
                }
            });
        }
    }
    
    updateCompassUI() {
        const needle = document.getElementById('qibla-needle');
        if (needle && this.qiblaDirection !== null) {
            const rotation = this.qiblaDirection - this.deviceHeading;
            needle.style.transform = `rotate(${rotation}deg)`;
        }
    }
    
    toggle() {
        this.isExpanded = !this.isExpanded;
        const widget = document.getElementById('qibla-widget');
        if (widget) {
            widget.classList.toggle('expanded', this.isExpanded);
        }
    }
    
    async initialize() {
        try {
            await this.getUserLocation();
            this.startCompass();
            this.renderUI();
            return true;
        } catch (error) {
            console.error('Qibla initialization error:', error);
            this.renderErrorUI(error.message);
            return false;
        }
    }
    
    renderUI() {
        const container = document.getElementById('qibla-widget');
        if (!container) return;
        
        const distance = this.userLocation ? 
            this.calculateDistance(this.userLocation.lat, this.userLocation.lng) : 0;
        
        container.innerHTML = `
            <div class="qibla-compact" id="qibla-compact">
                <div class="compass-icon">ðŸ§­</div>
            </div>
            <div class="qibla-expanded" id="qibla-expanded" style="display: ${this.isExpanded ? 'block' : 'none'}">
                <div class="qibla-header">
                    <h3>Arah Kiblat</h3>
                    <button class="close-qibla" id="close-qibla">âœ•</button>
                </div>
                <div class="qibla-compass">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        <!-- Compass circle -->
                        <circle cx="100" cy="100" r="90" fill="white" stroke="#667eea" stroke-width="2"/>
                        
                        <!-- Direction markers -->
                        <text x="100" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#667eea">N</text>
                        <text x="175" y="105" text-anchor="middle" font-size="16" font-weight="bold" fill="#999">E</text>
                        <text x="100" y="185" text-anchor="middle" font-size="16" font-weight="bold" fill="#999">S</text>
                        <text x="25" y="105" text-anchor="middle" font-size="16" font-weight="bold" fill="#999">W</text>
                        
                        <!-- Qibla needle -->
                        <g id="qibla-needle" style="transform-origin: 100px 100px;">
                            <path d="M 100 100 L 95 40 L 100 30 L 105 40 Z" fill="#e74c3c"/>
                            <path d="M 100 100 L 95 160 L 100 170 L 105 160 Z" fill="#95a5a6"/>
                            <circle cx="100" cy="100" r="8" fill="#34495e"/>
                        </g>
                    </svg>
                </div>
                <div class="qibla-info">
                    <div class="qibla-direction">
                        Arah: <strong>${Math.round(this.qiblaDirection)}Â°</strong>
                    </div>
                    <div class="qibla-distance">
                        Jarak: <strong>${Math.round(distance).toLocaleString()} km</strong>
                    </div>
                    <div class="qibla-instruction">
                        Pusinkan telefon anda sehingga anak panah merah menunjuk ke atas
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        const compact = document.getElementById('qibla-compact');
        const closeBtn = document.getElementById('close-qibla');
        
        if (compact) {
            compact.addEventListener('click', () => this.toggle());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.toggle());
        }
    }
    
    renderErrorUI(message) {
        const container = document.getElementById('qibla-widget');
        if (!container) return;
        
        container.innerHTML = `
            <div class="qibla-compact qibla-error">
                <div class="compass-icon" title="${message}">ðŸ§­</div>
            </div>
        `;
    }
}

// Main Application Controller








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
            
            error.textContent = 'âŒ ' + errorMsg + '.';
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
                `${zoneInfo.negeri} â€¢ Zon ${zone}`;
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
                    ${isPrayed ? '<div style="font-size: 2rem;">âœ“</div>' : ''}
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
            status.textContent = 'âŒ Pelayar anda tidak menyokong geolocation';
            status.className = 'location-status error';
            status.style.display = 'block';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'ðŸ“ Mengesan lokasi...';
        status.textContent = 'ðŸ” Sedang mengesan lokasi anda...';
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

                    status.textContent = `âœ… Lokasi dikesan: ${nearestZone.lokasi}`;
                    status.className = 'location-status success';

                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 3000);
                } else {
                    status.textContent = 'âŒ Tidak dapat menentukan zon';
                    status.className = 'location-status error';
                }

                btn.disabled = false;
                btn.textContent = 'ðŸ“ Kesan Lokasi Saya';
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errorMsg = '';

                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = 'âŒ Akses lokasi ditolak. Sila benarkan akses lokasi pada pelayar anda.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = 'âŒ Maklumat lokasi tidak tersedia.';
                        break;
                    case error.TIMEOUT:
                        errorMsg = 'âŒ Masa tamat untuk mengesan lokasi.';
                        break;
                    default:
                        errorMsg = 'âŒ Ralat mengesan lokasi.';
                }

                status.textContent = errorMsg;
                status.className = 'location-status error';
                btn.disabled = false;
                btn.textContent = 'ðŸ“ Kesan Lokasi Saya';
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

