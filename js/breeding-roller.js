import { GeneticsService } from "./services/genetics-service";
import { PunnettHelper } from "./helpers/punnett-helper";

import { Sex, Breed, Rank, Fertility, Ability, Element, Aberration } from './constants/breeding';
import { CrescentHerb, MoonlitHerb } from "./constants/items";
import { GenotypeHelper } from "./helpers/genotype-helper";
import { PhenotypeHelper } from "./helpers/phenotype-helper";
import { ArcElement, Chart, Legend, PieController, Title, Tooltip } from "chart.js";
import { BaseChartColor, BreedChartColor } from "./constants/chart_colors";

export default function breedingRoller() {
    return {
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
            trait: null,
            element: null,
            deformities: null
        },
        p_b: {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            rank: Age.YOUNG_ADULT,
            fertility: Fertility.GOOD,
            ability: null,
            element: null,
            deformities: null
        },
        items: {
            cresc_herb: null,
            moon_herb: 0

        },
        coi: 0,
        stats: {
            clutch: '0 eggs',
            sex: {},
            breeds: {},
            bases: {},
            markings: {},
            abilities: {},
            elements: {},
        },
        charts: {
            breeds: null,
            bases: null,
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
            const propsToWatch = ['p_a','p_b','items','coi'];
            propsToWatch.forEach(prop => {
                this.$watch(prop, () => this.calculatePossibilities());
            });
        },
        initChart() {
            if (this.charts.breeds) {
                this.charts.breeds.destroy();
            }
            this.charts.breeds = new Chart (this.$refs.breedChart, {
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
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
            console.log(this.stats.bases);
            if (this.charts.bases) {
                this.charts.bases.destroy();
            }
            this.charts.bases = new Chart (this.$refs.baseChart, {
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
                        legend: {
                            position: 'top'
                        }
                    }
                }
            });
        },
        getPhenotype(genotype) {
            // Parse genes
            const genes = GenotypeHelper.sliceGenotype(genotype);

            // Phenotypes
            let phenotypes = PhenotypeHelper.getPhenotypes(genes, GeneticsService.phenotypes);
            phenotypes = PhenotypeHelper.filterHiddenPhenotypes(phenotypes, GeneticsService.phenotypes);

            // Carried phenotypes
            let carries = PhenotypeHelper.getCarried(genes, GeneticsService.phenotypes);
            carries = PhenotypeHelper.filterHiddenPhenotypes(carries, GeneticsService.phenotypes);

            // Get phenotype string
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

            const p__a = {
                genes: [],
                base_alleles: {},
                marking_alleles: {},
            };
            p__a.genes = GenotypeHelper.sliceGenotype(this.p_a.genotype);
            p__a.base_alleles = GenotypeHelper.getAlleles(
                GenotypeHelper.sliceBaseGenes(p__a.genes),
                GeneticsService.loci,
                true
            );
            p__a.marking_alleles = GenotypeHelper.getAlleles(
                GenotypeHelper.sliceMarkingGenes(p__a.genes),
                GeneticsService.loci
            );

            const p__b = {
                genes: [],
                base_alleles: {},
                marking_alleles: {},
            };
            p__b.genes = GenotypeHelper.sliceGenotype(this.p_b.genotype);
            p__b.base_alleles = GenotypeHelper.getAlleles(
                GenotypeHelper.sliceBaseGenes(p__b.genes),
                GeneticsService.loci,
                true
            );
            p__b.marking_alleles = GenotypeHelper.getAlleles(
                GenotypeHelper.sliceMarkingGenes(p__b.genes),
                GeneticsService.loci
            );

            this.stats.clutch = PunnettHelper.getPossibleClutchSize(this.p_a, this.p_b, this.items.minor_fert, this.items.major_fert);
            this.stats.sex = PunnettHelper.getSexOdds(this.items.gender_pot);
            this.stats.breeds = PunnettHelper.getBreedOdds(this.p_a.species, this.p_b.species);
            this.stats.abilities = PunnettHelper.getAbilityOdds(this.p_a.ability, this.p_b.ability);
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
            ability: null,
            element: null,
            deformities: null
            };
            this.p_b = {
            species: Breed.THIL,
            genotype: 'B+/B+ M+/M+ K+/K+',
            phenotype: 'Tan',
            rank: Age.YOUNG_ADULT,
            fertility: Fertility.GOOD,
            ability: null,
            element: null,
            deformities: null
            };
            this.items = {
            cresc_herb: null,
            moon_herb: 0
              
            };
            this.coi = 0;
        }
    }
}
