import {
    addNode,
    setContainer
} from "./diagram.js"

setContainer(document.querySelector("main"))


addNode(200, 200, [], 1, "A")
addNode(500, 100, [0], 2, "B")
addNode(500, 250, [], 3, "C")
addNode(500, 400, [0], 4, "D")
addNode(800, 400, [3], 5, "E")
addNode(800, 150, [1, 2, 3], 6, "F")
