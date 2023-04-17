let data = [];
let cardId;


let add = document.querySelector('.addItem-1');
let body = document.querySelector('.body');
let bodyOne = document.querySelector('.body-1');
let head = document.querySelector('.header');
const cardContainer = document.getElementById('cardBody');
function clk(){
    body.setAttribute('style','display: block');
    head.setAttribute('style','filter: brightness(0.5) blur(1px)');
    cardContainer.setAttribute('style','filter: brightness(0.5) blur(1px)');
}
function closeTask(){
    body.setAttribute('style','display: none');
    head.setAttribute('style','filter: none');
    cardContainer.setAttribute('style','filter: none');
}

function addCards(){
    const taskText = document.getElementById('text').value;
    const cardData = {
        id: new Date().getTime().toString(),
        cardTitle: taskText,
        content: [],
    }
    if (taskText){
        data.push(cardData);
        addMoreCards();
    }
    else{
        alert("Please add card Name");
    }
    document.getElementById('text').value="";
    closeTask();
    const heading = document.querySelector('.header')
    heading.style.display = 'block'
    
    const backButton = document.querySelector('.newPage')
    backButton.style.display = 'none'
}
function addContent(){
    for(let i = 0; i<data.length; i++){
        const ulElement = document.getElementById(`content_list_${data[i].id}`);
        let child = "";
        for(let j=0; j<data[i].content.length; j++){
            const content = data[i].content[j];
            // child += `<li id="content_${content.id}"  onclick="doneTask(${content.id})">${content.contentText}</li>`;
            child+=`<li class =" content ${content.done ? "checked": ""}" id="content_${content.id}" onclick="doneTask(${content.id},${data[i].id})">${content.contentText}</li>`
            console.log(data[i]);
        };
        ulElement.innerHTML = child;
        console.log(data);
    }
}


function addMoreCards(){
    const cardContainer = document.getElementById('cardBody');
    let child = "";
    for(let i = 0; i < data.length; i++){
        console.log("jkj:" , data[i]);
        child += `  <div id="cards_${data[i].id}" class="cards">
        <div class="task-n" value="${data[i].cardTitle}" onclick="clickTask(${data[i].id},this.getAttribute('value'))">${data[i].cardTitle}</div>
        <div class="flexLagaCardMe">
        <div class="hightUl"> 
        <ul id="content_list_${data[i].id}"></ul>
        </div> 
        <div class="dif-Icon">
            <span class="delet-card" onclick="deleteCard(${data[i].id})"><ion-icon name="trash-outline"></ion-icon></span>
            <span class="edit-card" onclick="editCard(${data[i].id})"><ion-icon name="create-outline"></ion-icon></span>
        </div>   
        </div> 
    </div>`;
    }
    cardContainer.innerHTML = child;
    addContent()
}

function editCard(id){
    bodyOne.setAttribute('style','display: block');
    cardContainer.setAttribute('style','filter: brightness(0.5) blur(2px)');
    head.setAttribute('style','filter: brightness(0.5) blur(1px)');
    cardId = id;
    console.log("cardid: ", cardId);
}
function closeItem(){
    bodyOne.setAttribute('style','display: none');
    cardContainer.setAttribute('style','filter: none');
    head.setAttribute('style','filter: none');
}

function addItem(){
    const contentListId = `content_list_${cardId}`;
    const ul = document.getElementById(contentListId);
    const contentText = document.getElementById("text-1").value;
    if(!contentText){
        alert("Please add item name")
    }
    else{
        document.getElementById("text-1").value = "";
        const liNode = document.createElement("li");
        liNode.className = "contentLi";
        liNode.innerHTML = contentText;
        const id = new Date().getTime().toString();
        liNode.id= `content_${id}`;
        liNode.onclick=()=>{
            doneTask(id)
        }
        ul.appendChild(liNode);
        closeItem();
        for(let i = 0; i<data.length; i++){
         
            if(data[i].id == cardId){
                // console.log("data,i & cardId :",data[i].id,cardId);
                const content = {
                    id:id,
                    contentText: contentText,
                    done: false,
                }
                data[i].content.push(content);
            }


        }
    }
}

function doneTask(id){
    const contentId = `content_${id}`
    const liElement = document.getElementById(contentId);
    liElement.classList.toggle("checked");

    for(let i=0; i <data.length; i++){
        for(let j=0; j< data[i].content[j]; j++){
            const content = data[i].content[j];
            if(content.id==id){
                data[i].content[j].done=!data[i].content[j].done;
            }
        }
    }
}

function deleteCard(id){
    let cardId = `cards_${id}`;
    let cardRemove = document.getElementById(cardId);
    cardRemove.parentNode.removeChild(cardRemove);
    data=data.filter((item) => item.id != id);
}



function clickTask(id,value){
    console.log("card id:",id);
    const cardTitle = document.getElementById("cardTitle");
    cardTitle.innerHTML= value;
 
     const cards = document.querySelectorAll('.cards')
     const cardShow = document.getElementById(`cards_${id}`);
     console.log("card show:",cardShow);
     cards.forEach(allcards => {
         allcards.style.display ='none';
     });
     cardShow.style.display="block";
    
     const heading = document.querySelector('.header')
     heading.style.display = 'none'

     const backButton = document.querySelector('.newPage')
     backButton.style.display = 'block'
    }
   
     function MainPage(){
       const cards = document.querySelectorAll('.cards');
       cards.forEach(allcards => {
           allcards.style.display ='block';
       });
       const heading = document.querySelector('.header')
       heading.style.display = 'block'
       const backButton = document.querySelector('.newPage')
    backButton.style.display = 'none'
    const cardTitle = document.getElementById("cardTitle");
    cardTitle.style.display="none"
}
