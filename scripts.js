// Define CRUD CRUD API endpoint
const apiUrl = 'https://crudcrud.com/api/e6f81a00bc334ddc9a1c1b7d0066cb6f/candystore';

// Function to fetch candies from API and display on the screen
async function getCandies() {
    try {
        const response = await axios.get(apiUrl);
        const candies = response.data;
        document.getElementById('candyList').innerHTML = '';
        candies.forEach(candy => {
            const candyItem = document.createElement('div');
            candyItem.innerHTML = `
                <p><strong>${candy.candyName}</strong></p>
                <p>${candy.candyDescription}</p>
                <p>Price: ${candy.price}</p>
                <p>Quantity: ${candy.quantity}</p>
                <button class="buyBtn" onclick="buyCandy('${candy._id}', 1)">Buy 1</button>
                <button class="buyBtn" onclick="buyCandy('${candy._id}', 2)">Buy 2</button>
                <button class="buyBtn" onclick="buyCandy('${candy._id}', 3)">Buy 3</button>
            `;
            document.getElementById('candyList').appendChild(candyItem);
        });
    } catch (error) {
        console.error('Error fetching candies:', error);
    }
}

// Function to add a new candy
async function addCandy(event) {
    event.preventDefault();
    const candyName = document.getElementById('candyName').value;
    const candyDescription = document.getElementById('candyDescription').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    try {
        await axios.post(apiUrl, { candyName, candyDescription, price, quantity });
        getCandies();
        document.getElementById('candyForm').reset();
    } catch (error) {
        console.error('Error adding candy:', error);
    }
}

// Function to handle buying candies
async function buyCandy(candyId, quantityToBuy) {
    try {
        const response = await axios.get(`${apiUrl}/${candyId}`);
        const candyToUpdate = response.data;
        if (candyToUpdate.quantity >= quantityToBuy) {
            candyToUpdate.quantity -= quantityToBuy;
            await axios.put(`${apiUrl}/${candyToUpdate._id}`, candyToUpdate);
            getCandies();
        } else {
            document.getElementById('message').innerText = 'Sorry, not enough quantity available!';
        }
    } catch (error) {
        console.error('Error buying candy:', error);
    }
}

document.getElementById('candyForm').addEventListener('submit', addCandy);

// Initialize the app
getCandies();
