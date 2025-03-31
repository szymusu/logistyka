import {
    addNode, drawNodes,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


addNode(200, 300, "A", 3)
addNode(210, 310, "B", 5)
addNode(300, 310, "C", 2, [0])
addNode(410, 360, "D", 4, [1])
addNode(510, 260, "E", 3, [1])
addNode(510, 360, "F", 2, [2, 3])
addNode(550, 360, "G", 4, [4])
addNode(550, 360, "H", 3, [5, 6])
addNode(600, 310, "I", 2, [7])

drawNodes()
