// fetch all data 
const loadAiData = () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(URL)
        .then(res => res.json()).then(data => displayData(data.data.tools))
}
// display the data on ui
const displayData = (data) => {
    console.log(data);
    const getCardSection = document.getElementById('ai-card')
    data.forEach(data => {
        const { name, image, published_in, features } = data
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <div class="card w-96 bg-base-100 border border-gray-100 shadow-xl">
                    <figure class="px-5 pt-5 "><img class="rounded h-[220px]" src="${image}" alt="Ai image" /></figure>
                    <div class="card-body px-5 ">
                        <h2 class="card-title">Features </h2>
                        <ol class="list-decimal	px-5">
                            <li>${features[0]}</li>
                            <li>${features[1]}</li>
                            <li>${features[2]}</li>
                        </ol>
                        <hr>
                        <div class="flex justify-between items-center">
                            <div>
                                <h2 class="card-title">${name}</h2>
                                <p><i class="fa-solid fa-calendar-days"></i> <span>${published_in}</span></p>
                            </div>
                            <div>
                                <button class="btn btn-error text-white my-6 rounded-full bg-red-200 hover:bg-red-200 border-none "><i class="fa-solid fa-arrow-right text-red-400 text-lg"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        getCardSection.appendChild(createDiv)
    });
}