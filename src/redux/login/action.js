export const isLogin = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
}
export const logOut = () => {
    return {
        type: "LOGOUT"
    }
}