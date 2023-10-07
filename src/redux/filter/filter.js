

const initialState = {
    category: [],
    isFilter: false
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return { ...state, category: action.payload }
        case 'IS_FILTER':
            return { ...state, isFilter: action.payload }
        default: return state
    }

}
export default rootReducer