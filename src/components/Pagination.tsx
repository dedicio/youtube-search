type PaginationProps = {
  onPaginate: () => void;
}

export function Pagination({
  onPaginate
}: PaginationProps): React.ReactElement {
  return (
    <div className='flex justify-center gap-2 mt-4'>
      <button
        className='
          border border-slate-700 bg-slate-800 text-white px-4 py-2 rounded w-full cursor-pointer
          hover:bg-slate-700 hover:border-slate-600
        '
        onClick={() => onPaginate()}
      >
        Carregar mais
      </button>
    </div>
  );
}
