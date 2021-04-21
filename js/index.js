const API_KEY = 'AIzaSyDLG8OOSevLSUye5hWMz_hoq5yXZtiziSc';
const CLIENT_ID = '453386367296-sj6od3ahhbcteg7gmoq2cr45f52dvqkr.apps.googleusercontent.com';

const gloAcademyList = document.querySelector('.glo-academy-list');
const recommendedList = document.querySelector('.trending-list');
const recommendedChanelList = document.querySelector('.music-list');

const  createCard = (dataVideo) => {
    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = typeof dataVideo.id === 'string' ? dataVideo.id : dataVideo.id.videoId;
    const titleVideo = dataVideo.snippet.title;
    const dateVideo = dataVideo.snippet.publishedAt
    const channelTitle = dataVideo.snippet.channelTitle;
    const videoViews = dataVideo.statistics?.viewCount;

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
              ${videoViews ? `<span class="video-views">${videoViews} просмотров </span>`:''}
                <span class="video-date">${(new Date(dateVideo)).toLocaleString()}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>  `;
  
    return card;
    
} 
const createList = (wrapper, listVideo) => {
    wrapper.textContent = '';

    listVideo.forEach(item => {
        const card = createCard(item)
        wrapper.append(card)
    });
};





createList(gloAcademyList, gloAcademy);
createList(recommendedList, trending);
createList(recommendedChanelList, music);



//You tube Api
const authBtn = document.querySelector('.auth-btn');
const userAvatar = document.querySelector('.user-avatar');

const handleSuccessAuth = data => {
  authBtn.classList.add('hide');
  userAvatar.classList.remove('hide');
  userAvatar.src = data.getImageUrl();
  userAvatar.alt = data.getName();

  getChanel();
};

const handleNoAuth = () => {
  authBtn.classList.remove('hide');
  userAvatar.classList.add('hide');
  userAvatar.src = '';
  userAvatar.alt = '';
};
const handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn();
};

const handleSignout = () => {
  gapi.auth2.getAuthInstance().signOut();
};

const updateStatusAuth = data => {
  console.log(data.isSignedIn.get());
  data.isSignedIn.listen(() => {
    updateStatusAuth(data);
  });

  if (data.isSignedIn.get()){
    const userData = data.currentUser.get().getBasicProfile();
    handleSuccessAuth(userData)
  } else {
    handleNoAuth();
  }
}

function initClient() {
    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/youtube.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(() => {
        updateStatusAuth(gapi.auth2.getAuthInstance())
        authBtn.addEventListener('click', handleAuth);
        userAvatar.addEventListener('click', handleSignout);
    }).catch(() => {
        console.log(gapi.auth2);
        authBtn.removeEventListener('click', handleAuth);
        userAvatar.removeEventListener('click', handleSignout);
        alert('Авторизация не возможна!')
    })
}

gapi.load('client:auth2', initClient);

const getChanel = () => {
    gapi.client.youtube.channels.list({
        part: 'snippet , statistics',
        id: 'UCDF_NIAEkcAUvzxe1DUzaQA',
    }).execute((response) => {
        console.log(response)
    })
}

