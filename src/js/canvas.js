import utils, { randomColor } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const stepsize = 20
const movesize = stepsize

const canvasTouchBorder = '#CA2C68'
const canvasNormalBorder = '#707070'

/*
canvas.width = innerWidth - 10
canvas.height = innerHeight - 10
*/

canvas.width = 1000
canvas.height = 800


const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f39c12',
    '#d35400',
    '#bdc3c7',
    '#7f8c8d'
]

const colornames = [
    'darkgreen',
    'lightgreen',
    'blue',
    'purple',
    'black',
    'yellow',
    'orange',
    'red',
    'lightgrey',
    'grey'
]

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

addEventListener('keydown', (e) => {

    // First the main directions, then diagonal

    var x = object.x
    var y = object.y

    if (e.key == 'w' || e.key == 'ArrowUp') {
        y -= movesize
    } else if (e.key == 'a' || e.key == 'ArrowLeft') {
        x -= movesize
    } else if (e.key == 's' || e.key == 'ArrowDown') {
        y += movesize
    } else if (e.key == 'd' || e.key == 'ArrowRight') {
        x += movesize
    } else {
        console.log(e)
    }
    setPosition(object, x, y)
    logPosition(object)
    sendPosition(object)
})


function setPosition(object, x, y) {

    canvas.style.borderColor = canvasNormalBorder

    if (x > canvas.width - object.radius) {
        x = canvas.width - object.radius
        canvas.style.borderColor = canvasTouchBorder
    }

    if (x < 0 + object.radius) {
        x = 0 + object.radius
        canvas.style.borderColor = canvasTouchBorder
    }

    if (y > canvas.height - object.radius) {
        y = canvas.height - object.radius
        canvas.style.borderColor = canvasTouchBorder
    }

    if (y < 0 + object.radius) {
        y = 0 + object.radius
        canvas.style.borderColor = canvasTouchBorder
    }

    object.x = x
    object.y = y

}

function sendPosition(object) {
    console.log("send position to server over ws")
}

function logPosition(object) {
    console.log(object.uuid + ' position: ' + object.x + '/' + object.y)
}

function getNameforColor(color, colors, colornames) {
    return colornames[colors.indexOf(color)]
}

function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function getLengthForText(text) {
    var fontSize = 12
    var body = document.body;
    var para = document.createElement('div');
    para.textContent = "Hello";
    para.style.fontSize = fontSize

    //para.style.display = 'inline'
    para.style.position = 'absolute'
    para.style.visibility = 'hidden'
    para.style.height = 'auto'
    para.style.width = 'auto'
    para.style.whiteSpace = 'nowrap'

    body.appendChild(para);

    var cwidth = (para.clientWidth + 1)

    console.log("WIDTH: " + cwidth)
    console.log("2WIDTH: " + Math.floor(cwidth / 2))
    para.parentNode.removeChild(para)
    return cwidth
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Objects
function Object(x, y, radius, color, colorname, namelength, uuid) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.fontcolor = getContrastYIQ(this.color)
    this.name = colorname
    this.namelength = namelength
    this.uuid = uuid
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.fillStyle = this.fontcolor
    c.fillText(this.name, this.x - Math.floor(this.namelength / 2), this.y)
    c.fillStyle = this.color

}

Object.prototype.update = function() {
    this.draw()
}

// Implementation
let bubbles
let object

function init() {

    bubbles = []

    // player bubble
    let color = randomColor(colors)
    let name = getNameforColor(color, colors, colornames)
    var startX = Math.round((Math.floor(Math.random() * canvas.width)) / 10) * 10
    var startY = Math.round((Math.floor(Math.random() * canvas.height)) / 10) * 10
    object = new Object(startX, startY, stepsize, color, name, getLengthForText(name), uuidv4())
    bubbles.push(object)
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
        //object.update()

    bubbles.forEach(bubble => {
        bubble.update()
    })

}

init()
animate()