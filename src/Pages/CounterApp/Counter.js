import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
export const Counter = () => {
    const initialCounts = 0;
    const [count, setCount] = useState(initialCounts);
    useEffect(()=>{
        if(count >= 1){
            console.log("useEffect Hooks");
            document.title = `Count (${count})`;
        }
        
    }, [count]);

    const incrementByFive = ()=>{
        for(let i = 0; i<5; i++) {
           setCount(prevCount => prevCount + 1);
        }
    }
    return (
        <div>
            <Box
                sx={{
                    width: 300,
                    height: 300,
                    margin: 'auto',
                    border: '2px solid black',
                    borderRadius: '10px',
                    padding: '20px'
                }}
            >
                <h2
                    style={{
                        textAlign: 'center'
                    }}
                >Counter</h2>
                <h1
                    style={{
                        textAlign: 'center'
                    }}
                >{count >=0 ? count: setCount(initialCounts)}</h1>
                <Button variant="contained" endIcon={<AddIcon />} onClick={() => setCount(count + 1)} >Increment</Button>
                <Button variant="contained" endIcon={<RemoveIcon />} onClick={() => setCount(count - 1)}>Decrement</Button><br />
                <Button variant="contained" startIcon={<AddIcon />} onClick={incrementByFive}>5</Button>
                <Button variant="contained" onClick={()=>setCount(initialCounts)}>Reset</Button>
            </Box>

        </div>
    )
}
