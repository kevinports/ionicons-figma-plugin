export type FilterType = 'outline' | 'fill' | 'sharp' | 'logo';

export interface Message {
  type: string,
  data: any;
}

export interface IconData {
  index: number;
  type: string;
  name: string;
  tags: string[]
}