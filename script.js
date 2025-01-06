const slider = document.getElementById('myRange');
const sliderValue = document.querySelector('.js-grid-number-div');
let size = 20;
document.querySelector('.color-button').classList.add('clicked');
updateSliderValue(size);
let mode = 'color';
let color = 'black';
updateGrid(size,mode);
let penPickerElement = document.getElementById('picker');
penPickerElement.addEventListener('input', function() {
console.log(penPickerElement.value);
color = penPickerElement.value;
});

function updateGrid(size,mode) {
    let gridContainer = document.querySelector('.left-pane');
    const divSize = 675 / size;
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, ${divSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, ${divSize}px)`;

    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.style.width = `${divSize}px`;
        div.style.height = `${divSize}px`;

        if(mode === 'color'){
            div.addEventListener('mouseover', () => {
                div.style.backgroundColor = `${color}`;
            });
        }
        else if(mode === 'rainbow')
        {
            
            div.addEventListener('mouseover', () => {
                let random1 = Math.floor(Math.random() * 255);
                let random2 = Math.floor(Math.random() * 255);
                let random3 = Math.floor(Math.random() * 255);
                div.style.backgroundColor = `rgb(${random1}, ${random2}, ${random3})`;
            });
        }


        gridContainer.appendChild(div);
    }
}

function updateSliderValue(size)
{
    sliderValue.innerHTML = `${size} x ${size}`;
}

slider.addEventListener('input', function(){ 
            size = slider.value;
            updateSliderValue(size);
            updateGrid(size,mode);
});

function clearButtonClicked()
{
    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.backgroundColor = 'white'; 
    });
}

function colorButtonClicked() {
    const temp = mode;
    mode = 'color';
    color = document.getElementById('picker').value;
    if (temp === 'rainbow') {
        updateGrid(size, mode);
    }
   document.querySelector('.eraser-button').classList.remove('clicked');
   document.querySelector('.rainbow-button').classList.remove('clicked');
   document.querySelector('.color-button').classList.add('clicked');
}

function rainbowButtonClicked()
{
   mode = 'rainbow';
   updateGrid(size,mode);
   document.querySelector('.eraser-button').classList.remove('clicked');
   document.querySelector('.rainbow-button').classList.add('clicked');
   document.querySelector('.color-button').classList.remove('clicked');
}

function eraserButtonClicked()
{
   mode = 'eraser';
   color = 'white';
   document.querySelector('.eraser-button').classList.add('clicked');
   document.querySelector('.rainbow-button').classList.remove('clicked');
   document.querySelector('.color-button').classList.remove('clicked');
   document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = color;
    });
});
}
 
