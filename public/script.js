document.addEventListener('DOMContentLoaded', () => {
  const listElement = document.getElementById('list');
  const addItemForm = document.getElementById('addItemForm');
  const itemNameInput = document.getElementById('itemName');

  // Function to render list items
  const renderList = (listItems) => {
    listElement.innerHTML = '';
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      listElement.appendChild(li);
    });
  };

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('/backend/api');
      const data = await response.json();
      renderList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle form submission
  addItemForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const itemName = itemNameInput.value.trim();
    console.log(JSON.stringify({ itemName: itemName }))
    if (itemName) {
      try {
        await fetch('/backend/api/add-person', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ itemName: itemName })
        });
        fetchData(); // Refresh the list after adding an item
        itemNameInput.value = ''; // Clear input field
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  });

  // Initial data fetch
  fetchData();
});
