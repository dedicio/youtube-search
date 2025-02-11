import { useState } from 'react'
import './App.css'
import type { Video } from './types';
import { SearchInput } from './components/SearchInput'
import { VideoList } from './components/VideoList';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function toLocaleDateString(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pageToken, setPageToken] = useState('');

  const hasVideos = videos.length > 0;

  const onSearch = async (searchTerm: string) => {
    let apiUrl = `${BASE_URL}?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}&maxResults=10`;

    if (pageToken) {
      apiUrl += `&pageToken=${pageToken}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      setVideos(data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: toLocaleDateString(item.snippet.publishedAt),
      })));
    }
  }

  return (
    <main className='p-4 bg-slate-900 text-white min-h-screen'>

      <h1 className='text-2xl mb-4 text-center'>Youtube Search</h1>

      <SearchInput onSearch={onSearch} />

      <section className=''>
        {
          hasVideos &&
          <h2>Resultados da busca</h2>
        }

        <VideoList videos={videos} />
      </section>
    </main>
  )
}

export default App
