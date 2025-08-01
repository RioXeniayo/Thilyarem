/* eslint-disable */
// --- IMPORTS ---
// CORRECTED: Imports now match the consistent helper files we've built.
import { GeneticsService } from './genetics-service.js';
import { PunnettHelper } from './punnett-helper.js';
import { GenotypeHelper } from './genotype-helper.js';
import { PhenotypeHelper } from './phenotype-helper.js';
import { Sex, Breed, Age, Fertility, Trait, Element, Deformities } from './breeding.js';
import { CrescentHerb, MoonlitHerb } from './items.js';
import { BaseChartColor, BreedChartColor } from './chart_colors.js';
import { Chart, ArcElement, Tooltip, Legend, Title, PieController } from 'chart.js';

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
        p_a: {}, // Initialized in reset()
        p_b: {}, // Initialized in reset()
        items: {}, // Initialized in reset()
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
            this.reset();
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

            // Watch for changes and automatically recalculate
            const propsToWatch = ['p_a', 'p_b', 'items', 'coi'];
            propsToWatch.forEach(prop => {
                this.$watch(prop, () => this.calculatePossibilities());
            });
        },
        initChart() {
            // Breed Chart
            if (this.charts.breeds) this.charts.breeds.destroy();
            this.charts.breeds = new Chart(this.$refs.breedChart, {
                type: 'pie',
                data: {
                    labels: Object.keys(this.stats.breeds),
                    datasets: [{
                        data: Object.values(this.stats.breeds),
                        backgroundColor: Object.keys(this.stats.breeds).map(x => BreedChartColor[x]),
                    }]
                },
                options: { responsive: true, plugins: { legend: { position: 'top' } } }
            });

            // Base Chart
            if (this.charts.bases) this.charts.bases.destroy();
            this.charts.bases = new Chart(this.$refs.baseChart, {
                type: 'pie',
                data: {
                    labels: Object.keys(this.stats.bases),
                    datasets: [{
                        data: Object.values(this.stats.bases),
                        backgroundColor: Object.keys(this.stats.bases).map(x => BaseChartColor[x]),
                    }]
                },
                options: { responsive: true, plugins: { legend: { position: 'top' } } }
            });
        },
        getPhenotype(genotype) {
            const genes = GenotypeHelper.sliceGenotype(genotype);
            // Use the full phenotype data loaded by the service
            const phenotypeData = Object.values(GeneticsService.phenotypes);
            
            let phenotypes = PhenotypeHelper.getPhenotypes(genes, phenotypeData);
            phenotypes = PhenotypeHelper.filterHiddenPhenotypes(phenotypes, phenotypeData);
            let carries = PhenotypeHelper.getCarried(genes, phenotypeData);
            carries = PhenotypeHelper.filterHiddenPhenotypes(carries, phenotypeData);

            return PhenotypeHelper.getPhenotypeString(phenotypes, carries, phenotypeData);
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
            if (!GeneticsService.loci || GeneticsService.loci.length === 0) {
                console.log('Genetics data not loaded yet.');
                return;
            }
            
            console.log('Calculating possibilities...');
            
            // CORRECTED: Logic now follows the improved, unified system.
            const parentAGenes = GenotypeHelper.sliceGenotype(this.p_a.genotype);
            const parentA_alleles = GenotypeHelper.getAlleles(parentAGenes, GeneticsService.loci);

            const parentBGenes = GenotypeHelper.sliceGenotype(this.p_b.genotype);
            const parentB_alleles = GenotypeHelper.getAlleles(parentBGenes, GeneticsService.loci);

            // Calculate odds for non-genetic traits
            this.stats.clutch = PunnettHelper.getPossibleClutchSize(this.p_a, this.p_b, this.items.minor_fert, this.items.major_fert);
            this.stats.sex = PunnettHelper.getSexOdds();
            this.stats.breeds = PunnettHelper.getBreedOdds(this.p_a.species, this.p_b.species);
            this.stats.traits = PunnettHelper.getTraitOdds(this.p_a.trait, this.p_b.trait);
            this.stats.elements = PunnettHelper.getElementOdds(this.p_a.element, this.p_b.element);
            
            // 1. Get raw genotype odds from the PunnettHelper
            const genotype_odds = PunnettHelper.getPunnettOdds(parentA_alleles, parentB_alleles);

            // 2. Use the PhenotypeHelper to get phenotype odds from the genotype odds
            const allPhenotypes = Object.values(GeneticsService.phenotypes);
            this.stats.bases = PhenotypeHelper.getPhenotypeOdds(
                genotype_odds,
                allPhenotypes.filter(p => p.TYPE === 0) // 0 = GeneType.BASE
            );
            this.stats.markings = PhenotypeHelper.getPhenotypeOdds(
                genotype_odds,
                allPhenotypes.filter(p => p.TYPE === 1) // 1 = GeneType.MARKING
            );
            
            this.initChart();
        },
        reset() {
            this.p_a = {
                species: Breed.THIL, genotype: 'B+/B+ M+/M+ K+/K+', phenotype: 'Tan',
                age: Age.YOUNG_ADULT, fertility: Fertility.GOOD,
                trait: null, element: null, deformities: null
            };
            this.p_b = {
                species: Breed.THIL, genotype: 'B+/B+ M+/M+ K+/K+', phenotype: 'Tan',
                age: Age.YOUNG_ADULT, fertility: Fertility.GOOD,
                trait: null, element: null, deformities: null
            };
            this.items = {
                cresc_herb: null, moon_herb: 0, minor_fert: 0,
                major_fert: 0, unstable_elixir: 0, gender_pot: null
            };
            this.coi = 0;
            if (this.charts.breeds) this.charts.breeds.destroy();
            if (this.charts.bases) this.charts.bases.destroy();
        }
    }
}
