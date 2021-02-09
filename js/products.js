Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://dummyimage.com/180x140/8c888c/0f0f0f.png',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product ref="product" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: this.$root.$refs.basket,
      };
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} &#8381</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
                </div>
            </div>
    `
});
