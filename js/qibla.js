// Qibla Compass Widget

export class QiblaCompass {
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
                <div class="compass-icon">🧭</div>
            </div>
            <div class="qibla-expanded" id="qibla-expanded" style="display: ${this.isExpanded ? 'block' : 'none'}">
                <div class="qibla-header">
                    <h3>Arah Kiblat</h3>
                    <button class="close-qibla" id="close-qibla">✕</button>
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
                        Arah: <strong>${Math.round(this.qiblaDirection)}°</strong>
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
                <div class="compass-icon" title="${message}">🧭</div>
            </div>
        `;
    }
}

