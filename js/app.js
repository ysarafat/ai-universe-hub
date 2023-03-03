// fetch all data 
const loadAiData = () => {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(URL)
        .then(res => res.json()).then(data => {
            displayData(data.data.tools.slice(0, 6))
        })
    spinner(true)
}

// display the data on ui
const displayData = (data) => {
    // console.log(data);
    const getCardSection = document.getElementById('ai-card')
    getCardSection.innerHTML = "";
    data.forEach(data => {
        const { id, name, image, published_in, features } = data
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <div class="card w-96 bg-base-100 border border-gray-100 shadow-xl">
                    <figure class="px-5 pt-5 "><img class="rounded h-[220px]" src="${image}" alt="Ai image" /></figure>
                    <div class="card-body px-5 ">
                        <h2 class="card-title">Features </h2>
                        <ol class="list-decimal	px-5">
                            <li>${features[0] ? features[0] : "No data found"}</li>
                            <li>${features[1] ? features[1] : "No data found"}</li>
                            <li>${features[2] ? features[2] : "No data found"}</li>
                        </ol>
                        <hr>
                        <div class="flex justify-between items-center">
                            <div>
                                <h2 class="card-title">${name}</h2>
                                <p><i class="fa-solid fa-calendar-days"></i> <span>${published_in ? published_in : "no data"}</span></p>
                            </div>
                            <div>
                                <label onclick="openModal('${id}')" for="my-modal-3" class="btn btn-error text-white my-6 rounded-full bg-red-200 hover:bg-red-200 border-none "><i class="fa-solid fa-arrow-right text-red-400 text-lg"></i></label>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        getCardSection.appendChild(createDiv)
        spinner(false)
    });
};

// spinner function
const spinner = loading => {
    const getSpinner = document.getElementById('spinner')
    const seeMoreButton = document.getElementById('see-more')
    if (loading) {
        getSpinner.classList.remove('hidden')
        seeMoreButton.classList.add('hidden')
    } else {
        getSpinner.classList.add('hidden')
        seeMoreButton.classList.remove('hidden')
    }
};

// see more button
document.getElementById('see-more').addEventListener('click', function () {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(URL)
        .then(res => res.json()).then(data => {
            displayData(data.data.tools);
        })
})

// modal function
const openModal = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json()).then(data => modaldisplay(data.data))
}

// display modal
const modaldisplay = data => {
    const { description, pricing, features, integrations, image_link, accuracy, input_output_examples
    } = data
    const modals = document.getElementById('modal-cards')
    modals.innerHTML = "";
    modals.innerHTML = `
    <div class="flex gap-4 justify-center items-center flex-col md:flex-row py-6 md:py-4">
    <div class="card w-full max-w-[480px] h-full bg-base-100 shadow-xl ">
        <div class="card-body border border-red-400 bg-red-100 rounded-lg ">
            <h2 id="description" class="card-title">${description}</h2>
            <div
                class="flex justify-center flex-col md:flex-row items-center gap-2 w-full max-[470px] px-10">
                <div class="w-40 text-center py-5 px-2 rounded-lg bg-white">
                    <p id="price-basic" class="text-green-500 font-semibold text-lg">${(pricing === null) ? 'No Cost' : pricing[0].price} <br> ${(pricing === null) ? '' : pricing[0].plan}</p>
                </div>
                <div class=" w-40 text-center py-5 px-2 rounded-lg bg-white">
                    <p id="price-pro" class="text-orange-500 font-semibold text-lg">${(pricing === null) ? 'No Cost' : pricing[1].price} <br> ${(pricing === null) ? '' : pricing[1].plan}</p>
                </div>
                <div class="w-40 text-center py-5 px-2 rounded-lg bg-white">
                    <p id="w-40 price-enterprise" class="text-red-500 font-semibold ">${(pricing === null) ? 'No Cost' : pricing[2].price} <br> ${(pricing === null) ? '' : pricing[2].plan}</p>
                </div>

            </div>
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class=" py-3">
                    <h2 class="card-title font-semibold">Features</h2>
                    <ol class="list-disc px-4">
                        <li id="features-1">${features[1].feature_name ? features[1].feature_name : "no data found"}</li>
                        <li id="features-2">${features[2].feature_name ? features[2].feature_name : "no data found"}</li>
                        <li id="features-3">${features[3].feature_name ? features[3].feature_name : "no data found"}</li>
                    </ol>
                </div>
                <div>
                    <h2 class="card-title font-semibold">Integrations</h2>

                    <ol class="list-disc px-4">
                        <li id="integrations-1">${(integrations === null) ? 'No data found' : integrations[0]}</li>
                        <li id="integrations-2">${(integrations === null || integrations[1] === undefined) ? 'No data found' : integrations[1]} </li>
                        <li id="integrations-3"> ${(integrations === null || integrations[1] === undefined) ? 'No data found' : integrations[2]}</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
   
    <div
        class="card w-full max-w-[480px] h-full bg-base-100 rounded-lg shadow-xl border border-gray-200 ">
        <figure id="image" class="px-5 pt-5 ">
            <img class="rounded h-[220px] w-full" src="${image_link[0]}"
                alt="Ai image" />
        </figure>
        <div>
            <div
                class="bg-red-500 text-lg w-[160px] text-center relative -mt-52 md:ml-[270px] mx-auto rounded-xl">
                <span class= text-white p-2 font-bold ">${(accuracy.score !== null) ? accuracy.score * 100 + '% accuracy' : ""} </span> 

            </div>
        </div>
        <div class="card-body px-5 text-center ">
            <h2 id="card-title" class="card-title mx-auto">${(input_output_examples !== null) ? input_output_examples[0].input : "No data Found"}</h2>
            <p>${(input_output_examples !== null) ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>

        </div>
    </div>
</div>
            `;
}

// fetch data for sorting
document.getElementById('sort-by-date').addEventListener('click', function () {
    const URL = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(URL)
        .then(res => res.json()).then(data => {
            sortByDate(data.data.tools);
        })
})

// sort by date function
const sortByDate = (data) => {
    const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateB - dateA;
    });
    displayData(sortedData);
};
