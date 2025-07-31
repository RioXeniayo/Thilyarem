export class PhenotypeHelper {

    static getPhenotype(genes, phenotype_data) {
        const phenotypes = this.getPhenotypes(genes, phenotype_data);
        return phenotypes.length > 0 ? phenotypes[0] : null;
    }
    static getPhenotypes(genes, phenotype_data) {
        return phenotype_data
            .filter(phenotype => {
                return phenotype.composites.every(composite => {
                    const homFound = genes.includes(composite.gene.homozygous_genotype);
                    const hetFound = genes.some(gene => composite.gene.heterozygous_genotypes.includes(gene));

                    if ((!composite.allow_homozygous && homFound) ||
                        (!composite.allow_heterozygous && hetFound) ||
                        (!composite.allow_absent && !homFound && !hetFound)) {
                        return false;
                    }
                    return true;
                });
            })
            .map(p => p.name);
    }

    static getCarried(genes, phenotype_data) {
        const carried = [];
        phenotype_data.forEach(phenotype => {
            let isVisible = true;
            let compositesPresent = 0;
            phenotype.composites.forEach(composite => {
                let homFound = genes.includes(composite.gene.homozygous_genotype);
                let hetFound = genes.some(gene => composite.gene.heterozygous_genotypes.includes(gene));
                if (homFound || hetFound) {
                    compositesPresent++;
                }
                if ((!composite.allow_homozygous && homFound) ||
                    (!composite.allow_heterozygous && hetFound) ||
                    (!composite.allow_absent && !homFound && !hetFound)) {
                    isVisible = false;
                }
            });
            if (!isVisible && compositesPresent === phenotype.composites.length) {
                carried.push(phenotype.name);
            }
        });
        return carried;
    }

    static filterHiddenPhenotypes(phenotypes, phenotype_data) {
        return phenotypes.filter(phenotypeName => {
            const data = phenotype_data.find(x => x.name === phenotypeName);
            if (data && data.hidden_by.length > 0) {
                const hidden_by_names = data.hidden_by.map(x => x.name);
                return !phenotypes.some(p => hidden_by_names.includes(p));
            }
            return true;
        });
    }

    static getPhenotypeString(phenotypes, carried, phenotype_data) {
        const basePhenotype = phenotype_data.find(x => x.category === 'base' && phenotypes.includes(x.name));
        if (!basePhenotype) {
            return "Unknown Base";
        }
        const base = basePhenotype.name;
        
        const mods = phenotypes.filter(p => phenotype_data.some(x => x.name === p && x.category === 'modifier'));
        const markings = phenotypes.filter(p => phenotype_data.some(x => x.name === p && x.category === 'marking'));
        const carried_markings = carried.filter(c => phenotype_data.some(x => x.name === c && x.category === 'marking'));

        let str = base;

        if (mods.length > 0) {
            str = `${mods.join(', ')} ${str}`;
        }
        if (markings.length > 0) {
            str += ` with ${markings.join(', ').replace(/, ([^,]*)$/, ' and $1')}`;
        }
        if (carried_markings.length > 0) {
            str += ` (Carries ${carried_markings.join(', ').replace(/, ([^,]*)$/, ' and $1')})`;
        }

        return str;
    }
}
