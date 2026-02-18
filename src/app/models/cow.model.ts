export interface CowEvent {
  id: string;
  type: string;
  date: string;
  note: string;
}

export interface Cow {
  id: string;
  earTag: string;
  sex: string;
  pen: string;
  status: string;
  weight?: number;
  dailyWeightGain?: number;
  lastEventDate: string;
  events: CowEvent[];
}

export interface CowFilters {
  search: string;
  status: '' | string;
  pen: '' | string;
}

export interface CreateCowInput {
  earTag: string;
  sex: string;
  pen: string;
  status: string;
  weight?: number;
}
