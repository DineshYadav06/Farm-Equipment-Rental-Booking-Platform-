import React, { useState, useEffect } from 'react';
import { FaCloudSunRain, FaThermometerHalf, FaTint, FaWind, FaExclamationTriangle, FaCheckCircle, FaSeedling } from 'react-icons/fa';

// WeatherAPI.com free tier — live data
const WEATHER_API_KEY = '470886d23706429f8e045506251708';

// Smart farming rules engine
const generateFarmingAlerts = (data) => {
  const alerts = [];
  const { temp_c, humidity, wind_kph, precip_mm, condition } = data.current;
  const chanceOfRain = data.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain ?? 0;

  if (chanceOfRain > 60)
    alerts.push({ type: 'warning', icon: '🌧️', msg: `${chanceOfRain}% rain chance — delay harvesting & spraying today` });
  if (temp_c > 38)
    alerts.push({ type: 'warning', icon: '☀️', msg: `High heat (${temp_c}°C) — avoid afternoon machinery operation` });
  if (temp_c < 5)
    alerts.push({ type: 'info', icon: '🥶', msg: `Cold weather — check diesel viscosity before starting engines` });
  if (wind_kph > 30)
    alerts.push({ type: 'warning', icon: '💨', msg: `Strong wind (${wind_kph} km/h) — pause all spraying operations` });
  if (humidity > 85)
    alerts.push({ type: 'info', icon: '💧', msg: `High humidity — ideal for sowing, monitor fungal risk` });
  if (precip_mm === 0 && temp_c > 25 && temp_c < 35)
    alerts.push({ type: 'success', icon: '✅', msg: `Perfect field conditions — good day for ploughing & cultivation` });

  return alerts.length > 0 ? alerts : [{ type: 'success', icon: '✅', msg: 'Good farming weather today!' }];
};

const WeatherWidget = ({ city = 'Lucknow' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=yes`
        );
        if (!res.ok) throw new Error('Weather data unavailable');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  if (loading) return (
    <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto' }}></div>
      <p className="text-muted mt-2 text-sm">Fetching live weather…</p>
    </div>
  );

  if (error) return (
    <div className="glass-card" style={{ padding: '20px', borderLeft: '4px solid var(--danger)' }}>
      <p className="text-sm" style={{ color: 'var(--danger)' }}>⚠️ {error}</p>
    </div>
  );

  const { current, location, forecast } = weather;
  const alerts = generateFarmingAlerts(weather);
  const conditionIcon = current.condition.icon;

  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
      {/* Header — Current Weather */}
      <div style={{
        background: 'linear-gradient(135deg, #1a6b92, #0d3d52)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white',
      }}>
        <div>
          <h3 style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>
            📍 {location.name}, {location.region}
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <span style={{ fontSize: '48px', fontWeight: 700, lineHeight: 1 }}>{Math.round(current.temp_c)}°</span>
            <span style={{ fontSize: '14px', paddingBottom: '8px', opacity: 0.8 }}>C</span>
          </div>
          <p style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>{current.condition.text}</p>
        </div>
        <img src={`https:${conditionIcon}`} alt="weather icon" style={{ width: '72px', height: '72px' }} />
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderBottom: '1px solid var(--border-color)', padding: '12px 0',
      }}>
        {[
          { icon: <FaTint />, label: 'Humidity', val: `${current.humidity}%` },
          { icon: <FaWind />, label: 'Wind', val: `${current.wind_kph} km/h` },
          { icon: <FaThermometerHalf />, label: 'Feels Like', val: `${Math.round(current.feelslike_c)}°C` },
        ].map(({ icon, label, val }) => (
          <div key={label} style={{ textAlign: 'center', padding: '4px' }}>
            <div style={{ color: 'var(--primary-blue)', fontSize: '18px', marginBottom: '2px' }}>{icon}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Farming Alerts */}
      <div style={{ padding: '16px' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: 'var(--text-main)', fontSize: '14px', fontWeight: 700 }}>
          <FaSeedling style={{ color: 'var(--primary-green)' }} /> Farming Alerts
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {alerts.map((alert, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '8px',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              backgroundColor: alert.type === 'warning'
                ? 'rgba(231, 76, 60, 0.1)'
                : alert.type === 'success'
                  ? 'rgba(46, 204, 113, 0.1)'
                  : 'rgba(52, 152, 219, 0.1)',
              borderLeft: `3px solid ${alert.type === 'warning' ? 'var(--danger)' : alert.type === 'success' ? 'var(--primary-green)' : 'var(--primary-blue)'}`,
              color: 'var(--text-main)',
            }}>
              <span style={{ flexShrink: 0 }}>{alert.icon}</span>
              <span>{alert.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
