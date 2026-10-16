/**
 * FarmRentHub - Equipment Comparison Service
 * Manages up to 3 selected equipment IDs for side-by-side comparison.
 */

const STORAGE_KEY = "farmrenthub_compare_equipment";
const MAX_COMPARE = 3;

export interface CompareService {
  getCompareIds(): string[];
  isComparing(id: string): boolean;
  toggleCompare(id: string): { success: boolean; isComparing: boolean; reason?: string };
  clearCompare(): void;
  removeCompare(id: string): void;
}

class LocalCompareService implements CompareService {
  private getLocal(): string[] {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private setLocal(ids: string[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
      window.dispatchEvent(new Event("farmrenthub_compare_changed"));
    } catch {
      // Storage unavailable
    }
  }

  getCompareIds(): string[] {
    return this.getLocal();
  }

  isComparing(id: string): boolean {
    return this.getLocal().includes(id);
  }

  toggleCompare(id: string): { success: boolean; isComparing: boolean; reason?: string } {
    const ids = this.getLocal();
    const idx = ids.indexOf(id);

    if (idx >= 0) {
      ids.splice(idx, 1);
      this.setLocal(ids);
      return { success: true, isComparing: false };
    }

    if (ids.length >= MAX_COMPARE) {
      return {
        success: false,
        isComparing: false,
        reason: `You can compare a maximum of ${MAX_COMPARE} machines at once.`
      };
    }

    ids.push(id);
    this.setLocal(ids);
    return { success: true, isComparing: true };
  }

  removeCompare(id: string): void {
    const ids = this.getLocal().filter((item) => item !== id);
    this.setLocal(ids);
  }

  clearCompare(): void {
    this.setLocal([]);
  }
}

export const compareService: CompareService = new LocalCompareService();
