function makeTable(sellers, buyers, primaryMatrix, secondaryMatrix) {
    const foValues = ['0', '0'];
    const alphaValues = [0, 0, 0];
    const fdCellValues = ['0', '0', '0'];
    const fdFoValue = '0';
    const fdAlpha = '0';
    const betaValues = ["β", "", 0, 0, 0, 0, 0];

    let buyerHeader = `
        <div class="cell gray"></div>
        <div class="cell gray"></div>
    `;
    for (const buyer of buyers) {
        buyerHeader += doubleCell(buyer.amount, buyer.name)
    }
    // buyerHeader += doubleCell("0", "FO") + cell("α")

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
            row += secondaryMatrix ?
                doubleCell(secondaryMatrix[index], primaryMatrix[index], "purple")
                :
                cell(primaryMatrix[index], "purple")
        }

        // row += `<div class="cell">${foValues[i]}</div>`;
        row += `<div class="cell">${alphaValues[i]}</div>`;

        dataRows += `<div class="row">${row}</div>`;
    }

    // let fdRow = doubleCell(0, "FD") + cell("0");
    // for (let i = 0; i < buyers.length; i++) {
    //     fdRow += cell(fdCellValues[i]);
    // }
    // fdRow += cell(fdFoValue) + cell(fdAlpha)

    const betaRow = betaValues.reduce((res, val) => res + cell(val), "")

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
    return `<div class="cell ${className}">${content}</div>`
}

function doubleCell(topLeft, bottomRight, className) {
    return `
        <div class="cell ${className}">
            <div class="corner top-left">${topLeft}</div>
            <div class="corner bottom-right">${bottomRight}</div>
        </div>`
}

function renderTable(primaryMatrix, secondaryMatrix) {
    main.appendChild(makeTable(sellers, buyers, primaryMatrix, secondaryMatrix))
}

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

function balanceDemand() {
    const totalSupply = sellers.reduce((total, v) => total + v.price, 0)
    const totalDemand = buyers.reduce((total, v) => total + v.price, 0)

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
    { name: "D1", price: 21, amount: 10 },
    { name: "D2", price: 37, amount: 11 },
];

const buyers = [
    { name: "O1", price: 1, amount: 20 },
    { name: "O2", price: 2, amount: 7 },
    { name: "O3", price: 3, amount: 3 },
];

// const transport = new Array(sellers.length * buyers.length)
const transport = [
    1, 2, 3,
    4, 5, 6,
]

const iksy = transport.map(_ => "x")

balanceDemand()
console.log(transport)

renderTable(transport)

calculateProfit()
