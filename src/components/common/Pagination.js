import React from 'react';
import { Pagination as AntPagination } from 'antd';

const Pagination = ({ totalItems, pageSize, onPageChange, current }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <AntPagination
      style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginBottom: '50px' }}
      total={totalItems}
      pageSize={pageSize}
      onChange={handlePageChange}
      current={current}
    />
  );
};

export default Pagination;