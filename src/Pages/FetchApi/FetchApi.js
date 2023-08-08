import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
export const FetchApi = () => {
    const [posts, setPosts] = useState({
        id : '',
        title: ''
    });
    // const [id, setId] = useState("");
    // const [title, setTitle] = useState("");
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res=>{
            console.log(res);
            setPosts(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    const submitHandler = (e) =>{
        e.preventDefault();
        const newPost = {id : posts.id, title: posts.title};

        axios.post("https://jsonplaceholder.typicode.com/posts", newPost)
        .then(res=>{
            const allposts = [...posts, res.data]
            setPosts(allposts)
            console.log(res);

            
        })
        .catch(err=>{
            console.log(err);
        })

    }
  return (
    <div>
    <div className="form">
        <form action="post" onSubmit={submitHandler} >
            <input type="text" value={posts.id} onChange={e=>setPosts(e.target.value)}/>
            <input type="text" value={posts.title} onChange={e=> setPosts(e.target.value)} />
            <button>Submit</button>
        </form>
    </div>
        <ul>
            {
                posts.map(p => (
                    <div
                    style={{
                        width: '30%',
                        height:'100px',
                        borderRadius: '10px',
                        backgroundColor: 'green',
                        color:'#fff',
                        margin:'20px',
                        padding: '20px'
                    }}
                    key={p.id}
                    >
                    <h1>{p.id}</h1>
                    <p>{p.title}</p>

                    </div>
                    
                ))
            }
        </ul>

    </div>
  )
}
