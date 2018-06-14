<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif">
        <ul v-else>
            <li v-for="product in products">
                {{product.title}} - {{product.price | currency}} - {{product.inventory}}
                <button :disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add Product</button>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                loading: false
            }
        },

        methods: {
            addProductToCart(product) {
                this.$store.dispatch('addProductToCart', product)
            }
        },

        computed: {
            products () {
                return this.$store.state.products
            },
            productIsInStock () {
                return this.$store.getters.productIsInStock
            }
        },

        created () {
            this.loading = true
            this.$store.dispatch('fetchProducts')
            .then(() => this.loading = false)
        }
    }
</script>

<style scoped>

</style>
