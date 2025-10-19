// Prayer data and API management

const API_BASE = 'https://api.waktusolat.app';

// Senarai lengkap zon Malaysia (dari JAKIM) dengan koordinat
export const zones = [
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
export const prayerNames = {
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
export const prayerOrder = [
    { keys: ['imsak'], display: 'Imsak' },
    { keys: ['subuh', 'fajr'], display: 'Subuh' },
    { keys: ['syuruk', 'sunrise'], display: 'Syuruk' },
    { keys: ['zohor', 'dhuhr'], display: 'Zohor' },
    { keys: ['asar', 'asr'], display: 'Asar' },
    { keys: ['maghrib'], display: 'Maghrib' },
    { keys: ['isyak', 'isha'], display: 'Isyak' }
];

// Hijri month names in Malay
export const hijriMonths = {
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
export async function fetchPrayerTimes(zone) {
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
export function formatHijriDate(hijriStr) {
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

