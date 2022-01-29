console.log(chroma.random().hex())

function ColorGenerator(){
    this.colors=[];

    //element selections
    this.colorElements=document.querySelectorAll(".color");
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

colorGenerator.generateButton.addEventListener("click",()=>{
    colorGenerator.generateColor();
    console.log("hi")
})