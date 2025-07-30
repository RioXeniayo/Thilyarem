import { Breed } from "./js/breeding"

const BreedMix = {
    // Raptor
    [`${Breed.THIL}_${Breed.THIL}`]: { [Breed.THIL]: 100 },
    [`${Breed.THIL}_${Breed.THIL}`]: 
    {
        [Breed.THIL]: 95,
        [Breed.DEST]: 5
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
