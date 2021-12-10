const tipButtons = document.querySelectorAll('.amount')

const billInput = document.getElementById('bill-input')
const tipAmountInput = document.getElementById('custom-input')
const peopleNumberInput = document.getElementById('people-number-input')

const tipPerPerson = document.getElementById('tip-amount-text')
const totalPerPerson = document.getElementById('total-text')

const percIcon = document.getElementById('percentage-icon')
const selectedTipAmountText = document.getElementById('selectedTipAmount')

const resetBtn = document.getElementById('reset-btn')

var selectedTipAmount = 0
var bill = 0
var tipAmountPerPerson = 0
var totalMoneyPerPerson = 0

// Calculate on input change
billInput.addEventListener('input', calculateCost)
peopleNumberInput.addEventListener('input', calculateCost)


// Bill funcs.
billInput.addEventListener('keyup', () => { // Update bill
    updateBill(billInput.value);
})

function updateBill(value){

    if(value == ''){
        bill = 0
    }else if(value.endsWith('.')){ // Fix here
        value = value.slice(0, -1);
    }

    bill = parseFloat(value) 
}

// Tip funcs.
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        
        tipAmountInput.value = "" // Make custom input empty
        checkInput(tipAmountInput.value)
        if(btn instanceof HTMLInputElement){ // If clicked custom input, make value 0
            btn.setAttribute('data-amount', 0)
        }

        removeAllSelections() // Make all buttons unselected
        btn.classList.add('selected')
        btn.id = 'selected'

        const selectedTipBtn = document.getElementById('selected')
        selectedTipAmount = parseInt(selectedTipBtn.getAttribute('data-amount'))
        selectedTipAmountText.innerText = selectedTipAmount + '%'

        calculateCost()

    })

    btn.addEventListener('keyup', () => {
        removeAllSelections() // Make all buttons unselected
        btn.classList.add('selected')
        btn.id = 'selected'

        const selectedTipBtn = document.getElementById('selected')
        selectedTipAmount = parseInt(selectedTipBtn.getAttribute('data-amount'))
        selectedTipAmountText.innerText = selectedTipAmount + '%'

        calculateCost()
        
    })
})

function removeAllSelections(){ 
    tipButtons.forEach(btn => {
        btn.classList.remove('selected')
        btn.id = ''
    })
}


function checkInput(value) { // Custom tip input checker
    if (value != ""){
            percIcon.style.display = 'inline'
            tipAmountInput.style.outline = '2px solid #26c2ad'
    
            tipAmountInput.setAttribute("data-amount", value)
        }
    
    else {
        tipAmountInput.setAttribute("data-amount", 0)
        percIcon.style.display = 'none'
        tipAmountInput.style.outline = 'none'
    }
}

tipAmountInput.onkeydown = (e) => { //Prevent entering negative or float number
    if(!((e.keyCode > 95 && e.keyCode < 106)
    || (e.keyCode > 47 && e.keyCode < 58) 
    || e.keyCode == 8)) {
      return false;
    }
}

peopleNumberInput.onkeydown = (e) => { //Prevent entering negative or float number
    if(!((e.keyCode > 95 && e.keyCode < 106)
    || (e.keyCode > 47 && e.keyCode < 58) 
    || e.keyCode == 8)) {
      return false;
    }
}

// Right menu
function calculateCost(){ // Calculate costs per person and show on right menu

    if(billInput.value != "" && peopleNumberInput.value != "" && peopleNumberInput.valueAsNumber !== 0){
        tipAmountPerPerson = (bill*selectedTipAmount)/(100*peopleNumberInput.valueAsNumber)
        totalMoneyPerPerson = (bill + ((bill*selectedTipAmount)/100))/peopleNumberInput.valueAsNumber
        
        tipPerPerson.innerText = tipAmountPerPerson.toFixed(2) + "$"
        totalPerPerson.innerText = totalMoneyPerPerson.toFixed(2) + "$"
    }
}

// Reset button
resetBtn.addEventListener('click', () => {
    selectedTipAmount = 0
    bill = 0
    tipAmountPerPerson = 0
    totalMoneyPerPerson = 0

    billInput.value = ""
    peopleNumberInput.value = ""
    tipAmountInput.value = ""
    tipAmountInput.setAttribute('data-amount', 0)
    
    tipPerPerson.innerText = 0 + "$"
    totalPerPerson.innerText = 0 + "$"
    selectedTipAmountText.innerText = 0 + '%'
    
    checkInput(tipAmountInput.value)
    removeAllSelections()
})
