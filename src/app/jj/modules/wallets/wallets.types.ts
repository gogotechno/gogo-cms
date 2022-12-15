export interface Currency {
  code: string;
  displaySymbol?: string;
  symbolPosition?: 'START' | 'END';
  roundToNearest?: number;
  precision?: number;
}
