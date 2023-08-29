const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones  => {

    const phoneContainer = document.getElementById('phone-container');
    //clear phoen cotnainer cards before adding new cards
    phoneContainer.textContent = '';

   // display show all if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    } 
    else {
        showAllContainer.classList.add('hidden');
    }

// display only first 12 phones
    phones = phones.slice(0,12);


    phones.forEach(phone =>{
        //2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-200 shadow-xl`
        //3.set innerHTML
        phoneCard.innerHTML = ` 
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>`;

        //4.append child
        phoneContainer.appendChild(phoneCard);

    });

    // hide loading dots
    toggleLoadingSpinner(false)
}



const handleShowDetails =async(id) =>{
    // console.log('handleShowDetails',id)
    // load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data)

    const phone = data.data;
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML=`
    <img src = "${phone.image}" alt=""/>
    <p><span>Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p><span>GPS: </span> ${phone?.others?.GPS}</p>
    `


    // show the modal
    show_details_modal.showModal();
}


//handle search button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);


}



// handle search recap
const handleSearch2 = ()=> {
    toggleLoadingSpinner();
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    // console.log(searchText);
    // console.log("search button 2");
    loadPhone(searchText);

}
const toggleLoadingSpinner =(isLoading) => {
    const loadingSpinner = document.getElementById('loading-dots');
       if(isLoading){
        loadingSpinner.classList.remove('hidden')
       }
       else{
        loadingSpinner.classList.add('hidden')
       }
    
}



loadPhone();

/////////////////////////////