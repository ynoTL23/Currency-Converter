const attribute = 'flag-icon flag-icon-' // the class for the flag
const validChars = /[0-9]+/ // valid chars for input

// Track when left's currency changes
document.querySelector('#currency-left').addEventListener('change', (e) => {
    const countryCode = e.target.selectedOptions[0].id // the country's code

    // Change text
    changeText('left', countryCode)

    // Change the flag
    changeFlag('left', countryCode)

    // Set amount to empty
    amountInput('left').value = ''
    amountInput('right').value = ''
})

// Track right side's currency changes
document.querySelector('#currency-right').addEventListener('change', (e) => {
    const countryCode = e.target.selectedOptions[0].id // the country's code

    // Change text
    changeText('right', countryCode)

    // Change the flag
    changeFlag('right', countryCode)

    // Set amount to empty
    amountInput('left').value = ''
    amountInput('right').value = ''
})

// dynamic rate updates
document.querySelector('#left-currency-amount').addEventListener('keypress', (e) => {
    // check if key pressed is valid
    if(!validChars.test(e.key)) {
        e.preventDefault() // if not, dont update anything
    } else { // else, it is a valid input, calculate the conversion
        calculateRate(leftCurrencyCode(), rightCurrencyCode(), amountInput('left'), amountOutput('right'))
    }
})

// dynamic rate updates
document.querySelector('#right-currency-amount').addEventListener('keypress', (e) => {
    // check if key pressed is valid
    if(!validChars.test(e.key)) {
        e.preventDefault() // if not, dont update anything
    } else { // else, it is a valid input, calculate the conversion
        calculateRate(leftCurrencyCode(), rightCurrencyCode(), amountInput('right'), amountOutput('left'))
    }
})

// swap the currencies
document.querySelector('.exchange').addEventListener('mousedown', () => {
    swapSides()
})

const leftCurrencyCode = () => document.querySelector('#currency-left')
const rightCurrencyCode = () => document.querySelector('#currency-right')
const amountInput = (side) => document.querySelector(`#${side}-currency-amount`)
const amountOutput = (side) => document.querySelector(`#${side}-currency-amount`)

// fromCurrencyCode = the currency code (USD)
// toCurrencyCode = the currency to convert to (CAD)
const getRate = async (fromCurrencyCode, toCurrencyCode) => {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyCode}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.rates[`${toCurrencyCode}`]
    } else {
        throw new Error('Currency not supported or something else happened.')
    }
}

// fromCurrency = DOM object that holds currency code to convert from
// toCurrency = DOM object that holds currency code to convert to
// fromInput = DOM text field that holds the number value to convert from
// toOutput = DOM text field that holds the number value to convert to
const calculateRate = (fromCurrency, toCurrency, fromInput, toInput) => {
    getRate(`${fromCurrency.value}`, `${toCurrency.value}`).then((rate) => {
        const convertedRate = (fromInput.value * rate).toFixed(2)
        toInput.value = convertedRate
    }).catch((err) => {
        console.log(err)
    })
}

const swapSides = () => {
    // gather left side money value
    let leftMoney = document.querySelector('#left-currency-amount')

    // gather right side money value
    let rightMoney = document.querySelector('#right-currency-amount')

    // temp vars setup
    const tempCountryCode = leftCurrencyCode().selectedOptions[0].id
    const tempCurrencyCode = leftCurrencyCode().value
    const tempMoney = leftMoney.value

    // set left side with the right's
    changeText('left', rightCurrencyCode().selectedOptions[0].id) // change the text
    changeFlag('left', rightCurrencyCode().selectedOptions[0].id) // change the flag
    leftCurrencyCode().value = rightCurrencyCode().value // update the selector
    leftMoney.value = rightMoney.value // change the input value

    // set right side
    changeText('right', tempCountryCode)
    changeFlag('right', tempCountryCode)
    rightCurrencyCode().value = tempCurrencyCode
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
