export class PhenotypeHelper {
    static getPhenotype(genes, phenotype_data) {
        const phenotype = phenotype_data.find(phenotype => {
            let isVisible = true;
            phenotype.composites.forEach(composite => {
                let homFound = genes.includes(composite.gene.homozygous_genotype);
                let hetFound = genes.some(gene => composite.gene.heterozygous_genotypes.includes(gene));
                if ((!composite.allow_homozygous && homFound) ||
                    (!composite.allow_heterozygous && hetFound) ||
                    (!composite.allow_absent && !homFound && !hetFound) ) {
                    isVisible = false;
                }
            });
            if (isVisible) {
                return phenotype;
            }
        });
        return phenotype?.name ?? null;
    }

    static getPhenotypes(genes, phenotype_data) {
        const phenotypes = [];
        phenotype_data.forEach(phenotype => {
            let isVisible = true;
            phenotype.composites.forEach(composite => {
                let homFound = genes.includes(composite.gene.homozygous_genotype);
                let hetFound = genes.some(gene => composite.gene.heterozygous_genotypes.includes(gene));
                if ((!composite.allow_homozygous && homFound) ||
                    (!composite.allow_heterozygous && hetFound) ||
                    (!composite.allow_absent && !homFound && !hetFound) ) {
                    isVisible = false;
                }
            });
            if (isVisible) {
                phenotypes.push(phenotype.name);
            }
        });
        return phenotypes;
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
                    (!composite.allow_absent && !homFound && !hetFound) ) {
                    isVisible = false;
                }
            });
            if (!isVisible && compositesPresent == phenotype.composites.length) {
                carried.push(phenotype.name);
            }
        });
        return carried;
    }

    static filterHiddenPhenotypes(phenotypes, phenotype_data) {
        const filtered = [];
        phenotypes.forEach(phenotype => {
            let isHidden = false;
            const data = phenotype_data.find(x => x.name == phenotype);
            if (data.hidden_by.length > 0) {
                const hidden_by = data.hidden_by.map(x => x.name);
                if (phenotypes.some(y => hidden_by.includes(y))) {
                    isHidden = true;
                }
            }
            if (!isHidden) {
                filtered.push(phenotype);
            }
        });
        return filtered;
    }

    static getPhenotypeString(phenotypes, carried, phenotype_data) {
        const base = phenotype_data.find(x => x.category == 'base' && phenotypes.includes(x.name)).name;
        const mods = phenotype_data.filter(x => x.category == 'modifier' && phenotypes.includes(x.name)).map(x => x.name);
        const markings = phenotype_data.filter(x => x.category == 'marking' && phenotypes.includes(x.name)).map(x => x.name);
        const carried_markings = phenotype_data.filter(x => x.category == 'marking' && carried.includes(x.name)).map(x => x.name);

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
