console.log(chroma.random().hex())

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
    this.locks=document.querySelectorAll(".colorLocker")

    //functions
    this.generateColor = () => {
        
        for (let i = 0; i < 5; i++) {
            if(this.colors[i].islocked==true){
                continue
            }
            this.colors[i].hex=chroma.random().hex();
        }

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
        console.log(chroma(hex).hsl())
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
        console.log("hi")
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
        console.log(colorGenerator.colors)
    })
})


//run app
colorGenerator.generateColor();