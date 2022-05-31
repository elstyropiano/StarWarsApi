const BASE_URL='https://swapi.dev/api/'
let collection =null
const header=document.getElementById('header')
const table=document.getElementById('table')
const divTable=document.getElementById('divTable')
const divExtend=document.getElementsByClassName('divExtend')
const closeButton=document.getElementsByClassName('closeButton')
const tableAndPagination=document.getElementById('tableAndPagination')
const paginationDiv=document.getElementsByClassName('paginationDiv')

console.log(divTable)

let clicked=0
let isPaginationButton=0

class Base{
    constructor(created,url,name){
        this.created=created
        this.url=url
        this.name=name
}
}
class People extends Base{
    constructor(name,birth_year,height,gender,created,url){
        super(created,url,name)
        this.birth_year=birth_year
        this.height=height
        this.gender=gender
    }
}
class Planets extends Base{
    constructor(name,terrain,surface_water,climate,created,url){
        super(created,url,name)
        this.terrain=terrain
        this.surface_water=surface_water
        this.climate=climate
    }
}
class Films {
    
    constructor(url,title,episode_id,director,created){
        this.url=url
        this.title=title
        this.episode_id=episode_id
        this.director=director
        this.created=created
        
    }
}

class Species extends Base{
    constructor(name,average_height,classification,language,created,url){
        super(created,url,name)
        this.average_height=average_height
        this.classification=classification
        this.language=language
    }
}
class Vehicles extends Base{
    constructor(name,model,passengers,crew,created,url){
        super(created,url,name)
        this.model=model
        this.passengers=passengers
        this.crew=crew
    }
}
class Strarships extends Base{
    constructor(name,model,length,max_atmosphering_speed,created,url){
        super(created,url,name)
        this.model=model
        this.length=length
        this.max_atmosphering_speed=max_atmosphering_speed
    }
}

async function getData(){
    const  response= await fetch(BASE_URL)
    const data= await response.json()
    const buttonsDiv=document.getElementById("buttonsDiv")
    console.log(data)
    Object.keys(data).map(key=>{
        const button=document.createElement('button')
        button.innerHTML=key
        button.addEventListener('click',click)
        button.classList='key'
        buttonsDiv.appendChild(button)
    })

    async function click(){
        removeTable()

        
       
        
       
        const results=document.getElementById('results')
        const buttonName=this.textContent
        await fetchEndpoint(buttonName)
 
        const resultsValue=collection.count
        results.innerHTML=`Results: ${resultsValue}`

        if(buttonName==='people'){

            const instances=collection.results.map(({name,birth_year,height,gender,created,url})=>
            new People (name,birth_year,height,gender,created,url)
            )
          
            createTable(instances)
            // createPagination()
            
         }
        
        else  if(buttonName==='planets'){
            const instances=collection.results.map(({name,terrain,surface_water,climate,created,url})=>
            new Planets (name,terrain,surface_water,climate,created,url)
            )
        
       
        createTable(instances)
        // createPagination()
        }
        else  if(buttonName==='films'){
            const instances=collection.results.map(({url,title,episode_id,director,created})=>
            new Films (url,title,episode_id,director,created)
            )
        
        createTable(instances)
        // createPagination()
       
        }
        else  if(buttonName==='species'){
            const instances=collection.results.map(({name,average_height,classification,language,created,url})=>
            new Species (name,average_height,classification,language,created,url)
            )
            
            createTable(instances)
            // createPagination()

        } 
        else  if(buttonName==='vehicles'){
            const instances=collection.results.map(({name,model,passengers,crew,created,url})=>
            new Vehicles (name,model,passengers,crew,created,url)
            )
            
            createTable(instances)
            // createPagination()
 
        }
        else  if(buttonName==='starships'){
            const instances=collection.results.map(({name,model,length,max_atmosphering_speed,created,url})=>
            new Strarships (name,model,length,max_atmosphering_speed,created,url)
            )
         
            createTable(instances)
            // createPagination()
            
        } 
        createPagination()
    }
}

getData()


function createPagination(){
    
    if (isPaginationButton===0){

        const div=document.createElement('div')
        div.classList='paginationDiv'

        const previousPageButton=document.createElement('button')
        const arrowLeft=document.createElement('icon')
        arrowLeft.classList='icon-left'
        previousPageButton.appendChild(arrowLeft)
        const spanLeft=document.createElement('span')
        spanLeft.innerHTML='PREV'
        spanLeft.classList='paginationButtonSpan'
        previousPageButton.appendChild(spanLeft)

        const nextPageButton=document.createElement('button')
        const spanRight=document.createElement('span')
        spanRight.innerHTML='NEXT'
        spanRight.classList='paginationButtonSpan'
        nextPageButton.appendChild(spanRight)
        const span=document.createElement('span')
        span.classList='spanBetweenPagination'
        const arrowRight=document.createElement('icon')
        arrowRight.classList='icon-right'
        nextPageButton.appendChild(arrowRight)

        span.innerHTML='1'

        div.appendChild(previousPageButton)
        div.appendChild(span)
        div.appendChild(nextPageButton)
        tableAndPagination.appendChild(div)
        isPaginationButton=1
    }
   console.log('paginacja')
}

async function fetchEndpoint(buttonName){
    const response=await fetch(`${BASE_URL}${buttonName}`)
    collection=await response.json()  
}
// function CreateHeader(instances){

// }
function createTable(instances){
    
    const keys= Object.keys(instances[0])
    console.log(keys)
    let initialValue=keys.length-4
    let finishValue=keys.length
  
    if (!instances[0].hasOwnProperty('name')){

        initialValue= 1
        finishValue=keys.length-1
    }
    
    const header=document.createElement('tr')
    const id=document.createElement('th')
    id.innerHTML='ID'
    id.classList='id'
    header.appendChild(id)
    const dataValues=[]

    for (i=initialValue;i<finishValue;i++){
        
            const th=document.createElement('th')
            th.innerHTML=keys[i].split("_").join(' ').toUpperCase()
            header.appendChild(th)
            dataValues.push(keys[i])
            console.log(keys[i])
    } 
    
    const created=document.createElement('th')
    created.innerHTML='CREATED'
    created.classList='created'
    const actions=document.createElement('th')
    actions.innerHTML='ACTIONS'
    actions.className='actionsTh'
    header.appendChild(created)
    header.appendChild(actions)
    table.appendChild(header)

    dataValues.push('created','actions')
    instances.map((element,index)=>{

    const date=new Date(element.created)
    const readyDate=`${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`


        const tr=document.createElement('tr')
        const number=document.createElement('td')
        number.classList='id'
        number.innerHTML=index+1
        tr.appendChild(number)

        for(i=0;i<dataValues.length-2;i++){
            const td=document.createElement('td')
            td.innerHTML=element[dataValues[i]]
            tr.appendChild(td)
        }
        const created=document.createElement('td')
        created.innerHTML=readyDate
        created.classList='created'
        tr.appendChild(created)
        
        const actions=createActionsBar()
        const actionsButtons =createActionsButton()
        actions.appendChild(actionsButtons[0])
        actions.appendChild(actionsButtons[1])
        tr.appendChild(actions)
        table.appendChild(tr)
})

function targetElement(event){
   const  target=event.target
   if (target.classList.contains('buttonDelete')||target.classList.contains('icon-trash')){
           findTargetActionBar(target)
    
   }
  else  if (target.classList.contains('buttonExpand')||target.classList.contains('icon-plus')){
    
     
    createExtendDiv(target)


    }
}
  



   function createExtendDiv(target){
       
    function getId(target){
           
        if (target.tagName==='TR'){
            const id=target.firstChild.textContent-1
            

            if(clicked===0) {
                clicked=1
                
                const div=document.createElement('div')
                const closeButton=document.createElement('button')
                closeButton.classList='closeButton'
                const crossIcon=document.createElement('icon')
                crossIcon.classList='icon-cancel'
                closeButton.appendChild(crossIcon)
                closeButton.onclick=closeExtendWindow
                div.classList='divExtend'
                div.appendChild(closeButton)
                divTable.appendChild(div)
                const divParagraph=document.createElement('div')
                const text='close--extended--window'
                for(i=0;i<text.length;i++){
                   const p=document.createElement('p')
                   p.innerHTML=text[i]
                  divParagraph.appendChild(p)
                }
                closeButton.appendChild(divParagraph)
                const crossIcon2=document.createElement('icon')
                crossIcon2.classList='icon-cancel'
                closeButton.appendChild(crossIcon2)
                
                  
                
                const tableExtend=document.createElement('table')
                tableExtend.classList='tableExtend'
                const tr=document.createElement('tr')
                const th1=document.createElement('th')
                const th2=document.createElement('th')

                th1.innerHTML="KEY"
                th2.innerHTML="VALUE"
                tr.appendChild(th1)
                tr.appendChild(th2)
                tableExtend.appendChild(tr)
              
                
                const specificIdData=collection.results[id]
                console.log(specificIdData)
                const keyAndValues=Object.entries(specificIdData)
                keyAndValues.forEach(([key,value])=>{

                const tr=document.createElement('tr')
                const td1=document.createElement('td')
                td1.innerHTML=key
                const td2=document.createElement('td')
                td2.innerHTML=value

                tr.appendChild(td1)
                tr.appendChild(td2)
                tableExtend.appendChild(tr)
                    
                    

                })
                div.appendChild(tableExtend)
                
            }
             else if  (clicked===1){
                console.log('closeButton',closeButton)
                closeButton[0].style.backgroundColor='var(--red)'
            }
           
            return
        }
       getId(target.parentNode)
    }
    getId(target)
 
   }
   function closeExtendWindow(){
        clicked=0
        divTable.removeChild(this.parentNode)
   }

    function removeRow(){
        const tr=this.parentNode.parentNode.parentNode
        table.removeChild(tr)
    }

    function createActionsBar(){
        const actions=document.createElement('td')
        actions.classList='actions'
        return actions
    }

    function createActionsButton(){
        const buttonExpand=document.createElement('button')
        const buttonDelete=document.createElement('button')
        buttonDelete.onclick=targetElement
        buttonExpand.onclick=targetElement
        buttonExpand.classList=`buttonExpand `
        buttonDelete.classList=`buttonDelete `
        const trashBoxIcon=document.createElement('icon')
        const plusIcon=document.createElement('icon')
        trashBoxIcon.classList='icon-trash'
        plusIcon.classList='icon-plus' 
        buttonExpand.appendChild(plusIcon)
        buttonDelete.appendChild(trashBoxIcon)
        return [buttonExpand,buttonDelete]    
    }

function findTargetActionBar(target){


    if(target.tagName==='TD'){
   
        const div1=document.createElement('div')
        const div2=document.createElement('div')
        div1.classList='divLeft'
        div2.classList='divRight'
        const yes=document.createElement('button')
        yes.classList='button yes'
        const no=document.createElement('button')
        no.classList='button no'
        const text=document.createElement('span')
        text.innerText='Are You sure?'
        yes.innerHTML='YES'
        no.innerHTML='NO'
        no.addEventListener('click',function(){
            
        const actions=this.parentNode.parentNode
        actions.innerHTML=''
        actions.appendChild(createActionsButton()[0])
        actions.appendChild(createActionsButton()[1])
            
        })
        
        yes.addEventListener('click',removeRow)  
        target.innerHTML=''
        div1.appendChild(text)
        div2.appendChild(yes)
        div2.appendChild(no)   
        target.appendChild(div1)
        target.appendChild(div2)
        return
        
    }

    findTargetActionBar(target.parentNode)  
    }
}
function removeTable(){
    table.innerHTML=''
    if(clicked===1){
        divTable.removeChild(divExtend[0])
       
        clicked=0
        
    }
    if (isPaginationButton===1){
        tableAndPagination.removeChild(paginationDiv[0])
        isPaginationButton=0
    }
   
}
