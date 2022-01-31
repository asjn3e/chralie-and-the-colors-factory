let savedColors=JSON.parse(localStorage.getItem("colors"));

if(!localStorage.getItem("colors")){
    savedColors=[]
}

function ColorGenerator() {
    this.colors = [{hex:null,islocked:false},{hex:null,islocked:false},{hex:null,islocked:false},{hex:null,islocked:false},{hex:null,islocked:false}];

    //element selections
    this.colorElements = document.querySelectorAll(".color");
    //slider activators
    this.sliderActivators = document.querySelectorAll(".sliderActivator");
    //slider close button
    this.sliderCloseButton = document.querySelectorAll(".slider__close");

    //slider inputs
    this.sliderInputs = document.querySelectorAll("input[type='range']")
    //panel buttons
    this.generateButton = document.querySelector("#generate");

    //color texts (h2)
    this.colorHEX=document.querySelectorAll("h2")

    //lock buttons
    this.locks=document.querySelectorAll(".colorLocker");
    
    //save button
    this.saveButton=document.querySelector("#save");

    //close saving container button

    this.closeSavingContainer=document.querySelector(".close-save-container")
    //save container
    this.saveContainer=document.querySelector(".save-container");

    //save palette button
    this.savePalette=document.querySelector("#savePalette");

    //open library button
    this.libraryButton=document.querySelector("#library");

    //library container
    this.libraryContainer=document.querySelector(".library-container")

    //close library btn
    this.closeLibraryButton=document.querySelector(".close-libarary");

    this.libraryPopup=document.querySelector(".library-popup")

    this.clearLibrary=document.querySelector("#clearLibrary");
    //functions
    this.generateColor = () => {
        
        this.colors.forEach(element=>{
            if(element.islocked==false){
                element.hex=chroma.random().hex();
            }
        })
        
        //add colors to divs
        this.colorElements.forEach((element, index) => {
            //changing divs bg and luminance 
            this.changeDivsBGandLuminance(element, this.colors[index].hex);
            //setting range inputs background
            this.changeinputsbg(element, this.colors[index].hex)

        })

    }

    this.changeinputsbg = (element, hex) => {
        let sliderInputs = element.querySelectorAll("input");
        const hue = sliderInputs[0];
        const brightness = sliderInputs[1];
        const saturation = sliderInputs[2];
        hue.style.backgroundImage = "linear-gradient(to Right,#cc4b4b,#cccc4b,#4bcc4b,#4bcccc,#4b4bcc,#cc4bcc,#cc4b4b)"
        hue.value=chroma(hex).hsl()[0]
        const brightnessValues = {
            a: chroma(hex).set("hsl.l", 0).hex(),
            b: hex,
            c: chroma(hex).set("hsl.l", 1).hex()
        }
        brightness.value=chroma(hex).hsl()[2]
        brightness.style.backgroundImage = `linear-gradient(to Right,${brightnessValues.a},${brightnessValues.b},${brightnessValues.c})`
        const saturationValues = {
            a: chroma(hex).set("hsl.s", 0).hex(),
            b: hex,
            c: chroma(hex).set("hsl.s", 1).hex()
        }
        saturation.value=chroma(hex).hsl()[1]
        saturation.style.backgroundImage = `linear-gradient(to Right,${saturationValues.a},${saturationValues.b},${saturationValues.c})`

    }


    this.changeDivsBGandLuminance = (element, hex) => {

        element.style.backgroundColor = hex;
        element.querySelector("h2").innerText = hex;
        //luminance correction 

        if (chroma(hex).luminance() <= 0.5) {
            element.querySelector("h2").style.color = "white"
            element.querySelectorAll("button").forEach(icon => {
                icon.style.color = "white"
            })
        } else {
            element.querySelector("h2").style.color = "#000"
            element.querySelectorAll("button").forEach(icon => {
                icon.style.color = "#000"
            })
        }
    }

    
    this.setHSL=(inputNo)=>{
        set=(colorNo,startInputNo)=>{
            let colorElement = this.colorElements[colorNo]
            let color = this.colors[colorNo].hex;
            
            let sliderInputs= this.sliderInputs;
            this.colors[colorNo].hex = 
            chroma(color)
            .set('hsl.h', sliderInputs[startInputNo].value)
            .set('hsl.l', sliderInputs[startInputNo+1].value)
            .set('hsl.s', sliderInputs[startInputNo+2].value)
            .hex();
            
            this.changeDivsBGandLuminance(colorElement, this.colors[colorNo].hex)
            this.changeinputsbg(colorElement,this.colors[colorNo].hex)
        }
        if (0 <= inputNo && inputNo <= 2) {
            set(0,0)
        }
        if (3 <= inputNo && inputNo <= 5) {
            set(1,3)
        }
        if (6 <= inputNo && inputNo <= 8) {
            set(2,6)
        }
        if (9 <= inputNo && inputNo <= 11) {
            set(3,9)
        }
        if (12 <= inputNo && inputNo <= 14) {
            set(4,12)
        }
    }

    this.bundleLibrary=()=>{
        this.libraryPopup.querySelectorAll("div").forEach(element=>{
            element.remove();
        })
        savedColors.forEach((element,index)=>{
            let div=document.createElement("div");
            div.classList.add("library-palette");
            let htmlElement=`
                <p class="library-name">${element.name}</p>
                <div class="library-color" style="background-color:${element.colors[0].hex};"></div>
                <div class="library-color" style="background-color:${element.colors[1].hex};"></div>
                <div class="library-color" style="background-color:${element.colors[2].hex};"></div>
                <div class="library-color" style="background-color:${element.colors[3].hex};"></div>
                <div class="library-color" style="background-color:${element.colors[4].hex};"></div>
                <div class="library-select select-${index}">Select</div>
            `
        
        div.innerHTML=htmlElement
        this.libraryPopup.appendChild(div);
        document.querySelector(`.select-${index}`).addEventListener("click",()=>{
            this.colors=savedColors[index].colors
            this.colors.forEach((element,j)=>{
                if(element.islocked==true){
                    this.locks[j].firstChild.classList.remove("fa-lock-open")
                    this.locks[j].firstChild.classList.add("fa-lock")
                }
                if(element.islocked==false){
                    this.locks[j].firstChild.classList.remove("fa-lock")
                    this.locks[j].firstChild.classList.add("fa-lock-open")
                }
            })
            //add colors to divs
            this.colorElements.forEach((element, index) => {
                //changing divs bg and luminance 
                this.changeDivsBGandLuminance(element, this.colors[index].hex);
                //setting range inputs background
                this.changeinputsbg(element, this.colors[index].hex)

        })

        })
        })
    }
    
}


const colorGenerator = new ColorGenerator();

//event listeners

//event for regenerating colors
colorGenerator.generateButton.addEventListener("click", () => {
    colorGenerator.generateColor();
    
})

//event for opening and closing slider 

//open and close with slider button 
colorGenerator.sliderActivators.forEach((element, index) => {
    element.addEventListener("click", () => {
        document.querySelectorAll(".slider")[index].classList.toggle("active");
    })
})

//close with  X button
colorGenerator.sliderCloseButton.forEach((element, index) => {
    element.addEventListener("click", () => {
        document.querySelectorAll(".slider")[index].classList.remove("active");
    })
})

//event for changing colors HSL 
colorGenerator.sliderInputs.forEach((element, index) => {
    element.addEventListener("input", () => {
        colorGenerator.setHSL(index)
    })
})

//event for copping color hex
colorGenerator.colorHEX.forEach(element =>{
    element.addEventListener("click",(e)=>{
        const el=document.createElement("textarea");
        el.value=element.innerText;
        el.select();
        navigator.clipboard.writeText(el.value);

        document.querySelector(".copy-container").classList.add("active")
        setTimeout(()=>{
            document.querySelector(".copy-container").classList.remove("active")
        },2000)
    })
})

//lock and unlock
colorGenerator.locks.forEach((element,index)=>{
    element.addEventListener("click",()=>{
        if(!colorGenerator.colors[index].islocked){
            colorGenerator.colors[index].islocked=true;
            element.firstChild.classList.replace("fa-lock-open","fa-lock")
        }
        else{
            colorGenerator.colors[index].islocked=false;
            element.firstChild.classList.replace("fa-lock","fa-lock-open")
        }
    })
})

//open saving container
colorGenerator.saveButton.addEventListener("click",()=>{
    colorGenerator.saveContainer.classList.add("active")
})
//close saving container
colorGenerator.closeSavingContainer.addEventListener("click",()=>{
    colorGenerator.saveContainer.classList.remove("active")
})

//save paletter events
colorGenerator.savePalette.addEventListener("click",()=>{
    const paletteName=colorGenerator.saveContainer.querySelector("input").value;
    const newSavingColor={
        name:paletteName,
        colors:Array.from(colorGenerator.colors),
    }
    let prevuisColors=JSON.parse(localStorage.getItem("colors")) || []
    prevuisColors.push(newSavingColor)
    localStorage.setItem("colors",JSON.stringify(prevuisColors))
    savedColors=[...prevuisColors]
    colorGenerator.saveContainer.classList.remove("active")
})

//open library 
colorGenerator.libraryButton.addEventListener("click",()=>{
    colorGenerator.libraryContainer.classList.add("active")
    colorGenerator.bundleLibrary();
})

//close library continer
colorGenerator.closeLibraryButton.addEventListener("click",()=>{
    colorGenerator.libraryContainer.classList.remove("active")
})


//clear library
colorGenerator.clearLibrary.addEventListener("click",()=>{
    localStorage.removeItem("colors");
    savedColors.splice(0,savedColors.length)
    colorGenerator.libraryPopup.querySelectorAll("div").forEach(element=>{
        element.remove();
    })
    console.log(savedColors)
})

//run app
colorGenerator.generateColor();