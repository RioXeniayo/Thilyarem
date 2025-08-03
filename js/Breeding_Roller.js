```
// breedroller.js
// Client-side JavaScript for the Breeding Roller Google Apps Script project.
// Handles DOM interactions, genotype validation, phenotype updates, and breeding calculations.
// Fixes issues with phenotyping not displaying and "Hatch Time!" button not working.

// Valid alleles for genotype validation
const VALID_ALLELES = [
  'B+', 'BA', 'BG', 'BW', 'M+', 'MB', 'M0', 'K+', 'KB', 'Vm', 'Ja', 'Vl', 'Am',
  'Bt', 'Cl', 'In', 'Mnt', 'Pg', 'Pt', 'Ro', 'Sb', 'Si', 'Stn', 'Ov', 'Apl',
  'Brn', 'Dpl', 'Bng', 'Mrl', 'Pnd', 'Py', 'Rsc', 'Sp', 'Di', 'Gl', 'Ir', 'Pb',
  'Tk', 'Stm', 'Sd', 'Wd', 'Hr', 'Fg', 'St', 'n'
];

// Initialize event listeners and tooltips on DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing tooltips and event listeners');
  try {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    
    // Bind button events
    document.getElementById('rollButton').addEventListener('click', runBreeding);
    document.getElementById('resetButton').addEventListener('click', resetForm);
    
    // Initial phenotype updates
    updatePhenotype('sire');
    updatePhenotype('dam');
    checkCelestial();
  } catch (e) {
    console.error('Error initializing event listeners:', e);
    showError('Failed to initialize UI: ' + e.message);
  }
});

// Reset form to default values
function resetForm() {
  console.log('Resetting form to default values');
  try {
    document.getElementById('sire_breed').value = 'Thilyarem';
    document.getElementById('sire_age').value = 'Young Adult';
    document.getElementById('sire_mane').value = 'Natural';
    document.getElementById('sire_element').value = 'Fire';
    document.getElementById('sire_geno').value = 'B+/BA M+/M0 K+/K+ Vm Sp';
    document.getElementById('dam_breed').value = 'Thilyarem';
    document.getElementById('dam_age').value = 'Young Adult';
    document.getElementById('dam_mane').value = 'Natural';
    document.getElementById('dam_element').value = 'Fire';
    document.getElementById('dam_geno').value = 'BA/BA MB/MB K+/KB Sp Bt';
    document.getElementById('crescent_herb').checked = false;
    document.getElementById('moonlit_herb').checked = false;
    document.getElementById('coi').value = 'None';
    document.getElementById('celestial_perk').value = 'None';
    updatePhenotype('sire');
    updatePhenotype('dam');
    checkCelestial();
    showResults('Enter parent data and click "Hatch Time!" to see results.', false);
  } catch (e) {
    console.error('Error resetting form:', e);
    showError('Failed to reset form: ' + e.message);
  }
}

// Toggle celestial perk section visibility based on parent age
function checkCelestial() {
  console.log('Checking celestial perk visibility');
  try {
    const sireAge = document.getElementById('sire_age').value;
    const damAge = document.getElementById('dam_age').value;
    document.getElementById('celestialPerkSection').style.display = 
      (sireAge === 'Celestial' || damAge === 'Celestial') ? 'block' : 'none';
  } catch (e) {
    console.error('Error in checkCelestial:', e);
    showError('Failed to update celestial perk visibility: ' + e.message);
  }
}

// Validate genotype input
function validateGenotype(geno) {
  console.log(`Validating genotype: ${geno}`);
  try {
    if (!geno || typeof geno !== 'string') {
      console.log('Validation failed: Empty or invalid genotype');
      return false;
    }
    const genes = geno.split(' ').filter(g => g && g.trim());
    if (!genes.length) {
      console.log('Validation failed: No valid genes found');
      return false;
    }
    const isValid = genes.every(g => {
      const alleles = g.includes('/') ? g.split('/') : [g];
      const valid = alleles.length <= 2 && alleles.every(a => VALID_ALLELES.includes(a));
      if (!valid) console.log(`Invalid allele in ${g}: ${alleles}`);
      return valid;
    });
    console.log(`Genotype validation result: ${isValid}`);
    return isValid;
  } catch (e) {
    console.error('Error in validateGenotype:', e);
    return false;
  }
}

// Update phenotype for sire or dam
function updatePhenotype(parentPrefix) {
  console.log(`Updating phenotype for ${parentPrefix}`);
  try {
    const genoInput = document.getElementById(`${parentPrefix}_geno`);
    const maneInput = document.getElementById(`${parentPrefix}_mane`);
    const phenoInput = document.getElementById(`${parentPrefix}_pheno`);
    
    const genoValue = genoInput.value.trim();
    if (!validateGenotype(genoValue)) {
      console.log(`Invalid genotype for ${parentPrefix}: ${genoValue}`);
      phenoInput.value = 'Invalid genotype: use valid alleles (see tooltip)';
      return;
    }

    console.log(`Calling getPhenotypeForSidebar with genotype: ${genoValue}, mane: ${maneInput.value}`);
    google.script.run
      .withSuccessHandler(phenotype => {
        console.log(`Phenotype received for ${parentPrefix}: ${phenotype}`);
        phenoInput.value = phenotype || 'Error calculating phenotype';
      })
      .withFailureHandler(error => {
        console.error(`Error in getPhenotypeForSidebar for ${parentPrefix}:`, error);
        phenoInput.value = `Error: ${error.message || 'Failed to calculate phenotype'}`;
      })
      .getPhenotypeForSidebar(genoValue, maneInput.value);
  } catch (e) {
    console.error(`Error updating phenotype for ${parentPrefix}:`, e);
    phenoInput.value = 'Error: Client-side failure';
  }
}

// Run breeding calculations when "Hatch Time!" is clicked
function runBreeding() {
  console.log('Hatch Time! button clicked');
  try {
    const sireGeno = document.getElementById('sire_geno').value.trim();
    const damGeno = document.getElementById('dam_geno').value.trim();

    if (!sireGeno || !damGeno) {
      console.log('Validation failed: Missing genotypes');
      showError('Please enter genotypes for both parents.');
      return;
    }

    if (!validateGenotype(sireGeno) || !validateGenotype(damGeno)) {
      console.log(`Validation failed: Invalid genotypes - Sire: ${sireGeno}, Dam: ${damGeno}`);
      showError('Invalid genotype: use valid alleles (see tooltip for list).');
      return;
    }

    showLoading(true);
    const parentA = {
      species: document.getElementById('sire_breed').value,
      age: document.getElementById('sire_age').value,
      mane: document.getElementById('sire_mane').value,
      element: document.getElementById('sire_element').value,
      genotype: sireGeno
    };
    const parentB = {
      species: document.getElementById('dam_breed').value,
      age: document.getElementById('dam_age').value,
      mane: document.getElementById('dam_mane').value,
      element: document.getElementById('dam_element').value,
      genotype: damGeno
    };
    const items = {
      crescent_herb: document.getElementById('crescent_herb').checked,
      moonlit_herb: document.getElementById('moonlit_herb').checked,
      celestial_perk: document.getElementById('celestial_perk').value
    };
    const coi = document.getElementById('coi').value;

    console.log(`Calling runBreedingCalculations with parentA: ${JSON.stringify(parentA)}, parentB: ${JSON.stringify(parentB)}, items: ${JSON.stringify(items)}, coi: ${coi}`);
    google.script.run
      .withSuccessHandler(response => {
        console.log('Breeding calculations succeeded');
        updateSidebar(response);
      })
      .withFailureHandler(error => {
        console.error('Error in runBreedingCalculations:', error);
        showError(`Breeding calculation failed: ${error.message || 'Unknown error'}`);
      })
      .runBreedingCalculations(parentA, parentB, items, coi);
  } catch (e) {
    console.error('Error in runBreeding:', e);
    showError('Breeding failed: ' + e.message);
  }
}

// Update the results sidebar with breeding results
function updateSidebar(response) {
  console.log(`Updating sidebar with response: ${JSON.stringify(response)}`);
  try {
    showLoading(false);
    if (response.error) {
      console.log(`Error in response: ${response.error}`);
      showError(response.error);
    } else {
      showResults(response.resultsHtml, true);
    }
  } catch (e) {
    console.error('Error in updateSidebar:', e);
    showError('Failed to update results: ' + e.message);
  }
}

// Toggle loading indicator
function showLoading(show) {
  console.log(`Toggling loading indicator: ${show}`);
  try {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
    document.getElementById('resultsWrapper').style.display = show ? 'none' : 'block';
  } catch (e) {
    console.error('Error in showLoading:', e);
  }
}

// Display results in the results div
function showResults(html, showWrapper) {
  console.log(`Showing results: ${html.substring(0, 100)}...`);
  try {
    document.getElementById('results').innerHTML = html;
    document.getElementById('resultsWrapper').style.display = showWrapper ? 'block' : 'none';
  } catch (e) {
    console.error('Error in showResults:', e);
    showError('Failed to display results: ' + e.message);
  }
}

// Display error message in the results div
function showError(error) {
  console.log(`Showing error: ${error}`);
  try {
    showLoading(false);
    showResults(`<div class="alert alert-danger" role="alert">${typeof error === 'string' ? error : error.message}</div>`, true);
  } catch (e) {
    console.error('Error in showError:', e);
  }
}


This adaptation should resolve the issues while maintaining all functionality in a modular `.js` file. Test with the provided files, and let me know if you encounter specific errors or need further adjustments!
