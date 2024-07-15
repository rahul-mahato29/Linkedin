import React from 'react'
import { Input } from "@/components/ui/input"

const SearchInput = () => {
  return (
    <div>
        <Input 
        type="email" 
        placeholder="Search"
        className='bg-[#EDF3F8] w-80 rounded-lg'
        />
    </div>
  )
}

export default SearchInput