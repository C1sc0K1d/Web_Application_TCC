export interface Dispenser {
    id: number;
    fluidLevel: number;
    color: string;
    usedCount: number;
    lastRefillDate: Date;
    installation: Date;
    local: string;
  }