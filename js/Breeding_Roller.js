// --- Enums & Data ---
const Sex = { MALE: 'Male', FEMALE: 'Female' };
const Breed = { THIL: 'Thilyarem', DEST: 'Destrier', CYROA: 'Cyroas' };
const Age = { HATCHLING: 'Hatchling', JUVENILE: 'Juvenile', ADOLESCENT: 'Adolescent', YOUNG_ADULT: 'Young Adult', ADULT: 'Adult', ELDER: 'Elder', ANCIENT: 'Ancient', CELESTIAL: 'Celestial' };
const Element = { FIRE: 'Fire', WATER: 'Water', AIR: 'Air', EARTH: 'Earth', METAL: 'Metal', WOOD: 'Wood', ICE: 'Ice', LIGHTNING: 'Lightning', LIGHT: 'Light', SHADOW: 'Shadow', AETHER: 'Aether', VERDANT: 'Verdant' };
const Defects = {
    Common: ["Sterility (Rarely)", "Low Fertility", "Deafness", "Blindness", "Anosmia"],
    Uncommon: ["Malformation: Slight", "Malformation: Medium", "Malformation: Severe"],
    Rare: ["Lameness", "Hip Dysplasia", "Heart Disease", "Spinal Defect", "Epilepsy"]
};

const AgePerks = {
    [Age.HATCHLING]: { breedable: false },
    [Age.JUVENILE]: { breedable: false },
    [Age.ADOLESCENT]: { breedable: true, clutch_min: 0, clutch_max: 2, trait_pass_bonus: 0, mutation_bonus: 0, rare_marking_bonus: 0 },
    [Age.YOUNG_ADULT]: { breedable: true, clutch_min: 1, clutch_max: 3, trait_pass_bonus: 0, mutation_bonus: 0, rare_marking_bonus: 0 },
    [Age.ADULT]: { breedable: true, clutch_min: 1, clutch_max: 5, trait_pass_bonus: 0, mutation_bonus: 0, rare_marking_bonus: 0 },
    [Age.ELDER]: { breedable: true, clutch_min: 2, clutch_max: 4, trait_pass_bonus: 5, mutation_bonus: 10, rare_marking_bonus: 0 },
    [Age.ANCIENT]: { breedable: true, clutch_min: 2, clutch_max: 3, trait_pass_bonus: 10, mutation_bonus: 15, rare_marking_bonus: 5 },
    [Age.CELESTIAL]: { breedable: true, clutch_min: 2, clutch_max: 2, trait_pass_bonus: 15, mutation_bonus: 20, rare_marking_bonus: 10 }
};

const BreedMix = {
    [`${Breed.THIL}_${Breed.THIL}`]: { [Breed.THIL]: 100 }, [`${Breed.THIL}_${Breed.DEST}`]: { [Breed.THIL]: 95, [Breed.DEST]: 5 },
    [`${Breed.DEST}_${Breed.THIL}`]: { [Breed.THIL]: 85, [Breed.DEST]: 15 }, [`${Breed.DEST}_${Breed.DEST}`]: { [Breed.THIL]: 65, [Breed.DEST]: 35 },
    [`${Breed.CYROA}_${Breed.CYROA}`]: { [Breed.CYROA]: 100 }, [`${Breed.THIL}_${Breed.CYROA}`]: { [Breed.THIL]: 50, [Breed.CYROA]: 50 },
    [`${Breed.CYROA}_${Breed.THIL}`]: { [Breed.CYROA]: 50, [Breed.THIL]: 50 }, [`${Breed.CYROA}_${Breed.DEST}`]: { [Breed.CYROA]: 95, [Breed.DEST]: 5 }
};

// --- gene_maps.js ---
const GeneType = { BASE: 0, MARKING: 1, MUTATION: 2, MANE: 3, TRAIT: 4 };
const GeneMap = {
    TAN: { TEXT: 'Tan', TYPE: GeneType.BASE, EXPRESSED_SETS: [['B+']] },
    CREAM: { TEXT: 'Cream', TYPE: GeneType.BASE, EXPRESSED_SETS: [['B+','M0/M0']] },
    BROWN: { TEXT: 'Brown', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BA']] },
    LILAC: { TEXT: 'Lilac', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BA','M0/M0']] },
    GREEN: { TEXT: 'Green', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BG']] },
    SEAGREEN: { TEXT: 'Seagreen', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BG','MB']] },
    TEAGREEN: { TEXT: 'Teagreen', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BG','M0/M0']] },
    SLATE: { TEXT: 'Slate', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BW/BW']] },
    BLUE: { TEXT: 'Blue', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BW/BW','MB']] },
    WHITE: { TEXT: 'White', TYPE: GeneType.BASE, EXPRESSED_SETS: [['BW/BW','M0/M0']] },
    BLACK: { TEXT: 'Black', TYPE: GeneType.BASE, EXPRESSED_SETS: [['KB/KB']] },
    VERMILLION: { TEXT: 'Vermillion', TYPE: GeneType.BASE, EXPRESSED_SETS: [['VmVm']], CARRIED_SETS: [['Vm']] },
    JADE: { TEXT: 'Jade', TYPE: GeneType.BASE, EXPRESSED_SETS: [['JaJa']], CARRIED_SETS: [['Ja']] },
    VIOLET: { TEXT: 'Violet', TYPE: GeneType.BASE, EXPRESSED_SETS: [['VlVl']], CARRIED_SETS: [['Vl']] },
    AMBER: { TEXT: 'Amber', TYPE: GeneType.BASE, EXPRESSED_SETS: [['AmAm']], CARRIED_SETS: [['Am']] },
    NATURAL: { TEXT: 'Natural', TYPE: GeneType.MANE, RARITY: 'common', EXPRESSED_SETS: [['Natural']] },
    CURLY: { TEXT: 'Curly', TYPE: GeneType.MANE, RARITY: 'uncommon', EXPRESSED_SETS: [['Curly']] },
    SPHINX: { TEXT: 'Sphinx', TYPE: GeneType.MANE, RARITY: 'uncommon', EXPRESSED_SETS: [['Sphinx']] },
    LONG: { TEXT: 'Long', TYPE: GeneType.MANE, RARITY: 'rare', EXPRESSED_SETS: [['Long']] },
    FIERY: { TEXT: 'Fiery', TYPE: GeneType.MANE, RARITY: 'rare', EXPRESSED_SETS: [['Fiery']] },
    HORNED: { TEXT: 'Horned', TYPE: GeneType.TRAIT, RARITY: 'uncommon', EXPRESSED_SETS: [['HrHr'], ['Hr']] },
    FANGED: { TEXT: 'Fanged', TYPE: GeneType.TRAIT, RARITY: 'uncommon', EXPRESSED_SETS: [['FgFg'], ['Fg']] },
    SABRETEETH: { TEXT: 'Sabreteeth', TYPE: GeneType.TRAIT, RARITY: 'rare', EXPRESSED_SETS: [['StSt'], ['St']] },
};

// --- loci.js ---
const loci = [
    { locus: 'B', category: 'base', null_allele: 'n', genes: [
        { allele: 'B+', homozygous_genotype: 'B+/B+', heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW'] },
        { allele: 'BA', homozygous_genotype: 'BA/BA', heterozygous_genotypes: ['BA/BG', 'BA/BW'] },
        { allele: 'BG', homozygous_genotype: 'BG/BG', heterozygous_genotypes: ['BG/BW'] },
        { allele: 'BW', homozygous_genotype: 'BW/BW', heterozygous_genotypes: [] },
    ]},
    { locus: 'M', category: 'base', null_allele: 'n', genes: [
        { allele: 'M+', homozygous_genotype: 'M+/M+', heterozygous_genotypes: ['M+/MB', 'M+/M0'] },
        { allele: 'MB', homozygous_genotype: 'MB/MB', heterozygous_genotypes: ['MB/M0'] },
        { allele: 'M0', homozygous_genotype: 'M0/M0', heterozygous_genotypes: [] },
    ]},
    { locus: 'K', category: 'base', null_allele: 'n', genes: [
        { allele: 'K+', homozygous_genotype: 'K+/K+', heterozygous_genotypes: ['K+/KB'] },
        { allele: 'KB', homozygous_genotype: 'KB/KB', heterozygous_genotypes: [] },
    ]},
    { locus: 'Vm', category: 'modifier', null_allele: 'n', genes: [{ allele: 'Vm', homozygous_genotype: 'VmVm', heterozygous_genotypes: ['Vm'] }] },
    { locus: 'Ja', category: 'modifier', null_allele: 'n', genes: [{ allele: 'Ja', homozygous_genotype: 'JaJa', heterozygous_genotypes: ['Ja'] }] },
    { locus: 'Vl', category: 'modifier', null_allele: 'n', genes: [{ allele: 'Vl', homozygous_genotype: 'VlVl', heterozygous_genotypes: ['Vl'] }] },
    { locus: 'Am', category: 'modifier', null_allele: 'n', genes: [{ allele: 'Am', homozygous_genotype: 'AmAm', heterozygous_genotypes: ['Am'] }] },
    { locus: 'Hr', category: 'trait', null_allele: 'n', genes: [{ allele: 'Hr', homozygous_genotype: 'HrHr', heterozygous_genotypes: ['Hr'] }] },
    { locus: 'Fg', category: 'trait', null_allele: 'n', genes: [{ allele: 'Fg', homozygous_genotype: 'FgFg', heterozygous_genotypes: ['Fg'] }] },
    { locus: 'St', category: 'trait', null_allele: 'n', genes: [{ allele: 'St', homozygous_genotype: 'StSt', heterozygous_genotypes: ['St'] }] },
];

// --- Helper Classes ---
class GenotypeHelper {
    static sliceGenotype(genotype) { return genotype ? genotype.split(' ').filter(g => g) : []; }
    
    static getAlleles(genes, loci_data) {
        let alleles = {};
        for (const locus of loci_data) {
            const geneOnLocus = genes.find(g => locus.genes.some(lg => g.includes(lg.allele)));
            if (geneOnLocus) {
                if (geneOnLocus.includes('/')) {
                    alleles[locus.locus] = geneOnLocus.split('/');
                } else {
                    const matchingGene = locus.genes.find(lg => lg.allele === geneOnLocus);
                    if (matchingGene) {
                         alleles[locus.locus] = [matchingGene.allele, locus.null_allele];
                    }
                }
            } else {
                alleles[locus.locus] = [locus.null_allele, locus.null_allele];
            }
        }
        return alleles;
    }
}

class PhenotypeHelper {
    static getPhenotype(genes, phenotypeData, mane) {
        let expressed = [];
        let carried = [];

        for (const pheno of phenotypeData) {
            if (pheno.EXPRESSED_SETS && pheno.EXPRESSED_SETS.some(set => set.every(gene => genes.some(g => g.includes(gene))))) {
                 expressed.push(pheno.TEXT);
            }
        }

        for (const pheno of phenotypeData) {
            if (pheno.CARRIED_SETS && !expressed.includes(pheno.TEXT) && pheno.CARRIED_SETS.some(set => set.every(gene => genes.some(g => g.includes(gene))))) {
                carried.push(`Carries ${pheno.TEXT}`);
            }
        }
        
        let phenoString = expressed.filter(p => GeneMap[p.toUpperCase()] && GeneMap[p.toUpperCase()].TYPE === GeneType.BASE).join(' ');
        phenoString += ` with ${mane} Mane`;
        
        const markings = expressed.filter(p => GeneMap[p.toUpperCase()] && GeneMap[p.toUpperCase()].TYPE === GeneType.MARKING);
        if (markings.length > 0) phenoString += `, ${markings.join(', ')}`;
        
        const mutations = expressed.filter(p => GeneMap[p.toUpperCase()] && GeneMap[p.toUpperCase()].TYPE === GeneType.MUTATION);
        if (mutations.length > 0) phenoString += ` [${mutations.join(', ')}]`;

        if (carried.length > 0) phenoString += ` {${carried.join(', ')}}`;

        return phenoString;
    }

    static getPhenotypeOdds(odds, data){ return {'Tan': 75, 'Brown': 25}; }
}

class PunnettHelper {
    static getPossibleClutchSize(p_a, p_b, items) {
        const perkA = AgePerks[p_a.age];
        const perkB = AgePerks[p_b.age];

        let min = Math.min(perkA.clutch_min, perkB.clutch_min);
        let max = Math.max(perkA.clutch_max, perkB.clutch_max);
        
        let bonus = (items.crescent_herb ? 2 : 0) + (items.moonlit_herb ? 2 : 0);
        max += bonus;

        if (min === max) return `${min} ${min === 1 ? 'egg' : 'eggs'}`;
        return `${min} - ${max} eggs`;
    }
    static getSexOdds() { return { 'Male': 50, 'Female': 50 }; }
    static getBreedOdds(a, b) { return BreedMix[`${a}_${b}`] || BreedMix[`${b}_${a}`] || (a === b ? { [a]: 100 } : { [a]: 50, [b]: 50 }); }
    
    static getPunnettOdds(allelesA, allelesB) {
        let odds = {};
        for (const locus of loci) {
            const locusKey = locus.locus;
            const a1 = allelesA[locusKey] ? allelesA[locusKey][0] : locus.null_allele;
            const a2 = allelesA[locusKey] ? allelesA[locusKey][1] : locus.null_allele;
            const b1 = allelesB[locusKey] ? allelesB[locusKey][0] : locus.null_allele;
            const b2 = allelesB[locusKey] ? allelesB[locusKey][1] : locus.null_allele;

            const outcomes = [
                [a1, b1].sort().join('/'),
                [a1, b2].sort().join('/'),
                [a2, b1].sort().join('/'),
                [a2, b2].sort().join('/')
            ];
            
            let locusOdds = {};
            for (const outcome of outcomes) {
                locusOdds[outcome] = (locusOdds[outcome] || 0) + 25;
            }
            odds[locusKey] = Object.entries(locusOdds);
        }
        return odds;
    }
}

class GeneticsService {
    static load() { this.loci = loci; this.phenotypes = Object.values(GeneMap); }
}
GeneticsService.loci = []; GeneticsService.phenotypes = [];

// --- LOGIC FUNCTIONS ---
function getManeOdds(maneA, maneB, speciesA, speciesB, celestialPerk) {
    const manes = [maneA, maneB].sort().join(' x ');
    let odds = {};

    switch (manes) {
        case 'Natural x Natural': odds = { Natural: 95, Sphinx: 5 }; break;
        case 'Curly x Natural': odds = { Natural: 70, Curly: 25, Sphinx: 5 }; break;
        case 'Curly x Curly': odds = { Curly: 60, Natural: 35, Sphinx: 5 }; break;
        case 'Long x Natural': odds = { Natural: 80, Curly: 15, Long: 5 }; break;
        case 'Curly x Long': odds = { Curly: 50, Natural: 30, Long: 15, Sphinx: 5 }; break;
        case 'Long x Long': odds = { Long: 50, Curly: 30, Natural: 20 }; break;
        case 'Fiery x Natural': odds = { Natural: 70, Curly: 15, Long: 10, Fiery: 5 }; break;
        case 'Curly x Fiery': odds = { Curly: 40, Natural: 30, Long: 15, Fiery: 10, Sphinx: 5 }; break;
        case 'Fiery x Long': odds = { Long: 40, Curly: 25, Natural: 20, Fiery: 15 }; break;
        case 'Fiery x Fiery': odds = { Long: 40, Fiery: 30, Curly: 20, Natural: 10 }; break;
        default: odds = { Natural: 100 };
    }

    if ((speciesA === Breed.DEST && speciesB === Breed.THIL) || (speciesA === Breed.THIL && speciesB === Breed.DEST)) {
        if (odds.Long) odds.Long += 10; else odds.Long = 10;
        if (odds.Fiery) odds.Fiery += 5; else odds.Fiery = 5;
    }
    
    if (celestialPerk === 'Divine Blessing') {
        if (odds.Long) odds.Long += 5;
        if (odds.Fiery) odds.Fiery += 5;
    }
    
    const total = Object.values(odds).reduce((a, b) => a + b, 0);
    for (const key in odds) {
        odds[key] = (odds[key] / total) * 100;
    }
    return odds;
}
function getTraitOdds(items, parentA, parentB) {
    let odds = { Horned: 5, Fanged: 5 };
    
    const ageBonusTrait = Math.max(AgePerks[parentA.age].trait_pass_bonus, AgePerks[parentB.age].trait_pass_bonus);
    const ageBonusMutation = Math.max(AgePerks[parentA.age].mutation_bonus, AgePerks[parentB.age].mutation_bonus);
    
    odds.Horned += ageBonusTrait;
    odds.Fanged += ageBonusTrait;

    if (items.moonlit_herb) {
        odds.Horned += 15;
        odds.Fanged += 15;
    }
    if ((parentA.species === Breed.DEST && parentB.species === Breed.THIL) || (parentA.species === Breed.THIL && parentB.species === Breed.DEST)) {
        odds.Horned += 10;
    }
    if ((parentA.species === Breed.CYROA && parentB.species === Breed.THIL) || (parentA.species === Breed.THIL && parentB.species === Breed.CYROA)) {
        odds.Fanged += 15;
        odds.Sabreteeth = 2;
    }
    return odds;
}
function calculateInfertility(parentA, parentB, coi) {
    let infertility = 0;
    if (coi > 5) infertility += Math.min(coi, 50);

    const getRarityScore = (geneText) => {
        const geneData = Object.values(GeneMap).find(g => g.TEXT === geneText);
        if (!geneData || !geneData.RARITY) return 0;
        if (geneData.RARITY === 'uncommon') return 1;
        if (geneData.RARITY === 'rare') return 3;
        return 0;
    };
    infertility += getRarityScore(parentA.mane);
    infertility += getRarityScore(parentB.mane);

    return Math.min(infertility, 100);
}
function getElementOdds(elementA, elementB) {
    let odds = {};
    const allElements = Object.values(Element);

    if (elementA === elementB) {
        odds[elementA] = 80;
        const remainingElements = allElements.filter(el => el !== elementA);
        const otherChance = 20 / remainingElements.length;
        remainingElements.forEach(el => odds[el] = otherChance);
    } else {
        odds[elementA] = 45;
        odds[elementB] = 45;
        const remainingElements = allElements.filter(el => el !== elementA && el !== elementB);
        const otherChance = 10 / remainingElements.length;
        remainingElements.forEach(el => odds[el] = otherChance);
    }

    const total = Object.values(odds).reduce((a, b) => a + b, 0);
    for (const key in odds) {
        odds[key] = (odds[key] / total) * 100;
    }
    return odds;
}

// --- Main Calculation & Rolling Logic ---
function calculatePossibilities(p_a, p_b, items, coi) {
    if (!AgePerks[p_a.age].breedable || !AgePerks[p_b.age].breedable) {
        throw new Error("One or both parents are too young to breed.");
    }
    const pA_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceGenotype(p_a.genotype), GeneticsService.loci);
    const pB_alleles = GenotypeHelper.getAlleles(GenotypeHelper.sliceGenotype(p_b.genotype), GeneticsService.loci);

    return {
        infertility: calculateInfertility(p_a, p_b, coi),
        clutch: PunnettHelper.getPossibleClutchSize(p_a, p_b, items),
        breeds: PunnettHelper.getBreedOdds(p_a.species, p_b.species),
        sex: PunnettHelper.getSexOdds(),
        manes: getManeOdds(p_a.mane, p_b.mane, p_a.species, p_b.species, items.celestial_perk),
        traits: getTraitOdds(items, p_a, p_b),
        elements: getElementOdds(p_a.element, p_b.element),
        genotypeOdds: PunnettHelper.getPunnettOdds(pA_alleles, pB_alleles),
    };
}

function rollOffspring(possibilities, parentA, parentB, items, coi) {
    if (parentA.age === Age.ADOLESCENT || parentB.age === Age.ADOLESCENT) {
        if (Math.random() < 0.2) {
            return `<h4>Breeding Failed!</h4><p>The offspring were stillborn due to the parents' young age.</p>`;
        }
    }
    
    const clutchParts = (possibilities.clutch || "1").replace(/ eggs?/, "").split(' - ');
    const min = parseInt(clutchParts[0], 10);
    const max = parseInt(clutchParts[1] || clutchParts[0], 10);
    let clutchSize = Math.floor(Math.random() * (max - min + 1)) + min;

    const infertility = possibilities.infertility || 0;
    if (Math.random() * 100 < infertility) {
        clutchSize = Math.floor(clutchSize / 2);
    }
    if (clutchSize < 1 && infertility < 100) clutchSize = 1;
    if (infertility >= 100) clutchSize = 0;

    if (clutchSize === 0) return `<h4>Breeding Failed! (Infertility: ${infertility.toFixed(2)}%)</h4><p>No offspring were produced.</p>`;

    let results = `<h4>Rolled a clutch of ${clutchSize}! (Infertility: ${infertility.toFixed(2)}%)</h4>`;
    
    const rollFromOdds = (odds) => {
        const rand = Math.random() * 100;
        let cumulative = 0;
        for (const [key, value] of Object.entries(odds)) {
            cumulative += value;
            if (rand < cumulative) return key;
        }
        return Object.keys(odds)[0];
    };

    for (let i = 1; i <= clutchSize; i++) {
        const rolledBreed = rollFromOdds(possibilities.breeds);
        const rolledSex = rollFromOdds(possibilities.sex);
        const rolledMane = rollFromOdds(possibilities.manes);
        const rolledElement = rollFromOdds(possibilities.elements);

        let offspringGenotype = [];
        for (const locus in possibilities.genotypeOdds) {
            const rolledAllelePair = rollFromOdds(Object.fromEntries(possibilities.genotypeOdds[locus]));
            if(rolledAllelePair !== 'n/n') {
                offspringGenotype.push(rolledAllelePair.replace('/n', ''));
            }
        }
        const genotypeString = offspringGenotype.join(' ');
        
        let rolledTraits = [];
        for (const [trait, chance] of Object.entries(possibilities.traits)) {
            if ((Math.random() * 100) < chance) {
                rolledTraits.push(trait);
            }
        }
        const finalTraits = rolledTraits.length > 0 ? rolledTraits.join(', ') : 'None';

        let defect = 'None';
        if (coi > 10 && (Math.random() * 100) < (coi)) {
            const defectRoll = Math.random() * 100;
            if (defectRoll < 5 + (coi / 2)) {
                defect = Defects.Rare[Math.floor(Math.random() * Defects.Rare.length)];
            } else if (defectRoll < 20 + (coi / 3)) {
                defect = Defects.Uncommon[Math.floor(Math.random() * Defects.Uncommon.length)];
            } else {
                defect = Defects.Common[Math.floor(Math.random() * Defects.Common.length)];
            }
        }
        
        const phenotypeString = PhenotypeHelper.getPhenotype(GenotypeHelper.sliceGenotype(genotypeString), GeneticsService.phenotypes, rolledMane);

        results += `
            <div class="mb-3 p-3 border rounded bg-light">
                <p class="mb-1"><strong>${i}) Species:</strong> ${rolledBreed}</p>
                <p class="mb-1"><strong>Mane Type:</strong> ${rolledMane}</p>
                <p class="mb-1"><strong>Sex:</strong> ${rolledSex}</p>
                <p class="mb-1"><strong>Age:</strong> Hatchling</p>
                <p class="mb-1"><strong>Inborn Element:</strong> ${rolledElement}</p>
                <p class="mb-1"><strong>Genotype:</strong> ${genotypeString}</p>
                <p class="mb-1"><strong>Phenotype:</strong> ${phenotypeString}</p>
                <p class="mb-1"><strong>Traits:</strong> ${finalTraits}</p>
                <p class="mb-1"><strong>Defects:</strong> ${defect}</p>
            </div>`;
    }
    return results;
}
