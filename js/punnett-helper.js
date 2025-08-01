import { Sex, Age } from './breeding.js';
import { ClutchMin, ClutchMax } from './clutch_size.js';
import { GetBreedMix } from './breed_mix.js';
import { Utils } from './utils.js';
import { GenotypeHelper } from './genotype-helper.js';
import { Genes } from './genes.js';

export class PunnettHelper {

    static BASE_COAT_LOOKUP = {
        'B+/B+ M+/M+ K+/K+': 'Tan', 'B+/B+ M+/MB K+/K+': 'Tan', 'B+/B+ M+/M0 K+/K+': 'Tan', 'B+/B+ MB/MB K+/K+': 'Tan',
        'B+/B+ MB/M0 K+/K+': 'Tan', 'B+/B+ M0/M0 K+/K+': 'Cream', 'B+/B+ M+/M+ K+/KB': 'Tan', 'B+/B+ M+/MB K+/KB': 'Tan',
        'B+/B+ M+/M0 K+/KB': 'Tan', 'B+/B+ MB/MB K+/KB': 'Tan', 'B+/B+ MB/M0 K+/KB': 'Tan', 'B+/B+ M0/M0 K+/KB': 'Cream',
        'B+/B+ M+/M+ KB/KB': 'Black', 'B+/B+ M+/MB KB/KB': 'Tan', 'B+/B+ M+/M0 KB/KB': 'Tan', 'B+/B+ MB/MB KB/KB': 'Tan',
        'B+/B+ MB/M0 KB/KB': 'Tan', 'B+/B+ M0/M0 KB/KB': 'Cream', 'B+/BA M+/M+ K+/K+': 'Tan', 'B+/BA M+/MB K+/K+': 'Tan',
        'B+/BA M+/M0 K+/K+': 'Tan', 'B+/BA MB/MB K+/K+': 'Tan', 'B+/BA MB/M0 K+/K+': 'Tan', 'B+/BA M0/M0 K+/K+': 'Cream',
        'B+/BA M+/M+ K+/KB': 'Tan', 'B+/BA M+/MB K+/KB': 'Tan', 'B+/BA M+/M0 K+/KB': 'Tan', 'B+/BA MB/MB K+/KB': 'Tan',
        'B+/BA MB/M0 K+/KB': 'Tan', 'B+/BA M0/M0 K+/KB': 'Cream', 'B+/BA M+/M+ KB/KB': 'Black', 'B+/BA M+/MB KB/KB': 'Tan',
        'B+/BA M+/M0 KB/KB': 'Tan', 'B+/BA MB/MB KB/KB': 'Tan', 'B+/BA MB/M0 KB/KB': 'Tan', 'B+/BA M0/M0 KB/KB': 'Cream',
        'B+/BG M+/M+ K+/K+': 'Tan', 'B+/BG M+/MB K+/K+': 'Tan', 'B+/BG M+/M0 K+/K+': 'Tan', 'B+/BG MB/MB K+/K+': 'Tan',
        'B+/BG MB/M0 K+/K+': 'Tan', 'B+/BG M0/M0 K+/K+': 'Cream', 'B+/BG M+/M+ K+/KB': 'Tan', 'B+/BG M+/MB K+/KB': 'Tan',
        'B+/BG M+/M0 K+/KB': 'Tan', 'B+/BG MB/MB K+/KB': 'Tan', 'B+/BG MB/M0 K+/KB': 'Tan', 'B+/BG M0/M0 K+/KB': 'Cream',
        'B+/BG M+/M+ KB/KB': 'Black', 'B+/BG M+/MB KB/KB': 'Tan', 'B+/BG M+/M0 KB/KB': 'Tan', 'B+/BG MB/MB KB/KB': 'Tan',
        'B+/BG MB/M0 KB/KB': 'Tan', 'B+/BG M0/M0 KB/KB': 'Cream', 'B+/BW M+/M+ K+/K+': 'Tan', 'B+/BW M+/MB K+/K+': 'Tan',
        'B+/BW M+/M0 K+/K+': 'Tan', 'B+/BW MB/MB K+/K+': 'Tan', 'B+/BW MB/M0 K+/K+': 'Tan', 'B+/BW M0/M0 K+/K+': 'Cream',
        'B+/BW M+/M+ K+/KB': 'Tan', 'B+/BW M+/MB K+/KB': 'Tan', 'B+/BW M+/M0 K+/KB': 'Tan', 'B+/BW MB/MB K+/KB': 'Tan',
        'B+/BW MB/M0 K+/KB': 'Tan', 'B+/BW M0/M0 K+/KB': 'Cream', 'B+/BW M+/M+ KB/KB': 'Black', 'B+/BW M+/MB KB/KB': 'Tan',
        'B+/BW M+/M0 KB/KB': 'Tan', 'B+/BW MB/MB KB/KB': 'Tan', 'B+/BW MB/M0 KB/KB': 'Tan', 'B+/BW M0/M0 KB/KB': 'Cream',
        'BA/BA M+/M+ K+/K+': 'Brown', 'BA/BA M+/MB K+/K+': 'Brown', 'BA/BA M+/M0 K+/K+': 'Brown', 'BA/BA MB/MB K+/K+': 'Brown',
        'BA/BA MB/M0 K+/K+': 'Brown', 'BA/BA M0/M0 K+/K+': 'Lilac', 'BA/BA M+/M+ K+/KB': 'Brown', 'BA/BA M+/MB K+/KB': 'Brown',
        'BA/BA M+/M0 K+/KB': 'Brown', 'BA/BA MB/MB K+/KB': 'Brown', 'BA/BA MB/M0 K+/KB': 'Brown', 'BA/BA M0/M0 K+/KB': 'Lilac',
        'BA/BA M+/M+ KB/KB': 'Black', 'BA/BA M+/MB KB/KB': 'Brown', 'BA/BA M+/M0 KB/KB': 'Brown', 'BA/BA MB/MB KB/KB': 'Brown',
        'BA/BA MB/M0 KB/KB': 'Brown', 'BA/BA M0/M0 KB/KB': 'Lilac', 'BA/BG M+/M+ K+/K+': 'Brown', 'BA/BG M+/MB K+/K+': 'Brown',
        'BA/BG M+/M0 K+/K+': 'Brown', 'BA/BG MB/MB K+/K+': 'Brown', 'BA/BG MB/M0 K+/K+': 'Brown', 'BA/BG M0/M0 K+/K+': 'Lilac',
        'BA/BG M+/M+ K+/KB': 'Brown', 'BA/BG M+/MB K+/KB': 'Brown', 'BA/BG M+/M0 K+/KB': 'Brown', 'BA/BG MB/MB K+/KB': 'Brown',
        'BA/BG MB/M0 K+/KB': 'Brown', 'BA/BG M0/M0 K+/KB': 'Lilac', 'BA/BG M+/M+ KB/KB': 'Black', 'BA/BG M+/MB KB/KB': 'Brown',
        'BA/BG M+/M0 KB/KB': 'Brown', 'BA/BG MB/MB KB/KB': 'Brown', 'BA/BG MB/M0 KB/KB': 'Brown', 'BA/BG M0/M0 KB/KB': 'Lilac',
        'BA/BW M+/M+ K+/K+': 'Brown', 'BA/BW M+/MB K+/K+': 'Brown', 'BA/BW M+/M0 K+/K+': 'Brown', 'BA/BW MB/MB K+/K+': 'Brown',
        'BA/BW MB/M0 K+/K+': 'Brown', 'BA/BW M0/M0 K+/K+': 'Lilac', 'BA/BW M+/M+ K+/KB': 'Brown', 'BA/BW M+/MB K+/KB': 'Brown',
        'BA/BW M+/M0 K+/KB': 'Brown', 'BA/BW MB/MB K+/KB': 'Brown', 'BA/BW MB/M0 K+/KB': 'Brown', 'BA/BW M0/M0 K+/KB': 'Lilac',
        'BA/BW M+/M+ KB/KB': 'Black', 'BA/BW M+/MB KB/KB': 'Brown', 'BA/BW M+/M0 KB/KB': 'Brown', 'BA/BW MB/MB KB/KB': 'Brown',
        'BA/BW MB/M0 KB/KB': 'Brown', 'BA/BW M0/M0 KB/KB': 'Lilac', 'BG/BG M+/M+ K+/K+': 'Green', 'BG/BG M+/MB K+/K+': 'Green',
        'BG/BG M+/M0 K+/K+': 'Green', 'BG/BG MB/MB K+/K+': 'Seagreen', 'BG/BG MB/M0 K+/K+': 'Green', 'BG/BG M0/M0 K+/K+': 'Seafoam',
        'BG/BG M+/M+ K+/KB': 'Green', 'BG/BG M+/MB K+/KB': 'Green', 'BG/BG M+/M0 K+/KB': 'Green', 'BG/BG MB/MB K+/KB': 'Seagreen',
        'BG/BG MB/M0 K+/KB': 'Green', 'BG/BG M0/M0 K+/KB': 'Seafoam', 'BG/BG M+/M+ KB/KB': 'Black', 'BG/BG M+/MB KB/KB': 'Green',
        'BG/BG M+/M0 KB/KB': 'Green', 'BG/BG MB/MB KB/KB': 'Seagreen', 'BG/BG MB/M0 KB/KB': 'Green', 'BG/BG M0/M0 KB/KB': 'Seafoam',
        'BG/BW M+/M+ K+/K+': 'Green', 'BG/BW M+/MB K+/K+': 'Green', 'BG/BW M+/M0 K+/K+': 'Green', 'BG/BW MB/MB K+/K+': 'Seagreen',
        'BG/BW MB/M0 K+/K+': 'Green', 'BG/BW M0/M0 K+/K+': 'Seafoam', 'BG/BW M+/M+ K+/KB': 'Green', 'BG/BW M+/MB K+/KB': 'Green',
        'BG/BW M+/M0 K+/KB': 'Green', 'BG/BW MB/MB K+/KB': 'Seagreen', 'BG/BW MB/M0 K+/KB': 'Green', 'BG/BW M0/M0 K+/KB': 'Seafoam',
        'BG/BW M+/M+ KB/KB': 'Black', 'BG/BW M+/MB KB/KB': 'Green', 'BG/BW M+/M0 KB/KB': 'Green', 'BG/BW MB/MB KB/KB': 'Seagreen',
        'BG/BW MB/M0 KB/KB': 'Green', 'BG/BW M0/M0 KB/KB': 'Seafoam', 'BW/BW M+/M+ K+/K+': 'Slate', 'BW/BW M+/MB K+/K+': 'Slate',
        'BW/BW M+/M0 K+/K+': 'Slate', 'BW/BW MB/MB K+/K+': 'Blue', 'BW/BW MB/M0 K+/K+': 'Slate', 'BW/BW M0/M0 K+/K+': 'White',
        'BW/BW M+/M+ K+/KB': 'Slate', 'BW/BW M+/MB K+/KB': 'Slate', 'BW/BW M+/M0 K+/KB': 'Slate', 'BW/BW MB/MB K+/KB': 'Blue',
        'BW/BW MB/M0 K+/KB': 'Slate', 'BW/BW M0/M0 K+/KB': 'White', 'BW/BW M+/M+ KB/KB': 'Black', 'BW/BW M+/MB KB/KB': 'Slate',
        'BW/BW M+/M0 KB/KB': 'Slate', 'BW/BW MB/MB KB/KB': 'Blue', 'BW/BW MB/M0 KB/KB': 'Slate', 'BW/BW M0/M0 KB/KB': 'White',
    };


    static _getPhenotype(genes) {
        const sortAlleles = (geno) => {
            if (!geno.includes('/')) return geno;
            return geno.split('/').sort().join('/');
        };
        
        const b_geno = sortAlleles(genes[0]);
        const m_geno = sortAlleles(genes[1]);
        const k_geno = sortAlleles(genes[2]);

        const key = `${b_geno} ${m_geno} ${k_geno}`;
        return this.BASE_COAT_LOOKUP[key] || 'Unknown';
    }

    static getBaseCoatOdds(base_genotype_odds) {
        const b = base_genotype_odds['B'];
        const k = base_genotype_odds['K'];
        const m = base_genotype_odds['M'];
        const options = [];

        b.forEach(([b_base,]) => {
            k.forEach(([k_base,]) => {
                m.forEach(([m_base,]) => {
                    const genes = [b_base, m_base, k_base]; // Note: order is B, M, K for the lookup
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
        
        if (parent_a.Age === Age.CELESTIAL || parent_b.Age === Age.CELESTIAL) {
            clutchMin = clutchMax;
        } else if (parent_a.Age === Age.UNAgeED || parent_b.Age === Age.UNAgeED) {
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
