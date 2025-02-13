import type { Video } from '../types';

type VideoCardProps = {
  video: Video;
}

export function VideoCard({
  video
}: VideoCardProps): React.ReactElement {
  return (
    <div className='
      card mt-4 bg-slate-950 rounded-md
      hover:shadow-lg hover:shadow-slate-700/50 hover:ring-1 hover:ring-slate-600 transition duration-300 ease-in-out
    '>
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target='_blank' rel='noreferrer'>
        <img
          src={video.thumbnail}
          alt={video.title}
          className='w-full h-48 object-cover rounded-t-md'
          loading='lazy'
        />

        <div className='p-4'>
          <div className='flex items-center mb-2'>
            <span className='text-slate-400 font-semibold'>{video.channel}</span>
            <span className='ml-2 text-sm'>{video.publishedAt}</span>
          </div>

          <h2 className='text-lg font-semibold mb-2'>{video.title}</h2>

          <p className='text-sm text-slate-400'>{video.description}</p>
        </div>
      </a>
    </div>
  );
}
