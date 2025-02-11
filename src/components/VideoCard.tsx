import type { Video } from '../types';

type VideoCardProps = {
  video: Video;
}

export function VideoCard({
  video
}: VideoCardProps): React.ReactElement {
  return (
    <div className='card border-b-2 border-slate-700 mt-4 pb-4'>
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target='_blank' rel='noreferrer'>
        <img
          src={video.thumbnail}
          alt={video.title}
          className='w-full h-48 object-cover'
        />

        <div className='flex items-center my-2'>
          <span className='text-slate-400 font-semibold'>{video.channel}</span>
          <span className='ml-2 text-sm'>{video.publishedAt}</span>
        </div>

        <h2 className='text-lg font-semibold mb-2'>{video.title}</h2>

        <p className='text-sm text-slate-400'>{video.description}</p>
      </a>
    </div>
  );
}
