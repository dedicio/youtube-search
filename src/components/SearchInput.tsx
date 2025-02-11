import { useState } from 'react';

type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
}

export function SearchInput({
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
        className='grow border border-slate-600 rounded-l-md p-2 outline-0'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button
        type="submit"
        className='bg-rose-700 hover:bg-sky-700 border border-rose-600 text-white p-2 rounded-r-md cursor-pointer'
      >
        Buscar
      </button>
    </form>
  );
}
