import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaCloudSun, FaSeedling, FaTint, FaThermometerHalf, FaTractor, FaArrowRight, FaCalendarAlt, FaWater, FaMapMarkerAlt } from 'react-icons/fa';
import WeatherWidget from '../components/dashboard/WeatherWidget';

// Local Crop Database (Bilingual via t key or direct mappings)
const cropData = {
  kharif: {
    titleKey: "kharif",
    months: { en: "June – October (Monsoon)", hi: "जून – अक्टूबर (मानसून)" },
    desc: { en: "Kharif crops require high water volume and hot weather. They are sown at the beginning of the rainy season and harvested at the end of autumn.", hi: "खरीफ फसलों के लिए अधिक पानी और गर्म मौसम की आवश्यकता होती है। इन्हें बारिश के मौसम की शुरुआत में बोया जाता है और पतझड़ के अंत में काटा जाता है।" },
    crops: [
      { name: { en: "Rice (Paddy)", hi: "धान (चावल)" }, icon: "🌾", temp: "21°C - 37°C", water: "high", soil: "soil_clayey", sowing: "Jun - Jul", harvest: "Nov - Dec", equip: "Tractor", searchKey: "Tractor" },
      { name: { en: "Maize", hi: "मक्का" }, icon: "🌽", temp: "21°C - 27°C", water: "medium", soil: "soil_loamy", sowing: "Jun - Jul", harvest: "Sep - Oct", equip: "Cultivator", searchKey: "Attachment" },
      { name: { en: "Cotton", hi: "कपास" }, icon: "☁️", temp: "21°C - 30°C", water: "medium", soil: "soil_black", sowing: "May - Jun", harvest: "Oct - Dec", equip: "Cultivator", searchKey: "Attachment" },
      { name: { en: "Soybean", hi: "सोयाबीन" }, icon: "🌱", temp: "15°C - 32°C", water: "medium", soil: "soil_loamy", sowing: "Jun - Jul", harvest: "Oct - Nov", equip: "Seed Drill", searchKey: "Attachment" },
      { name: { en: "Sugarcane", hi: "गन्ना" }, icon: "🎋", temp: "20°C - 35°C", water: "high", soil: "soil_clayey", sowing: "Jan - Mar", harvest: "Dec - Mar", equip: "Harvester", searchKey: "Harvester" }
    ]
  },
  rabi: {
    titleKey: "rabi",
    months: { en: "November – April (Winter)", hi: "नवंबर – अप्रैल (शीतकाल)" },
    desc: { en: "Rabi crops are sown in winter and harvested in spring. They require cool climates during germination and warm weather during ripening, with moderate water.", hi: "रबी की फसलें सर्दियों में बोई जाती हैं और वसंत में काटी जाती हैं। इन्हें अंकुरण के दौरान ठंडी जलवायु और पकने के दौरान गर्म मौसम की आवश्यकता होती है।" },
    crops: [
      { name: { en: "Wheat", hi: "गेहूं" }, icon: "🌾", temp: "10°C - 25°C", water: "medium", soil: "soil_clayey", sowing: "Nov - Dec", harvest: "Mar - Apr", equip: "Seed Drill", searchKey: "Attachment" },
      { name: { en: "Mustard", hi: "सरसों" }, icon: "🌼", temp: "10°C - 25°C", water: "low", soil: "soil_loamy", sowing: "Oct - Nov", harvest: "Feb - Mar", equip: "Cultivator", searchKey: "Attachment" },
      { name: { en: "Gram (Chickpea)", hi: "चना" }, icon: "🧆", temp: "15°C - 25°C", water: "low", soil: "soil_loamy", sowing: "Oct - Nov", harvest: "Feb - Mar", equip: "Seed Drill", searchKey: "Attachment" },
      { name: { en: "Potato", hi: "आलू" }, icon: "🥔", temp: "15°C - 20°C", water: "medium", soil: "soil_loamy", sowing: "Oct - Nov", harvest: "Feb - Mar", equip: "Tractor", searchKey: "Tractor" },
      { name: { en: "Barley", hi: "जौ" }, icon: "🌾", temp: "12°C - 25°C", water: "low", soil: "soil_loamy", sowing: "Nov - Dec", harvest: "Mar - Apr", equip: "Harvester", searchKey: "Harvester" }
    ]
  },
  zaid: {
    titleKey: "zaid",
    months: { en: "March – June (Summer)", hi: "मार्च – जून (गर्मी)" },
    desc: { en: "Zaid crops are short-duration crops grown in summer between the Rabi and Kharif seasons. They need warm, dry weather and constant watering.", hi: "जायद की फसलें कम अवधि की फसलें होती हैं जो रबी और खरीफ के मौसम के बीच गर्मी में उगाई जाती हैं। इन्हें गर्म, शुष्क मौसम और निरंतर सिंचाई की आवश्यकता होती है।" },
    crops: [
      { name: { en: "Watermelon", hi: "तरबूज" }, icon: "🍉", temp: "25°C - 35°C", water: "medium", soil: "soil_loamy", sowing: "Feb - Mar", harvest: "May - Jun", equip: "Tractor", searchKey: "Tractor" },
      { name: { en: "Cucumber", hi: "खीरा" }, icon: "🥒", temp: "25°C - 35°C", water: "medium", soil: "soil_loamy", sowing: "Feb - Mar", harvest: "May - Jun", equip: "Tractor", searchKey: "Tractor" },
      { name: { en: "Muskmelon", hi: "खरबूजा" }, icon: "🍈", temp: "25°C - 35°C", water: "medium", soil: "soil_loamy", sowing: "Feb - Mar", harvest: "May - Jun", equip: "Tractor", searchKey: "Tractor" },
      { name: { en: "Bitter Gourd", hi: "करेला" }, icon: "🥒", temp: "24°C - 35°C", water: "medium", soil: "soil_loamy", sowing: "Feb - Mar", harvest: "May - Jun", equip: "Tractor", searchKey: "Tractor" }
    ]
  }
};

const CropStudy = () => {
  const { t, i18n } = useTranslation();
  const [activeSeason, setActiveSeason] = useState('kharif');
  const [searchQuery, setSearchQuery] = useState('');
  const lang = i18n.language === 'hi' ? 'hi' : 'en';

  const currentSeasonData = cropData[activeSeason];

  const filteredCrops = currentSeasonData.crops.filter(crop => {
    const name = crop.name[lang].toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      
      {/* Page Header */}
      <div className="text-center mb-4" style={{ position: 'relative' }}>
        <h1 className="text-4xl text-gradient mb-1">{t('crop_study_title')}</h1>
        <p className="text-muted" style={{ maxWidth: '650px', margin: '0 auto' }}>
          {t('crop_study_subtitle')}
        </p>
      </div>

      {/* Grid Layout: Main Crop Details (Left) + Weather Widget (Right) */}
      <div className="grid-3 flex-col-md gap-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
        
        {/* Left Column: Crop Guide */}
        <div>
          {/* Season Switcher Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '6px',
            marginBottom: '20px',
            gap: '8px'
          }}>
            {Object.keys(cropData).map((season) => (
              <button
                key={season}
                onClick={() => { setActiveSeason(season); setSearchQuery(''); }}
                className="btn"
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: activeSeason === season ? 'linear-gradient(135deg, var(--primary-green), var(--primary-blue))' : 'transparent',
                  color: activeSeason === season ? 'white' : 'var(--text-muted)',
                  borderRadius: '8px',
                  padding: '10px 15px',
                  boxShadow: activeSeason === season ? '0 4px 12px rgba(46, 204, 113, 0.2)' : 'none'
                }}
              >
                {t(cropData[season].titleKey)}
              </button>
            ))}
          </div>

          {/* Season Description Card */}
          <div className="glass-card mb-3" style={{ borderLeft: '4px solid var(--primary-green)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>
              <FaCalendarAlt style={{ color: 'var(--primary-green)' }} /> {currentSeasonData.months[lang]}
            </h3>
            <p className="text-muted mt-2 text-sm">
              {currentSeasonData.desc[lang]}
            </p>
          </div>

          {/* Search bar inside crop section */}
          <div className="form-group mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              placeholder={lang === 'hi' ? "इस सीजन की फसलें खोजें..." : "Search crops in this season..."}
            />
          </div>

          {/* Crop List Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredCrops.length === 0 ? (
              <div className="glass-card text-center" style={{ padding: '40px' }}>
                <p className="text-muted">{lang === 'hi' ? "कोई फसल नहीं मिली।" : "No crops found."}</p>
              </div>
            ) : (
              filteredCrops.map((crop, index) => (
                <div key={index} className="glass-card card-hover" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  padding: '20px'
                }}>
                  {/* Title & Icon */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '2rem' }}>{crop.icon}</span>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {crop.name[lang]}
                        </h3>
                        <span className="badge badge-success text-xs">
                          {t(activeSeason)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Sowing / Harvesting Badges */}
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      <div>📅 <strong>{t('sowing_time')}:</strong> {crop.sowing}</div>
                      <div>🌾 <strong>{t('harvest_time')}:</strong> {crop.harvest}</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

                  {/* Attributes Details Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    fontSize: '13px'
                  }}>
                    <div>
                      <div className="text-muted flex items-center gap-1"><FaThermometerHalf style={{ color: 'var(--danger)' }} /> {t('ideal_temp')}</div>
                      <div className="font-bold" style={{ color: 'var(--text-main)', marginTop: '2px' }}>{crop.temp}</div>
                    </div>
                    
                    <div>
                      <div className="text-muted flex items-center gap-1"><FaTint style={{ color: 'var(--primary-blue)' }} /> {t('water_need')}</div>
                      <div className="font-bold flex items-center gap-1" style={{ color: 'var(--text-main)', marginTop: '2px' }}>
                        <span style={{
                          color: 'var(--primary-blue)',
                        }}>
                          {'💧'.repeat(crop.water === 'high' ? 3 : crop.water === 'medium' ? 2 : 1)}
                        </span>
                        <span>{t(crop.water)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-muted flex items-center gap-1"><FaSeedling style={{ color: 'var(--primary-green)' }} /> {t('soil_type')}</div>
                      <div className="font-bold" style={{ color: 'var(--text-main)', marginTop: '2px' }}>{t(crop.soil)}</div>
                    </div>
                  </div>

                  {/* Recommendation and Rent Action */}
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    background: 'rgba(52, 152, 219, 0.05)',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{ fontSize: '13px' }}>
                      <span className="text-muted">⚙️ {t('rec_equip')}: </span>
                      <strong style={{ color: 'var(--primary-blue)' }}>{crop.equip}</strong>
                    </div>

                    <Link
                      to={`/browse?search=${crop.equip}&type=${crop.searchKey}`}
                      className="btn btn-secondary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        margin: 0
                      }}
                    >
                      <FaTractor /> {t('rent_now')} <FaArrowRight style={{ fontSize: '10px' }} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Live Weather & Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid var(--primary-blue)', padding: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              ℹ️ {lang === 'hi' ? "कृषि मौसम सलाह" : "Farming Weather Advisory"}
            </h3>
            <p className="text-muted text-xs" style={{ lineHeight: '1.6' }}>
              {lang === 'hi'
                ? "बोने या काटने से पहले मौसम की जांच कर लें। तेज़ हवाओं या बारिश की संभावना होने पर कीटनाशकों का छिड़काव या कटाई का काम टाल दें।"
                : "Always check localized weather forecast before scheduling sowing or harvesting operations. Postpone spraying pesticides or harvesting crops if there's high probability of rain or wind storms."}
            </p>
          </div>
          
          <WeatherWidget city="Nanded" />
        </div>
      </div>
    </div>
  );
};

export default CropStudy;
