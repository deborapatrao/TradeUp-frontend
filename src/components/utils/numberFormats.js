export const priceFormatter = (value) => {
    const newValue = parseFloat(value).toFixed(2);
    if (!isNaN(newValue)) {
        return newValue;
    } else {
        return '0.00';
    }
}

export const dateFormatter = (value) => {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

export const coinPriceFormatter = (value) => {
    // switch(value) {
    //     case 
    // }
}