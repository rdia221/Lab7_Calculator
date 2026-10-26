
const display = document.getElementById("display");

// Open and close menu
function toggleMenu() {
    document.getElementById("menu").classList.toggle("hidden");
}

// Change calculator mode
function showMode(mode) {
    ["basic", "scientific", "units", "currency"].forEach(id => {
        document.getElementById(id).classList.add("hidden");
    });

    document.getElementById(mode).classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
}

// Basic calculator
function press(value) {
    if (display.value === "Error") display.value = "0";

    if (display.value === "0" && "0123456789.".includes(value))
        display.value = value;
    else
        display.value += value;
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        if (!/^[0-9+\-*/%.() ]+$/.test(display.value))
            throw Error();

        let answer = Function("return (" + display.value + ")")();

        if (!Number.isFinite(answer)) throw Error();

        display.value = Number(answer.toFixed(8));
    } catch {
        display.value = "Error";
    }
}

// Scientific calculator
function scientific(operation) {
    let n = Number(document.getElementById("number").value);
    let answer;

    switch (operation) {
        case "sqrt": answer = Math.sqrt(n); break;
        case "square": answer = n * n; break;
        case "cube": answer = n * n * n; break;
        case "sin": answer = Math.sin(n * Math.PI / 180); break;
        case "cos": answer = Math.cos(n * Math.PI / 180); break;
        case "tan": answer = Math.tan(n * Math.PI / 180); break;
        case "log": answer = Math.log10(n); break;
    }

    document.getElementById("sciResult").textContent =
        "Result: " + (Number.isFinite(answer) ? answer : "Invalid input");
}

// Unit conversion
function convertUnit() {
    let n = Number(document.getElementById("unitValue").value);
    let from = document.getElementById("unitFrom").value;
    let to = document.getElementById("unitTo").value;
    let answer;

    if (from === to) answer = n;
    else if (from === "km" && to === "m") answer = n * 1000;
    else if (from === "m" && to === "km") answer = n / 1000;
    else if (from === "kg" && to === "g") answer = n * 1000;
    else if (from === "g" && to === "kg") answer = n / 1000;
    else if (from === "C" && to === "F") answer = n * 9 / 5 + 32;
    else if (from === "F" && to === "C") answer = (n - 32) * 5 / 9;
    else answer = null;

    document.getElementById("unitResult").textContent =
        answer === null ? "These units cannot be converted."
        : "Result: " + answer;
}

// Currency conversion (sample rates, not live)
function convertCurrency() {
    let amount = Number(document.getElementById("amount").value);
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;

    const rates = { USD: 1, PKR: 280, EUR: 0.92 };

    let answer = amount / rates[from] * rates[to];

    document.getElementById("currencyResult").textContent =
        "Result: " + answer.toFixed(2) + " " + to;
}
