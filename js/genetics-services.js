// genetics-service.js

export class GeneticsService {
    static loci = [];
    static phenotypes = [];

    static async load() {
        const endpoints = [
            // These URLs must point to where your data is served.
            { url: '/data/loci.json', key: 'loci' },
            { url: '/data/phenotypes.json', key: 'phenotypes' }
        ];
        
        try {
            const promises = endpoints.map(endpoint =>
                fetch(endpoint.url).then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${endpoint.url}`);
                    }
                    return response.json();
                }).then(data => ({ [endpoint.key]: data }))
            );

            const dataArray = await Promise.all(promises);
            const data = Object.assign({}, ...dataArray);

            this.loci = data.loci || [];
            this.phenotypes = data.phenotypes || [];
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // ... your other getter methods (base_loci, marking_phenotypes, etc.)
}
