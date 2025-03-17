function drawNode(x, y) {
    const node = document.createElement("div")
    node.className = "node"
    node.innerText = "aaaaa"
    node.style.left = `${x}px`
    node.style.top = `${y}px`
    return main.appendChild(node)
}

function drawLine(start, end, element) {
    const [x1, y1] = start
    if (!element) {
        element = document.createElement("div")
        element.className = "line"
        main.appendChild(element)
    }
    element.style.width = `${distance(start, end)}px`
    element.style.left = x1 + "px"
    element.style.top = y1 + "px"
    element.style.transform = `rotate(${angle(start, end)}rad)`
    return element
}

function getPostPoint(node) {
    const rect = node.getBoundingClientRect()
    return [rect.x + rect.width, rect.y + (rect.height / 2)]
}
function getPrePoint(node) {
    const rect = node.getBoundingClientRect()
    return [rect.x, rect.y + (rect.height / 2)]
}

function markPoint([x, y]) {
    const point = document.createElement("div")
    point.className = "point"
    point.style.left = `${x}px`
    point.style.top = `${y}px`
    return main.appendChild(point)
}

function distance([x1, y1], [x2, y2]) {
    const x = x2 - x1
    const y = y2 - y1
    return Math.sqrt(x*x + y*y)
}

function angle([x1, y1], [x2, y2]) {
    const tan = (y2 - y1) / (x2 - x1)
    return Math.atan(tan)
}

const main = document.querySelector("main")

const node1 = drawNode(400, 100)
const node2 = drawNode(700, 150)

const start = getPostPoint(node1)
const end = getPrePoint(node2)
markPoint(start)
markPoint(end)

const line = drawLine(start, end)


node1.onmousedown = ev => {
    ev.preventDefault()
    node1.style.backgroundColor = "#ffc"
    document.onmousemove = evMove => {
        node1.style.left = evMove.clientX + "px"
        node1.style.top = evMove.clientY + "px"
        drawLine(getPostPoint(node1), end, line)
    }
    document.onmouseup = () => {
        node1.style.backgroundColor = null
        document.onmousemove = null
        document.onmouseup = null
    }
}

function addNode(x, y, prev = []) {
    const index = nodes.length
    const node = { index, x, y, prev, next: [], element: null, prevLines: [], postLines: [] }
    nodes.push(node)
    return node
}

const nodes = []
addNode(200, 300)
addNode(300, 310, [nodes[0]])
addNode(210, 310)
addNode(410, 360, [nodes[0]])
addNode(510, 260, [nodes[3]])
addNode(510, 360, [nodes[1], nodes[2], nodes[3]])

for (let i = 0; i < nodes.length; ++i) {
    const node = nodes[i]
    node.element = drawNode(node.x, node.y)

    for (let j = 0; j < node.prev.length; ++j) {
        const start = getPostPoint(node.prev[j].element)
        const end = getPrePoint(node.element)
        const line = {
            element: drawLine(start, end),
            start, end
        }
        node.prevLines.push(line)
        node.prev[j].postLines.push(line)
    }

    node.element.onmousedown = ev => {
        ev.preventDefault()
        node.element.style.backgroundColor = "#ffc"
        document.onmousemove = evMove => {
            node.element.style.left = evMove.clientX + "px"
            node.element.style.top = evMove.clientY + "px"
            for (let j = 0; j < node.postLines.length; j++) {
                const line = node.postLines[j]
                const start = getPostPoint(node.element)
                drawLine(start, line.end, line.element)
                line.start = start
            }
            for (let j = 0; j < node.prevLines.length; j++) {
                console.log(j)
                const line = node.prevLines[j]
                const end = getPrePoint(node.element)
                drawLine(line.start, end, line.element)
                line.end = end
            }
        }
        document.onmouseup = () => {
            node.element.style.backgroundColor = null
            document.onmousemove = null
            document.onmouseup = null
        }
    }

}
