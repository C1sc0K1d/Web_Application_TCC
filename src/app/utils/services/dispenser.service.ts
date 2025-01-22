import { Injectable } from '@angular/core';
import { Dispenser } from '../interfaces/dispenser.model';

@Injectable({
    providedIn: 'root'
})
export class DispenserService {

    getDispensersAdm(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 82, usedCount: 152, lastRefillDate: new Date('2025-01-10'), installation: new Date('2023-05-10'), color: '', local: 'Administração' },
            { id: 2, fluidLevel: 55, usedCount: 184, lastRefillDate: new Date('2025-01-23'), installation: new Date('2023-05-10'), color: '', local: 'Administração' },
            { id: 3, fluidLevel: 9, usedCount: 231, lastRefillDate: new Date('2025-01-15'), installation: new Date('2023-05-10'), color: '', local: 'Administração' }
        ];

        return this.setColor(dispensers);
    }

    getDispensersCentroCirugico(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 100, usedCount: 0, lastRefillDate: new Date('2025-01-03'), installation: new Date('2023-05-10'), color: '', local: 'Centro Cirúrgico' },
            { id: 2, fluidLevel: 18, usedCount: 241, lastRefillDate: new Date('2025-01-12'), installation: new Date('2023-05-10'), color: '', local: 'Centro Cirúrgico' },
            { id: 3, fluidLevel: 34, usedCount: 115, lastRefillDate: new Date('2025-01-20'), installation: new Date('2023-05-10'), color: '', local: 'Centro Cirúrgico' }
        ];

        return this.setColor(dispensers);
    }

    getDispensersPediatria(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 0, usedCount: 250, lastRefillDate: new Date('2025-01-10'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' },
            { id: 2, fluidLevel: 43, usedCount: 103, lastRefillDate: new Date('2024-01-12'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' },
            { id: 3, fluidLevel: 72, usedCount: 90, lastRefillDate: new Date('2024-01-08'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' }
        ];

        return this.setColor(dispensers);
    }

    getDispensersEnfermaria(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 50, usedCount: 123, lastRefillDate: new Date('2025-02-01'), installation: new Date('2024-06-15'), color: '', local: 'Enfermaria' },
            { id: 2, fluidLevel: 54, usedCount: 132, lastRefillDate: new Date('2025-02-12'), installation: new Date('2024-06-15'), color: '', local: 'Enfermaria' },
            { id: 3, fluidLevel: 87, usedCount: 93, lastRefillDate: new Date('2025-02-12'), installation: new Date('2024-06-15'), color: '', local: 'Enfermaria' }
        ];

        return this.setColor(dispensers);
    }

    getDispensersUTI(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 42, usedCount: 189, lastRefillDate: new Date('2025-02-24'), installation: new Date('2024-06-15'), color: '', local: 'UTI' },
            { id: 2, fluidLevel: 68, usedCount: 138, lastRefillDate: new Date('2025-01-31'), installation: new Date('2024-06-15'), color: '', local: 'UTI'  },
            { id: 3, fluidLevel: 19, usedCount: 208, lastRefillDate: new Date('2025-01-31'), installation: new Date('2024-06-15'), color: '', local: 'UTI'  }
        ];

        return this.setColor(dispensers);
    }

    getDispensersAll(): Dispenser[] {
        const dispensers: Dispenser[] = [
            { id: 1, fluidLevel: 42, usedCount: 189, lastRefillDate: new Date('2025-02-24'), installation: new Date('2024-06-15'), color: '', local: 'Administração' },
            { id: 2, fluidLevel: 68, usedCount: 138, lastRefillDate: new Date('2025-01-31'), installation: new Date('2024-06-15'), color: '', local: 'Administração' },
            { id: 3, fluidLevel: 19, usedCount: 208, lastRefillDate: new Date('2025-01-31'), installation: new Date('2024-06-15'), color: '', local: 'Administração' },
            { id: 4, fluidLevel: 50, usedCount: 123, lastRefillDate: new Date('2025-02-01'), installation: new Date('2024-06-15'), color: '', local: 'Centro Cirúrgico' },
            { id: 5, fluidLevel: 54, usedCount: 132, lastRefillDate: new Date('2025-02-12'), installation: new Date('2024-06-15'), color: '', local: 'Centro Cirúrgico' },
            { id: 6, fluidLevel: 87, usedCount: 93, lastRefillDate: new Date('2025-02-12'), installation: new Date('2024-06-15'), color: '', local: 'Centro Cirúrgico' },
            { id: 7, fluidLevel: 0, usedCount: 250, lastRefillDate: new Date('2025-01-10'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' },
            { id: 8, fluidLevel: 43, usedCount: 103, lastRefillDate: new Date('2024-01-12'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' },
            { id: 9, fluidLevel: 72, usedCount: 90, lastRefillDate: new Date('2024-01-08'), installation: new Date('2023-05-10'), color: '', local: 'Pediatria' },
            { id: 10, fluidLevel: 100, usedCount: 0, lastRefillDate: new Date('2025-01-03'), installation: new Date('2023-05-10'), color: '', local: 'Enfermaria'  },
            { id: 11, fluidLevel: 18, usedCount: 241, lastRefillDate: new Date('2025-01-12'), installation: new Date('2023-05-10'), color: '', local: 'Enfermaria'  },
            { id: 12, fluidLevel: 34, usedCount: 115, lastRefillDate: new Date('2025-01-20'), installation: new Date('2023-05-10'), color: '', local: 'Enfermaria'  },
            { id: 13, fluidLevel: 82, usedCount: 152, lastRefillDate: new Date('2025-01-10'), installation: new Date('2023-05-10'), color: '', local: 'UTI'  },
            { id: 14, fluidLevel: 55, usedCount: 184, lastRefillDate: new Date('2025-01-23'), installation: new Date('2023-05-10'), color: '', local: 'UTI'  },
            { id: 15, fluidLevel: 9, usedCount: 231, lastRefillDate: new Date('2025-01-15'), installation: new Date('2023-05-10'), color: '', local: 'UTI'  }
        ];

        return this.setColor(dispensers);
    }

    setColor(dispensers: Dispenser[]): Dispenser[] {
        return dispensers.map(dispenser => {
            if (dispenser.fluidLevel > 70) {
                dispenser.color = 'green';
            } else if (dispenser.fluidLevel > 40) {
                dispenser.color = 'yellow';
            } else {
                dispenser.color = 'red';
            }
            return dispenser;
        });
    }
}