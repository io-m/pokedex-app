import React, { useState } from 'react'

interface PaginationProps {
    dataLength: number
}

const Pagination = ({ dataLength }: PaginationProps) => {
  const [currentPage, setCurrentPage] =  useState(1)
  
  const handlePaging = (direction: 'NEXT' | 'PREV') => {
    if(direction === 'NEXT') {
        setCurrentPage((current) => current += 1)
    } else {
        if(currentPage === 1) {
            setCurrentPage(currentPage)
        } else {
            setCurrentPage((current) => current -= 1)
        }
    }
  }
  return (
    <div className='ml-[30%] px-[100px] py-10'>
        <span onClick={() => handlePaging('PREV')} className={currentPage === 1 ? 'text-gray-300 mr-5' : 'text-orange-200 mr-5 cursor-pointer'}>Previous page </span>
            {currentPage} / { dataLength }
        <span onClick={() => handlePaging('NEXT')} className='text-blue-400 ml-5 cursor-pointer'>Next page</span>
    </div>
  )
}

export default Pagination