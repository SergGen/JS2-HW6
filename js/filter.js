Vue.component('filter-goods', {
    data(){
        return {
            search: ''
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(search)">
                <input type="text" class="search-field" v-model="search" placeholder="Введите наименование товара для поиска">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
});
