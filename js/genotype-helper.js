export class GenotypeHelper {

    static sliceGenotype(genotype) {
        return genotype.split(' ').filter(g => g); 
    }
    static sliceBaseGenes(genes, loci_data) {
        const baseLoci = loci_data.filter(l => l.category === 'base').map(l => l.locus);
        const baseGeneKeywords = ['B', 'M', 'K'];
        return genes.filter(gene => baseGeneKeywords.some(key => gene.includes(key)));
    }

    static sliceMarkingGenes(genes, loci_data) {
        const baseGeneKeywords = ['B', 'M', 'K'];
        return genes.filter(gene => !baseGeneKeywords.some(key => gene.includes(key)));
    }

    static getGenotypeFromAlleles(a, b) {
        return [a, b].sort().join('/');
    }

    static getAlleles(genes, loci_data, force_base_genes = false) {
        const alleles = {};
        loci_data.forEach(locus => {
            const a = [];
            locus.genes.forEach(gene => {
                if (genes.includes(gene.homozygous_genotype)) {
                    a.push(gene.allele, gene.allele);
                } else if (genes.some(g => gene.heterozygous_genotypes.includes(g))) {
                    a.push(gene.allele);
                }
            });
            if (a.length > 0) {
                if (a.length === 1) {
                    a.unshift(locus.null_allele);
                }
                alleles[locus.locus] = {
                    null_allele: locus.null_allele,
                    alleles: a
                };
            } else if (locus.category === 'base' && force_base_genes) {
                alleles[locus.locus] = {
                    null_allele: locus.null_allele,
                    alleles: [locus.null_allele]
                };
            }
        });
        return alleles;
    }
    static getGenotypesFromPhenotype(phenotype, phenotype_data) {
        const p_data = phenotype_data.find(x => x.name === phenotype);
        return p_data ? p_data.default_genotypes : [];
    }
}
