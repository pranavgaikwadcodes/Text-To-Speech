const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speakButton = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}> ${voice.name} (${voice.lang}) </option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices)

function textToSpeak(text) {
    let utter = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utter.voice = voice;
        }
    }

    synth.speak(utter);
}

speakButton.addEventListener("click", e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeak(textarea.value);
        }

        if(textarea.value.length > 80) {
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speakButton.innerText = "Pause";
            }
            else{
                synth.pause();
                isSpeaking = true;
                speakButton.innerText = "Resume";
            }
            setInterval( () =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speakButton.innerText = "Convert";
                }
            });
        } else {
            speakButton.innerText = "Convert";
        }
    }
});