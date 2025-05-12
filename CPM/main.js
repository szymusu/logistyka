import {
    addNode, compute, drawNodes,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


// addNode("START", 0)
// addNode("A", 3, [0])
// addNode("B", 5, [0])
// addNode("C", 2, [1])
// addNode("D", 4, [2])
// addNode("E", 3, [2])
// addNode("F", 2, [3, 4])
// addNode("G", 4, [5])
// addNode("H", 3, [6, 7])
// addNode("I", 2, [8])


function readData(nodeInfoList) {
    for (const nodeInfo of nodeInfoList) {
        const prev = []
        for (const prevName of nodeInfo.prevNames) {
            for (let i = 0; i < nodeInfoList.length; i++) {
                if (nodeInfoList[i].name === prevName) {
                    prev.push(i)
                }
            }
        }
        addNode(nodeInfo.name, nodeInfo.t, prev)
    }
}

function readText(text = "") {
    const lines = text.split("\n")
    const nodeInfoList = []
    for (const line of lines) {
        const [name, t, prevNamesString] = line.split(";")
        console.log(name)
        const prevNames = prevNamesString.split(",").map(name => name.trim())
        nodeInfoList.push({ name, t: parseInt(t), prevNames })
    }
    readData(nodeInfoList)
}

// readText("START;0;\nA;3;START\nB;5;START\nC;2;A\nD;4;B\nE;3;B\nF;2;C,D\nG;4;E\nH;3;F,G\nI;2;H")

document.getElementById("read").onclick = () => {
    const input = document.querySelector("textarea")
    const text = input.value
    document.getElementById("input").hidden = true
    readText(text.trim())
    drawNodes()
    compute()
}
