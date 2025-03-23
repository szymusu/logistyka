import {
    addNode,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


addNode(200, 300, [], 1, "A")
addNode(300, 310, [0], 2, "B")
addNode(210, 310, [], 3, "C")
addNode(410, 360, [0], 4, "D")
addNode(510, 260, [3], 5, "E")
addNode(510, 360, [1, 2, 3], 6, "F")
