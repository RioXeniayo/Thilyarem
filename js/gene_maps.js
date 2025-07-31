const GeneType = {
    BASE: 0,
    MARKING: 1,
    MUTATION: 2,
    MANE: 3, // Added for Mane Types
    TRAIT: 4 // Added for Physical Traits
};

const GeneMap = {
    // -- BASE COLORS --
    TAN: { TEXT: 'Tan', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Tan']] },
    CREAM: { TEXT: 'Cream', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Cream']] },
    BROWN: { TEXT: 'Brown', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Brown']] },
    LILAC: { TEXT: 'Lilac', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Lilac']] },
    GREEN: { TEXT: 'Green', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Green']] },
    SEAGREEN: { TEXT: 'Seagreen', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Seagreen']] },
    TEAGREEN: { TEXT: 'Teagreen', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Teagreen']] },
    SLATE: { TEXT: 'Slate', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Slate']] },
    BLUE: { TEXT: 'Blue', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Blue']] },
    WHITE: { TEXT: 'White', TYPE: GeneType.BASE, EXPRESSED_SETS: [['White']] },
    BLACK: { TEXT: 'Black', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Black']] },

    // -- BASE MODIFIERS --
    VERMILLION: { TEXT: 'Vermillion', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Vermillion']] },
    JADE: { TEXT: 'Jade', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Jade']] },
    VIOLET: { TEXT: 'Violet', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Violet']] },
    AMBER: { TEXT: 'Amber', TYPE: GeneType.BASE, EXPRESSED_SETS: [['Amber']] },

    // -- COMMON MARKINGS --
    BELLYTONE: { TEXT: 'Bellytone', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Bellytone']] },
    COLLAR: { TEXT: 'Collar', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Collar']] },
    INKED: { TEXT: 'Inked', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Inked']] },
    MANTLE: { TEXT: 'Mantle', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Mantle']] },
    PANGARE: { TEXT: 'Pangare', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Pangare']] },
    POINTS: { TEXT: 'Points', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Points']] },
    ROAN: { TEXT: 'Roan', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Roan']] },
    SABLE: { TEXT: 'Sable', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Sable']] },
    SIAMESE: { TEXT: 'Siamese', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Siamese']] },
    STAINED: { TEXT: 'Stained', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Stained']] },

    // -- UNCOMMON MARKINGS --
    OVERO: { TEXT: 'Overo', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Overo']] },
    APPALOOSA: { TEXT: 'Appaloosa', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Appaloosa']] },
    BARRING: { TEXT: 'Barring', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Barring']] },
    DAPPLES: { TEXT: 'Dapples', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Dapples']] },
    DUN: { TEXT: 'Dun', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Dun']] },
    BENGAL: { TEXT: 'Bengal', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Bengal']] },
    MERLE: { TEXT: 'Merle', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Merle']] },
    PANDA: { TEXT: 'Panda', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Panda']] },
    PYTHON: { TEXT: 'Python', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Python']] },
    RORSCHACH: { TEXT: 'Rorschach', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Rorschach']] },
    SPOTTED: { TEXT: 'Spotted', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Spotted']] },
    
    // -- RARE MARKINGS --
    DIAMOND: { TEXT: 'Diamond', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Diamond']] },
    GLINT: { TEXT: 'Glint', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Glint']] },
    IRIDESCENT: { TEXT: 'Iridescent', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Iridescent']] },
    PIEBALD: { TEXT: 'Piebald', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Piebald']] },
    TICKING: { TEXT: 'Ticking', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Ticking']] },
    SPECTRUM: { TEXT: 'Spectrum', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Spectrum']] },
    SPIDER: { TEXT: 'Spider', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Spider']] },
    WIDOW: { TEXT: 'Widow', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Widow']] },

    // -- OVERRIDE MARKINGS --
    PAINTED: { TEXT: 'Painted', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Painted']] },
    CROSS: { TEXT: 'Cross', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Cross']] },
    EMPEROR: { TEXT: 'Emperor', TYPE: GeneType.MARKING, EXPRESSED_SETS: [['Emperor']] },
    
    // -- PHYSICAL TRAITS --
    FANGED: { TEXT: 'Fanged', TYPE: GeneType.TRAIT, EXPRESSED_SETS: [['Fanged']] },
    FINLESS: { TEXT: 'Finless', TYPE: GeneType.TRAIT, EXPRESSED_SETS: [['Finless']] },
    HORNED: { TEXT: 'Horned', TYPE: GeneType.TRAIT, EXPRESSED_SETS: [['Horned']] },
    SAIL: { TEXT: 'Sail', TYPE: GeneType.TRAIT, EXPRESSED_SETS: [['Sail']] },
    TUSKED: { TEXT: 'Tusked', TYPE: GeneType.TRAIT, EXPRESSED_SETS: [['Tusked']] },

    // -- MUTATIONS --
    ALBINISM: {
        TEXT: 'Albinism', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Albinism']],
        CARRIED_SETS: [['Albino (Carried)']]
    },
    LAVENDER: {
        TEXT: 'Lavender', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Lavender']],
        CARRIED_SETS: [['Lavender Albino (Carried)']]
    },
    AXANTHIC_G: {
        TEXT: 'Axanthic-G', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Axanthic-G']],
        CARRIED_SETS: [['Axanthic-G (Carried)']]
    },
    AXANTHIC_M: {
        TEXT: 'Axanthic-M', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Axanthic-M']],
        CARRIED_SETS: [['Axanthic-M (Carried)']]
    },
    LEUCISTIC: {
        TEXT: 'Leucistic', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Leucistic']],
        CARRIED_SETS: [['Leucistic (Carried)']]
    },
    VITILIGO: {
        TEXT: 'Vitiligo', TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [['Vitiligo']],
        CARRIED_SETS: [['Vitiligo (Carried)']]
    },

	    // -- MANE TYPES --
    NATURAL: {
        TEXT: 'Natural',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [['Natural']]
    },
    CURLY: {
        TEXT: 'Curly',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [['Curly']]
    },
    SPHINX: {
        TEXT: 'Sphinx',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [['Sphinx']]
    },
    LONG: {
        TEXT: 'Long',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [['Long']]
    },
    FIERY: {
        TEXT: 'Fiery',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [['Fiery']]
    }
};

const GeneOverride = {
    PAINTED: ['Piebald', 'Widow'],
    CROSS: ['Sable', 'Pangare'],
    EMPEROR: ['Bengal', 'Tabby'] 
};

function TransformKey(key) {
    let words = key.split('_');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
}

export { GeneType, GeneMap, GeneOverride, TransformKey };
