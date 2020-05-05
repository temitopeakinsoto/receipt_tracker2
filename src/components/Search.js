import React, { useState, useEffect } from 'react'

const Search = (props) => {
    const [searchParam, setSearchParam] = useState('')
    const [searchCategory, setSearchCategory] = useState('date')

    const searchClickHandler = () => {
        props.setIsSearching(!props.isSearching)
    }

    const changeHandler = (event) => {
        setSearchParam(event.target.value)   
    }

    useEffect(() => {
        props.setSearchResults(props.allData.filter(item => item[searchCategory].toString().includes(searchParam)))
    },[searchParam])



    const dropdownHandler = (event) => {
        setSearchCategory(event.target.value.toString())
    }

    return (
        <>
            <select value={searchCategory} onChange={(event) => dropdownHandler(event)} name="cars">
                <option value="date">date</option>
                <option value="amount_spent">Amount</option>
                <option value="category">category</option>
                <option value="merchant">merchant</option>
            </select>
            <input type='text' placeholder='search' onChange={(event) => changeHandler(event)} value={searchParam} />
            <h2 onClick={() => searchClickHandler()}>x</h2>
        </>
    )
}
export default Search