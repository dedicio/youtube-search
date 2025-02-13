import { useState } from 'react';

type SearchInputProps = {
  disabled?: boolean;
  onSearch: (searchTerm: string) => void;
}

export function SearchInput({
  disabled = false,
  onSearch,
}: SearchInputProps): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className='flex w-full mb-4'
    >
      <input
        type="text"
        placeholder="Palavra-chave..."
        className='
          grow border border-slate-600 rounded-l-md p-2 outline-0
          disabled:bg-slate-600 disabled:border-slate-600 disabled:cursor-not-allowed
        '
        value={searchTerm}
        disabled={disabled}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button
        type="submit"
        className='
          bg-rose-700 hover:bg-rose-800 border border-rose-600 text-white p-2 rounded-r-md cursor-pointer
          disabled:bg-slate-600 disabled:border-slate-600 disabled:cursor-not-allowed
        '
        disabled={disabled}
      >
        Buscar
      </button>
    </form>
  );
}
