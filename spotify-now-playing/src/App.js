import React, { useEffect, useState } from 'react';
import { getCurrentlyPlaying } from './spotifyService';
import './App.css';

function App() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentlyPlaying();
      setSong(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {song ? (
          <div className="song-info">
            <div className="now-playing-container">
              <div className="now-playing-text">
                <h2>cass is now playing:</h2>
              </div>
              <img 
                src={song.item.album.images[1].url} 
                alt="Album cover" 
                className="album-cover" 
              />
            </div>
            <br></br>
            <div className="track-details">
              <a 
                href={song.item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="song-link"
              >
                <h1>{song.item.name}</h1>
              </a>
              <p>
                <a 
                  href={song.item.artists[0].external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="artist-link"
                >
                  {song.item.artists.map(artist => artist.name).join(', ')}
                </a>
              </p>
              <p>
                <a 
                  href={song.item.album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="album-link"
                >
                  {song.item.album.name}
                </a>
              </p>
            </div>
          </div>
        ) : (
          <p>no song is currently playing.</p>
        )}
      </header>
    </div>
  );
}

export default App;
