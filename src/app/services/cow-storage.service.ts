import { Injectable } from '@angular/core';
import { Cow } from '../models/cow.model';

const COW_STORAGE_KEY = 'cow-catalog-data-v1';

const seedCows: Cow[] = [
  {
    id: '1',
    earTag: 'TAG-1001',
    sex: 'Female',
    pen: 'Pen-A1',
    status: 'Active',
    weight: 540,
    dailyWeightGain: 0.8,
    lastEventDate: '2026-02-12',
    events: [
      { id: 'e1', type: 'Weight Check', date: '2026-02-12', note: 'Routine monthly check.' },
      { id: 'e2', type: 'Moved Pen', date: '2026-01-30', note: 'Moved to Pen-A1 for lactation group.' }
    ]
  },
  {
    id: '2',
    earTag: 'TAG-1002',
    sex: 'Male',
    pen: 'Pen-B3',
    status: 'In Treatment',
    weight: 610,
    dailyWeightGain: 0.5,
    lastEventDate: '2026-02-11',
    events: [
      { id: 'e3', type: 'Treatment', date: '2026-02-11', note: 'Started hoof treatment plan.' },
      { id: 'e4', type: 'Weight Check', date: '2026-02-10', note: 'Slight decrease from previous week.' }
    ]
  },
  {
    id: '3',
    earTag: 'TAG-1003',
    sex: 'Female',
    pen: 'Pen-C2',
    status: 'Deceased',
    weight: 485,
    lastEventDate: '2026-01-25',
    events: [
      { id: 'e5', type: 'Death', date: '2026-01-25', note: 'Natural causes reported by veterinarian.' },
      { id: 'e6', type: 'Treatment', date: '2026-01-18', note: 'Monitored for recurring fever.' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class CowStorageService {
  getCows(): Cow[] {
    const serialized = localStorage.getItem(COW_STORAGE_KEY);
    if (serialized) {
      return JSON.parse(serialized) as Cow[];
    }

    this.saveCows(seedCows);
    return seedCows;
  }

  saveCows(cows: Cow[]): void {
    localStorage.setItem(COW_STORAGE_KEY, JSON.stringify(cows));
  }
}
