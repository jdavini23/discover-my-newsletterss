import React, { useState } from 'react';
import { Pagination } from './Pagination';

/**
 * Pagination component for navigating through pages of content
 * 
 * @component
 * @example
 * // Basic usage
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   onPageChange={(page) => handlePageChange(page)} 
 * />
 */
export const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination 
      currentPage={currentPage} 
      totalPages={10} 
      onPageChange={(page) => {
        console.log(`Navigating to page ${page}`);
        setCurrentPage(page);
      }} 
    />
  );
};

export const FirstPagePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Pagination 
      currentPage={currentPage} 
      totalPages={5} 
      onPageChange={(page) => {
        console.log(`Navigating to page ${page}`);
        setCurrentPage(page);
      }} 
    />
  );
};

export const LastPagePagination = () => {
  const [currentPage, setCurrentPage] = useState(5);
  
  return (
    <Pagination 
      currentPage={currentPage} 
      totalPages={5} 
      onPageChange={(page) => {
        console.log(`Navigating to page ${page}`);
        setCurrentPage(page);
      }} 
    />
  );
};

DefaultPagination.ladle = {
  name: 'Default Pagination',
  description: 'Pagination with multiple pages'
};

FirstPagePagination.ladle = {
  name: 'First Page Pagination',
  description: 'Pagination on the first page'
};

LastPagePagination.ladle = {
  name: 'Last Page Pagination',
  description: 'Pagination on the last page'
};
