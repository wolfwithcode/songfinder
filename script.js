// // const data = fetch('https://itunes.apple.com/search?');
// const data = fetch('https://itunes.apple.com/search?');
var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
var targetUrl = 'https://itunes.apple.com/search?';
const songContainer = document.getElementById('songs');
let term = ''

const updateTerm = () => {
    term = document.getElementById('searchInput').value;
    if(!term || term === ''){
        alert('Please enter a search term');        
    }else{        
        
        while(songContainer.firstChild){
            songContainer.removeChild(songContainer.firstChild);
        }

        fetch(proxyUrl+targetUrl+`limit=10&media=music&term=${term}`)
        .then( (response) => response.json() )
        .then( (data) => {
            const artists = data.results;
            return artists.map(result => {
                
                const article = document.createElement('article'),
                        artist = document.createElement('p'),
                        song = document.createElement('p'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source');
                
                console.log(result);
                artist.innerHTML = result.artistName;
                song.innerHTML = result.trackName;
                img.src = result.artworkUrl100;
                audioSource.src = result.previewUrl;
                audio.setAttribute('controls','');
        
                article.appendChild(img);
                article.appendChild(artist);
                article.appendChild(song);
                article.appendChild(audio);
                audio.appendChild(audioSource);
                songContainer.appendChild(article);
            })
            console.log(data.results);
        })
        .catch(error => console.log('Request failed:', error));        
    }
}

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', updateTerm);
document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i=0; i < audio.length; i++){
        if(audio[i] != event.target){
            audio[i].pause();
        }
    }
// })
}, true)
// const data = fetch(proxyUrl+targetUrl);
// console.log(data);

// setTimeout(() => {
//     console.log(data);
// }, 200);

// var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
//     targetUrl = 'https://itunes.apple.com/search?'
// fetch(proxyUrl + targetUrl)
//   .then(blob => blob.json())
//   .then(data => {
//     console.table(data);
//     document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2);
//     return data;
//   })
//   .catch(e => {
//     console.log(e);
//     return e;
//   });