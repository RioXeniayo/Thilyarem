import { Breed } from "./breeding"

const BreedMix = {
// Thilyarem and Destrier
    [`${Breed.THIL}_${Breed.THIL}`]: { [Breed.THIL]: 100 },
    [`${Breed.THIL}_${Breed.DEST}`]: 
    {
        [Breed.THIL]: 50,
        [Breed.THIL]: 50
    },
    [`${Breed.DEST}_${Breed.THIL}`]: 
    {
        [Breed.THIL]: 85,
        [Breed.DEST]: 15
    },
    [`${Breed.DEST}_${Breed.DEST}`]: 
    {
        [Breed.THIL]: 65,
        [Breed.DEST]: 35
    },
// Cyroas
    [`${Breed.CYROA}_${Breed.CYROA}`]: { [Breed.THIL]: 100 },
    [`${Breed.THIL}_${Breed.DEST}`]: 
    {
        [Breed.CYROA]: 50,
        [Breed.CYROA]: 50
    },
        [`${Breed.CYROA}_${Breed.THIL}`]:
    {
        [Breed.CYROA]: 50,
        [Breed.THIL]: 50
    },
        [`${Breed.CYROA}_${Breed.DEST}`]:
    {
        [Breed.CYROA]: 95,
        [Breed.DEST]: 5
    },
export function GetBreedMix(breed_a, breed_b) {
    const mixKey1 = `${breed_a}_${breed_b}`;
    const mixKey2 = `${breed_b}_${breed_a}`;

    if (BreedMix.hasOwnProperty(mixKey1)) {
        return BreedMix[mixKey1];
    }
    
    if (BreedMix.hasOwnProperty(mixKey2)) {
        return BreedMix[mixKey2];
    }

    return {};
