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
            console.log(getUser)
            return {
                ...state, isAuth: true, user: {
                    email: getUser.email,
                    name: getUser.name,
                    id: getUser._id,
                    role: getUser.role.name,
                    permissions: getUser.permission
                }
            }
        default: return state
    }

}
export default loginReducer