
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

// Function to update the grid item's content
function updateGridItemContent(gridItem, content) {
    if (!gridItem.classList.contains('special')) {
        gridItem.textContent = content;
    }
}

function clearActiveAndSelected() {
    gridItems.forEach(item => {
        item.classList.remove('active', 'selected');
    });
}
function setActiveRowOrColumn(selectedItem) {
    clearActiveAndSelected(); // Clear previous active and selected items

    const index = Array.from(gridItems).indexOf(selectedItem);
    const totalColumns = 10; // The total number of columns in your grid
    const totalRows = gridItems.length / totalColumns; // Calculate the total number of rows
    const row = Math.floor(index / totalColumns);
    const column = index % totalColumns;

    let start, end, step;

    if (direction === 'horizontal') {
        start = row * totalColumns; // Start of the row
        end = start + totalColumns; // End of the row
        step = 1; // Move horizontally
    } else {
        start = column; // Start of the column
        end = totalRows * totalColumns; // End of the grid
        step = totalColumns; // Move vertically
    }

    // Apply 'active' class to non-special items from the selected item in the specified direction
    for (let i = start; (direction === 'horizontal' && i < end) || (direction === 'vertical' && i < end); i += step) {
        const item = gridItems[i];
        if (!item || item.classList.contains('special')) {
            // Stop if a special grid item is encountered
            break;
        }
        item.classList.add('active');
    }

    // Ensure the selected item is always highlighted as selected
    selectedItem.classList.add('selected');
}

function moveGridItemFocus(step) {
    let index = Array.from(gridItems).indexOf(selectedGridItem);
    let nextIndex = index + (direction === 'horizontal' ? step : step * 10);

    // Avoid wrapping to the next line if we're at the edge
    if (direction === 'horizontal' && (nextIndex % 10 === 0 || nextIndex % 10 === 9)) {
        return;
    }
    // Avoid moving vertically beyond the grid
    if (direction === 'vertical' && (nextIndex < 0 || nextIndex >= gridItems.length)) {
        return;
    }

    let nextItem = gridItems[nextIndex];
    if (nextItem && !nextItem.classList.contains('special')) {
        // Move the focus to the next item if it's not special
        clearActiveAndSelected();
        selectedGridItem = nextItem;
        setActiveRowOrColumn(selectedGridItem);
        selectedGridItem.classList.add('selected');
    }
}

gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('click', function() {
        // If the same grid item is clicked again, switch direction
        if (gridItem === selectedGridItem) {
            direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
        } else {
            // If a different grid item is clicked, start with horizontal
            selectedGridItem = gridItem;
            direction = 'horizontal';
        }
        setActiveRowOrColumn(selectedGridItem); // Highlight the grid items in the new direction
    });
});
document.addEventListener('keydown', function(event) {
    // Ensure there is a selected grid item and it's not a special item
    if (selectedGridItem && !selectedGridItem.dataset.special) {
        // Check if the key pressed is a valid character for your crossword
        if (/^[A-Öa-ö]$/.test(event.key)) {
            // Update the content of the grid item and move to the next one
            updateGridItemContent(selectedGridItem, event.key.toUpperCase());
            moveGridItemFocus(1);
            saveCrosswordState()
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            // Clear the content of the grid item and move to the previous one
            updateGridItemContent(selectedGridItem, '');
            moveGridItemFocus(-1);
            saveCrosswordState()
        }
    }
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
