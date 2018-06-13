import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'
import { resolve } from 'path';
import { rejects } from 'assert';

Vue.use(Vuex)

export default new Vuex.Store({
    state: { //data
        products: []
    },
    getters: { // = computed properties
        availableProducts (state, getters) {
            return state.products.filter(product => product.inventory > 0)
        }

    },
    actions: { // = methods
        fetchProducts ({commit}) {
            return new Promise((resolve,reject) =>{
                // make the call
                // call setProducts Mutation
                shop.getProducts(products => {
                    commit('setProducts', products)
                    resolve()
                })
            })
        }
        // addToCart (context, product) {
        //     if(product.inventory>0) {
        //         context.commit('pushProductToCart', product)
        //     } else {
        //         // show out of stock messages 
        //     }
        // }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})