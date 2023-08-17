document.addEventListener("DOMContentLoaded",() => {
    let pageNumber = 1;

    get50Data(pageNumber);

    //InputForm
    let inputForm = document.createElement('form');
    inputForm.setArrtibute = ('id', 'monster-form');
    inputForm.innerHTML = `
        <input id='name' placeholder='name...'>
        <input id='age' placeholder= 'age...'>
        <input id='description' placeholder='description...'>
        <button>Create</button>
    `
    document.querySelector('#create-monster').appendChild(inputForm);

    //Add Function to Form
    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let cardObj = {
            name: e.target.name.value,
            age: e.target.age.value,
            description: e.target.description.value
        }
        addServer(cardObj);
    })

    //forward Button
    const forwardButton = document.querySelector('#forward');
    forwardButton.addEventListener('click',() =>{
        pageNumber++;
        document.querySelector('#monster-container').innerHTML ='';
        get50Data(pageNumber);
    })

    //back Button
    const backButton = document.querySelector('#back');
    backButton.addEventListener('click',() =>{
        if(pageNumber>1){
            pageNumber--;
            document.querySelector('#monster-container').innerHTML ='';
            get50Data(pageNumber);
        }
    })

    //GetData(&addDOM)
    function get50Data(pageNum){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`)
        .then(res => res.json())
        .then(data => {
            for(id in data){
                let name = data[id].name;
                let age = data[id].age;
                let description = data[id].description;
                createCard(name,age,description);
            }
        })
    }

    //AddDOM
    function createCard(n, a, d){ 
        let card = document.createElement('div');
        card.innerHTML =`
            <h2>${n}</h2>
            <h4>Age: ${a}</h4>
            <p>Bio: ${d}</p>
        `
        document.querySelector('#monster-container').appendChild(card);
    }

    //Post request
    function addServer(obj){
        fetch('http://localhost:3000/monsters',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
})