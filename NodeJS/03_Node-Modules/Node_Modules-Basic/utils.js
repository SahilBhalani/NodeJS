// ? 1.Exporting Multiple Items
//Add properties to the exports object for multiple exports:

///ex.
const getCurrentDate = () => new Date().toISOString();
const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
};

//Method 1. Exporting multiple items
exports.getCurrentDate = getCurrentDate;
exports.formatCurrency = formatCurrency;

//method 2: Exporting an object with multple properties
// module.exports = {getCurrentDate, formatCurrency};