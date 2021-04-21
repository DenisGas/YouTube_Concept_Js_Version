const API_KEY = 'AIzaSxxxx';
const CLIENT_ID = 'xxx.apps.googleusercontent.com';

const gloAcademyList = document.querySelector('.glo-academy-list');
const recommendedList = document.querySelector('.trending-list');
const recommendedChanelList = document.querySelector('.music-list');

const  createCard = (dataVideo) => {
    console.log(dataVideo)

    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = dataVideo.id.videoId;
    const titleVideo = dataVideo.snippet.title;
    const dateVideo = dataVideo.snippet.publishedAt
    const channelTitle = dataVideo.snippet.channelTitle;

    const card = document.createElement('div');
    card.classList.add('video-card')
    card.innerHTML = `
            <div class="video-thumb">
              <a class="link-video youtube-modal" href="http://youtu.be/${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
              </a>
            </div>
             <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
              <span class="video-counter">
                <span class="video-date">${(new Date(dateVideo)).toLocaleString()}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>  `;
  
    return card;
    
}

const  createCardT = (dataVideo) => {
    console.log(dataVideo)

    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = dataVideo.id.videoId;
    const titleVideo = dataVideo.snippet.title;
    const dateVideo = dataVideo.snippet.publishedAt
    const channelTitle = dataVideo.snippet.channelTitle;
    const videoViews = dataVideo.statistics.viewCount;

    const cardT = document.createElement('div');
    cardT.classList.add('video-card')
    cardT.innerHTML = `
            <div class="video-thumb">
              <a class="link-video youtube-modal" href="http://youtu.be/${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
              </a>
            </div>
             <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
              <span class="video-counter">
                <span class="video-views">${videoViews} просмотров </span>
                <span class="video-date">${(new Date(dateVideo)).toLocaleString()}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>  `;
  
    return cardT;
    
}
const createList = (wrapper, listVideo) => {
    wrapper.textContent = '';

    listVideo.forEach(item => {
        const card = createCard(item)
        wrapper.append(card)
    });
};

const createListT = (wrapperT, listVideoT) => {
    wrapperT.textContent = '';

    listVideoT.forEach(itemT => {
        const cardT = createCardT(itemT)
        wrapperT.append(cardT)
    });
};

createList(gloAcademyList, gloAcademy);
createListT(recommendedList, trending);
createList(recommendedChanelList, music);
