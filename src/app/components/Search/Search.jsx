import React from 'react'

const Search = ({ searchQuery, setSearchQuery }) => {
	return (
		<input
			type='text'
			className='w-full h-12 rounded-3xl p-5 bg-inherit border-2 border-zinc-700/50 bg-blur  '
			placeholder='Search ...'
			value={searchQuery}
			onChange={(e) => setSearchQuery(e.target.value)}
		/>
	)
}

export default Search