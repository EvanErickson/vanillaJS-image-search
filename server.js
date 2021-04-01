const apiKey = "563492ad6f9170000100000107f316cbe33d4c229f520228920ac164";
const next = document.querySelector('.next');
const input = document.querySelector('input');
const searchButton = document.querySelector('.searchButton');

let pagenr = 1;
let search = false;
let query = '';


input.addEventListener('input', (e) => {
    e.preventDefault();
    query = e.target.value;
});

//Enable this code if you want to display images upon render

// async function GetAllPhotos(pagenr) {
//     const data = await fetch(
//         `https://api.pexels.com/v1/curated?per_page=10&page=${pagenr}`,
//         {
//             method: "GET",
//             headers: {
//                 Accept: "application/json",
//                 Authorization: apiKey,
//             },
//         }
//     );
//     const result = await data.json();
//     result.photos.forEach((photo) => {
//         const pic = document.createElement('div');
//         pic.innerHTML = `
//             <img src=${photo.src.large}
//             <p>Photo: ${photo.photographer}</p>
//             <a href=${photo.src.large}>Download</a>
//         `;
//         document.querySelector('.gallery').appendChild(pic);
//     })
// }

searchButton.addEventListener('click', () => {
    if (input.value === '') return;
    clear();
    search = true;
    searchPhotos(query, pagenr);
    pagenr++;
});

function clear(){
    input.value= '';
    document.querySelector('.gallery').innerHTML = '';
    pagenr = 1;
}

async function searchPhotos(query, pagenr) {
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apiKey,
            },
        }
    );
    const result = await data.json();
    result.photos.forEach((photo) => {
        const pic = document.createElement('div');
        pic.innerHTML = `
            <a href=${photo.src.large}>
                <img src=${photo.src.large}
                <p>Photo: ${photo.photographer}</p>
            </a>
        `;
        document.querySelector('.gallery').appendChild(pic);
    })
}

next.addEventListener('click', () => {
    if (!search){
        pagenr++;
        GetAllPhotos(pagenr)
    } else {
        if (query.value === '') return;
        pagenr++;
        searchPhotos(query, pagenr);
    }
})

GetAllPhotos(pagenr);