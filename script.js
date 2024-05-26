document.getElementById('searchButton').addEventListener('click', searchCat);

function searchCat() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchInput === '') {
        alert('Please enter a breed name.');
        return;
    }

    const breedsUrl = 'https://api.thecatapi.com/v1/breeds';
    const imagesUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

    fetch(breedsUrl)
        .then(response => response.json())
        .then(data => {
            const breed = data.find(cat => cat.name.toLowerCase() === searchInput);
            if (breed) {
                fetch(imagesUrl + breed.id)
                    .then(response => response.json())
                    .then(imagesData => {
                        displayCatInfo(breed, imagesData[0]);
                    })
                    .catch(error => console.error('Error fetching cat images:', error));
            } else {
                alert('Breed not found.');
            }
        })
        .catch(error => console.error('Error fetching cat breeds:', error));
}

function displayCatInfo(breed, image) {
    const catInfoDiv = document.getElementById('catInfo');
    catInfoDiv.innerHTML = `
        <h3>Name: ${breed.name}</h3>
        <p>Origin: ${breed.origin}</p>
        <p>Weight: ${breed.weight.imperial}</p>
        <p>Description: ${breed.description}</p>
        <img src="${image.url}" alt="${breed.name}" class="img-fluid">
        <p>Wikipedia_url: ${breed.wikipedia_url}</p>
    `;
}