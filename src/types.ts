export interface DataPoint {
  date: string;
  value: number;
  category: string;
  subCategory?: string;
  region?: string;
  success?: number;
  failed?: number;
  pending?: number;
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
  dataPoints: DataPoint[];
  regions?: string[];
  categories?: string[];
}