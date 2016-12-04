import React from 'react';
import Pagination from '../index';

const Simple = () => {
  const onChange = (value) => {
    console.log('current page : ', value);
  };

  return (
    <Pagination
      simple
      total={1000}
      totalPageTextRender={(total) => `总共${total}页`}
      onChange={onChange}/>
  );
};

export default Simple;
