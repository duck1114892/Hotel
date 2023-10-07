const initialState = {
    email: "",
    password: ""
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILL_LOGIN':
            return { ...state, email: action.payload.email, password: action.payload.password }
        default: return state
    }

}
export default rootReducer