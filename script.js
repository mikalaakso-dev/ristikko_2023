
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

function checkCrossword() {
    let correctCount = 0;
    let totalCount = 0;

    for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 10; col++) {
            const gridItem = gridItems[row * 10 + col];
            const userAnswer = gridItem.textContent.toUpperCase().trim(); // Trim whitespace
            const correctAnswer = correctAnswers[row][col];

            console.log(`Row ${row}, Col ${col}, User: ${userAnswer}, Correct: ${correctAnswer}`);

            if (correctAnswer !== null) {
                totalCount++;
                if (userAnswer === correctAnswer) {
                    correctCount++;
                }
            }
        }
    }

    const accuracy = Math.round((correctCount / totalCount) * 100);
    if (accuracy === 100) {
        alert('Onnittelut! Ristikko on oikein ratkaistu.');
    } else {
        alert(`Ristikosta ${accuracy}% on oikein. Yritä uudelleen.`);
    }
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


const vectorData = {'0-0': {'X1': 0, 'X2': 4, 'Y1': 0, 'Y2': 11},
'0-1': {'X1': 1, 'X2': 3, 'Y1': 0, 'Y2': 5},
'0-2': {'X1': 2, 'X2': 2, 'Y1': 0, 'Y2': 5},
'0-3': {'X1': 3, 'X2': 1, 'Y1': 0, 'Y2': 5},
'0-4': {'X1': 4, 'X2': 0, 'Y1': 0, 'Y2': 5},
'0-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'0-6': {'X1': 0, 'X2': 3, 'Y1': 0, 'Y2': 5},
'0-7': {'X1': 1, 'X2': 2, 'Y1': 0, 'Y2': 11},
'0-8': {'X1': 2, 'X2': 1, 'Y1': 0, 'Y2': 5},
'0-9': {'X1': 3, 'X2': 0, 'Y1': 0, 'Y2': 3},
'1-0': {'X1': 0, 'X2': 4, 'Y1': 1, 'Y2': 10},
'1-1': {'X1': 1, 'X2': 3, 'Y1': 1, 'Y2': 4},
'1-2': {'X1': 2, 'X2': 2, 'Y1': 1, 'Y2': 4},
'1-3': {'X1': 3, 'X2': 1, 'Y1': 1, 'Y2': 4},
'1-4': {'X1': 4, 'X2': 0, 'Y1': 1, 'Y2': 4},
'1-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'1-6': {'X1': 0, 'X2': 3, 'Y1': 1, 'Y2': 4},
'1-7': {'X1': 1, 'X2': 2, 'Y1': 1, 'Y2': 10},
'1-8': {'X1': 2, 'X2': 1, 'Y1': 1, 'Y2': 4},
'1-9': {'X1': 3, 'X2': 0, 'Y1': 1, 'Y2': 2},
'2-0': {'X1': 0, 'X2': 9, 'Y1': 2, 'Y2': 9},
'2-1': {'X1': 1, 'X2': 8, 'Y1': 2, 'Y2': 3},
'2-2': {'X1': 2, 'X2': 7, 'Y1': 2, 'Y2': 3},
'2-3': {'X1': 3, 'X2': 6, 'Y1': 2, 'Y2': 3},
'2-4': {'X1': 4, 'X2': 5, 'Y1': 2, 'Y2': 3},
'2-5': {'X1': 5, 'X2': 4, 'Y1': 0, 'Y2': 0},
'2-6': {'X1': 6, 'X2': 3, 'Y1': 2, 'Y2': 3},
'2-7': {'X1': 7, 'X2': 2, 'Y1': 2, 'Y2': 9},
'2-8': {'X1': 8, 'X2': 1, 'Y1': 2, 'Y2': 3},
'2-9': {'X1': 9, 'X2': 0, 'Y1': 2, 'Y2': 1},
'3-0': {'X1': 0, 'X2': 4, 'Y1': 3, 'Y2': 8},
'3-1': {'X1': 1, 'X2': 3, 'Y1': 3, 'Y2': 2},
'3-2': {'X1': 2, 'X2': 2, 'Y1': 3, 'Y2': 2},
'3-3': {'X1': 3, 'X2': 1, 'Y1': 3, 'Y2': 2},
'3-4': {'X1': 4, 'X2': 0, 'Y1': 3, 'Y2': 2},
'3-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'3-6': {'X1': 0, 'X2': 3, 'Y1': 3, 'Y2': 2},
'3-7': {'X1': 1, 'X2': 2, 'Y1': 3, 'Y2': 8},
'3-8': {'X1': 2, 'X2': 1, 'Y1': 3, 'Y2': 2},
'3-9': {'X1': 3, 'X2': 0, 'Y1': 3, 'Y2': 0},
'4-0': {'X1': 0, 'X2': 8, 'Y1': 4, 'Y2': 7},
'4-1': {'X1': 1, 'X2': 7, 'Y1': 4, 'Y2': 1},
'4-2': {'X1': 2, 'X2': 6, 'Y1': 4, 'Y2': 1},
'4-3': {'X1': 3, 'X2': 5, 'Y1': 4, 'Y2': 1},
'4-4': {'X1': 4, 'X2': 4, 'Y1': 4, 'Y2': 1},
'4-5': {'X1': 5, 'X2': 3, 'Y1': 0, 'Y2': 0},
'4-6': {'X1': 6, 'X2': 2, 'Y1': 4, 'Y2': 1},
'4-7': {'X1': 7, 'X2': 1, 'Y1': 4, 'Y2': 7},
'4-8': {'X1': 8, 'X2': 0, 'Y1': 4, 'Y2': 1},
'4-9': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'5-0': {'X1': 0, 'X2': 4, 'Y1': 5, 'Y2': 6},
'5-1': {'X1': 1, 'X2': 3, 'Y1': 5, 'Y2': 0},
'5-2': {'X1': 2, 'X2': 2, 'Y1': 5, 'Y2': 0},
'5-3': {'X1': 3, 'X2': 1, 'Y1': 5, 'Y2': 0},
'5-4': {'X1': 4, 'X2': 0, 'Y1': 5, 'Y2': 0},
'5-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'5-6': {'X1': 0, 'X2': 3, 'Y1': 5, 'Y2': 0},
'5-7': {'X1': 1, 'X2': 2, 'Y1': 5, 'Y2': 6},
'5-8': {'X1': 2, 'X2': 1, 'Y1': 5, 'Y2': 0},
'5-9': {'X1': 3, 'X2': 0, 'Y1': 0, 'Y2': 6},
'6-0': {'X1': 0, 'X2': 0, 'Y1': 6, 'Y2': 5},
'6-1': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-2': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-3': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-4': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-6': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-7': {'X1': 0, 'X2': 0, 'Y1': 6, 'Y2': 5},
'6-8': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'6-9': {'X1': 0, 'X2': 0, 'Y1': 1, 'Y2': 5},
'7-0': {'X1': 0, 'X2': 4, 'Y1': 7, 'Y2': 4},
'7-1': {'X1': 1, 'X2': 3, 'Y1': 0, 'Y2': 4},
'7-2': {'X1': 2, 'X2': 2, 'Y1': 0, 'Y2': 4},
'7-3': {'X1': 3, 'X2': 1, 'Y1': 0, 'Y2': 4},
'7-4': {'X1': 4, 'X2': 0, 'Y1': 0, 'Y2': 4},
'7-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'7-6': {'X1': 0, 'X2': 3, 'Y1': 0, 'Y2': 4},
'7-7': {'X1': 1, 'X2': 2, 'Y1': 7, 'Y2': 4},
'7-8': {'X1': 2, 'X2': 1, 'Y1': 0, 'Y2': 4},
'7-9': {'X1': 3, 'X2': 0, 'Y1': 2, 'Y2': 4},
'8-0': {'X1': 0, 'X2': 9, 'Y1': 8, 'Y2': 3},
'8-1': {'X1': 1, 'X2': 8, 'Y1': 1, 'Y2': 3},
'8-2': {'X1': 2, 'X2': 7, 'Y1': 1, 'Y2': 3},
'8-3': {'X1': 3, 'X2': 6, 'Y1': 1, 'Y2': 3},
'8-4': {'X1': 4, 'X2': 5, 'Y1': 1, 'Y2': 3},
'8-5': {'X1': 5, 'X2': 4, 'Y1': 0, 'Y2': 0},
'8-6': {'X1': 6, 'X2': 3, 'Y1': 1, 'Y2': 3},
'8-7': {'X1': 7, 'X2': 2, 'Y1': 8, 'Y2': 3},
'8-8': {'X1': 8, 'X2': 1, 'Y1': 1, 'Y2': 3},
'8-9': {'X1': 9, 'X2': 0, 'Y1': 3, 'Y2': 3},
'9-0': {'X1': 0, 'X2': 4, 'Y1': 9, 'Y2': 2},
'9-1': {'X1': 1, 'X2': 3, 'Y1': 2, 'Y2': 2},
'9-2': {'X1': 2, 'X2': 2, 'Y1': 2, 'Y2': 2},
'9-3': {'X1': 3, 'X2': 1, 'Y1': 2, 'Y2': 2},
'9-4': {'X1': 4, 'X2': 0, 'Y1': 2, 'Y2': 2},
'9-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'9-6': {'X1': 0, 'X2': 3, 'Y1': 2, 'Y2': 2},
'9-7': {'X1': 1, 'X2': 2, 'Y1': 9, 'Y2': 2},
'9-8': {'X1': 2, 'X2': 1, 'Y1': 2, 'Y2': 2},
'9-9': {'X1': 3, 'X2': 0, 'Y1': 4, 'Y2': 2},
'10-0': {'X1': 0, 'X2': 4, 'Y1': 10, 'Y2': 1},
'10-1': {'X1': 1, 'X2': 3, 'Y1': 3, 'Y2': 1},
'10-2': {'X1': 2, 'X2': 2, 'Y1': 3, 'Y2': 1},
'10-3': {'X1': 3, 'X2': 1, 'Y1': 3, 'Y2': 1},
'10-4': {'X1': 4, 'X2': 0, 'Y1': 3, 'Y2': 1},
'10-5': {'X1': -1, 'X2': -1, 'Y1': -1, 'Y2': -1},
'10-6': {'X1': 0, 'X2': 3, 'Y1': 3, 'Y2': 1},
'10-7': {'X1': 1, 'X2': 2, 'Y1': 10, 'Y2': 1},
'10-8': {'X1': 2, 'X2': 1, 'Y1': 3, 'Y2': 1},
'10-9': {'X1': 3, 'X2': 0, 'Y1': 5, 'Y2': 1},
'11-0': {'X1': 0, 'X2': 9, 'Y1': 11, 'Y2': 0},
'11-1': {'X1': 1, 'X2': 8, 'Y1': 4, 'Y2': 0},
'11-2': {'X1': 2, 'X2': 7, 'Y1': 4, 'Y2': 0},
'11-3': {'X1': 3, 'X2': 6, 'Y1': 4, 'Y2': 0},
'11-4': {'X1': 4, 'X2': 5, 'Y1': 4, 'Y2': 0},
'11-5': {'X1': 5, 'X2': 4, 'Y1': 0, 'Y2': 0},
'11-6': {'X1': 6, 'X2': 3, 'Y1': 4, 'Y2': 0},
'11-7': {'X1': 7, 'X2': 2, 'Y1': 11, 'Y2': 0},
'11-8': {'X1': 8, 'X2': 1, 'Y1': 4, 'Y2': 0},
'11-9': {'X1': 9, 'X2': 0, 'Y1': 6, 'Y2': 0}}







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
        let row = Math.floor(nextIndex / 10);
        let col = nextIndex % 10;
    
        // Check bounds for horizontal and vertical movement
        if ((this.direction === 'horizontal' && (col < 0 || col > 9)) ||
            (this.direction === 'vertical' && (row < 0 || row > 11))) {
            return;
        }
    
        let nextItem = this.gridItems[nextIndex];
        if (!nextItem || nextItem.dataset.special === "true") {
            return; // If there is no next item or it's a special item, do nothing
        }
    
        this.clearActiveAndSelected();
        this.selectedGridItem = nextItem;
        this.setActiveRowOrColumn(nextIndex);
        nextItem.classList.add('selected', 'active');
    }

    clearActiveAndSelected() {
        this.gridItems.forEach(item => {
            item.classList.remove('active', 'selected');
        });
    }

    setActiveRowOrColumn(index) {
        const { row, col } = this.getRowCol(index);
        const vector = vectorData[`${row}-${col}`]; // Get the vector for the current grid item

        this.clearActiveAndSelected();

        if (this.selectedGridItem) {
            this.selectedGridItem.classList.add('selected');
        }

        // Determine the start and end indices for the active selection based on the current direction
        const startIndex = this.direction === 'horizontal' ? row * 10 + Math.max(0, col - vector.X1) : col + Math.max(0, row - vector.Y1) * 10;
        const endIndex = this.direction === 'horizontal' ? row * 10 + Math.min(9, col + vector.X2) : col + Math.min(119, (row + vector.Y2) * 10);

        // Highlight the word that the selected cell is part of
        for (let i = startIndex; i <= endIndex; this.direction === 'horizontal' ? i++ : i += 10) {
            this.gridItems[i].classList.add('active');
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
        // Log to confirm that the event is being triggered
        console.log('Key pressed:', event.key);
    
        // Only proceed if a grid item is selected
        if (!this.selectedGridItem) return;
    
        // Prevent input on special grid items
        if (this.selectedGridItem.dataset.special === "true") return;
    
        if (/^[A-ZÖÄÅa-zöäå]$/.test(event.key)) {
            this.updateGridItemContent(this.selectedGridItem, event.key.toUpperCase());
            // Log before attempting to move focus
            console.log('Moving focus to next item');
            this.moveGridItemFocus(1); // Move to the next item
            // Log after attempting to move focus
            console.log('Focus move attempted');
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
/*window.jsPDF = window.jspdf.jsPDF;

document.getElementById('downloadBtn').addEventListener('click', function() {
    // Hide buttons
    document.querySelector('.button-container').classList.add('hide');
    
    // Capture screenshot with html2canvas
    html2canvas(document.body, {
        scale: window.devicePixelRatio, // Capture at the device's pixel ratio
        useCORS: true // For loading images from other domains
    }).then(canvas => {
        // Show buttons again after a delay
        setTimeout(function() {
            document.querySelector('.button-container').classList.remove('hide');
        }, 3000);

        // Create a new jsPDF instance
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Convert canvas to an image
        const imgData = canvas.toDataURL('image/png');
        
        // Calculate the scaling factor to fit the image inside A4
        const imgProps = pdf.getImageProperties(imgData);
        const pdfAspectRatio = pdfWidth / pdfHeight;
        let imgWidth = pdfWidth;
        let imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        if (imgProps.width / imgProps.height > pdfAspectRatio) {
            imgHeight = pdfHeight;
            imgWidth = (imgProps.width * pdfHeight) / imgProps.height;
        }

        // Center the image
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;

        // Add image to pdf
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('crossword.pdf');
    });
});*/

document.querySelector('.tarkista-sana').addEventListener('click', function() {
    // Define the correct word
    var correctWord = 'MITTAUS';

    // Select all elements with the class 'grid-item' that contain 'static-number'
    var gridItemsWithNumbers = document.querySelectorAll('.grid-item .static-number');

    // Extract letters, concatenate them
    var enteredWord = '';
    gridItemsWithNumbers.forEach(function(staticNumberElement) {
        // Get the parent grid item of the static number
        var gridItem = staticNumberElement.closest('.grid-item');
        
        // Extract the text content excluding the static number text
        var gridItemText = gridItem.textContent.replace(staticNumberElement.textContent, '').trim();
        
        enteredWord += gridItemText;
    });

    // Check if the entered word matches the correct word
    if (enteredWord.toUpperCase() === correctWord.toUpperCase()) {
        alert('Onnittelut! Ratkaisusana on oikein.  "Lähetä vastaus" painikkeelle pääset lomakkeelle ja voit osallistua arvontaan');
    } else {
        alert('Sana ei ole vielä oikein. Yritä uudestaan');
    }
});

function redirectToForm() {
    window.location.href = 'https://forms.zohopublic.com/site24x71410154495309/form/Ristikko2023/formperma/MsOH3z-7RuyTGxo3MqDxyfRJJNmPGYr3NfV1Ojj2-Sg';
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

// Call the loadCrosswordState function to load the crossword state on page load
loadCrosswordState();
