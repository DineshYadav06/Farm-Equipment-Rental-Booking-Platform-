/**
 * Weather Service & Provider Interface
 * Default provider: Open-Meteo Forecast API (non-commercial free tier, no API key).
 * NOTE: Check provider's current terms before commercial deployment.
 * Keep provider replaceable via WEATHER_PROVIDER env variable.
 * Data source credit: "Weather data: Open-Meteo"
 * Official Meteorological Reference: IMD (mausam.imd.gov.in)
 */

export interface WeatherDayForecast {
  date: string;
  weatherCode: number;
  conditionKey: string;
  minTemp: number;
  maxTemp: number;
  precipitationProbability: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
  weatherCode: number;
  conditionKey: string;
  lastUpdated: string;
  credit: string;
  forecast: WeatherDayForecast[];
}

export interface WeatherProvider {
  getWeather(lat2: number, lng2: number): Promise<CurrentWeather>;
}

/**
 * Maps standard WMO weather interpretation codes to translation keys.
 */
export function mapWmoCodeToKey(code: number): string {
  if (code === 0) return "weather.clear";
  if (code === 1 || code === 2) return "weather.partlyCloudy";
  if (code === 3) return "weather.overcast";
  if (code === 45 || code === 48) return "weather.fog";
  if (code >= 51 && code <= 55) return "weather.drizzle";
  if (code >= 61 && code <= 65) return "weather.rain";
  if (code >= 71 && code <= 77) return "weather.snow";
  if (code >= 80 && code <= 82) return "weather.showers";
  if (code >= 95 && code <= 99) return "weather.thunderstorm";
  return "weather.cloudy";
}

/**
 * Open-Meteo Weather Provider Implementation
 */
export class OpenMeteoProvider implements WeatherProvider {
  async getWeather(lat2: number, lng2: number): Promise<CurrentWeather> {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.append("latitude", lat2.toFixed(2));
    url.searchParams.append("longitude", lng2.toFixed(2));
    url.searchParams.append(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m"
    );
    url.searchParams.append(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
    );
    url.searchParams.append("timezone", "Asia/Kolkata");
    url.searchParams.append("forecast_days", "3");

    const res = await fetch(url.toString(), {
      next: { revalidate: 1800 }, // 30 minutes cache
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const daily = data.daily || {};

    const forecast: WeatherDayForecast[] = [];
    const dates = daily.time || [];
    for (let i = 0; i < dates.length; i++) {
      const code = daily.weather_code?.[i] ?? 0;
      forecast.push({
        date: dates[i],
        weatherCode: code,
        conditionKey: mapWmoCodeToKey(code),
        minTemp: Math.round(daily.temperature_2m_min?.[i] ?? 0),
        maxTemp: Math.round(daily.temperature_2m_max?.[i] ?? 0),
        precipitationProbability: Math.round(daily.precipitation_probability_max?.[i] ?? 0)
      });
    }

    const currentCode = current.weather_code ?? 0;

    return {
      temperature: Math.round(current.temperature_2m ?? 0),
      apparentTemperature: Math.round(current.apparent_temperature ?? 0),
      humidity: Math.round(current.relative_humidity_2m ?? 0),
      windSpeed: Math.round(current.wind_speed_10m ?? 0),
      precipitationProbability: Math.round(current.precipitation_probability ?? 0),
      weatherCode: currentCode,
      conditionKey: mapWmoCodeToKey(currentCode),
      lastUpdated: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      credit: "Weather data: Open-Meteo",
      forecast
    };
  }
}

export function getWeatherProvider(): WeatherProvider {
  return new OpenMeteoProvider();
}
