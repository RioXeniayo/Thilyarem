const Sex = {
    MALE: 'Male',
    FEMALE: 'Female',
};

const Breed = {
    THIL: 'Thilyarem',
    DEST: 'Destrier',
   /* CYROA: 'CYROA',*/
};

const Species = {
    [Breed.THIL]: 'Panlongus Lykophus Pelagius',
    [Breed.DEST]: 'Panlongus Mundiserpens Imperator',
    /* [Breed.CYROA]: 'Panlongus Murepera Scirto',*/
};

const Rank = {
    HATCHLING: 'Hatchling',
    ADOLESCENT: 'Adolescent',
    CELESTIAL: 'Celestial'
};

const Fertility = {
    PERFECT: 'Perfect',
    GOOD: 'Good',
    AVERAGE: 'Average',
    LOW: 'Low',
    STERILE: 'Sterile'
};

const Traits = {
    FANGS: 'Fanged',
    TUSKS: 'Tusked',
    FINLESS: 'Finless',
    HORNS: 'Horned',
    SAIL: 'Sail'
};

const Element = {
    EARTH: 'Earth',
    FIRE: 'Fire',
    WATER: 'Water',
    AIR: 'Air',
    METAL: 'Metal',
    WOOD: 'Wood',
    LIGHT: 'Light',
    SHADOW: 'Shadow',
};

const Deformities = {
    MINOR: 'Minor',
    MAJOR: 'Major',
    SEVERE: 'Severe'
};

export { Sex, Breed, Species, Rank, Fertility, Traits, Element, Deformities }
