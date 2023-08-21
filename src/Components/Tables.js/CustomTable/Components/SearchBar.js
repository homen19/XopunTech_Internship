import { React, useState } from 'react'

export const SearchBar = (props) => {
    const [searchQuery, setSearchQuery]=  useState('');

    const filterData = (e) => {
        e.preventDefault();
        props.setFilterData(props.data.filter((item)=>
            item.userId.toString().includes(searchQuery)
        )
        )
    }

    return (
        <>
            <div
                className="search-container"
                style={{
                    width: "300px",
                    height: '90px',
                    padding: 10,
                    border: '1px solid blue',
                    borderRadius: '5px',
                    position: 'absolute',
                    top: 60,
                    left: 450,
                    backgroundColor: '#fff',
                    display: 'block',
                    textAlign: 'center'
                }}
            >
                <form>
                    <input type="text" placeholder='Search'
                        name='search'
                        style={{
                            width: '100%',
                            height: 30,
                            padding: 10
                        }}
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}

                    />
                    <button
                        style={{
                            width: '80px',
                            height: '30px',
                            margin: '5px',
                            backgroundColor: '#3B71CA',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                        onClick={filterData}
                    >Search</button>
                    <button
                        style={{
                            width: '80px',
                            height: '30px',
                            margin: '5px',
                            backgroundColor: '#DC4C64',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                        onClick={()=>props.setSearch(false)}
                    >Close</button>
                </form>
            </div>
        </>
    )
}
