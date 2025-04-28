let _container
const nodes = []
const columns = [0]

const MIN_X = 100
const MIN_Y = 300
const NODE_WIDTH = 200
const NODE_HEIGHT = 110

export function setContainer(container) {
    _container = container
}

export function addNode(x, y, name = `Z${nodes.length}`, t, prev = []) {
    const index = nodes.length
    const node = {
        index, x, y, prev, t,
        next: [],
        element: null,
        prevLines: [],
        postLines: [],
        es: 0,
        ef: 0,
        ls: 0,
        r: 0,
        lf: 0,
        name
    }
    nodes.push(node)
    columnize(node)
    return node
}

export function drawNode(nodeData) {
    const node = document.createElement("div")
    const x = MIN_X + nodeData.column * NODE_WIDTH
    const y =  NODE_HEIGHT * nodeData.colIndex - columns[nodeData.column] * NODE_HEIGHT / 2 + MIN_Y
    node.className = "node"
    node.innerHTML = `
        <div class="row">
            <div class="cell es" data-key="es">${nodeData.es}</div>
            <div class="cell t" data-key="t">${nodeData.t}</div>
            <div class="cell ef" data-key="ef">${nodeData.ef}</div>
        </div>
        <div class="row">
            <div class="cell name" colspan="3">${nodeData.name}</div>
        </div>
        <div class="row">
            <div class="cell ls" data-key="ls">${nodeData.ls}</div>
            <div class="cell r" data-key="r">${nodeData.r}</div>
            <div class="cell lf" data-key="lf">${nodeData.lf}</div>
        </div>
    `
    node.style.left = `${x}px`
    node.style.top = `${y}px`
    return _container.appendChild(node)
}

function columnize(node) {
    let maxCol = -1
    for (let i = 0; i < node.prev.length; i++) {
        const col = nodes[node.prev[i]].column
        if (col > maxCol) maxCol = col
    }
    node.column = ++maxCol
    if (!columns[maxCol]) columns[maxCol] = 0
    node.colIndex = columns[maxCol]++
}

export function drawNodes() {
    for (const node of nodes) {
        node.element = drawNode(node)
        requestAnimationFrame(() => drawFirstLines(node))
        registerEvents(node)
    }
}

export function drawLine(start, end, element) {
    const [x1, y1] = start
    if (!element) {
        element = document.createElement("div")
        element.className = "line"
        _container.appendChild(element)
    }
    element.style.width = `${distance(start, end)}px`
    element.style.left = x1 + "px"
    element.style.top = y1 + "px"
    element.style.transform = `rotate(${angle(start, end)}rad)`
    return element
}

export function drawFirstLines(node) {
    for (let j = 0; j < node.prev.length; ++j) {
        const prevNode = nodes[node.prev[j]]
        const start = getPostPoint(prevNode.element)
        const end = getPrePoint(node.element)
        const line = {
            element: drawLine(start, end),
            start, end
        }
        node.prevLines.push(line)
        prevNode.postLines.push(line)
    }
}

export function getPostPoint(node) {
    const rect = node.getBoundingClientRect()
    return [rect.x + rect.width, rect.y + (rect.height / 2)]
}
export function getPrePoint(node) {
    const rect = node.getBoundingClientRect()
    return [rect.x, rect.y + (rect.height / 2)]
}

export function markPoint([x, y]) {
    const point = document.createElement("div")
    point.className = "point"
    point.style.left = `${x}px`
    point.style.top = `${y}px`
    return _container.appendChild(point)
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

export function registerEvents(node) {
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

export function compute() {
    const endNode = nodes[nodes.length - 1]
    computeNode(endNode)
}

document.getElementById("compute").onclick = compute

function computeNode(node) {
    let earlyStart = 0
    for (const prevIndex of node.prev) {
        computeNode(nodes[prevIndex])
        if (nodes[prevIndex].ef > earlyStart) {
            earlyStart = nodes[prevIndex].ef
        }
    }
    node.es = earlyStart
    node.ef = earlyStart + node.t
    rerenderNode(node)
}

function rerenderNode(node) {
    node.element.querySelector(".es").innerText = node.es
    node.element.querySelector(".ef").innerText = node.ef
}
