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

let balance = 100;

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

function checkWinnings(slots, bet) {
    const winnings = slots.every(slot => slot === slots[0]) ? symbolValue[slots[0]] * bet : 0;
    return winnings;
}

document.getElementById("spin-button").addEventListener("click", () => {
    const depositAmount = parseFloat(document.getElementById("deposit_amount").value) || 0;
    const betAmount = parseFloat(document.getElementById("bet_amount").value) || 0;

    balance += depositAmount;

    if (balance >= betAmount) {
        const slots = getSlotMachineSpin();
        document.getElementById("slot1").textContent = slots[0];
        document.getElementById("slot2").textContent = slots[1];
        document.getElementById("slot3").textContent = slots[2];

        const winnings = checkWinnings(slots, betAmount);
        balance += winnings - betAmount;

        document.getElementById("balance").textContent = `Balance: $${balance.toFixed(2)}`;
        document.getElementById("message").textContent = winnings > 0 ? `You won $${winnings}!` : `You lost $${betAmount}.`;

    } else {
        document.getElementById("message").textContent = "Not enough balance to play.";
    }

    document.getElementById("deposit_amount").value = '';
});
