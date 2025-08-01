/* eslint-disable */
// --- IMPORTS ---
import { GeneticsService } from "./genetics-service";
import { PunnettHelper } from "./punnett-helper";

import { Sex, Breed, Rank, Fertility, Ability, Element, Aberration } from './breeding';
import { GenderPotion, StackingPotion } from "./items";
import { GenotypeHelper } from "./genotype-helper";
import { PhenotypeHelper } from "./phenotype-helper";
import { ArcElement, Chart, Legend, PieController, Title, Tooltip } from "chart";
import { BaseChartColor, BreedChartColor } from "./chart_colors";
import { Genes } from './genes';

export default function breedingRoller() {
    return {
        // --- STATE & DATA ---
        data: {
            sex: Sex,
            breeds: Breed,
            age: Age,
            fertility: Fertility,
            traits: Trait,
            elements: Element,
            deformities: Deformities,
            items: {
                gender: [CrescentHerb, MoonlitHerb],
            }
        },
        p_a: {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            age: Age.YOUNG_ADULT,
            fertility: Fertility.GOOD,
            trait: null,
            element: null,
            deformities: null
        },
        p_b: {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            age: Age.YOUNG_ADULT, 
            fertility: Fertility.GOOD,
            trait: null,
            element: null,
            deformities: null
        },
        items: {
            cresc_herb: null,
            moon_herb: 0,
            minor_fert: 0,
            major_fert: 0,
            unstable_elixir: 0,
            gender_pot: null
        },
        coi: 0,
        stats: {
            clutch: '0 eggs',
            sex: {},
            breeds: {},
            bases: {},
            markings: {},
            traits: {},
            elements: {},
        },
        charts: {
            breeds: null,
            bases: null,
        },

        // --- METHODS ---
        init() {
            this.load();
        },
        load() {
            Chart.register(ArcElement, Tooltip, Legend, Title, PieController);
            GeneticsService.load()
                .then(() => {
                    console.log('Data loaded successfully!');
                    this.calculatePossibilities();
                })
                .catch(error => {
                    console.error('Failed to load data:', error);
                });
            const propsToWatch = ['p_a', 'p_b', 'items', 'coi'];
            propsToWatch.forEach(prop => {
                this.$watch(prop, () => this.calculatePossibilities());
            });
        },
        initChart() {
            // Breed Chart
            if (this.charts.breeds) {
                this.charts.breeds.destroy();
            }
            this.charts.breeds = new Chart(this.$refs.breedChart, {
                type: 'pie',
                data: {
                    labels: Object.keys(this.stats.breeds),
                    datasets: [{
                        data: Object.values(this.stats.breeds),
                        backgroundColor: Object.keys(this.stats.breeds).map(x => BreedChartColor[x]),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'top' } }
                }
            });

            if (this.charts.bases) {
                this.charts.bases.destroy();
            }
            this.charts.bases = new Chart(this.$refs.baseChart, {
                type: 'pie',
                data: {
                    labels: Object.keys(this.stats.bases),
                    datasets: [{
                        data: Object.values(this.stats.bases),
                        backgroundColor: Object.keys(this.stats.bases).map(x => BaseChartColor[x]),
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'top' } }
                }
            });
        },
        getPhenotype(genotype) {
            const genes = GenotypeHelper.sliceGenotype(genotype);
            let phenotypes = PhenotypeHelper.getPhenotypes(genes, GeneticsService.phenotypes);
            phenotypes = PhenotypeHelper.filterHiddenPhenotypes(phenotypes, GeneticsService.phenotypes);
            let carries = PhenotypeHelper.getCarried(genes, GeneticsService.phenotypes);
            carries = PhenotypeHelper.filterHiddenPhenotypes(carries, GeneticsService.phenotypes);
            return PhenotypeHelper.getPhenotypeString(phenotypes, carries, GeneticsService.phenotypes);
        },
        validatePotionAllowance(event) {
            const total = this.items.minor_fert + this.items.major_fert + this.items.unstable_elixir;
            const input = event.target.id;
            if (total > 3) {
                const val = this.items[input];
                this.items[input] = 3 - (total - val);
            }
        },
        calculatePossibilities() {
            console.log('calculating...');

            const parentAGenes = GenotypeHelper.sliceGenotype(this.p_a.genotype);
            const parentA_base_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceBaseGenes(parentAGenes), GeneticsService.loci, true);
            const parentA_marking_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceMarkingGenes(parentAGenes), GeneticsService.loci);

            const parentBGenes = GenotypeHelper.sliceGenotype(this.p_b.genotype);
            const parentB_base_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceBaseGenes(parentBGenes), GeneticsService.loci, true);
            const parentB_marking_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceMarkingGenes(parentBGenes), GeneticsService.loci);

            this.stats.clutch = PunnettHelper.getPossibleClutchSize(this.p_a, this.p_b, this.items.minor_fert, this.items.major_fert);
            this.stats.sex = PunnettHelper.getSexOdds(this.items.gender_pot);
            this.stats.breeds = PunnettHelper.getBreedOdds(this.p_a.species, this.p_b.species);
            this.stats.traits = PunnettHelper.getTraitOdds(this.p_a.trait, this.p_b.trait);
            this.stats.elements = PunnettHelper.getElementOdds(this.p_a.element, this.p_b.element);

            const base_odds = PunnettHelper.getPunnettOdds(parentA_base_alleles, parentB_base_alleles);
            this.stats.bases = PunnettHelper.getBaseOdds(base_odds, GeneticsService.phenotypes);

            const marking_odds = PunnettHelper.getPunnettOdds(parentA_marking_alleles, parentB_marking_alleles);
            this.stats.markings = PunnettHelper.getPhenotypeOdds(marking_odds, GeneticsService.phenotypes);

            this.initChart();
        },
        reset() {
            this.p_a = {
                species: Breed.THIL, genotype: 'B+/B+ M+/M+ K+/K+', phenotype: 'Tan',
                age: Age.YOUNG_ADULT, 
                fertility: Fertility.GOOD,
                trait: null, element: null, deformities: null
            };
            this.p_b = {
                species: Breed.THIL, genotype: 'B+/B+ M+/M+ K+/K+', phenotype: 'Tan',
                age: Age.YOUNG_ADULT,
                fertility: Fertility.GOOD,
                trait: null, element: null, deformities: null
            };
            this.items = {
                cresc_herb: null, moon_herb: 0, minor_fert: 0,
                major_fert: 0, unstable_elixir: 0, gender_pot: null
            };
            this.coi = 0;
        }
    }
}
