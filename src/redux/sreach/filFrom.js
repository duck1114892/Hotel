const initialState = {
    isSearch: false,
    data: '',

}
const searchAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_ADMIN':
            console.log(action.payload)
            return { ...state, data: action.payload }
        case 'IS_SEARCH':
            console.log('check search:', action.payload)
            return { ...state, isSearch: action.payload }
        default: return state
    }

}
export default searchAdminReducer