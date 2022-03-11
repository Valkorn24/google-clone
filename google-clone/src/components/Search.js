import { useDebounce } from 'use-debounce';
import Links from './Links';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchTerm } from '../features/googleSearch/googleSearchSlice';

const Search = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [debounceValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debounceValue) dispatch(searchTerm(debounceValue));
  }, [debounceValue]);

  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3 md:w-96'>
      <input
        value={text}
        type='text'
        className='lg:w-full w-full h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        placeholder='Search...'
        onChange={e => setText(e.target.value)}
      />
      {text !== '' && (
        <button
          type='button'
          className='absolute top-1.5 right-4 text-2xl text-gray-500 '
          onClick={() => setText('')}
        >
          x
        </button>
      )}
      <Links />
    </div>
  );
};

export default Search;
