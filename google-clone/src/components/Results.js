import { useDispatch, useSelector } from 'react-redux';
import { getResults } from '../features/googleSearch/googleSearchSlice';
import Masonry from 'react-masonry-css';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Loading } from './Loading';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { results, isLoading, searchTerm } = useSelector(
    state => state.googleSearch
  );

  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos') {
        dispatch(getResults(`/search/q=${searchTerm} videos`));
      } else {
        dispatch(getResults(`${location.pathname}/q=${searchTerm}&num=40`));
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  if (results.length === 0)
    return (
      <div className='flex flex-wrap justify-center align-center py-40'>
        <h1 className='text-2xl lg:text-7xl font-mono'>Search something 🔎</h1>
      </div>
    );

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-around md:px-5 lg:px-40'>
          {results?.results?.map(({ link, title, description }, index) => (
            <div key={index} className='md:w-2/5 mb-6 w-full pt-2'>
              <a href={link} target='_blank' rel='noreferrer'>
                <p className='text-sm'>
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
              {description && (
                <p className='text-sm pt-2'>
                  {description.length > 200
                    ? description.substring(0, 200) + '...'
                    : description}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {results?.image_results?.map(
            ({ image, link: { href, title } }, index) => (
              <a
                className='sm:p-3 p-5'
                href={href}
                key={index}
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={image?.src}
                  alt={title}
                  loading='lazy'
                  className='w-full object-cover'
                />
                <p className='break-words w-36 text-sm mt-2'>{title}</p>
              </a>
            )
          )}
        </Masonry>
      );
    case '/news':
      return (
        <div className='flex flex-wrap justify-around space-y-6 md:px-5 lg:px-40 items-center'>
          {results?.entries?.map(({ links, id, source, title, published }) => (
            <div key={id} className='md:w-2/5 w-full border p-2'>
              <a
                href={links?.[0].href}
                target='_blank'
                rel='noreferrer'
                className='hover:underline'
              >
                <p className='text-lg dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
              </a>
              <div className='flex gap-4 mb-1'>
                <a href={source?.href} target='_blank' rel='noreferrer'>
                  {source?.href}
                </a>
              </div>
              <div>
                <small>{published}</small>
              </div>
            </div>
          ))}
        </div>
      );
    case '/videos':
      return (
        <div className='flex flex-wrap'>
          {results?.results?.map((video, index) => (
            <div key={index} className='p-2'>
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video.additional_links[0].href}
                  controls
                  width='355px'
                  height='200px'
                />
              )}
            </div>
          ))}
        </div>
      );
    default:
      return 'ERROR!';
  }
};

export default Results;
