import { Sex, Rank } from '../constants/breeding';
import { ClutchMin, ClutchMax } from '../constants/clutch_size';
import { GetBreedMix } from '../constants/breed_mix';
import { Utils } from './utils';
import { GenotypeHelper } from './genotype-helper';

export class PunnettHelper {

    /**
     * Determines the base coat phenotype from a set of B, K, and M genotypes.
     * This is a private helper method for getBaseCoatOdds.
     * @param {string[]} genes - An array of genotypes [b_geno, k_geno, m_geno].
     * @returns {string} The resulting phenotype name.
     */
    static _getPhenotype(genes) {
        const [b_geno, k_geno, m_geno] = genes;
        
        if (m_geno === 'M0M0') return 'Albino';
        const hasNormalMelanin = m_geno.includes('M+');
        const hasDilutedMelanin = m_geno.includes('MB') && !hasNormalMelanin;
        if (k_geno === 'KBKB' && hasNormalMelanin) return 'Black';
        const isHomozygousWhite = b_geno === 'BWBW';
        if (isHomozygousWhite && hasDilutedMelanin) return 'Blue';
        if (b_geno.includes('B+')) return 'Tan';
        if (b_geno.includes('BA')) return 'Brown';
        if (b_geno.includes('BG')) return 'Green';
        if (isHomozygousWhite) return 'White';
        return 'Unknown';
    }

    /**
     * Calculates base coat phenotype odds using the specific B, K, M gene logic.
     * @param {object} base_genotype_odds - Odds for B, K, and M loci.
     * @returns {object} An object with each phenotype and its percentage chance.
     */
    static getBaseCoatOdds(base_genotype_odds) {
        const b = base_genotype_odds['B'];
        const k = base_genotype_odds['K'];
        const m = base_genotype_odds['M'];
        const options = [];

        b.forEach(([b_base,]) => {
            k.forEach(([k_base,]) => {
                m.forEach(([m_base,]) => {
                    const genes = [b_base, k_base, m_base];
                    const phenotype = this._getPhenotype(genes);
                    options.push(phenotype);
                });
            });
        });

        const distinct = [...new Set(options)];
        const odds = {};
        distinct.forEach(option => {
            const count = options.filter(p => p === option).length;
            odds[option] = ((count * 100) / options.length).toFixed(0);
        });

        return odds;
    }

    static getPossibleClutchSize(parent_a, parent_b, minor_fert, major_fert) {
        let clutchMin = Math.min(ClutchMin[parent_a.species], ClutchMin[parent_b.species]);
        let clutchMax = Math.min(ClutchMax[parent_a.species], ClutchMax[parent_b.species]);
        
        if (parent_a.rank === Rank.CELESTIAL || parent_b.rank === Rank.CELESTIAL) {
            clutchMin = clutchMax;
        } else if (parent_a.rank === Rank.UNRANKED || parent_b.rank === Rank.UNRANKED) {
            clutchMin = 1;
            clutchMax = 1;
        }

        if (major_fert > 0) {
            clutchMin++;
            clutchMax++;
        } else if (minor_fert > 0) {
            clutchMax++;
        }

        if (clutchMin === clutchMax) {
            return `${clutchMin} ${clutchMin === 1 ? 'egg' : 'eggs'}`;
        } else {
            return `${clutchMin} - ${clutchMax} eggs`;
        }
    }

    /**
     * MODIFIED: Removed potion logic and intersex option.
     * Returns a 50/50 chance for Male or Female.
     */
    static getSexOdds() {
        return [
            [Sex.MALE, 50],
            [Sex.FEMALE, 50]
        ];
    }

    static getBreedOdds(breed_a, breed_b) {
        return GetBreedMix(breed_a, breed_b);
    }

    static getAbilityOdds(ability_a, ability_b) {
        const abilities = [];
        if (!Utils.isNullOrEmpty(ability_a) && !Utils.isNullOrEmpty(ability_b)) {
            if (ability_a === ability_b) {
                abilities.push([ability_a, 30]);
            } else {
                abilities.push([ability_a, 15], [ability_b, 15]);
            }
        } else if (!Utils.isNullOrEmpty(ability_a)) {
            abilities.push([ability_a, 15]);
        } else if (!Utils.isNullOrEmpty(ability_b)) {
            abilities.push([ability_b, 15]);
        }
        return abilities;
    }

    static getElementOdds(element_a, element_b) {
        const elements = [];
        if (!Utils.isNullOrEmpty(element_a) && !Utils.isNullOrEmpty(element_b)) {
            if (element_a === element_b) {
                elements.push([element_a, 30]);
            } else {
                elements.push([element_a, 15], [element_b, 15]);
            }
        } else if (!Utils.isNullOrEmpty(element_a)) {
            elements.push([element_a, 15]);
        } else if (!Utils.isNullOrEmpty(element_b)) {
            elements.push([element_b, 15]);
        }
        return elements;
    }

    static getPunnettOdds(alleles_a, alleles_b) {
        const punnetts = {};
        Object.entries(alleles_a).forEach(([locus, a]) => {
            const null_val = a.null_allele;
            const a_punnett = a.alleles;
            const b_punnett = alleles_b[locus]?.alleles ?? [null_val];
            const options = [];
            a_punnett.forEach(ap => {
                b_punnett.forEach(bp => {
                    if (ap != null && bp != null) {
                        const geno = GenotypeHelper.getGenotypeFromAlleles(ap, bp);
                        options.push(geno);
                    }
                });
            });
            const distinct = [...new Set(options)];
            const odds = [];
            distinct.forEach(option => {
                const count = Utils.countOccurrences(options, option);
                odds.push([option, (count * 100 / options.length).toFixed(0)]);
            });
            punnetts[locus] = odds;
        });
        Object.entries(alleles_b).forEach(([locus, b]) => {
            if (!punnetts.hasOwnProperty(locus)) {
                const null_val = b.null_allele;
                const b_punnett = b.alleles;
                const options = [];
                b_punnett.forEach(bp => {
                    if (bp != null) {
                        const geno = GenotypeHelper.getGenotypeFromAlleles(bp, null_val);
                        options.push(geno);
                    }
                });
                const distinct = [...new Set(options)];
                const odds = [];
                distinct.forEach(option => {
                    const count = Utils.countOccurrences(options, option);
                    odds.push([option, (count * 100 / options.length).toFixed(0)]);
                });
                punnetts[locus] = odds;
            }
        });
        return punnetts;
    }

    static getPhenotypeOdds(genotype_odds, phenotype_data) {
        const phenotype_odds = [];
        phenotype_data.forEach(phenotype => {
            let p_odds = 1;
            phenotype.composites.forEach(composite => {
                let c_odds = 0;
                const locus_odds = genotype_odds[composite.gene.locus.locus];
                if (locus_odds != null) {
                    const homGene = locus_odds.find(g => g[0] == composite.gene.homozygous_genotype);
                    if (composite.allow_homozygous && homGene != null) {
                        c_odds += parseFloat(homGene[1]) / 100;
                    }
                    const hetGenes = locus_odds.filter(g => composite.gene.heterozygous_genotypes.includes(g[0]));
                    if (composite.allow_heterozygous) {
                        c_odds += Utils.sumArray(hetGenes.map(g => parseFloat(g[1]) / 100));
                    }
                }
                p_odds *= c_odds;
            });
            if (p_odds > 0) {
                phenotype_odds.push([phenotype.name, p_odds * 100]);
            }
        });
        return phenotype_odds;
    }
}
