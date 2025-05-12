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

        <div style="background-color: #d3b0e1">

        </div>
        <div style="background-color: #d3b0e1">

        </div>
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
    { name: "O1", price: 1 },
    { name: "O2", price: 2 },
    { name: "O3", price: 3 },
]
main.appendChild(renderTable(sellers, buyers))
