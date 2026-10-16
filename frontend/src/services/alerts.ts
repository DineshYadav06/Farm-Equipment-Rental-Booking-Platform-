/**
 * FarmRentHub - Saved Search Alerts Service
 * Typed service interface for saving search alerts on empty results.
 * TODO: Connect to backend endpoint POST /api/v1/users/search-alerts when available.
 */

const STORAGE_KEY = "farmrenthub_search_alerts";

export interface SearchAlert {
  id: string;
  query: string;
  category?: string;
  district?: string;
  state?: string;
  createdAt: string;
}

export interface SearchAlertsService {
  getAlerts(): Promise<SearchAlert[]>;
  createAlert(query: string, category?: string, district?: string, state?: string): Promise<SearchAlert>;
  deleteAlert(id: string): Promise<void>;
}

class LocalSearchAlertsService implements SearchAlertsService {
  private getLocal(): SearchAlert[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setLocal(alerts: SearchAlert[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
      window.dispatchEvent(new Event("farmrenthub_alerts_changed"));
    } catch {
      // Storage unavailable
    }
  }

  async getAlerts(): Promise<SearchAlert[]> {
    return this.getLocal();
  }

  async createAlert(query: string, category?: string, district?: string, state?: string): Promise<SearchAlert> {
    const alerts = this.getLocal();
    const newAlert: SearchAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      query,
      category,
      district,
      state,
      createdAt: new Date().toISOString()
    };
    alerts.unshift(newAlert);
    this.setLocal(alerts);
    return newAlert;
  }

  async deleteAlert(id: string): Promise<void> {
    const alerts = this.getLocal().filter((a) => a.id !== id);
    this.setLocal(alerts);
  }
}

export const searchAlertsService: SearchAlertsService = new LocalSearchAlertsService();
