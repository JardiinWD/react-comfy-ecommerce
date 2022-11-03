export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number / 100)

}

/**
 * 
 * @param {array} data  // array of data
 * @param {string} type // What you try to filter
 */
export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    // Check if the type is equal to colors
    if (type === 'colors') unique = unique.flat()
    // Return a new array
    // ...new Set(unique) => Removed all the double
    return ['all', ...new Set(unique)]
}
