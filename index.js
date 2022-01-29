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
         //setting range inputs background
         let sliderInputs=element.querySelectorAll("input");
         const hue=sliderInputs[0];
         const brightness=sliderInputs[1];
         const saturation=sliderInputs[2];
         hue.style.backgroundImage="linear-gradient(to Right,#cc4b4b,#cccc4b,#4bcc4b,#4bcccc,#4b4bcc,#cc4bcc,#cc4b4b)"
         const brightnessValues={
             a:chroma(this.colors[index]).set("lab.l","1").hex(),
             b:this.colors[index],
             c:chroma(this.colors[index]).set("lab.l","100").hex()
         }
         brightness.style.backgroundImage=`linear-gradient(to Right,${brightnessValues.a},${brightnessValues.b},${brightnessValues.c})`
         const saturationValues={
            a:chroma(this.colors[index]).set("hsl.s","0").hex(),
            b:this.colors[index],
            c:chroma(this.colors[index]).set("hsl.s","100").hex()
        }
        saturation.style.backgroundImage=`linear-gradient(to Right,${saturationValues.a},${saturationValues.b},${saturationValues.c})`
         
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
        
    })

    //event for opening and closing slider 
    
    //open and close with slider button 
    colorGenerator.sliderActivators.forEach((element,index)=>{
        element.addEventListener("click",()=>{
            document.querySelectorAll(".slider")[index].classList.toggle("active");
        })
    })
    
    
    //close with  X button
    colorGenerator.sliderCloseButton.forEach((element,index)=>{
        element.addEventListener("click",()=>{
            document.querySelectorAll(".slider")[index].classList.remove("active");
            console.log("hi")
        })
    })
