import {
    addNode,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


addNode(200, 300)
addNode(300, 310, [0])
addNode(210, 310)
addNode(410, 360, [0])
addNode(510, 260, [3])
addNode(510, 360, [1, 2, 3])
