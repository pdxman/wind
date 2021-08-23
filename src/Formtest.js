import React, {useState} from 'react'


export default function Formtest(){
    const [query, setQuery] = useState('')

    const updateQuery = event => {
        event.preventDefault()
        setQuery(event.target.value)
    }

    return(
        <div>
             <p>Input State</p>
                <form onSubmit={updateQuery}>
                    <input type="text" />
                    <button type="submit" onChange={updateQuery}>Enter</button>
                </form>
            <p>{query}</p>
        </div>
    )
}