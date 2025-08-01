// CORRECTED: This service now imports your static data files.
import { loci } from './loci.js';
import { GeneMap } from './gene_maps.js';

export class GeneticsService {
    static loci = [];
    static phenotypes = [];

    // The load function is now simpler; it just assigns the imported data.
    static load() {
        try {
            // The GeneMap is what the PhenotypeHelper expects as 'phenotype_data'
            this.phenotypes = GeneMap; 
            this.loci = loci;
            console.log('Static genetic data loaded successfully!');
            // Return a resolved promise to maintain compatibility with the calling code.
            return Promise.resolve();
        } catch (error) {
            console.error('Failed to load static genetic data:', error);
            return Promise.reject(error);
        }
    }

    // --- All getters below this line remain the same ---
    static get base_loci() {
        return this.loci.filter(x => x.category === 'base');
    }

    static get marking_loci() {
        return this.loci.filter(x => x.category === 'marking');
    }
    
    // ... etc.
}
