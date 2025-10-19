// Circular Prayer Clock

export class PrayerClock {
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

