export const priceFormatter = (value) => {
    const newValue = parseFloat(value).toFixed(2);
    if (!isNaN(newValue)) {
        return newValue;
    } else {
        return '0.00';
    }
}