// This would be the main script in your HTML file
export default function breedingRoller() {
    return {
        // ... state properties like p_a, p_b, etc. remain the same ...

        calculatePossibilities() {
            console.log('calculating...');

            // Get alleles for each parent
            const parentAGenes = GenotypeHelper.sliceGenotype(this.p_a.genotype);
            const parentA_alleles = GenotypeHelper.getAlleles(parentAGenes, GeneticsService.loci);

            const parentBGenes = GenotypeHelper.sliceGenotype(this.p_b.genotype);
            const parentB_alleles = GenotypeHelper.getAlleles(parentBGenes, GeneticsService.loci);
            
            // --- Odds Calculation ---
            this.stats.clutch = PunnettHelper.getPossibleClutchSize(this.p_a, this.p_b, this.items.minor_fert, this.items.major_fert);
            this.stats.sex = PunnettHelper.getSexOdds();
            this.stats.breeds = PunnettHelper.getBreedOdds(this.p_a.species, this.p_b.species);
            this.stats.traits = PunnettHelper.getTraitOdds(this.p_a.trait, this.p_b.trait);
            this.stats.elements = PunnettHelper.getElementOdds(this.p_a.element, this.p_b.element);

            // 1. Get Genotype Odds from PunnettHelper
            const genotype_odds = PunnettHelper.getPunnettOdds(parentA_alleles, parentB_alleles);

            // 2. Get Phenotype Odds from PhenotypeHelper
            // Note: Your PhenotypeHelper expects the full phenotype data object (GeneMap)
            this.stats.bases = PhenotypeHelper.getPhenotypeOdds(
                genotype_odds,
                Object.values(GeneticsService.phenotypes).filter(p => p.TYPE === 0) // Filter for BASE type
            );
            this.stats.markings = PhenotypeHelper.getPhenotypeOdds(
                genotype_odds,
                Object.values(GeneticsService.phenotypes).filter(p => p.TYPE === 1) // Filter for MARKING type
            );
            
            this.initChart();
        },
        
        // ... other methods like init(), load(), reset(), etc. remain the same ...
    }
}
