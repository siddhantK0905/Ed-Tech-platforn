import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0 ,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
}



const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers:{
        addToCart: (state,actions)=>{
            const course = actions.payload;
            console.log("cart value is", state)

            const index = state.cart.findIndex((item) => item._id === course._id)


            //if course is already added into list then dont add it again
            if(index >= 0){
                toast.error("Course is already added");
                return;
            }

            //push the cards into the cart
            state.cart.push(course);

            //update total Items and price
            state.totalItems++;
            state.total += course.price

            //update the local storage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("total",JSON.stringify(state.total));

            //showing toast
            toast.success("Course added successfully");
        },


        //Remove to cart function
        removeFromCart: (state,actions) =>{
            const courseId = actions.payload;

            const index = state.cart.findIndex((item) => item.id === courseId )

            //If course is found then remove it
            if(index >= 0){
                state.totalItems--;
                state.total -= state.cart[index].price
                state.cart.splice(index, 1)

                //update to locaStorage
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                localStorage.setItem("cart",JSON.stringify(state.cart));

                //successfull toast
                toast.success("Courese removed successfully"); 
            }

        },

        //reseting the cart
        resetCart: (state) =>{
            state.total = 0;
            state.totalItems = 0;
            state.cart = [];

            //update the localstorage
            localStorage.removeItem("totalItem")
            localStorage.removeItem("total")
            localStorage.removeItem("cart")

            toast.success("Cart reset successfully");
        },
    }
})

export const{addToCart, removeFromCart , resetCart} = cartSlice.actions;

export default cartSlice.reducer;