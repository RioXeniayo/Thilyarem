import { Breed } from "./breeding";

const BreedMix = {
    // Thilyarem and Destrier
    [`${Breed.THIL}_${Breed.THIL}`]: { [Breed.THIL]: 100 },
    
    // CORRECTED: The second key was changed from THIL to DEST for a 50/50 split.
    [`${Breed.THIL}_${Breed.THIL}`]: {
        [Breed.THIL]: 95,
        [Breed.DEST]: 5
    },
    
    [`${Breed.DEST}_${Breed.THIL}`]: {
        [Breed.THIL]: 85,
        [Breed.DEST]: 15
    },

    [`${Breed.DEST}_${Breed.DEST}`]: {
        [Breed.THIL]: 65,
        [Breed.DEST]: 35
    },
    
    // Cyroas
    [`${Breed.CYROA}_${Breed.CYROA}`]: { [Breed.CYROA]: 100 }, 

    [`${Breed.THIL}_${Breed.CYROA}`]: {
        [Breed.THIL]: 50,
        [Breed.CYROA]: 50
    },
    
    [`${Breed.CYROA}_${Breed.THIL}`]: {
        [Breed.CYROA]: 50,
        [Breed.THIL]: 50
    },
    
    [`${Breed.CYROA}_${Breed.DEST}`]: {
        [Breed.CYROA]: 95,
        [Breed.DEST]: 5
    }
}; 

export function GetBreedMix(breed_a, breed_b) {
    const mixKey1 = `${breed_a}_${breed_b}`;
    const mixKey2 = `${breed_b}_${breed_a}`;

    return BreedMix[mixKey1] || BreedMix[mixKey2] || {};
}
