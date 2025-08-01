// CORRECTED: Removed all base coat logic to prevent conflicts with PhenotypeHelper.
// Renamed getAbilityOdds to getTraitOdds.

import { Age, Sex } from './breeding.js'; // Note: Using Age, not Rank
import { ClutchMin, ClutchMax } from './clutch_size.js';
import { GetBreedMix } from './breed_mix.js';
import { Utils } from './utils.js';
import { GenotypeHelper } from './genotype-helper.js';

export class PunnettHelper {
    
    static getPossibleClutchSize(parent_a, parent_b, minor_fert, major_fert) {
        let clutchMin = Math.min(ClutchMin[parent_a.species], ClutchMin[parent_b.species]);
        let clutchMax = Math.max(ClutchMax[parent_a.species], ClutchMax[parent_b.species]);
        
        if (parent_a.age === Age.CELESTIAL || parent_b.age === Age.CELESTIAL) {
            clutchMin = clutchMax;
        }
        // Assuming UNRANKED exists in the Age enum for hatchlings/young adults not yet ranked
        else if (parent_a.age === Age.UNRANKED || parent_b.age === Age.UNRANKED) {
            clutchMin = 1;
            clutchMax = 1;
        }

        if (major_fert > 0) { clutchMin++; clutchMax++; }
        else if (minor_fert > 0) { clutchMax++; }

        if (clutchMin === clutchMax) {
            return `${clutchMin} ${clutchMin === 1 ? 'egg' : 'eggs'}`;
        }
        return `${clutchMin} - ${clutchMax} eggs`;
    }
    
    static getSexOdds() {
        return [[Sex.MALE, 50], [Sex.FEMALE, 50]];
    }

    static getBreedOdds(breed_a, breed_b) {
        return GetBreedMix(breed_a, breed_b);
    }
    
    // CORRECTED: Renamed from getAbilityOdds
    static getTraitOdds(trait_a, trait_b) {
        const traits = [];
        if (!Utils.isNullOrEmpty(trait_a) && !Utils.isNullOrEmpty(trait_b)) {
            if (trait_a === trait_b) {
                traits.push([trait_a, 30]);
            } else {
                traits.push([trait_a, 15], [trait_b, 15]);
            }
        } else if (!Utils.isNullOrEmpty(trait_a)) {
            traits.push([trait_a, 15]);
        } else if (!Utils.isNullOrEmpty(trait_b)) {
            traits.push([trait_b, 15]);
        }
        return traits;
    }

    static getElementOdds(element_a, element_b) {
        // ... this method is fine and remains the same ...
    }

    static getPunnettOdds(alleles_a, alleles_b) {
        // ... this powerful method is fine and remains the same ...
    }

    // NOTE: getBaseOdds and getPhenotypeOdds are now handled by the main component
    // using PhenotypeHelper, so they are removed from here.
}
