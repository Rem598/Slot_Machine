const symbolCount = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const symbolValue = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
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
    const bet = 10; // Fixed bet for simplicity
    if (balance >= bet) {
        const slots = getSlotMachineSpin();
        document.getElementById("slot1").textContent = slots[0];
        document.getElementById("slot2").textContent = slots[1];
        document.getElementById("slot3").textContent = slots[2];

        const winnings = checkWinnings(slots, bet);
        balance += winnings - bet;

        document.getElementById("balance").textContent = `Balance: $${balance}`;
        document.getElementById("message").textContent = winnings > 0 ? `You won $${winnings}!` : `You lost $${bet}.`;
    } else {
        document.getElementById("message").textContent = "Not enough balance to play.";
    }
});
