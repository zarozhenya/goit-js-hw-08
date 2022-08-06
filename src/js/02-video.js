import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_VIDEO_TAG = 'videoplayer-current-time';

const videoRef = document.querySelector('iframe');

const videoPlayer = new Player(videoRef);

const onTimeUpdate = ({ seconds }) => {
  localStorage.setItem(LOCALSTORAGE_VIDEO_TAG, seconds);
};

videoPlayer.on('timeupdate', throttle(onTimeUpdate, 1000));

const populateTime = () => {
  const seconds = localStorage.getItem(LOCALSTORAGE_VIDEO_TAG) || 0;
  videoPlayer.setCurrentTime(seconds);
};

populateTime();
