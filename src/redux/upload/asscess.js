const initialState = {
    singleFile: '',
    muitipleFiles: []
}
const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_FILE':
            const getFile = action.payload
            return {
                ...state,
                singleFile: getFile
            }
        case 'UPLOAD_MUTIPLE_FILES':
            const getMutipleFile = action.payload
            return {
                ...state,
                muitipleFiles: getMutipleFile
            }
        default: return state
    }

}
export default uploadReducer