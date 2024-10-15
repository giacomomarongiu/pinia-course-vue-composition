import {acceptHMRUpdate, defineStore} from "pinia";
import {groupBy} from "lodash";
import {useAuthUserStore} from "@/stores/AuthUserStore";
export const useCartStore =
    defineStore("CartStore", {
        state : () => {
            return {
                items : [],
            }
        },
        actions: {
            checkout() {
                const user = useAuthUserStore();
                alert(user.username + "Checkout completed $"+this.total) ;
            },
            addItems(count, item) {
                for (let i = 0; i < count; i++) {
                    this.items.push({...item});
                }
            },
            clearItem(itemName) {
               this.items= this.items.filter(item => item.name !== itemName);
            },
            setItemCount(item, count) {
                this.clearItem(item.name);
                this.addItems(count, item);
            }

        },
        getters: {
            count()  {
                return this.items.length;
            },
            isEmpty() {
                return this.count === 0;
            },
            grouped(){
                const grouped = groupBy(this.items, item => item.name);
                const sorted = Object.keys(grouped).sort();
                let inOrder = {};
                sorted.forEach(key => {
                    inOrder[key] = grouped[key];
                });
                return inOrder;
            },
            groupCount: (state) => (name) => state.grouped[name].length,
            total() {
                return this.items.reduce((acc, item) => acc + item.price, 0);
            },
        }
    } );

// This is the HMR code that allows the store to be updated without a page refresh
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}