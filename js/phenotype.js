export const phenotypes = [
    // -- BASE COAT PHENOTYPES --
    {
        name: 'Tan', category: 'base', rarity: 'common', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have B+
            { gene: { heterozygous_genotypes: ['M+/MB', 'M+/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have M+
            { gene: { homozygous_genotype: 'KB/KB' }, allow_homozygous: false, allow_heterozygous: true, allow_absent: true }, // Must NOT be KB/KB
        ]
    },
    {
        name: 'Brown', category: 'base', rarity: 'common', hidden_by: [],
        composites: [
            { gene: { homozygous_genotype: 'B+/B+' }, allow_homozygous: false, allow_heterozygous: false, allow_absent: true }, // Must NOT have B+
            { gene: { heterozygous_genotypes: ['BA/BG', 'BA/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have BA
            { gene: { heterozygous_genotypes: ['M+/MB', 'M+/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have M+
            { gene: { homozygous_genotype: 'KB/KB' }, allow_homozygous: false, allow_heterozygous: true, allow_absent: true }, // Must NOT be KB/KB
        ]
    },
    {
        name: 'Green', category: 'base', rarity: 'uncommon', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW'] }, allow_heterozygous: false, allow_absent: true }, // Must NOT have B+
            { gene: { heterozygous_genotypes: ['BA/BG', 'BA/BW'] }, allow_heterozygous: false, allow_absent: true }, // Must NOT have BA
            { gene: { heterozygous_genotypes: ['BG/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have BG
            { gene: { heterozygous_genotypes: ['M+/MB', 'M+/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have M+
            { gene: { homozygous_genotype: 'KB/KB' }, allow_homozygous: false, allow_heterozygous: true, allow_absent: true }, // Must NOT be KB/KB
        ]
    },
    {
        name: 'Slate', category: 'base', rarity: 'rare', hidden_by: [],
        composites: [
            { gene: { homozygous_genotype: 'BW/BW' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be BW/BW
            { gene: { heterozygous_genotypes: ['M+/MB', 'M+/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have M+
            { gene: { homozygous_genotype: 'KB/KB' }, allow_homozygous: false, allow_heterozygous: true, allow_absent: true }, // Must NOT be KB/KB
        ]
    },
    {
        name: 'Black', category: 'base', rarity: 'uncommon', hidden_by: [],
        composites: [
            { gene: { homozygous_genotype: 'KB/KB' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be KB/KB
            { gene: { heterozygous_genotypes: ['M+/MB', 'M+/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have M+
        ]
    },
    {
        name: 'Blue', category: 'base', rarity: 'rare', hidden_by: [],
        composites: [
            { gene: { homozygous_genotype: 'BW/BW' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be BW/BW
            { gene: { heterozygous_genotypes: ['MB/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have MB and not M+
            { gene: { homozygous_genotype: 'M+/M+' }, allow_homozygous: false, allow_heterozygous: false, allow_absent: true },
        ]
    },
    {
        name: 'Seagreen', category: 'base', rarity: 'uncommon', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['BG/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have BG
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW', 'BA/BG', 'BA/BW'] }, allow_heterozygous: false, allow_absent: true }, // and NOT B+ or BA
            { gene: { heterozygous_genotypes: ['MB/M0'] }, allow_heterozygous: true, allow_absent: false }, // Must have MB and not M+
            { gene: { homozygous_genotype: 'M+/M+' }, allow_homozygous: false, allow_heterozygous: false, allow_absent: true },
        ]
    },
    {
        name: 'Cream', category: 'base', rarity: 'common', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have B+
            { gene: { homozygous_genotype: 'M0/M0' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be M0/M0
        ]
    },
    {
        name: 'Lilac', category: 'base', rarity: 'common', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW'] }, allow_heterozygous: false, allow_absent: true }, // Must NOT have B+
            { gene: { heterozygous_genotypes: ['BA/BG', 'BA/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have BA
            { gene: { homozygous_genotype: 'M0/M0' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be M0/M0
        ]
    },
    {
        name: 'Teagreen', category: 'base', rarity: 'uncommon', hidden_by: [],
        composites: [
            { gene: { heterozygous_genotypes: ['B+/BA', 'B+/BG', 'B+/BW', 'BA/BG', 'BA/BW'] }, allow_heterozygous: false, allow_absent: true }, // Must NOT have B+ or BA
            { gene: { heterozygous_genotypes: ['BG/BW'] }, allow_heterozygous: true, allow_absent: false }, // Must have BG
            { gene: { homozygous_genotype: 'M0/M0' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be M0/M0
        ]
    },
    {
        name: 'White', category: 'base', rarity: 'rare', hidden_by: [],
        composites: [
            { gene: { homozygous_genotype: 'BW/BW' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be BW/BW
            { gene: { homozygous_genotype: 'M0/M0' }, allow_homozygous: true, allow_heterozygous: false, allow_absent: false }, // Must be M0/M0
        ]
    },

    // -- COMMON MARKING PHENOTYPES --
    {
        name: 'Bellytone', category: 'marking', rarity: 'common', hidden_by: [],
        composites: [{
            gene: { locus: { locus: 'Bt' }, homozygous_genotype: 'BtBt', heterozygous_genotypes: ['Bt'] },
            allow_homozygous: true, allow_heterozygous: true, allow_absent: false
        }]
    },
    // ... all other markings (Collar, Inked, etc.) would follow the same simple dominant structure.

    // -- DUAL PHENOTYPE EXAMPLE --
    {
        name: 'Dun', category: 'marking', rarity: 'uncommon', hidden_by: [{ name: 'Bengal' }],
        composites: [{
            gene: { locus: { locus: 'Bng' }, homozygous_genotype: 'BngBng', heterozygous_genotypes: ['Bng'] },
            allow_homozygous: false, allow_heterozygous: true, allow_absent: false
        }]
    },
    {
        name: 'Bengal', category: 'marking', rarity: 'uncommon', hidden_by: [],
        composites: [{
            gene: { locus: { locus: 'Bng' }, homozygous_genotype: 'BngBng', heterozygous_genotypes: ['Bng'] },
            allow_homozygous: true, allow_heterozygous: false, allow_absent: false
        }]
    },

    // -- OVERRIDE PHENOTYPE EXAMPLE --
    {
        name: 'Piebald', category: 'marking', rarity: 'rare', hidden_by: [{ name: 'Painted' }],
        composites: [{
            gene: { locus: { locus: 'Pb' }, homozygous_genotype: 'PbPb', heterozygous_genotypes: ['Pb'] },
            allow_homozygous: true, allow_heterozygous: true, allow_absent: false
        }]
    },
    {
        name: 'Widow', category: 'marking', rarity: 'rare', hidden_by: [{ name: 'Painted' }],
        composites: [{
            gene: { locus: { locus: 'Wd' }, homozygous_genotype: 'WdWd', heterozygous_genotypes: ['Wd'] },
            allow_homozygous: true, allow_heterozygous: true, allow_absent: false
        }]
    },
    {
        name: 'Painted', category: 'marking', rarity: 'rare', hidden_by: [],
        composites: [
            { // Must have Piebald
                gene: { locus: { locus: 'Pb' }, homozygous_genotype: 'PbPb', heterozygous_genotypes: ['Pb'] },
                allow_homozygous: true, allow_heterozygous: true, allow_absent: false
            },
            { // Must have Widow
                gene: { locus: { locus: 'Wd' }, homozygous_genotype: 'WdWd', heterozygous_genotypes: ['Wd'] },
                allow_homozygous: true, allow_heterozygous: true, allow_absent: false
            }
        ]
    },
];
