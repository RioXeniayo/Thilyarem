// This import is a placeholder for your existing constants
import { Breed } from "./breeding";

/**
 * UPDATED: Defines the official display names for base colors using the new names.
 */
const BaseColor = {
    TAN: 'Tan',
    CREAM: 'Cream',
    BLACK: 'Black',
    BROWN: 'Brown',
    LILAC: 'Lilac',
    GREEN: 'Green',
    SEAGREEN: 'Seagreen',
    SEAFOAM: 'Seafoam',
    SLATE: 'Slate',
    BLUE: 'Blue',
    WHITE: 'White'
};

/**
 * UPDATED: Maps the new display names to their corresponding hex color codes.
 */
const BaseChartColor = {
    [BaseColor.TAN]: '#ccbb66',  
    [BaseColor.CREAM]: '#d9cc8c', 
    [BaseColor.BLACK]: '#666666',  
    [BaseColor.BROWN]: '#cc9266', 
    [BaseColor.LILAC]: '#d9ad8c', 
    [BaseColor.GREEN]: '#77cc66',  
    [BaseColor.SEAGREEN]: '#99d98c', 
    [BaseColor.SEAFOAM]: '#99d98c', 
    [BaseColor.SLATE]: '#666666',  
    [BaseColor.BLUE]: '#6e66cc',   
    [BaseColor.WHITE]: '#e6e6e6',  
    'Unknown': '#374151'
};

const phenotypeToDisplayNameMap = {
    'Tan': BaseColor.TAN,
    'Brown': BaseColor.BROWN,
    'Green': BaseColor.GREEN,
    'Slate': BaseColor.SLATE,
    'Black': BaseColor.BLACK,
    'Blue': BaseColor.BLUE,
    'Seagreen': BaseColor.SEAGREEN,
    'Cream': BaseColor.CREAM,
    'Lilac': BaseColor.LILAC,
    'Seafoam': BaseColor.SEAFOAM,
    'White': BaseColor.WHITE,
    'Unknown': 'Unknown'
};

/**
 * Contains the available species and their chart colors.
 */
const BreedChartColor = {
    [Breed.THIL]: '#8b5cf6',   // Purple
    [Breed.DEST]: '#10b981',   // Green
    [Breed.CYROA]: '#ef4444'   // Red
};

export { BaseColor, BaseChartColor, phenotypeToDisplayNameMap, BreedChartColor };
