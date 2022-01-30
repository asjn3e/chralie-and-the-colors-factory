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



}


const colorGenerator = new ColorGenerator();

//functions

function changeHue(elementandColorNumber,input){
    let colorElement = colorGenerator.colorElements[elementandColorNumber]
    let color = colorGenerator.colors[elementandColorNumber].hex;
    colorGenerator.colors[elementandColorNumber].secondaryHex = 
    chroma(color)
    .set('hsl.h', input.value)
    .hex();
    colorGenerator.colors[elementandColorNumber].hue = input.value;
    colorGenerator.changeDivsBGandLuminance(colorElement, colorGenerator.colors[elementandColorNumber].secondaryHex)
    colorGenerator.changeinputsbg(colorElement,colorGenerator.colors[elementandColorNumber].secondaryHex)
}
function changeBrightness(elementandColorNumber,input){
    let colorElement = colorGenerator.colorElements[elementandColorNumber]
    let color = colorGenerator.colors[elementandColorNumber].hex;
    if(colorGenerator.colors[elementandColorNumber].hue){
        colorGenerator.colors[elementandColorNumber].hex=colorGenerator.colors[elementandColorNumber].secondaryHex;
        colorGenerator.colors[elementandColorNumber].hue=null
    }
    colorGenerator.colors[elementandColorNumber].secondaryHex = chroma(color).set('hsl.l', input.value).hex();
    colorGenerator.colors[elementandColorNumber].brightness = input.value;
    colorGenerator.changeDivsBGandLuminance(colorElement, colorGenerator.colors[elementandColorNumber].secondaryHex)
}
function changeSaturation(elementandColorNumber,input){
    let colorElement = colorGenerator.colorElements[elementandColorNumber]
    let color = colorGenerator.colors[elementandColorNumber].hex;
    if(colorGenerator.colors[elementandColorNumber].hue){
        colorGenerator.colors[elementandColorNumber].hex=colorGenerator.colors[elementandColorNumber].secondaryHex;
        colorGenerator.colors[elementandColorNumber].hue=null
    }
    colorGenerator.colors[elementandColorNumber].secondaryHex = chroma(color).set('hsl.s', input.value).hex();
    colorGenerator.colors[elementandColorNumber].saturation = input.value;
    colorGenerator.changeDivsBGandLuminance(colorElement, colorGenerator.colors[elementandColorNumber].secondaryHex)
}

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

//event for changing color tons 
colorGenerator.sliderInputs.forEach((element, index) => {
    element.addEventListener("input", () => {
        if (0 <= index && index <= 2) {
            switch (index) {
                case 0:
                    changeHue(0,element);
                    break;
                    case 1:
                        changeBrightness(0,element)
                        break;
                        default:
                            changeSaturation(0,element)
                            break;
                        }
                    }
                    if (3 <= index && index <= 5) {
                        switch (index) {
                            case 3:
                                changeHue(1,element);
                                break;
                                case 4:
                    changeBrightness(1,element)
                    break;
                    default:
                        changeSaturation(1,element)
                        break;
                    }
                }
        if (6 <= index && index <= 8) {
            switch (index) {
                case 6:
                    changeHue(2,element);
                    break;
                    case 7:
                        changeBrightness(2,element)
                        break;
                        default:
                            changeSaturation(2,element)
                            break;
                        }
                    }
                    if (9 <= index && index <= 11) {
                        switch (index) {
                            case 9:
                    changeHue(3,element);
                    break;
                    case 10:
                        changeBrightness(3,element)
                        break;
                        default:
                            changeSaturation(3,element)
                            break;
            }
        }
        if (12 <= index && index <= 14) {
            switch (index) {
                case 12:
                    changeHue(4,element);
                    break;
                    case 13:
                        changeBrightness(4,element)
                        break;
                default:
                    changeSaturation(4,element)
                    break;
                }
            }
    })
})



//run app
colorGenerator.generateColor();