import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SearchInputs = () => {
  const search = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get('q') : ''
  );
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (typeof searchQuery !== 'string') {
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery);
    const storeUrl = router.query.storeUrl;
    router.push(`/admin/${storeUrl}/search?q=${encodedSearchQuery}`);
  };

  return (
    <form onSubmit={onSearch}>
      <label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </svg>
        </span>
        <input
          value={searchQuery || ''}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-amber-300 focus:ring-amber-500 focus:ring-1 sm:text-sm"
          placeholder="Search for product?"
          type="text"
          name="search"
        />
      </label>
    </form>
  );
};

export default SearchInputs;
