export const Gene = {
    // -- BASE COLORS AND MODIFIERS --
    BASE_COLORS: {
        NORMAL_MELANIN: ['Black', 'Brown', 'Green', 'Slate', 'Tan'],
        BLUE_DILUTE: ['Brown', 'Seagreen', 'Blue', 'Tan'], // MB Expression
        NO_MEL_DILUTE: ['Lilac', 'Teagreen', 'White', 'Cream']  // M0 Expression
    },
    BASE_MODIFIERS: {
        VERMILLION: {
            HOMOZYGOUS: [['VmVm']],
            EXPRESSED: [['VmVm'], ['nVm']],
            CARRIED: []
        },
        JADE: {
            HOMOZYGOUS: [['JaJa']],
            EXPRESSED: [['JaJa'], ['nJa']],
            CARRIED: []
        },
        VIOLET: {
            HOMOZYGOUS: [['VlVl']],
            EXPRESSED: [['VlVl'], ['nVl']],
            CARRIED: []
        },
        AMBER: {
            HOMOZYGOUS: [['AmAm']],
            EXPRESSED: [['AmAm'], ['nAm']],
            CARRIED: []
        },
    },

    // -- MARKINGS --
    MARKINGS_COMMON: {
        BELLYTONE: {
            HOMOZYGOUS: [['BtBt']],
            EXPRESSED: [['BtBt'], ['nBt']],
            CARRIED: []
        },
        COLLAR: {
            HOMOZYGOUS: [['ClCl']],
            EXPRESSED: [['ClCl'], ['nCl']],
            CARRIED: []
        },
        INKED: {
            HOMOZYGOUS: [['InIn']],
            EXPRESSED: [['InIn'], ['nIn']],
            CARRIED: []
        },
        MANTLE: {
            HOMOZYGOUS: [['MntMnt']],
            EXPRESSED: [['MntMnt'], ['nMnt']],
            CARRIED: []
        },
        PANGARE: {
            HOMOZYGOUS: [['PgPg']],
            EXPRESSED: [['PgPg'], ['nPg']],
            CARRIED: []
        },
        POINTS: {
            HOMOZYGOUS: [['PtPt']],
            EXPRESSED: [['PtPt'], ['nPt']],
            CARRIED: []
        },
        ROAN: {
            HOMOZYGOUS: [['RoRo']],
            EXPRESSED: [['RoRo'], ['nRo']],
            CARRIED: []
        },
        SABLE: {
            HOMOZYGOUS: [['SbSb']],
            EXPRESSED: [['SbSb'], ['nSb']],
            CARRIED: []
        },
        SIAMESE: {
            HOMOZYGOUS: [['SiSi']],
            EXPRESSED: [['SiSi'], ['nSi']],
            CARRIED: []
        },
        STAINED: {
            HOMOZYGOUS: [['StnStn']],
            EXPRESSED: [['StnStn'], ['nStn']],
            CARRIED: []
        },
    },
    MARKINGS_UNCOMMON: {
        OVERO: { // Heterozygous form of Apl
            HOMOZYGOUS: [],
            EXPRESSED: [['nApl']],
            CARRIED: []
        },
        APPALOOSA: { // Homozygous form of Apl
            HOMOZYGOUS: [['AplApl']],
            EXPRESSED: [['AplApl']],
            CARRIED: []
        },
        BARRING: {
            HOMOZYGOUS: [['BrnBrn']],
            EXPRESSED: [['BrnBrn'], ['nBrn']],
            CARRIED: []
        },
        DAPPLES: {
            HOMOZYGOUS: [['DplDpl']],
            EXPRESSED: [['DplDpl'], ['nDpl']],
            CARRIED: []
        },
        DUN: { // Heterozygous form of Bng
            HOMOZYGOUS: [],
            EXPRESSED: [['nBng']],
            CARRIED: []
        },
        BENGAL: { // Homozygous form of Bng
            HOMOZYGOUS: [['BngBng']],
            EXPRESSED: [['BngBng']],
            CARRIED: []
        },
        MERLE: {
            // Homozygous Merle expresses minor birth defects.
            HOMOZYGOUS: [['MrlMrl']],
            EXPRESSED: [['MrlMrl'], ['nMrl']],
            CARRIED: []
        },
        PANDA: {
            HOMOZYGOUS: [['PndPnd']],
            EXPRESSED: [['PndPnd'], ['nPnd']],
            CARRIED: []
        },
        PYTHON: {
            HOMOZYGOUS: [['PyPy']],
            EXPRESSED: [['PyPy'], ['nPy']],
            CARRIED: []
        },
        RORSCHACH: {
            HOMOZYGOUS: [['RscRsc']],
            EXPRESSED: [['RscRsc'], ['nRsc']],
            CARRIED: []
        },
        SPOTTED: {
            HOMOZYGOUS: [['SpSp']],
            EXPRESSED: [['SpSp'], ['nSp']],
            CARRIED: []
        },
    },
    MARKINGS_RARE: {
        DIAMOND: {
            HOMOZYGOUS: [['DiDi']],
            EXPRESSED: [['DiDi'], ['nDi']],
            CARRIED: []
        },
        GLINT: {
            HOMOZYGOUS: [['GlGl']],
            EXPRESSED: [['GlGl'], ['nGl']],
            CARRIED: []
        },
        IRIDESCENT: {
            HOMOZYGOUS: [['IrIr']],
            EXPRESSED: [['IrIr'], ['nIr']],
            CARRIED: []
        },
        PIEBALD: {
            HOMOZYGOUS: [['PbPb']],
            EXPRESSED: [['PbPb'], ['nPb']],
            CARRIED: []
        },
        TICKING: {
            HOMOZYGOUS: [['TkTk']],
            EXPRESSED: [['TkTk'], ['nTk']],
            CARRIED: []
        },
        SPECTRUM: {
            HOMOZYGOUS: [['StmStm']],
            EXPRESSED: [['StmStm'], ['nStm']],
            CARRIED: []
        },
        SPIDER: {
            HOMOZYGOUS: [['SdSd']],
            EXPRESSED: [['SdSd'], ['nSd']],
            CARRIED: []
        },
        WIDOW: {
            HOMOZYGOUS: [['WdWd']],
            EXPRESSED: [['WdWd'], ['nWd']],
            CARRIED: []
        },
    },

    // -- OVERRIDE (COMBO) GENES --
    OVERRIDES: {
        PAINTED: { // Piebald + Widow
            HOMOZYGOUS: [['PbPb', 'WdWd']],
            EXPRESSED: [['PbPb', 'WdWd'], ['PbPb', 'nWd'], ['nPb', 'WdWd'], ['nPb', 'nWd']],
            CARRIED: []
        },
        CROSS: { // Sable + Pangare
            HOMOZYGOUS: [['SbSb', 'PgPg']],
            EXPRESSED: [['SbSb', 'PgPg'], ['SbSb', 'nPg'], ['nSb', 'PgPg'], ['nSb', 'nPg']],
            CARRIED: []
        },
        EMPEROR: { // Tabby (assumed from old data as Se+Str) + Bengal
            HOMOZYGOUS: [['SeSe', 'StrStr', 'BngBng']],
            EXPRESSED: [
                ['SeSe', 'StrStr', 'BngBng'], ['nSe', 'StrStr', 'BngBng'],
                ['SeSe', 'nStr', 'BngBng'], ['nSe', 'nStr', 'BngBng']
            ],
            CARRIED: []
        }
    },

    // -- PHYSICAL TRAITS (Non-marking) --
    TRAITS: {
        FANGED: {
            HOMOZYGOUS: [['FgFg']],
            EXPRESSED: [['FgFg'], ['nFg']],
            CARRIED: []
        },
        FINLESS: {
            HOMOZYGOUS: [['FnFn']],
            EXPRESSED: [['FnFn'], ['nFn']],
            CARRIED: []
        },
        HORNED: {
            HOMOZYGOUS: [['HrHr']],
            EXPRESSED: [['HrHr'], ['nHr']],
            CARRIED: []
        },
        SAIL: {
            HOMOZYGOUS: [['SaiSai']],
            EXPRESSED: [['SaiSai'], ['nSai']],
            CARRIED: []
        },
        TUSKED: {
            HOMOZYGOUS: [['TskTsk']],
            EXPRESSED: [['TskTsk'], ['nTsk']],
            CARRIED: []
        },
    },

    // -- MUTATIONS --
    MUTATIONS: {
        ALBINISM: {
            HOMOZYGOUS: [['ALB']],
            EXPRESSED: [['ALB'], ['Alb']],
            CARRIED: []
        },
        AXANTHIC_G: {
            HOMOZYGOUS: [['GCR']],
            EXPRESSED: [['GCR'], ['Gcr']],
            CARRIED: []
        },
        AXANTHIC_M: {
            HOMOZYGOUS: [['TSK']],
            EXPRESSED: [['TSK'], ['Tsk']],
            CARRIED: []
        },
        LAVENDER: {
            HOMOZYGOUS: [['ALV']],
            EXPRESSED: [['ALV'], ['Alv']],
            CARRIED: []
        },
        LEUCISTIC: {
            HOMOZYGOUS: [['LCT']],
            EXPRESSED: [['LCT'], ['Lct']],
            CARRIED: []
        },
        VITILIGO: { // Note: original prompt had 'Vtl' and 'VTL', standardized here
            HOMOZYGOUS: [['VTL']],
            EXPRESSED: [['VTL'], ['Vtl']],
            CARRIED: []
        },
    }
};
