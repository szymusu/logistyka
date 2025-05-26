function makeTable(sellers, buyers, primaryMatrix, secondaryMatrix, highlight) {
    let buyerHeader = `
        <div class="cell gray"></div>
        <div class="cell gray"></div>
    `;
    for (const buyer of buyers) {
        buyerHeader += doubleCell(buyer.amount, buyer.name)
    }
    buyerHeader += cell("α")

    let buyerPrices = `
        <div class="cell gray"></div>
        <div class="cell gray"></div>
    `;
    for (const buyer of buyers) {
        buyerPrices += cell(buyer.price);
    }
    buyerPrices += cell();

    let dataRows = "";
    for (let i = 0; i < sellers.length; i++) {
        let row = doubleCell(sellers[i].amount, sellers[i].name) + cell(sellers[i].price)

        for (let j = 0; j < buyers.length; j++) {
            const index = getMatrixIndex(i, j)
            const className = highlight?.matrix === index ? "red" : "purple"
            row += secondaryMatrix ?
                doubleCell(secondaryMatrix[index], primaryMatrix[index], className)
                :
                cell(primaryMatrix[index], className)
        }

        const alphaClass = highlight?.alpha === i ? "red" : ""
        row += cell(alphaValues[i], alphaClass);

        dataRows += `<div class="row">${row}</div>`;
    }

    let betaRow = cell("β") + cell()
    for (let i = 0; i < betaValues.length; ++i) {
        const betaClass = highlight?.beta === i ? "red" : ""
        betaRow += cell(betaValues[i], betaClass)
    }

    const el = document.createElement("div");
    el.className = "table";
    el.innerHTML = `
        <div class="row">${buyerHeader}</div>
        <div class="row">${buyerPrices}</div>
        ${dataRows}
        <div class="row">${betaRow}</div>
    `;
    return el;
}

function cell(content, className) {
    if (content === undefined) content = ""
    if (className === undefined) className = ""
    return `<div class="cell ${className}">${content}</div>`
}

function doubleCell(topLeft, bottomRight, className) {
    return `
        <div class="cell ${className}">
            <div class="corner top-left">${topLeft}</div>
            <div class="corner bottom-right">${bottomRight}</div>
        </div>`
}

function renderTable(primaryMatrix, secondaryMatrix, highlight) {
    main.appendChild(makeTable(sellers, buyers, primaryMatrix, secondaryMatrix, highlight))
}

function getTransportCost(sellerIndex, buyerIndex) {
    return transport[getMatrixIndex(sellerIndex, buyerIndex)]
}

function getMatrixIndex(sellerIndex, buyerIndex) {
    return sellerIndex * buyers.length + buyerIndex
}

function findMax(matrix, excludes) {
    let max = -Infinity
    let maxIndex = -1
    for (let i = 0; i < matrix.length; i++) {
        if (excludes.includes(i)) continue
        if (matrix[i] > max) {
            max = matrix[i]
            maxIndex = i
        }
    }
    if (maxIndex === -1) return null

    const row = Math.floor(maxIndex / buyers.length)
    const col = maxIndex % buyers.length
    return { row, col, value: max, index: maxIndex }
}

function calculateProfit() {
    const profit = new Array(transport.length)
    for (let i = 0; i < sellers.length; i++) {
        const buyPrice = sellers[i].price

        for (let j = 0; j < buyers.length; j++) {
            const sellPrice = buyers[j].price

            const matrixIndex = getMatrixIndex(i, j)
            if (i === sellers.length - 1 || j === buyers.length - 1) {
                profit[matrixIndex] = 0
            }
            else {
                profit[matrixIndex] = sellPrice - buyPrice - transport[matrixIndex]
            }
        }
    }
    return profit
}

function balanceDemand() {
    const totalSupply = sellers.reduce((total, v) => total + v.amount, 0)
    const totalDemand = buyers.reduce((total, v) => total + v.amount, 0)

    if (totalSupply === totalDemand) return

    sellers.push({ name: "FD", price: 0, amount: totalDemand })
    buyers.push({ name: "FO", price: 0, amount: totalSupply })
    for (let i = 1; i < sellers.length; i++) {
        transport.splice(i * buyers.length - 1, 0, 0)
    }
    transport.push(0, ...sellers.map(_ => 0))
}


const main = document.querySelector("main");

const sellers = [
    { name: "D1", price: 7, amount: 20 },
    { name: "D2", price: 8, amount: 40 },
];

const buyers = [
    { name: "O1", price: 18, amount: 16 },
    { name: "O2", price: 16, amount: 12 },
    { name: "O3", price: 15, amount: 24 },
];

// const transport = new Array(sellers.length * buyers.length)
const transport = [
    4, 7, 2,
    8, 10, 4,
]

const iksy = transport.map(_ => "x")


balanceDemand()

const alphaValues = new Array(sellers.length)
const betaValues = new Array(buyers.length)

renderTable(transport)

const profit = calculateProfit()
renderTable(profit)

const excludes = []
let max = findMax(profit, excludes)
let i = 0
const transactions = new Int32Array(profit.length)
while (max !== null) {
    console.log("max", max.value)

    const seller = sellers[max.row]
    const buyer = buyers[max.col]
    if (buyer.amount > 0 && seller.amount > 0) {
        const transactionAmount = Math.min(seller.amount, buyer.amount)
        transactions[getMatrixIndex(max.row, max.col)] = transactionAmount
        seller.amount -= transactionAmount
        buyer.amount -= transactionAmount
    }

    renderTable(profit, transactions, {matrix: max.index})

    excludes.push(max.index)
    max = findMax(profit, excludes)
    i++
    if (i > profit.length) {
        break
    }
}

const totalCost = 0
const totalSell = 0
const totalTransport = 0
let totalProfit = 0

for (let i = 0; i < transactions.length; i++) {
    totalProfit += transactions[i] * profit[i]
}
alert(totalProfit)

// zakładamy se tak
const ALPHA_START = 0
alphaValues[ALPHA_START] = 0
renderTable(profit, transactions, { alpha: ALPHA_START })

function alphaIteration() {
    for (let alphaIndex = 0; alphaIndex < alphaValues.length; alphaIndex++) {
        if (alphaValues[alphaIndex] === undefined) continue

        for (let betaIndex = 0; betaIndex < betaValues.length; betaIndex++) {
            const matrixIndex = getMatrixIndex(alphaIndex, betaIndex)
            if (transactions[matrixIndex] > 0 && betaValues[betaIndex] === undefined) {
                betaValues[betaIndex] = profit[matrixIndex] - alphaValues[alphaIndex]
                renderTable(profit, transactions, { beta: betaIndex })
            }
        }
    }
}

function betaIteration() {
    for (let betaIndex = 0; betaIndex < betaValues.length; betaIndex++) {
        if (betaValues[betaIndex] === undefined) continue

        for (let alphaIndex = 0; alphaIndex < alphaValues.length; alphaIndex++) {
            const matrixIndex = getMatrixIndex(alphaIndex, betaIndex)
            if (transactions[matrixIndex] > 0 && alphaValues[alphaIndex] === undefined) {
                alphaValues[alphaIndex] = profit[matrixIndex] - betaValues[betaIndex]
                renderTable(profit, transactions, { alpha: alphaIndex })
            }
        }
    }
}

while (alphaValues.includes(undefined) || betaValues.includes(undefined)) {
    alphaIteration()
    betaIteration()
}

// kryterialne
const kryterialne = new Int32Array(profit.length)

for (let i = 0; i < kryterialne.length; i++) {
    kryterialne[i] = profit[i] - alphaValues[Math.floor(i / betaValues.length)] - betaValues[i % betaValues.length]
}

renderTable(kryterialne)
