import { OldGene } from "./old_genes"

const GeneType = {
    BASE: 0,
    MARKING: 1,
    MUTATION: 2,
    COAT: 3
}
/* Coat Colors */
const GeneMap = {
    Tan: {
        TEXT: 'Tan',
        TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Tan']
   		],
		CARRIED_MAPS: []
	},
    TAN_BLUE: {
        TEXT: 'Tan',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Tan']
        ],
		CARRIED_MAPS: []
	},
      TAN_DILUTE: {
        TEXT: 'Cream',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Cream']
        ],
		CARRIED_MAPS: []
	},
    BROWN: {
        TEXT: 'Brown',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Brown']
        ],
		CARRIED_MAPS: []
	},
    BROWN_BLUE: {
		TEXT: 'Brown',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Brown']
        ],
		CARRIED_MAPS: []
	},
    BROWN_DILUTE: {
		TEXT: 'Lilac',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Lilac']
        ],
		CARRIED_MAPS: []
	},
    SLATE: {
		TEXT: 'Slate',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['slate']

        ],
		CARRIED_MAPS: []
	},
    SLATE_BLUE: {
		TEXT: 'Blue',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Blue']
        ],
		CARRIED_MAPS: []
	},
    SLATE_DILUTE: {
		TEXT: 'White',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['White']
        ],
		CARRIED_MAPS: []
	},
    BLACK: {
		TEXT: 'Black',
		TYPE: GeneType.BASE,
        EXPRESSED_SETS: [
            ['Black']
        ],

      /* Common Markings */
    BELLYTONE: {
        TEXT: 'Bellytone',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Bellytone']
   		],
      
    COLLAR: {
		TEXT: 'Collar',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Collar']
        ],
		CARRIED_MAPS: []
	},
    INKED: {
		TEXT: 'Inked',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Inked']
        ],
		CARRIED_MAPS: []
	},
    MANTLE: {
		TEXT: 'Mantle',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Mantle'],
        ],
		CARRIED_MAPS: []
	},
    PANGARE: {
		TEXT: 'Pangare',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Pangare']
        ],
		CARRIED_MAPS: []
	},
    POINTS: {
		TEXT: 'Points',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Points']
        ],

    SABLE: {
		TEXT: 'Sable',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Sable']
   		],

    SIAMESE: {
		TEXT: 'Siamese',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Siamese']
        ],

    STAINED: {
		TEXT: 'STAINED',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Stained']
        ],

    BENGAL: {
		TEXT: 'Bengal',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Dun'],
            ['Bengal']
        ],
      
    TABBY: {
		TEXT: 'Tabby',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Tabby']
        ],
      
      /* Uncommon Marks */
    APPAL: {
		TEXT: 'Appaloosa',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Appaloosa']
        ],

    BARRING: {
		TEXT: 'Barring',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Barring']
        ],

    DAPPLE: {
		TEXT: 'Dappled',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Dappled']
        ],

    MERLE: {
		TEXT: 'Merle',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Merle']
        ],

    OVERO: {
		TEXT: 'Overo',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Overo']
        ],

   PANDA: {
		TEXT: 'Panda',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Panda']
        ],

    PYTHON: {
		TEXT: 'Python',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Python']
        ],

    RORSCHACH: {
		TEXT: 'Rorschach',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Rorschach']
        ],

    SPOTTED: {
		TEXT: 'Spotted',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Spotted']
        ],

      /* Rare Markings */
    DIAMOND: {
		TEXT: 'Diamond',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Diamond'],
        ],

    GLINT: {
        TEXT: 'Glint',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Glint']
        ],

    IRIDESCENT: {
		TEXT: 'Iridescent',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Ombre (Hom)']
        ],

    PIEBALD: {
		TEXT: 'Piebald',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Piebald']
        ],

    TICKED: {
		TEXT: 'Ticking',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Ticking']
        ],

    SPECTRUM: {
		TEXT: 'Spectrum',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Spectrum']
        ],

    SPIDER: {
		TEXT: 'Spider',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Piebald']
        ],
      
    WIDOW: {
		TEXT: 'Widow',
		TYPE: GeneType.MARKING,
        EXPRESSED_SETS: [
            ['Widow']
        ],

  /* COAT MUTATIONS */
    ALBINISM: {
        TEXT: 'Albinism',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Albino']
        ],
        CARRIED_SETS: [
            ['Albino (Carried)']
        ],
      
    ERYTHRISM: {
        TEXT: 'Erythrism',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Erythrism']
        ],
        CARRIED_SETS: [
            ['Erythrism (Carried)']
        ],

    AXANTHIC_GCR: {
        TEXT: 'Axanthic-G',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Axanthic-G']
        ],
        CARRIED_SETS: [
            ['Axanthic-G (Carried)']
        ],
      
    AXANTHIC_TSK: {
        TEXT: 'Axanthic-M',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Axanthic-M']
        ],
        CARRIED_SETS: [
            ['Axanthic-M (Carried)']
        ],
      
          LAVENDER: {
        TEXT: 'Lavender Albino',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Lavender Albino']
        ],
           CARRIED_SETS: [
            ['Lavender Albino (Carried)']
        ], 
            
    LEUCISTIC: {
        TEXT: 'Leucistic',
		TYPE: GeneType.MUTATION,
        EXPRESSED_SETS: [
            ['Leucistic']
        ],
      CARRIED_SETS: [
            ['Leucistic (Carried)']
        ],
      
/* MANE TYPES */
    NATURAL: {
        TEXT: 'Natural',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [
            ['Natural']
        ],

    CURLY: {
        TEXT: 'Curly',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [
            ['Curly']
          ],
  
    SPHINX: {
        TEXT: 'Sphinx',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [
            ['Sphinx']
        ],
      
    LONG: {
        TEXT: 'Long',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [
            ['Long']
        ],
      
          FIERY: {
        TEXT: 'Fiery',
        TYPE: GeneType.MANE,
        EXPRESSED_SETS: [
            ['Fiery']
        ],
    }
const GeneOverride = {
    PAINTED: ['Piebald','Widow'],
    EMPEROR: ['Bengal','Tabby'],
    CROSS: ['Sable','Pangare']

}

function TransformKey(key) {
    let words = key.split('_');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
}

export { GeneType, GeneMap, GeneOverride, TransformKey }
