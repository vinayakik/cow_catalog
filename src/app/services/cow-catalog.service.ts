import { computed, Injectable, signal } from '@angular/core';
import { Cow, CowFilters, CreateCowInput } from '../models/cow.model';
import { CowStorageService } from './cow-storage.service';

const defaultFilters: CowFilters = {
  search: '',
  status: '',
  pen: ''
};

@Injectable({ providedIn: 'root' })
export class CowCatalogService {
  cows = signal<Cow[]>([]);
  filters = signal<CowFilters>(defaultFilters);

  constructor(private storage: CowStorageService) {
    this.cows.set(this.storage.getCows());
  }

  listFilteredCows=computed(()=>{
    const { search, status, pen } = this.filters();
    return this.cows().filter((cow) => {
      const matchesSearch = search.trim().length === 0 || cow.earTag.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || cow.status === status;
      const matchesPen = !pen || cow.pen === pen;
      return matchesSearch && matchesStatus && matchesPen;
    });
  })

  getCowById(id: string): Cow | undefined {
    return this.cows().find((cow) => cow.id === id);
  }

  setFilters(filters: CowFilters): void {
    this.filters.set(filters);
  }

  resetFilters(): void {
    this.filters.set(defaultFilters);
  }

  getAvailablePens(): string[] {
    return Array.from(new Set(this.cows().map((cow) => cow.pen))).sort();
  }

  getStatuses(): string[] {
    return ['Active', 'In Treatment', 'Deceased'];
  }

  addCow(input: CreateCowInput): Cow {
    const normalizedTag = input.earTag.trim().toUpperCase();
    if (!normalizedTag) {
      throw new Error('Ear tag is required.');
    }

    const exists = this.cows().some((cow) => cow.earTag.toUpperCase() === normalizedTag);
    if (exists) {
      throw new Error('Ear tag must be unique.');
    }

    const cow: Cow = {
      id: crypto.randomUUID(),
      earTag: normalizedTag,
      sex: input.sex,
      pen: input.pen,
      status: input.status,
      weight: input.weight,
      dailyWeightGain: undefined,
      lastEventDate: new Date().toISOString().slice(0, 10),
      events: [
        {
          id: crypto.randomUUID(),
          type: 'Moved Pen',
          date: new Date().toISOString().slice(0, 10),
          note: `Cow entered catalog in ${input.pen}.`
        }
      ]
    };

    const updated = [cow, ...this.cows()];
    this.cows.set(updated);
    this.storage.saveCows(updated);
    return cow;
  }
}
