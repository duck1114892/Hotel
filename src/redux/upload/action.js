export const isUpload = (data) => {
    return {
        type: 'UPLOAD_FILE',
        payload: data
    }
}
export const isUploadMutiple = (data) => {
    return {
        type: 'UPLOAD_MUTIPLE_FILES',
        payload: data
    }
}