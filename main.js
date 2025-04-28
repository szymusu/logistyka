import {
    addNode, drawNodes,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


addNode(200, 300, "START", 0)
addNode(200, 300, "A", 3, [0])
addNode(210, 310, "B", 5, [0])
addNode(300, 310, "C", 2, [1])
addNode(410, 360, "D", 4, [2])
addNode(510, 260, "E", 3, [2])
addNode(510, 360, "F", 2, [3, 4])
addNode(550, 360, "G", 4, [5])
addNode(550, 360, "H", 3, [6, 7])
addNode(600, 310, "I", 2, [8])

drawNodes()
