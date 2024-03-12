const initialState = {
    address: null,
    price: null,
    rating: null
}
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            console.log(action.payload)
            return {
                ...state,
                address: action.payload.address,
                price: action.payload.price,
                rating: action.payload.star
            }
        default: return state
    }

}
export default filterReducer