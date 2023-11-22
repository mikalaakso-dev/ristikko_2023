


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
document.addEventListener("DOMContentLoaded", function() {
    let specialClicked = {};  // Store the click state of special grid items

    // Add event listener to grid items
    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', function(event) {
            let isSpecial = event.target.getAttribute('data-special') === 'true';
            if (isSpecial) {
                let cellId = event.target.id;
                if (!specialClicked[cellId]) {
                    // Horizontal Activation
                    specialClicked[cellId] = true;
                    let prevSibling = event.target.previousElementSibling;
                    while (prevSibling && !prevSibling.getAttribute('data-special')) {
                        prevSibling.style.backgroundColor = 'blue';
                        prevSibling = prevSibling.previousElementSibling;
                    }
                } else {
                    // Vertical Activation
                    specialClicked[cellId] = false;
                    let currentElem = event.target;
                    let position = Array.from(currentElem.parentNode.children).indexOf(currentElem);
                    let columnWidth = getComputedStyle(document.querySelector('.grid-container')).gridTemplateColumns.split(' ').length;
                    for (let i = position - columnWidth; i >= 0; i -= columnWidth) {
                        let aboveElement = currentElem.parentNode.children[i];
                        if (!aboveElement.getAttribute('data-special')) {
                            aboveElement.style.backgroundColor = 'blue';
                        } else {
                            break;
                        }
                    }
                }
            }
        });

        // Allow typing on non-special grid items
        if (!item.getAttribute('data-special')) {
            item.setAttribute('contenteditable', 'true');
        }
    });
});
document.querySelectorAll('.grid-item[contenteditable="true"]').forEach(item => {
    item.addEventListener('input', function() {
        if (this.textContent.length > 1) {
            this.textContent = this.textContent.charAt(0);
        }
    });
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

// Function to save the current crossword state to localStorage
function saveCrosswordState() {
    const savedCrosswordState = [];

    for (let row = 0; row < 12; row++) {
        const rowData = [];
        for (let col = 0; col < 10; col++) {
            const gridItem = gridItems[row * 10 + col];
            rowData.push(gridItem.textContent);
        }
        savedCrosswordState.push(rowData);
    }

    const crosswordStateJSON = JSON.stringify(savedCrosswordState);
    localStorage.setItem('crosswordState', crosswordStateJSON);
}

// Call the loadCrosswordState function to load the crossword state on page load
loadCrosswordState();


