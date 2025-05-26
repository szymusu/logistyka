function renderTable(sellers, buyers) {
    const el = document.createElement("div");

    const cellValues = [
        [ { top: 'x', bottom: 0 }, { top: 'x', bottom: 0 }, { top: 'x', bottom: 0 } ],
        [ { top: 'x', bottom: 0 }, { top: 'x', bottom: 0 }, { top: 'x', bottom: 0 } ],
    ];

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
        buyerHeader += `<div class="cell">${buyer.name}</div>`;
    }
    buyerHeader += `<div class="cell">FO</div><div class="cell">α</div>`;

    let buyerPrices = `
        <div class="cell gray"></div>
        <div class="cell gray"></div>
    `;
    for (const buyer of buyers) {
        buyerPrices += `<div class="cell">${buyer.price}</div>`;
    }
    buyerPrices += `<div class="cell">0</div><div class="cell"></div>`;

    let dataRows = "";
    for (let i = 0; i < sellers.length; i++) {
        let row = `<div class="cell">${sellers[i].name}</div><div class="cell">${sellers[i].price}</div>`;

        for (let j = 0; j < buyers.length; j++) {
            const { top, bottom } = cellValues[i][j];
            row += `
                <div class="cell purple">
                    <div class="corner top-left">${top}</div>
                    <div class="corner bottom-right">${bottom}</div>
                </div>
            `;
        }

        row += `<div class="cell">${foValues[i]}</div>`;
        row += `<div class="cell">${alphaValues[i]}</div>`;

        dataRows += `<div class="row">${row}</div>`;
    }

    let fdRow = `<div class="cell">FD</div><div class="cell">0</div>`;
    for (let j = 0; j < buyers.length; j++) {
        fdRow += `<div class="cell">${fdCellValues[j]}</div>`;
    }
    fdRow += `<div class="cell">${fdFoValue}</div><div class="cell">${fdAlpha}</div>`;

    let betaRow = '';
    for (const val of betaValues) {
        betaRow += `<div class="cell">${val}</div>`;
    }

    el.className = "table";
    el.innerHTML = `
        <div class="row">${buyerHeader}</div>
        <div class="row">${buyerPrices}</div>
        ${dataRows}
        <div class="row">${fdRow}</div>
        <div class="row">${betaRow}</div>
    `;
    return el;
}

const main = document.querySelector("main");

const sellers = [
    { name: "D1", price: 21 },
    { name: "D2", price: 37 },
];

const buyers = [
    { name: "O1", price: 1 },
    { name: "O2", price: 2 },
    { name: "O3", price: 3 },
];

main.appendChild(renderTable(sellers, buyers));
