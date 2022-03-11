import React from 'react';
import { Route, Routes as AllRoutes, Navigate } from 'react-router-dom';
import Results from './Results';

const Routes = () => {
  const renderMultiRoutes = ({ element: Element, paths, ...rest }) =>
    paths.map(path => (
      <Route key={path} path={path} {...rest} element={Element} />
    ));

  return (
    <div className='p-4'>
      <AllRoutes>
        <Route path='/' exact element={<Navigate to='/search' />} />
        {renderMultiRoutes({
          paths: ['/search', '/images', '/news', '/videos'],
          element: <Results />,
        })}
      </AllRoutes>
    </div>
  );
};

export default Routes;
