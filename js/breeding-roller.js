/* eslint-disable */
// --- IMPORTS ---
import GeneticsService from './js/genetics-service.js';
import PunnettHelper from './js/punnett-helper.js';
import GenotypeHelper from './js/genotype-helper.js';
import PhenotypeHelper from './js/phenotype-helper.js';
import { Sex, Breed, Age, Fertility, Trait, Element, Deformities, Hatchling } from './js/breeding.js';
import { CrescentHerb, MoonlitHerb } from './js/items.js';
import { BreedChartColor, BaseChartColor } from './js/chart_colors.js';
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from 'chart.js';

export default function breedingRoller() {
    return {
        // --- STATE & DATA ---
        data: {
            sex: Sex,
            breeds: Breed,
            age: Hatchling,
            fertility: Fertility,
            traits: Trait,
            elements: Element,
            deformities: Deformities,
            items: {
                gender: CrescentHerb,
                stacking: MoonlitHerb
            }
        },
        p_a: {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            rank: Age.YOUNG_ADULT,
            fertility: Fertility.GOOD,
            trait: null, // Changed from 'ability'
            element: null,
            deformities: null
        },
        p_b: {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            rank: Age.YOUNG_ADULT,
            fertility: Fertility.GOOD,
            trait: null, // Changed from 'ability'
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
            traits: {}, // Changed from 'abilities'
            elements: {},
        },
        charts: {
            breeds: null,
            bases: null,
        },

        // --- METHODS ---
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
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });

            // Base Chart
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
                    plugins: {
                        legend: { position: 'top' }
                    }
                }
            });
        },
        getPhenotype(genotype) {
            const genes = GenotypeHelper.sliceGenotype(genotype);
            let phenotypes = PhenotypeHelper.getPhenotypes(genes, GeneticsService.phenotypes);
            phenotypes = PhenotypeHelper.filterHiddenPhenotypes(phenotypes, GeneticsService.phenotypes);
            let carries = PhenotypeHelper.getCarried(genes, GeneticsService.phenotypes);
            carries = PhenotypeHelper.filterHiddenPhenotypes(carries, GeneticsService.phenotypes);
            const phenotypeStr = PhenotypeHelper.getPhenotypeString(phenotypes, carries, GeneticsService.phenotypes);
            return phenotypeStr;
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

            // Parent A
            const p__a = {};
            p__a.genes = GenotypeHelper.sliceGenotype(this.p_a.genotype);
            p__a.base_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceBaseGenes(p__a.genes), GeneticsService.loci, true);
            p__a.marking_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceMarkingGenes(p__a.genes), GeneticsService.loci);

            // Parent B
            const p__b = {};
            p__b.genes = GenotypeHelper.sliceGenotype(this.p_b.genotype);
            p__b.base_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceBaseGenes(p__b.genes), GeneticsService.loci, true);
            p__b.marking_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceMarkingGenes(p__b.genes), GeneticsService.loci);

            this.stats.clutch = PunnettHelper.getPossibleClutchSize(this.p_a, this.p_b, this.items.minor_fert, this.items.major_fert);
            this.stats.sex = PunnettHelper.getSexOdds(this.items.gender_pot);
            this.stats.breeds = PunnettHelper.getBreedOdds(this.p_a.species, this.p_b.species);
            // Changed from 'abilities' and 'getAbilityOdds'
            this.stats.traits = PunnettHelper.getTraitOdds(this.p_a.trait, this.p_b.trait); 
            this.stats.elements = PunnettHelper.getElementOdds(this.p_a.element, this.p_b.element);

            const base_odds = PunnettHelper.getPunnettOdds(p__a.base_alleles, p__b.base_alleles);
            this.stats.bases = PunnettHelper.getBaseOdds(base_odds, GeneticsService.phenotypes);

            const marking_odds = PunnettHelper.getPunnettOdds(p__a.marking_alleles, p__b.marking_alleles);
            this.stats.markings = PunnettHelper.getPhenotypeOdds(marking_odds, GeneticsService.phenotypes);

            this.initChart();
        },
        reset() {
            this.p_a = {
                species: Breed.THIL,
                genotype: 'B+/B+ M+/M+ K+/K+',
                phenotype: 'Tan',
                rank: Age.YOUNG_ADULT,
                fertility: Fertility.GOOD,
                trait: null, // Changed from 'ability'
                element: null,
                deformities: null
            };
            this.p_b = {
                species: Breed.THIL,
                genotype: 'B+/B+ M+/M+ K+/K+',
                phenotype: 'Tan',
                rank: Age.YOUNG_ADULT,
                fertility: Fertility.GOOD,
                trait: null, // Changed from 'ability'
                element: null,
                deformities: null
            };
            this.items = {
                cresc_herb: null,
                moon_herb: 0,
                minor_fert: 0,
                major_fert: 0,
                unstable_elixir: 0,
                gender_pot: null
            };
            this.coi = 0;
        }
    }
}
