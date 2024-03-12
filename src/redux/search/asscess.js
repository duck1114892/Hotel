const initialState = {
    keyValue: ''
}
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SEARCH_VALUE':
            return {
                ...state, keyValue: action.payload
            }
        default: return state
    }

}
export default searchReducer