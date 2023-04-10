
import React, { useState } from 'react'

const Navbar = () => {
  return (
    <div className='flex text-gray-500 justify-center items-center sticky top-0 drop-shadow-md h-[70px] bg-[#FFF]'>
      <div className='flex justify-between w-[75%]'>
        <div className='flex h-[100%] justify-between w-[75%]'>
          <ShowResultsDropdown />
          <SearchBar />
          <ShowSortOptionsDropdown />
        </div>
        <LoginButton />
      </div>
    </div>
  )
}

const SearchBar = () => {
  return (
    <div className='flex w-[350px] h-[50%] rounded-3xl border border-gray-300 drop-shadow-[0_3px_10px_rgba(0,0,0,0.08)]'>
      {/* Search input */}
      <i className='absolute fas fa-search p-3 text-gray-600'></i>
      <input className='pl-10 pr-2 pt-2 pb-2 border-0 rounded-3xl w-full cursor-pointer' id='search-bar' type='text' placeholder='Search'/>
    </div>

  )
}
const ShowResultsDropdown = () => {
  const [selectedOption, setSelectedOption] = useState('10')

  const handleShowResultsDropdown = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption((prev) => {
      console.log('PREV:: ', prev)
      // Trigger API call with limit of event.target.value and offset as prev
      // Use Context API and set global state on data
      return event.target.value
    })
  }
  return (
    <div className='flex w-fit px-3 h-[50%] rounded-3xl border border-gray-300 drop-shadow-md'>
      <select className='block w-full py-2 px-3 border-0 bg-transparent focus:outline-none z-50 cursor-pointer' onChange={(event) => handleShowResultsDropdown(event)}>
        <option value='10'>Show {selectedOption} results</option>
        <option value='20'>Show {selectedOption != '20' ? '20' : selectedOption} results</option>
        <option value='50'>Show {selectedOption != '30' ? '30' : selectedOption} results</option>
      </select>
    </div>
  )
}

const ShowSortOptionsDropdown = () => {

  const handleSortOptionsDropdownChange = () => {
    // Rearrange current list by the filter selected
    return true
  }
  return (
    <div className='flex w-fit px-3 h-[50%] rounded-3xl border border-gray-300 drop-shadow-md'>
      <select className='block w-full py-2 px-3 border-0 bg-transparent focus:outline-none z-50 cursor-pointer' onChange={handleSortOptionsDropdownChange}>
        <option value='a-z'>From A - Z</option>
        <option value='z-a'>From Z - A</option>
        <option value='height-asc'>Height asc</option>
        <option value='height-desc'>Height desc</option>
      </select>
    </div>
  )
}

const LoginButton = () => {
  return (
    <div className='flex items-center w-[100px] px-5 py-1 h-[50%] rounded-md border border-gray-300 drop-shadow-md cursor-pointer'>
      <span>Login</span>
      <span><i className='fas fa-circle-user p-3 text-gray-600'></i></span>
    </div>
  )
}

export default Navbar