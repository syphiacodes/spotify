import axios from 'axios';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken);

  const response = await axios.post('https://accounts.spotify.com/api/token', params, {
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.access_token;
};

export const getCurrentlyPlaying = async () => {
  const token = await getAccessToken();

  const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  return response.data;
};
