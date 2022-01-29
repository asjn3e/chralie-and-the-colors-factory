console.log(chroma.random().hex())

function ColorGenerator(){
    this.colors=[];

    //element selections
    this.colorElements=document.querySelectorAll(".color");
        //slider activators
        this.sliderActivators=document.querySelectorAll(".sliderActivator");
        //slider close button
        this.sliderCloseButton=document.querySelectorAll(".slider__close");

    //panel buttons
    this.generateButton=document.querySelector("#generate");


    //functions
    this.generateColor= () =>{
        this.colors=[];
        for(let i =0;i<5;i++){
            this.colors.push(chroma.random().hex());
        }
        //add colors to divs
        this.colorElements.forEach((element,index)=>{
            element.style.backgroundColor=this.colors[index];
            element.querySelector("h2").innerText=this.colors[index];

        //luminance correction 
        console.log(chroma(this.colors[index]).luminance())
        if(chroma(this.colors[index]).luminance() < 0.5){
                element.querySelector("h2").style.color="white"
                element.querySelectorAll("button").forEach(icon=>{
                    icon.style.color="white"
                })
         }else{
            element.querySelector("h2").style.color="#000"
            element.querySelectorAll("button").forEach(icon=>{
                icon.style.color="#000"
            })
         }
        })
    }




}


const colorGenerator=new ColorGenerator();

//running functions


colorGenerator.generateColor();

console.log(colorGenerator)

//event listeners

    //event for regenerating colors
    colorGenerator.generateButton.addEventListener("click",()=>{
        colorGenerator.generateColor();
        console.log("hi")
    })

    //event for opening and closing slider 
    
    //open and close with slider button 
    colorGenerator.sliderActivators.forEach((element,index)=>{
        element.addEventListener("click",()=>{
            document.querySelectorAll(".slider")[index].classList.toggle("active");
        })
    })
    
    console.log(colorGenerator.sliderCloseButton)
    //close with  X button
    colorGenerator.sliderCloseButton.forEach((element,index)=>{
        console.log(element)
        element.addEventListener("click",()=>{
            document.querySelectorAll(".slider")[index].classList.remove("active");
            console.log("hi")
        })
    })