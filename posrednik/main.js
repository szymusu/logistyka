function makeTable(sellers, buyers, matrix) {
    const el = document.createElement("div")

    let sellerCells = ""
    for (const seller of sellers) {
        sellerCells += `<div>${seller.name}</div>`
    }
    let sellerPriceCells = ""
    for (const seller of sellers) {
        sellerPriceCells += `<div>${seller.price}</div>`
    }

    let buyerCells = ""
    for (const buyer of buyers) {
        buyerCells += `<div>${buyer.name}</div>`
    }
    let buyerPriceCells = ""
    for (const buyer of buyers) {
        buyerPriceCells += `<div>${buyer.price}</div>`
    }

    let transportMatrix = '<div class="row" style="background-color: #d3b0e1">'
    for (let i = 0; i < matrix.length; i++) {
        transportMatrix += `<div>${matrix[i]}</div>`
        if ((i + 1) % buyers.length === 0 && i + 1 !== matrix.length) {
            transportMatrix += '</div><div class="row" style="background-color: #d3b0e1">'
        }
    }
    transportMatrix += "</div>"

    el.className = "row table"
    el.innerHTML = `
    
    <div>
        <div style="background-color: #bbb; min-height: 80px"></div>
        <div class="row">
            <div>${sellerCells}</div>
            <div>${sellerPriceCells}</div>
        </div>
    </div>

    <div>
        <div class="row">${buyerCells}</div>
        <div class="row">${buyerPriceCells}</div>

        ${transportMatrix}
    </div>
    
    `
    return el
}

function renderTable(matrix) {
    main.appendChild(makeTable(sellers, buyers, matrix))
}

const main = document.querySelector("main")
const sellers = [
    { name: "D1", price: 21 },
    { name: "D2", price: 37 },
]
const buyers = [
    { name: "O1", price: 40 },
    { name: "O2", price: 41 },
    { name: "O3", price: 33 },
]
// const transport = new Array(sellers.length * buyers.length)
const transport = [
    1, 2, 3,
    4, 5, 6
]

function getTransportCost(sellerIndex, buyerIndex) {
    return transport[getMatrixIndex(sellerIndex, buyerIndex)]
}

function getMatrixIndex(sellerIndex, buyerIndex) {
    return sellerIndex * buyers.length + buyerIndex
}

function calculateProfit() {
    const profit = new Array(transport.length)
    for (let i = 0; i < sellers.length; i++) {
        const buyPrice = sellers[i].price

        for (let j = 0; j < buyers.length; j++) {
            const sellPrice = buyers[i].price

            const matrixIndex = getMatrixIndex(i, j)
            profit[matrixIndex] = sellPrice - buyPrice - transport[matrixIndex]
        }
    }
    renderTable(profit)
}

renderTable(transport)

calculateProfit()
