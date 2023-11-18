const initialState = {
    cart: []
};

const addCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            console.log('check cart payload', action.payload);
            let carts = [...state.cart]; // Tạo bản sao của mảng
            const item = action.payload;
            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
            } else {
                carts.push({ quantity: item.quantity, price: item.price, _id: item._id, detail: item.detail });
            }
            return { cart: carts };

        case 'UPDATE_CART':
            console.log('check cart payload', action.payload);
            let cartsU = [...state.cart]; // Tạo bản sao của mảng
            const itemU = action.payload;
            const update = cartsU.map((item) => {
                return item._id === itemU._id ? { ...item, quantity: itemU.quantity } : item;
            });

            return { cart: update };

        case 'REMOVE_CART':
            console.log("check id array", action.payload)
            const idsToRemove = action.payload;
            const updatedCart = state.cart.filter(item => !idsToRemove.includes(item._id));
            return { cart: updatedCart };
        default:
            return state;
    }
};

export default addCartReducer;
