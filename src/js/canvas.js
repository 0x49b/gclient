import utils, { randomColor } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const stepsize = 20
const movesize = stepsize + 5

let socket


const canvasTouchBorder = '#CA2C68'
const canvasNormalBorder = '#707070'

/*
canvas.width = innerWidth - 10
canvas.height = innerHeight - 10
*/

canvas.width = 700
canvas.height = 800


const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = [
    '#FFC312',
    '#F79F1F',
    '#12CBC4',
    '#FDA7DF',
    '#B53471',
    '#EE5A24',
    '#009432',
    '#0652DD',
    '#5758BB',
    '#6F1E51'
]

const colornames = [
    'yellow',
    'orange',
    'turquise',
    'pink',
    'magenta',
    'orange',
    'green',
    'blue',
    'purple',
    'mpurple'
]

addEventListener('resize', () => {
    init()
})

let keysPressed = {};
addEventListener('keydown', (e) => {
    // First the main directions, then diagonal
    var x = object.x
    var y = object.y


    keysPressed[e.key] = true;

    if (['w', 'a','s','d','W','A','S','D','ArrowUp','ArrowLeft','ArrowDown','ArrowRight'].includes(e.key)){
   
        if (keysPressed['w'] && keysPressed['d'] || keysPressed['W'] && keysPressed['D'] || keysPressed['ArrowUp'] && keysPressed['ArrowRight']) {
            x += movesize
            y -= movesize
            object.direction = "wd"
        } else if (keysPressed['s'] && keysPressed['d'] || keysPressed['S'] && keysPressed['D'] || keysPressed['ArrowDown'] && keysPressed['ArrowRight']) {
            x += movesize
            y += movesize
            object.direction = "sd"
        } else if (keysPressed['a'] && keysPressed['s'] || keysPressed['A'] && keysPressed['S'] || keysPressed['ArrowLeft'] && keysPressed['ArrowDown']) {
            x -= movesize
            y += movesize
            object.direction = "as"
        } else if (keysPressed['w'] && keysPressed['a'] || keysPressed['W'] && keysPressed['A'] || keysPressed['ArrowUp'] && keysPressed['ArrowLeft']) {
            x -= movesize
            y -= movesize
            object.direction = "wa"
        } else if (e.key == 'w' || e.key == 'W' || e.key == 'ArrowUp') {
            y -= movesize
            object.direction = "w"
        } else if (e.key == 'a' ||e.key == 'A' || e.key == 'ArrowLeft') {
            x -= movesize
            object.direction= "a"
        } else if (e.key == 's' ||e.key == 'S' || e.key == 'ArrowDown') {
            y += movesize
            object.direction = "s"
        } else if (e.key == 'd' ||e.key == 'D' || e.key == 'ArrowRight') {
            x += movesize
            object.direction = "d"
        } else {}


        setPosition(object, x, y)
        logPosition(object)
        sendPosition(object)
    }
})

 addEventListener('keyup', (event) => {
    delete keysPressed[event.key];

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

function objectToJSON(object){
    var jobj = { uuid: object.uuid, x: object.x, y: object.y, color: object.color, direction:object.direction}
    return JSON.stringify(jobj)
}

function sendPosition(object) {
    console.log("send position to server over ws")
    if(socket.readyState === socket.OPEN){
        socket.send(objectToJSON(object))
    }
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
    para.style.position = 'absolute'
    para.style.visibility = 'hidden'
    para.style.height = 'auto'
    para.style.width = 'auto'
    para.style.whiteSpace = 'nowrap'
    body.appendChild(para);
    var cwidth = (para.clientWidth + 1)
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

function registerSocketEventlistener(){

    socket.addEventListener('message', function(event){
        console.log("got message ", event.data)
        checkMessage(event.data)
    })

    socket.addEventListener('error', function(event){
        console.error("something bad happend on the socker ", event)
    })
}

function checkMessage(raw_data){

    var data = JSON.parse(raw_data)
    
    for(let i in bubbles){
        if (bubbles[i].uuid == data.uuid){
            console.log("SAME")
            bubbles[i].x = data.x
            bubbles[i].y = data.y

        } else {
            console.log(data.message)
            let color = data.color
            let name = getNameforColor(color, colors, colornames)
            let obj = new Object(data.x, data.y, stepsize, color, name, getLengthForText(name), data.uuid)
            bubbles.push(obj)
        }
    }

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
    this.direction = null
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

    //socket = new WebSocket("ws://127.0.0.1:8080/ws");
    socket = new WebSocket("ws://213.167.224.113:9999/ws");
    console.log("Attempting Connection...");

    
    socket.onopen = () => {
        console.log("Successfully Connected");
        registerSocketEventlistener()
        sendPosition(object)
    };

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

    bubbles.forEach(bubble => {
        bubble.update()
    })

}

init()
animate()