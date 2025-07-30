export class GenotypeHelper {
    static sliceGenotype(genotype) {
        return genotype.split('/');
    }

    static sliceBaseGenes(genes) {
        return genes.slice(0,3);
    }

    static sliceMarkingGenes(genes) {
        return genes.slice(3);
    }

    static getGenotypeFromAlleles(a, b) {
        if ((a == 'n' || a != a.toLowerCase()) && b != 'n') {
            return `${a}${b}`;
        }
        else {
            return `${b}${a}`;
        }
    }

    static getAlleles(genes, loci_data, force_base_genes = false) {
        const alleles = {};
        loci_data.forEach(locus => {
            const a = []; 
            locus.genes.forEach(gene => {
                if (genes.includes(gene.homozygous_genotype)) {
                    a.push(gene.allele, gene.allele);
                }
                else if (genes.some(g => gene.heterozygous_genotypes.includes(g))) {
                    a.push(gene.allele);
                }
            });
            if (a.length > 0) {
                if (a.length == 1) {
                    a.unshift(locus.null_allele);
                }
                alleles[locus.locus] = {
                    null_allele: locus.null_allele,
                    alleles: a
                };
            }
            else if (locus.category == 'base' && force_base_genes) {
                alleles[locus.locus] = {
                    null_allele: locus.null_allele,
                    alleles: [locus.null_allele]
                };
            }
        });
        return alleles;
    }

    static getGenotypesFromPhenotype(phenotype, phenotype_data) {
        return phenotype_data.find(x => x.name === phenotype).default_genotypes;
    }
}
