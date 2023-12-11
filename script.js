
 const correctAnswers = [
            ['A', 'T', 'A', 'R', 'I', null, 'K', 'A', 'R', 'A'],
            ['M', 'A', 'R', 'I', 'N', null, 'R', 'A','U','K',],
  ['P', 'U', 'K', 'I', 'N', 'P', 'A', 'R','T','A',],
  ['P', 'O', 'U', 'T', 'A', null, 'A', 'I','A','I',],
  ['E', 'T', 'U', 'I', 'L', 'E', 'V', 'A','T',null,],
  ['L', 'A', 'S', 'T', 'A', null, 'I', 'T','A','R',],
  ['I', null, null, null, null, null, null, 'T',null,'O',],
  ['K', 'R', 'A', 'K', 'A', null, 'L', 'O','I','S',],
  ['U', 'U', 'T', 'I', 'S', 'P', 'O', 'M','M','I',],
  ['K', 'O', 'R', 'I', 'T', null, 'K', 'U','U','T',],
  ['K', 'R', 'O', 'M', 'I', null, 'K', 'U','K','A',],
  ['A', 'I', 'T', 'A', 'A', 'M', 'I', 'S','E','T',],
];   

   // Funktio tarkistaa, onko ristikko oikein ratkaistu
   function checkCrossword() {
            for (let row = 0; row < 12; row++) {
                for (let col = 0; col < 10; col++) {
                    const gridItem = gridItems[row * 10 + col];
                    const userAnswer = gridItem.textContent.toUpperCase();
                    const correctAnswer = correctAnswers[row][col];

                    if (correctAnswer !== null && userAnswer !== correctAnswer) {
                        // Ristikko on väärin ratkaistu
                        alert('Ristikko ei ole vielä oikein. Yritä uudelleen.');
                        return;
                    }
                }
            }

            // Kaikki oikein, voit tehdä tarvittavat toimet
            alert('Onnittelut! Ristikko on oikein ratkaistu. Lähetä ratkaisusana Seemoton sähköpostiin support@seemoto.com, niin pääset osallistumaan arvontaan.');
        }

        // Lisää muita tarvittavia toimintoja

        // Esimerkki: Lisää painike tarkistuksen käynnistämiseksi
        
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
    // Check if the grid item is special
    if (!gridItem.classList.contains('special')) {
        gridItem.textContent = content;
    }
}

function highlightRowOrColumn(gridItem) {
    // Remove the blue class from all grid items
    gridItems.forEach(item => item.classList.remove('blue', 'dark-blue'));

    // Get the index of the clicked grid item
    const index = Array.from(gridItems).indexOf(gridItem);

    // Calculate the row and column number
    const row = Math.floor(index / 10);
    const column = index % 10;

    // Highlight the row or column
    for (let i = 0; i < 10; i++) {
        const itemIndex = direction === 'horizontal' ? row * 10 + i : column + i * 10;
        const item = gridItems[itemIndex];
        if (item) {
            // Stop if the item is special and it's not the clicked grid item
            if (item.dataset.special === 'true' && item !== gridItem) {
                break;
            }
            // Add the blue class unless the item is special and it's not the clicked grid item
            if (!(item.dataset.special === 'true' && item !== gridItem)) {
                item.classList.add('blue');
            }
            // Break if it's the last item in the row or column
            if (itemIndex % 10 === 9) {
                break;
            }
        }
    }

    // Highlight the clicked grid item
    gridItem.classList.add('dark-blue');
}

gridItems.forEach(function(gridItem) {
    gridItem.addEventListener('click', function() {
        // If the clicked grid item is the currently selected grid item, switch the direction
        if (gridItem === selectedGridItem) {
            direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
        } else {
            // Set the currently selected grid item
            selectedGridItem = gridItem;
        }

        // Highlight the row or column
        highlightRowOrColumn(selectedGridItem);
    });
});

document.addEventListener('keydown', function(event) {
    if (selectedGridItem) {
        if (/^[A-Öa-ö]$/.test(event.key)) {
            // Only update the content and move to the next grid item if the current item is not special
            if (!selectedGridItem.dataset.special) {
                updateGridItemContent(selectedGridItem, event.key.toUpperCase());
                saveCrosswordState();

                // Move to the next grid item
                let index = Array.from(gridItems).indexOf(selectedGridItem);
                let nextIndex = direction === 'horizontal' ? index + 1 : index + 12;
                while (gridItems[nextIndex] && gridItems[nextIndex].dataset.special) {
                    nextIndex = direction === 'horizontal' ? nextIndex + 1 : nextIndex + 12;
                }
                if (gridItems[nextIndex]) {
                    selectedGridItem = gridItems[nextIndex];
                    highlightRowOrColumn(selectedGridItem);
                }
            }
        } else if (event.key === 'Delete' || event.key === 'Backspace') {
            updateGridItemContent(selectedGridItem, '');
            saveCrosswordState();

            // Move to the previous grid item
            let index = Array.from(gridItems).indexOf(selectedGridItem);
            let prevIndex = direction === 'horizontal' ? index - 1 : index - 12;
            while (gridItems[prevIndex] && gridItems[prevIndex].dataset.special) {
                prevIndex = direction === 'horizontal' ? prevIndex - 1 : prevIndex - 12;
            }
            if (gridItems[prevIndex]) {
                selectedGridItem = gridItems[prevIndex];
                highlightRowOrColumn(selectedGridItem);
            }
        }
    }
});
// Load the game state from localStorage when the page loads
function loadCrosswordState() {
    const savedCrosswordStateJSON = localStorage.getItem('crosswordState');
    if (savedCrosswordStateJSON) {
        const savedCrosswordState = JSON.parse(savedCrosswordStateJSON);

        // Loop through the grid items and update their content
        for (let row = 0; row < crosswordState.length; row++) {
            for (let col = 0; col < crosswordState[0].length; col++) {
                const gridItem = gridItems[row * crosswordState[0].length + col];
                const content = savedCrosswordState[row][col];
                updateGridItemContent(gridItem, content);
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
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
            const contentSpan = gridItem.querySelector('.content-span');
            rowData.push(contentSpan ? contentSpan.textContent : '');
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
    // Find the .static-number and .content-span elements within the grid item
    const staticNumber = gridItem.querySelector('.static-number');
    let contentSpan = gridItem.querySelector('.content-span');

    // Ensure there is a span element for content that is not the static number
    if (!contentSpan) {
        contentSpan = document.createElement('span');
        contentSpan.classList.add('content-span');
        // Append the content span to the grid item
        gridItem.appendChild(contentSpan);
    }

    // Update only the content span's text
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

// Call the loadCrosswordState function to load the crossword state on page load
loadCrosswordState();
