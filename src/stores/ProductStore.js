import {defineStore} from "pinia";
import products from "../data/products";

export const useProductStore =
    defineStore("ProductStore", {
        state: () => {
            return {
                products: [],
            }
        },
            actions: {
                async fill() {
                    //Qui si potrebbe utilizzare un servizio per recuperare i dati come axios
                    this.products = await import("../data/products").then((module) => module.default);
                }
            },
    }

    );