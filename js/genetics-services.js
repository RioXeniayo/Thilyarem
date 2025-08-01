// genetics-service.js

export class GeneticsService {
    static loci = [];
    static phenotypes = [];

    static async load() {
        // Just update these URLs to your new locations
        const endpoints = [
            { url: '/api/data/loci.json', key: 'loci' },
            { url: '/api/data/phenotypes.json', key: 'phenotypes' }
        ];
        
        // The rest of the fetch logic remains the same
        try {
            const promises = endpoints.map(endpoint => fetch(endpoint.url).then(res => res.json()).then(data => ({ [endpoint.key]: data })));
            const dataArray = await Promise.all(promises);
            const data = Object.assign({}, ...dataArray);
            this.loci = data.loci || [];
            this.phenotypes = data.phenotypes || [];
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // ...getters
}
