function renderTable(sellers, buyers) {
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
    for (let i = 0; i < transport.length; i++) {
        transportMatrix += `<div>${transport[i]}</div>`
        if ((i + 1) % buyers.length === 0 && i + 1 !== transport.length) {
            transportMatrix += '</div><div class="row" style="background-color: #d3b0e1">'
        }
    }
    transportMatrix += "</div>"

    el.className = "row"
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

const main = document.querySelector("main")
const sellers = [
    { name: "D1", price: 21 },
    { name: "D2", price: 37 },
]
const buyers = [
    { name: "O1", price: 2.99 },
    { name: "O2", price: 2.90 },
    { name: "O3", price: 3.14 },
]
// const transport = new Array(sellers.length * buyers.length)
const transport = [
    1, 2, 3,
    4, 5, 6
]

function getTransportCost(sellerIndex, buyerIndex) {
    return transport[sellerIndex * buyers.length + buyerIndex]
}

main.appendChild(renderTable(sellers, buyers))
