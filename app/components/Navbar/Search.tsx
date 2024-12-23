import React from 'react'

function Search() {
    return (
        <div className='hidden md:flex flex-1 bg-amber-500 h-[60px]'>
            <input
                className='border-none outline-none flex-1 p-4 py-2 mt-4 h-[30px] rounded-lg'  // px-4 (sol ve sağ kenarlarda boşluk) ve py-2 (üst ve alt boşluk) ekledik
                type="text"
                placeholder='Bir şeyler ara'
            />
            <button className='py-2 px-4  border border-transparent '>Ara</button>
        </div>
    )
}

export default Search
