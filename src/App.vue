<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import {useProductStore} from "@/stores/ProductStore";
import {useCartStore} from "@/stores/CartStore";
const cartStore = useCartStore();
const ProductStore = useProductStore();
ProductStore.fill()

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in ProductStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event,product)"
      />
    </ul>
  </div>
</template>
