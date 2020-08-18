const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let figure = document.querySelectorAll('.app__figure');
let  draggableFigure = document.createElement('div');
let currentDroppable = null;
let items = [];
let figures =  {
    'circle': {
        'classToAdd': 'app__circle-draggable',
        drawFigure (x, y) {
            context.beginPath();
            context.arc(x, y, 50, 0, 2 * Math.PI);
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            context.fillStyle = "#2348b8";
            context.fill();
            context.stroke();
        },
    },

    'rectangle': {
        'classToAdd': 'app__rectangle-draggable',
        drawFigure (x, y) {
            context.beginPath();
            context.rect(x, y, 100, 80);
            context.lineWidth = 2;
            context.strokeStyle = '#000000';
            context.fillStyle = "#66a13d";
            context.fill();
            context.stroke();
        },
    },
}

figure.forEach(element => {

    element.onmousedown = function(event) {

        let figure = '';
        element.classList.contains('app__circle') ? figure = 'circle' : figure = 'rectangle';

        let shiftX = event.clientX - draggableFigure.getBoundingClientRect().left;
        let shiftY = event.clientY - draggableFigure.getBoundingClientRect().top;

        document.getElementById('figures-area').appendChild(draggableFigure);
        draggableFigure.classList.add(figures[figure].classToAdd);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            draggableFigure.style.left = pageX - shiftX/5 + 'px';
            draggableFigure.style.top = pageY - shiftY/5 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            draggableFigure.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            draggableFigure.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
                currentDroppable = droppableBelow;
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        draggableFigure.onmouseup = function() {

            document.removeEventListener('mousemove', onMouseMove);
            draggableFigure.onmouseup = null;

            if (currentDroppable) {
                enterDroppable(currentDroppable);
            }
            draggableFigure.remove();
            draggableFigure = document.createElement('div');
        };

        function enterDroppable() {

            let x = parseInt((draggableFigure.style.left)) - 88;
            let y = parseInt(draggableFigure.style.top);
            figures[figure].drawFigure (x, y);
            draggableFigure.remove();
            draggableFigure = document.createElement('div');

        }
    };
})

draggableFigure.ondragstart = function() {
    return false;
};
