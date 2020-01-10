const attribute = 'flag-icon flag-icon-' // the class for the flag

// Track left side
document.querySelector('#currency-left').addEventListener('change', (e) => {
    const currencyCode = e.target.value // the country's currency code
    const countryCode = e.target.selectedOptions[0].id // the country's code

    // Change text
    changeText('left', countryCode)
    
    // Change the flag
    changeFlag('left', countryCode)
})

// Track right side
document.querySelector('#currency-right').addEventListener('change', (e) => {
    const currencyCode = e.target.value // the country's currency code
    const countryCode = e.target.selectedOptions[0].id // the country's code

    // Change text
    changeText('right', countryCode)

    // Change the flag
    changeFlag('right', countryCode)
})

document.querySelector('#left-currency-amount').addEventListener('input', () => {
    const leftCurrencyCode = document.querySelector('#currency-left')
    const rightCurrencyCode = document.querySelector('#currency-right')
    const amountInput = document.querySelector('#left-currency-amount')
    const amountOutput = document.querySelector('#right-currency-amount')

    calculateRate(leftCurrencyCode, rightCurrencyCode, amountInput, amountOutput)
})

document.querySelector('#right-currency-amount').addEventListener('input', () => {
    const leftCurrencyCode = document.querySelector('#currency-left')
    const rightCurrencyCode = document.querySelector('#currency-right')
    const amountInput = document.querySelector('#right-currency-amount')
    const amountOutput = document.querySelector('#left-currency-amount')

    calculateRate(rightCurrencyCode, leftCurrencyCode, amountInput, amountOutput)
})

document.querySelector('.exchange').addEventListener('mousedown', () => {
    swapSides()
})

// fromCurr = document.querySelector('#currency-left')
// toCurr = document.querySelector('#currency-right')
// fromInput = document.querySelector('#left-currency-amount')
// toInput = document.querySelector('#right-currency-amount')

const calculateRate = (fromCurrency, toCurrency, fromInput, toInput) => {
    // get the currency code
    const fromCurrencyCode = fromCurrency.value
    const toCurrencyCode = toCurrency.value

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyCode}`).then((response) => response.json()).then((response) => {
        // grab the exchange rate
        const exchangeRate = response.rates[toCurrencyCode]

        // set the new amount to the calculate rate
        toInput.value = (fromInput.value * exchangeRate).toFixed(2)
    })
}

const swapSides = () => {
    // gather left side
    let left = document.querySelector('#currency-left')
    const leftCountryCode = left.selectedOptions[0].id
    const leftCurrencyCode = left.value
    let leftMoney = document.querySelector('#left-currency-amount')
    
    // gather right side
    let right = document.querySelector('#currency-right')
    const rightCountryCode = right.selectedOptions[0].id
    const rightCurrencyCode = right.value
    let rightMoney = document.querySelector('#right-currency-amount')
    
    // temp setup
    const tempCountryCode = leftCountryCode
    const tempCurrencyCode = leftCurrencyCode
    const tempMoney = leftMoney.value
    
    
    // set left side with the right's
    changeText('left', rightCountryCode) // change the text
    changeFlag('left', rightCountryCode) // change the flag
    left.value = rightCurrencyCode // update the selector
    leftMoney.value = rightMoney.value // change the input value
    
    // set right side
    changeText('right', tempCountryCode)
    changeFlag('right', tempCountryCode)
    right.value = tempCurrencyCode
    rightMoney.value = tempMoney
}

const changeFlag = (side, countryCode) => {
    document.querySelector(`#${side}-flag`).setAttribute('class', `${attribute}${countryCode}`)
}

const changeText = (side, countryCode) => {
    document.querySelector(`#${side}-section h3`).textContent = getCountryName(countryCode)
}

const getCountryName = (countryCode) => {
    switch (countryCode) {
        case 'br':
            return 'Brazil'
            break;
        case 'ca':
            return 'Canada'
            break;
        case 'de':
            return 'Germany'
            break;
        case 'id':
            return 'Indonesia'
            break;
        case 'in':
            return 'India'
            break;
        case 'jp':
            return 'Japan'
            break;
        case 'no':
            return 'Norway'
            break;
        case 'nz':
            return 'New Zealand'
            break;
        case 'se':
            return 'Sweden'
            break;
        case 'us':
            return 'United States'
            break;
    }
}