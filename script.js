const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
            key: 'e45dd3574ed14895910e5b31723b967e',
             src: joke,
             hl: 'en-us',
             v: 'Linda',
             r: 0, 
             c: 'mp3',
             f: '44khz_16bit_stereo',
             ssml: false
            });
}

// Get Jokes from Joke API
async function getJokes() {
    let joke='';
    const apiUrl ="https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke=`${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
        // Text to speech
        tellMe(joke);
        // Disable button
        toggleButton();
    }catch(error){
        console.log('Not working', error);
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);