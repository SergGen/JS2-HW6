Vue.component('basket', {
    data(){
      return {
          imgBasket: 'https://dummyimage.com/100x75/8c888c/0f0f0f.png',
          basketUrl: '/getBasket.json',
          basketItems: [],
          showBasket: false,
      }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.basketItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.basketItems.push(prod)
                        }
                    } else {
                        console.log('Error Add Good');
                    }
                })
        },
        removeProduct(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity > 1){
                            item.quantity--;
                        } else {
                            this.basketItems.splice(this.basketItems.indexOf(item), 1)
                        }
                    }
                    else {
                        console.log('Error Remove Good');
                    }
                })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.basketItems.push(el);
                }
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showBasket = !showBasket">Корзина</button>
            <div class="cart-block" v-show="showBasket">
                <p v-if="!basketItems.length">Корзина пуста</p>
                <button class="del-btn" @click="showBasket = !showBasket">Закрыть</button>
                <cart-item class="cart-item" 
                v-for="item of basketItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgBasket"
                @removeProduct="removeProduct">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}} &#8381 за шт.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('removeProduct', cartItem)">&times;</button>
                    </div>
                </div>
    `
});
