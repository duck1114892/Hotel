const initialState = {
    isAuth: false,
    user: {
        email: "",
        name: "",
        role: "",
        id: ""
    }
}
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            const getUser = action.payload
            return {
                ...state,
                isAuth: true,
                user: {
                    email: getUser.email,
                    name: getUser.name,
                    id: getUser._id,
                    role: getUser.role.name,
                    permissions: getUser.permission
                }
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                user: {
                    email: "",
                    name: "",
                    role: "",
                    id: ""
                }
            }
        default: return state
    }

}
export default loginReducer