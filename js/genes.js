export const Genes = {
    // -- BASE COLORS AND MODIFIERS --
    BASE_COLORS: {
        B_PLUS: { NORMAL_MELANIN: 'Tan', NO_MELANIN: 'Cream' },
        BA: { NORMAL_MELANIN: 'Brown', NO_MELANIN: 'Lilac' },
        BG: { NORMAL_MELANIN: 'Green', DILUTED_MELANIN: 'Seagreen', NO_MELANIN: 'Seafoam' },
        BW: { NORMAL_MELANIN: 'Slate', DILUTED_MELANIN: 'Blue', NO_MELANIN: 'White' },
        KB_OVERRIDE: { NORMAL_MELANIN: 'Black' }
    },
    BASE_MODIFIERS: {
        VERMILLION: {
            HOMOZYGOUS: [['VmVm']],
            EXPRESSED: [['VmVm'], ['Vm']],
            CARRIED: []
        },
        JADE: {
            HOMOZYGOUS: [['JaJa']],
            EXPRESSED: [['JaJa'], ['Ja']],
            CARRIED: []
        },
        VIOLET: {
            HOMOZYGOUS: [['VlVl']],
            EXPRESSED: [['VlVl'], ['Vl']],
            CARRIED: []
        },
        AMBER: {
            HOMOZYGOUS: [['AmAm']],
            EXPRESSED: [['AmAm'], ['Am']],
            CARRIED: []
        },
    },

    // -- MARKINGS --
    MARKINGS_COMMON: {
        BELLYTONE: {
            HOMOZYGOUS: [['BtBt']],
            EXPRESSED: [['BtBt'], ['Bt']],
            CARRIED: []
        },
        COLLAR: {
            HOMOZYGOUS: [['ClCl']],
            EXPRESSED: [['ClCl'], ['Cl']],
            CARRIED: []
        },
        INKED: {
            HOMOZYGOUS: [['InIn']],
            EXPRESSED: [['InIn'], ['In']],
            CARRIED: []
        },
        MANTLE: {
            HOMOZYGOUS: [['MntMnt']],
            EXPRESSED: [['MntMnt'], ['Mnt']],
            CARRIED: []
        },
        PANGARE: {
            HOMOZYGOUS: [['PgPg']],
            EXPRESSED: [['PgPg'], ['Pg']],
            CARRIED: []
        },
        POINTS: {
            HOMOZYGOUS: [['PtPt']],
            EXPRESSED: [['PtPt'], ['Pt']],
            CARRIED: []
        },
        ROAN: {
            HOMOZYGOUS: [['RoRo']],
            EXPRESSED: [['RoRo'], ['Ro']],
            CARRIED: []
        },
        SABLE: {
            HOMOZYGOUS: [['SbSb']],
            EXPRESSED: [['SbSb'], ['Sb']],
            CARRIED: []
        },
        SIAMESE: {
            HOMOZYGOUS: [['SiSi']],
            EXPRESSED: [['SiSi'], ['Si']],
            CARRIED: []
        },
        STAINED: {
            HOMOZYGOUS: [['StnStn']],
            EXPRESSED: [['StnStn'], ['Stn']],
            CARRIED: []
        },
    },
    MARKINGS_UNCOMMON: {
        OVERO: {
            HOMOZYGOUS: [],
            EXPRESSED: [['Apl']],
            CARRIED: []
        },
        APPALOOSA: {
            HOMOZYGOUS: [['AplApl']],
            EXPRESSED: [['AplApl']],
            CARRIED: []
        },
        BARRING: {
            HOMOZYGOUS: [['BrnBrn']],
            EXPRESSED: [['BrnBrn'], ['Brn']],
            CARRIED: []
        },
        DAPPLES: {
            HOMOZYGOUS: [['DplDpl']],
            EXPRESSED: [['DplDpl'], ['Dpl']],
            CARRIED: []
        },
        DUN: {
            HOMOZYGOUS: [],
            EXPRESSED: [['Bng']],
            CARRIED: []
        },
        BENGAL: {
            HOMOZYGOUS: [['BngBng']],
            EXPRESSED: [['BngBng']],
            CARRIED: []
        },
        MERLE: {
            HOMOZYGOUS: [['MrlMrl']],
            EXPRESSED: [['MrlMrl'], ['Mrl']],
            CARRIED: []
        },
        PANDA: {
            HOMOZYGOUS: [['PndPnd']],
            EXPRESSED: [['PndPnd'], ['Pnd']],
            CARRIED: []
        },
        PYTHON: {
            HOMOZYGOUS: [['PyPy']],
            EXPRESSED: [['PyPy'], ['Py']],
            CARRIED: []
        },
        RORSCHACH: {
            HOMOZYGOUS: [['RscRsc']],
            EXPRESSED: [['RscRsc'], ['Rsc']],
            CARRIED: []
        },
        SPOTTED: {
            HOMOZYGOUS: [['SpSp']],
            EXPRESSED: [['SpSp'], ['Sp']],
            CARRIED: []
        },
    },
    MARKINGS_RARE: {
        DIAMOND: {
            HOMOZYGOUS: [['DiDi']],
            EXPRESSED: [['DiDi'], ['Di']],
            CARRIED: []
        },
        GLINT: {
            HOMOZYGOUS: [['GlGl']],
            EXPRESSED: [['GlGl'], ['Gl']],
            CARRIED: []
        },
        IRIDESCENT: {
            HOMOZYGOUS: [['IrIr']],
            EXPRESSED: [['IrIr'], ['Ir']],
            CARRIED: []
        },
        PIEBALD: {
            HOMOZYGOUS: [['PbPb']],
            EXPRESSED: [['PbPb'], ['Pb']],
            CARRIED: []
        },
        TICKING: {
            HOMOZYGOUS: [['TkTk']],
            EXPRESSED: [['TkTk'], ['Tk']],
            CARRIED: []
        },
        SPECTRUM: {
            HOMOZYGOUS: [['StmStm']],
            EXPRESSED: [['StmStm'], ['Stm']],
            CARRIED: []
        },
        SPIDER: {
            HOMOZYGOUS: [['SdSd']],
            EXPRESSED: [['SdSd'], ['Sd']],
            CARRIED: []
        },
        WIDOW: {
            HOMOZYGOUS: [['WdWd']],
            EXPRESSED: [['WdWd'], ['Wd']],
            CARRIED: []
        },
    },

    // -- OVERRIDE (COMBO) GENES --
    OVERRIDES: {
        PAINTED: { // Piebald + Widow
            HOMOZYGOUS: [['PbPb', 'WdWd']],
            EXPRESSED: [['PbPb', 'WdWd'], ['PbPb', 'Wd'], ['Pb', 'WdWd'], ['Pb', 'Wd']],
            CARRIED: []
        },
        CROSS: { // Sable + Pangare
            HOMOZYGOUS: [['SbSb', 'PgPg']],
            EXPRESSED: [['SbSb', 'PgPg'], ['SbSb', 'Pg'], ['Sb', 'PgPg'], ['Sb', 'Pg']],
            CARRIED: []
        },
        EMPEROR: { // Tabby (assumed Se+Str) + Bengal
            HOMOZYGOUS: [['SeSe', 'StrStr', 'BngBng']],
            EXPRESSED: [
                ['SeSe', 'StrStr', 'BngBng'], ['Se', 'StrStr', 'BngBng'],
                ['SeSe', 'Str', 'BngBng'], ['Se', 'Str', 'BngBng']
            ],
            CARRIED: []
        }
    },

    // -- PHYSICAL TRAITS (Non-marking) --
    TRAITS: {
        FANGED: {
            HOMOZYGOUS: [['FgFg']],
            EXPRESSED: [['FgFg'], ['Fg']],
            CARRIED: []
        },
        FINLESS: {
            HOMOZYGOUS: [['FnFn']],
            EXPRESSED: [['FnFn'], ['Fn']],
            CARRIED: []
        },
        HORNED: {
            HOMOZYGOUS: [['HrHr']],
            EXPRESSED: [['HrHr'], ['Hr']],
            CARRIED: []
        },
        SAIL: {
            HOMOZYGOUS: [['SaiSai']],
            EXPRESSED: [['SaiSai'], ['Sai']],
            CARRIED: []
        },
        TUSKED: {
            HOMOZYGOUS: [['TskTsk']],
            EXPRESSED: [['TskTsk'], ['Tsk']],
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
        LAVENDER: {
            HOMOZYGOUS: [['ALV']],
            EXPRESSED: [['ALV'], ['Alv']],
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
        LEUCISTIC: {
            HOMOZYGOUS: [['LCT']],
            EXPRESSED: [['LCT'], ['Lct']],
            CARRIED: []
        },
        VITILIGO: {
            HOMOZYGOUS: [['VTL']],
            EXPRESSED: [['VTL'], ['Vtl']],
            CARRIED: []
        },
    }
};

export: { Genes }
