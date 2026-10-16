/**
 * FarmRentHub - Saved / Favorite Equipment Service
 * Typed service interface with guest localStorage support and mock authenticated cloud sync.
 * TODO: Connect to backend endpoint POST /api/v1/users/saved when available.
 */

import { Equipment } from "@/types";
import { fetchEquipmentById } from "./api";

const STORAGE_KEY = "farmrenthub_saved_equipment";

export interface SavedEquipmentService {
  getSavedIds(): Promise<string[]>;
  getSavedEquipment(): Promise<Equipment[]>;
  isSaved(id: string): Promise<boolean>;
  toggleSaved(id: string): Promise<boolean>;
  removeSaved(id: string): Promise<void>;
  syncWithServer(userId: string): Promise<void>;
}

class LocalSavedEquipmentService implements SavedEquipmentService {
  private getLocalIds(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setLocalIds(ids: string[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("farmrenthub_saved_changed"));
    } catch {
      // Storage unavailable
    }
  }

  async getSavedIds(): Promise<string[]> {
    return this.getLocalIds();
  }

  async getSavedEquipment(): Promise<Equipment[]> {
    const ids = this.getLocalIds();
    const items: Equipment[] = [];
    for (const id of ids) {
      const eq = await fetchEquipmentById(id);
      if (eq) items.push(eq);
    }
    return items;
  }

  async isSaved(id: string): Promise<boolean> {
    const ids = this.getLocalIds();
    return ids.includes(id);
  }

  async toggleSaved(id: string): Promise<boolean> {
    const ids = this.getLocalIds();
    const index = ids.indexOf(id);
    let nowSaved = false;
    if (index >= 0) {
      ids.splice(index, 1);
      nowSaved = false;
    } else {
      ids.push(id);
      nowSaved = true;
    }
    this.setLocalIds(ids);
    return nowSaved;
  }

  async removeSaved(id: string): Promise<void> {
    const ids = this.getLocalIds().filter((savedId) => savedId !== id);
    this.setLocalIds(ids);
  }

  async syncWithServer(userId: string): Promise<void> {
    // TODO: Connect to backend endpoint POST /api/v1/users/saved
    console.info(`[SavedService] Synced favorites for user ${userId} with local storage.`);
  }
}

export const savedEquipmentService: SavedEquipmentService = new LocalSavedEquipmentService();
