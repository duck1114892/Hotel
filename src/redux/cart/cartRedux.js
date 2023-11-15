const initialState = {
    cart: []
}
const addCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            console.log('check cart payload', action.payload)
            let carts = state.cart
            const item = action.payload
            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity
            }
            else {
                carts.push({ quantity: item.quantity, _id: item._id, detail: item.detail })
            }
            return { cart: carts }
        default: return state
    }

}
export default addCartReducer