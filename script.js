
 const correctAnswers = [
            ['A', 'T', 'A', 'R', 'I', null, 'K', 'A', 'R', 'A'],
            ['1M', 'A', 'R', 'I', 'N', null, 'R', 'A','U','K',],
  ['P', 'U', 'K', 'I', 'N', 'P', 'A', 'R','T','A',],
  ['P', 'O', 'U', 'T', 'A', null, 'A', 'I','A','2I',],
  ['E', '3T', 'U', 'I', 'L', 'E', 'V', 'A','T',null,],
  ['L', 'A', 'S', 'T', 'A', null, 'I', '4T','A','R',],
  ['I', null, null, null, null, null, null, 'T',null,'O',],
  ['K', 'R', '5A', 'K', 'A', null, 'L', 'O','I','S',],
  ['U', 'U', 'T', 'I', 'S', 'P', 'O', 'M','M','I',],
  ['K', 'O', 'R', 'I', 'T', null, 'K', 'U','6U','T',],
  ['K', 'R', 'O', 'M', 'I', null, 'K', 'U','K','A',],
  ['A', 'I', 'T', 'A', 'A', 'M', 'I', '7S','E','T',],
];   

   // Funktio tarkistaa, onko ristikko oikein ratkaistu
   function checkCrossword() {
    for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 10; col++) {
            const gridItem = gridItems[row * 10 + col];
            const userAnswer = gridItem.textContent.toUpperCase().trim(); // Trim whitespace
            const correctAnswer = correctAnswers[row][col];

            console.log(`Row ${row}, Col ${col}, User: ${userAnswer}, Correct: ${correctAnswer}`);

            if (correctAnswer !== null && userAnswer !== correctAnswer) {
                alert('Ristikko ei ole vielä oikein. Yritä uudelleen.');
                return;
            }
        }
    }
    alert('Onnittelut! Ristikko on oikein ratkaistu.');
}

// Example: Add a button to initiate the check
checkButton.textContent = 'Tarkista ristikko';
checkButton.addEventListener('click', checkCrossword);
checkButton.classList.add('check-button');
        

    // Load the game state from localStorage when the page loads
    const crosswordState = [
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string', 'string', 'string'],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string','string',null,],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', null, null, null, null, null, null, 'string',null,'string',],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', null, 'string', 'string','string','string',],
  ['string', 'string', 'string', 'string', 'string', 'string', 'string', 'string','string','string',],
];
// Select all grid items
// Select all grid items
const gridItems = document.querySelectorAll('.grid-item');

// Track the currently selected grid item
let selectedGridItem = null;

// Track the current direction (horizontal or vertical)
let direction = 'horizontal';










class GridManager {
    constructor(gridItems) {
        this.gridItems = gridItems;
        this.selectedGridItem = null;
        this.direction = 'horizontal';
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.gridItems.forEach((gridItem, index) => {
            gridItem.addEventListener('click', () => this.handleItemClick(gridItem, index));
        });
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    

    handleItemClick(gridItem, index) {
        if (this.selectedGridItem === gridItem) {
            this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal';
        } else {
            this.selectedGridItem = gridItem;
            this.direction = 'horizontal';
        }

        this.clearActiveAndSelected();
        this.setActiveRowOrColumn(index);
        gridItem.classList.add('selected');
    }
    moveGridItemFocus(step) {
        if (!this.selectedGridItem) return;
    
        let index = Array.from(this.gridItems).indexOf(this.selectedGridItem);
        let nextIndex = index + step * (this.direction === 'horizontal' ? 1 : 10);
    
        // Check bounds for horizontal movement and ensure we don't wrap to the next row
        if (this.direction === 'horizontal' && (Math.floor(nextIndex / 10) !== Math.floor(index / 10) || nextIndex < 0 || nextIndex >= this.gridItems.length)) {
            return;
        }
    
        // Check bounds for vertical movement
        if (this.direction === 'vertical' && (nextIndex < 0 || nextIndex >= this.gridItems.length)) {
            return;
        }
    
        let nextItem = this.gridItems[nextIndex];
    
        // If the next item is a special one, skip it by calling moveGridItemFocus recursively
        if (nextItem && nextItem.dataset.special === "true") {
            // Adjust step to skip over the special item
            this.moveGridItemFocus(step + (step > 0 ? 1 : -1));
            return;
        }
    
        // If we have a valid next item that is not special, move the focus to it
        if (nextItem) {
            this.clearActiveAndSelected();
            this.selectedGridItem = nextItem;
            this.setActiveRowOrColumn(nextIndex);
            nextItem.classList.add('selected', 'active');
        }
    }

    clearActiveAndSelected() {
        this.gridItems.forEach(item => {
            item.classList.remove('active', 'selected');
        });
    }

    setActiveRowOrColumn(index) {
        const { row, col } = this.getRowCol(index);

        if (this.direction === 'horizontal') {
            for (let i = row * 10; i < (row + 1) * 10; i++) {
                this.gridItems[i].classList.add('active');
            }
        } else {
            for (let i = col; i < this.gridItems.length; i += 10) {
                this.gridItems[i].classList.add('active');
            }
        }
    }
    updateGridItemContent(gridItem, content) {
        // Check if the grid item is marked as special before updating its content
        if (gridItem.dataset.special === "true") {
            return; // Do not update content for special items
        }

        let contentSpan = gridItem.querySelector('.content-span');
        if (!contentSpan) {
            contentSpan = document.createElement('span');
            contentSpan.classList.add('content-span');
            gridItem.appendChild(contentSpan);
        }
        contentSpan.textContent = content;
    }

    handleKeyDown(event) {
        // Only proceed if a grid item is selected
        if (!this.selectedGridItem) return;

        // Prevent input on special grid items
        if (this.selectedGridItem.dataset.special === "true") return;

        if (/^[A-ZÖÄÅa-zöäå]$/.test(event.key)) {
            this.updateGridItemContent(this.selectedGridItem, event.key.toUpperCase());
            this.moveGridItemFocus(1);  // Move to the next item
            saveCrosswordState();
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            this.updateGridItemContent(this.selectedGridItem, '');
            this.moveGridItemFocus(-1); // Move to the previous item
            saveCrosswordState();
        }
    }

    getRowCol(index) {
        return {
            row: Math.floor(index / 10),
            col: index % 10
        };
    }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    new GridManager(gridItems);
});




function moveGridItemFocus(step) {
    let index = Array.from(gridItems).indexOf(selectedGridItem);
    let nextIndex = index + (direction === 'horizontal' ? step : step * 10);

    // Prevent moving to a different row when horizontal
    if (direction === 'horizontal' && Math.floor(nextIndex / 10) !== Math.floor(index / 10)) {
        return;
    }

    // Prevent moving into special items
    if (nextIndex >= 0 && nextIndex < gridItems.length && !gridItems[nextIndex].classList.contains('special')) {
        clearActiveAndSelected();
        selectedGridItem = gridItems[nextIndex];
        setActiveRowOrColumn(selectedGridItem);
        selectedGridItem.classList.add('selected');
    }
}

function loadCrosswordState() {
    const savedCrosswordStateJSON = localStorage.getItem('crosswordState');
    if (savedCrosswordStateJSON) {
        const savedCrosswordState = JSON.parse(savedCrosswordStateJSON);

        for (let row = 0; row < 12; row++) {
            for (let col = 0; col < 10; col++) {
                const gridItem = gridItems[row * 10 + col];
                const content = savedCrosswordState[row][col];
                updateGridItemContent(gridItem, content); // Assuming updateGridItemContent function updates the grid item
            }
        }
    }
}



document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    loadCrosswordState();
    var modal = document.getElementById('helpModal');

    // Get the button that opens the modal
    var btn = document.getElementById('helpButton');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal
    if (btn !== null) {
        btn.onclick = function() {
            modal.style.display = 'block';
        }
    } else {
        console.error('Help button not found');
    }

    // When the user clicks on <span> (x), close the modal
    if (span !== null) {
        span.onclick = function() {
            modal.style.display = 'none';
        }
    } else {
        console.error('Close span not found');
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        
    }})
// Function to save the current crossword state to localStorage
function saveCrosswordState() {
    const savedCrosswordState = [];
    for (let row = 0; row < 12; row++) {
        const rowData = [];
        for (let col = 0; col < 10; col++) {
            const gridItem = gridItems[row * 10 + col];
            const userContent = gridItem.querySelector('.content-span');
            rowData.push(userContent ? userContent.textContent : ''); // Save only user content
        }
        savedCrosswordState.push(rowData);
    }

    const crosswordStateJSON = JSON.stringify(savedCrosswordState);
    localStorage.setItem('crosswordState', crosswordStateJSON);
}




const grid = document.querySelectorAll('.grid-item');

// Add click event listener to each grid item
grid.forEach(item => {
  item.addEventListener('click', () => {
    // Get index of clicked item
    const index = Array.from(grid).indexOf(item);
    
    // Get row and column of clicked item
    const row = Math.floor(index / 10);
    const col = index % 10;
    
    // Activate all grid items in the same row
    for (let i = row * 10; i < (row + 1) * 10; i++) {
      if (!grid[i].classList.contains('special')) {
        grid[i].classList.add('active');
      }
    }
    
    // Set focus on clicked item
    item.focus();
    
    // Add keydown event listener to each active grid item
    const activeItems = document.querySelectorAll('.active');
    activeItems.forEach(activeItem => {
      activeItem.addEventListener('keydown', e => {
        // Get index of current active item
        const currentIndex = Array.from(activeItems).indexOf(activeItem);
        
        // Get next active item
        let nextIndex = currentIndex + 1;
        while (nextIndex < activeItems.length && activeItems[nextIndex].classList.contains('special')) {
          nextIndex++;
        }
        if (nextIndex < activeItems.length) {
          const nextItem = activeItems[nextIndex];
          nextItem.focus();
        }
      });
    });
  });
});

function updateGridItemContent(gridItem, content) {
    let contentSpan = gridItem.querySelector('.content-span');

    // If there's no content span, create it and append to the grid item
    if (!contentSpan) {
        contentSpan = document.createElement('span');
        contentSpan.classList.add('content-span');
        gridItem.appendChild(contentSpan);
    }

    // Update only the content span's text, preserving any static numbers
    contentSpan.textContent = content;
}
const eraseButton = document.getElementById('eraseCrosswordButton');

// Add a click event listener to the erase button
eraseButton.addEventListener('click', eraseCrossword);




// Function to erase the crossword letters
function eraseCrossword() {
    // Loop through all grid items and reset their content to an empty string
    gridItems.forEach(function(gridItem) {
        updateGridItemContent(gridItem, ''); // Assuming you have an updateGridItemContent function
    });

    // Save the crossword state after erasing
    saveCrosswordState();
}
document.getElementById('capture').addEventListener('click', function() {
    html2canvas(document.body).then(function(canvas) {
        // Create an image
        var img = canvas.toDataURL("image/png");

        // Create a link
        var link = document.createElement('a');
        link.href = img;

        // Set the download attribute of the link
        link.download = 'screenshot.png';

        // Trigger the download by simulating a click
        link.click();
    });
});
// Call the loadCrosswordState function to load the crossword state on page load
loadCrosswordState();
