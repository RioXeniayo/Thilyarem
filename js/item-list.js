import { ItemService } from "./item-service";

export default function itemList() {
    return {
        searchTerm: '',
        sortType: 'name',
        sortDirection: 'asc',
        items: [],
        tags: [],
        loading: true,
        load() {
            ItemService.load()
                .then(() => {
                    console.log('Data loaded successfully!');
                    this.items = ItemService.items;
                    this.tags = ItemService.tags;
                    this.filter();
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Failed to load data:', error);
                    this.loading = false;
                });
            const propsToWatch = ['searchTerm','sortType','sortDirection','tags'];
            propsToWatch.forEach(prop => {
                this.$watch(prop, () => this.filter());
            });
        },
        filter() {
            this.items = ItemService.items;
            const activeTagIds = this.tags.filter(x => x.active == true).map(x => x.id);

            if (this.searchTerm.trim() !== '') {
                const searchTerm = this.searchTerm.trim().toLowerCase();
                this.items = this.items.filter(x => x.name.toLowerCase().includes(searchTerm));
            }

            this.items = this.items.filter(x => {
               const tagIds = x.tags.map(x => x.id);
               return activeTagIds.every(tagId => tagIds.includes(tagId));
            });

            this.items.sort((a, b) => {
                const a_val = a[this.sortType];
                const b_val = b[this.sortType];
                if (this.sortDirection === 'asc') {
                    return a_val > b_val ? 1 : -1;
                }
                else {
                    return a_val < b_val ? 1 : -1;
                }
            });
        }
    }
}
