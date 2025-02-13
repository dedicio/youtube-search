import { useState } from 'react';
import type { Video } from './types';
import { SearchInput } from './components/SearchInput'
import { VideoList } from './components/VideoList';
import { Loader } from './components/loader/Loader';
import { Icon } from './components/Icon';
import { Pagination } from './components/Pagination';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function toLocaleDateString(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR');
}

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const hasVideos = videos.length > 0;

  const onSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setSearchTerm(searchTerm);

    let apiUrl = `${BASE_URL}?part=snippet&q=${searchTerm}&type=video&key=${API_KEY}&maxResults=10`;

    if (nextPageToken) {
      apiUrl += `&pageToken=${nextPageToken}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    setIsLoading(false);

    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: toLocaleDateString(item.snippet.publishedAt),
      }));

      setVideos((prevVideos) => {
        if (nextPageToken) {
          return [...prevVideos, ...items];
        }

        return items;
      });

      setNextPageToken(data.nextPageToken);
    }
  }

  const onPaginate = () => {
    onSearch(searchTerm);
  }

  return (
    <main className='p-4 bg-slate-900 text-white min-h-screen'>

      <h1 className='flex justify-center items-center gap-2 text-2xl mt-2 mb-6'>
        <Icon size={24} />
        <span>Youtube Search</span>
      </h1>

      <SearchInput
        disabled={isLoading}
        onSearch={onSearch}
      />

      <section className=''>
        {
          hasVideos &&
          <h2 className='text-xl mt-6 mb-2'>Resultados da busca</h2>
        }

        <VideoList videos={videos} />
      </section>

      {
        isLoading &&
        <div className='flex justify-center py-6'>
          <Loader />
        </div>
      }

      {
        !isLoading && nextPageToken &&
        <Pagination onPaginate={onPaginate} />
      }
    </main>
  )
}

export default App
