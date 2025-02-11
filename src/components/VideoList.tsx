import type { Video } from '../types';
import { VideoCard } from './VideoCard';

type VideoListProps = {
  videos: Video[];
}

export function VideoList({
  videos
}: VideoListProps): React.ReactElement {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
