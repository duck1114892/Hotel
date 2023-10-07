export const filter = (data) => {
    return {
        type: 'FILTER',
        payload: data
    }
}
export const isFilter = (data) => {
    return {
        type: 'IS_FILTER',
        payload: data
    }
}