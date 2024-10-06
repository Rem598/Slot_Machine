// Slot machine symbols and values
const symbolCount = {
    "🍒": 2,
    "🍋": 4,
    "🍉": 6,
    "🍊": 8,
    "🍓": 10
};

const symbolValue = {
    "🍒": 5,
    "🍋": 4,
    "🍉": 3,
    "🍊": 2,
    "🍓": 1
};

// Start with a default balance
let balance = 100;

// Function to simulate the slot machine spin
function getSlotMachineSpin() {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolCount)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const slots = [];
    for (let i = 0; i < 3; i++) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        slots.push(randomSymbol);
    }

    return slots;
}

// Function to calculate winnings
function checkWinnings(slots, bet) {
    const winnings = slots.every(slot => slot === slots[0]) ? symbolValue[slots[0]] * bet : 0;
    return winnings;
}

// Handle form submission (without actual submission)
document.getElementById("spin-button").addEventListener("click", () => {
    // Get the deposit and bet amounts from the form
    const depositAmount = parseFloat(document.getElementById("deposit_amount").value) || 0;
    const betAmount = parseFloat(document.getElementById("bet_amount").value) || 0;

    // Update balance if deposit is provided
    balance += depositAmount;

    // Check if there's enough balance for the bet
    if (balance >= betAmount) {
        const slots = getSlotMachineSpin();
        // Update the slot results in the DOM
        document.getElementById("slot1").textContent = slots[0];
        document.getElementById("slot2").textContent = slots[1];
        document.getElementById("slot3").textContent = slots[2];

        // Check winnings and update balance
        const winnings = checkWinnings(slots, betAmount);
        balance += winnings - betAmount;

        // Update the balance display
        document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;

        // Display win/loss message
        document.getElementById("message").textContent = winnings > 0 ? `You won $${winnings}!` : `You lost $${betAmount}.`;

    } else {
        document.getElementById("message").textContent = "Not enough balance to play.";
    }

    // Clear the deposit field after updating the balance
    document.getElementById("deposit_amount").value = '';
});
