const initialState = {
    isUpdate: false,
}
const isUpdateReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'UPDATE':
            console.log(!state.isUpdate)
            return {
                isUpdate: !state.isUpdate
            }
        default: return state
    }

}

export default isUpdateReducer