console.log(chroma.random().hex())

function ColorGenerator() {
    this.colors = [];

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


    //functions
    this.generateColor = () => {
        this.colors = [];
        for (let i = 0; i < 5; i++) {
            let color = {
                hex: chroma.random().hex(),
                hue: null,
                brightness: null,
                saturation: null,
                secondaryHex: null,
                islocked:false
            }
            this.colors.push(color);
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

        if (chroma(hex).luminance() < 0.5) {
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


console.log(colorGenerator.sliderInputs)

//event for changing colors HSL 
colorGenerator.sliderInputs.forEach((element, index) => {
    element.addEventListener("input", () => {
        colorGenerator.setHSL(index)
    })
})



//run app
colorGenerator.generateColor();