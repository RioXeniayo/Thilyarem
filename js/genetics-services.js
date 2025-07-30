export class GeneticsService {
    static loci = [];
    static phenotypes = [];

    static async load() {
        const endpoints = [
            { url: '/data/loci', key: 'loci' },
            { url: '/data/phenotypes', key: 'phenotypes' }
        ];
        try {
            const promises = endpoints.map(endpoint =>
                fetch(endpoint.url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch ${endpoint.url}`);
                        }
                        return response.json();
                    })
                    .then(data => ({ [endpoint.key]: data }))
                    .catch(error => {
                        console.error(`Error fetching ${endpoint.url}`, error);
                        return { [endpoint.key]: null };
                    })
            );

            const dataArray = await Promise.all(promises);
            const data = Object.assign({}, ...dataArray);

            GeneticsService.loci = data.loci || [];
            GeneticsService.phenotypes = data.phenotypes || [];
        }
        catch (error) {
            console.error('Error loading data:', error);
        }
    }

    static get base_loci() {
        return GeneticsService.loci.filter(x => x.category == 'base');
    }

    static get modifier_loci() {
        return GeneticsService.loci.filter(x => x.category == 'modifier');
    }

    static get marking_loci() {
        return GeneticsService.loci.filter(x => x.category == 'marking');
    }

    static get mutation_loci() {
        return GeneticsService.loci.filter(x => x.category == 'mutation');
    }

    static get morph_loci() {
        return GeneticsService.loci.filter(x => x.category == 'morph');
    }

    static get base_phenotypes() {
        return GeneticsService.phenotypes.filter(x => x.category == 'base');
    }

    static get modifier_phenotypes() {
        return GeneticsService.phenotypes.filter(x => x.category == 'modifier');
    }

    static get marking_phenotypes() {
        return GeneticsService.phenotypes.filter(x => x.category == 'marking');
    }
    
    static get common_marking_phenotypes() {
        return GeneticsService.marking_phenotypes.filter(x => x.rarity == 'common');
    }

    static get uncommon_marking_phenotypes() {
        return GeneticsService.marking_phenotypes.filter(x => x.rarity == 'uncommon');
    }

    static get rare_marking_phenotypes() {
        return GeneticsService.marking_phenotypes.filter(x => x.rarity == 'rare');
    }


    static get mutation_phenotypes() {
        return GeneticsService.phenotypes.filter(x => x.category == 'mutation');
    }

    static get morph_phenotypes() {
        return GeneticsService.phenotypes.filter(x => x.category == 'morph');
    }
}
