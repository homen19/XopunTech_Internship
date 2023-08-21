import { React, useState } from 'react'

export const Filter = (props) => {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [characterLength, setCharacterLength] = useState(false);
    const [characterLength1, setCharacterLength1] = useState(false);

    const handleChange = (e) => {
        const checkBoxName = e.target.name;
        const isChecked = e.target.checked;

        if (checkBoxName === "first") {
            setFirst(isChecked);
        }
        if (checkBoxName === "second") {
            setSecond(isChecked);
        }
        if (checkBoxName === "third") {
            setCharacterLength(isChecked);
        }
        if (checkBoxName === "fourth") {
            setCharacterLength1(isChecked);
        }
    }

    const filtered = (e, record) => {
        e.preventDefault();
        const filterData = record.filter((item) => {
            return (
                (first && item.id >= 5) ||
                (second && item.id >= 25) ||
                (characterLength && item.title.length >= 20) ||
                (characterLength1 && item.title.length >= 40) ||
                (!first && !second && !characterLength && !characterLength1)

            )
        })
        props.setFilteredData(filterData);
        props.setFilter(false);
        // console.log(filterData);
    }


    return (
        <div style={{
            width: '200px',
            // height: '110px',
            position: 'absolute',
            top: '62px',
            left: '187px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            boxShadow: '1px 1px 9px -1px rgba(36, 43, 46, 1)',
            padding: '10px'
        }}>
            <form onSubmit={(e) => filtered(e, props.data)}>
                <label htmlFor="first">
                    <input type="checkbox" id='first' name='first' onChange={handleChange} /> Greater than 5
                </label><br />
                <label htmlFor="second">
                    <input type="checkbox" id='second' name='second' onChange={handleChange} /> Greater than 25
                </label><br />
                <label htmlFor="third">
                    <input type="checkbox" id='third' name='third' onChange={handleChange} /> Title More than 20 char
                </label><br />
                <label htmlFor="fourth">
                    <input type="checkbox" id='fourth' name='fourth' onChange={handleChange} /> Title More than 40 char
                </label>
                <div
                    style={{
                        width: 'fit-content',
                        marginTop: '10px',
                        float: 'right'
                    }}
                >
                    <button style={{
                        width: '50px',
                        height: '25px',
                        border: 'none',
                        borderRadius: '5px',

                    }}
                        onClick={() => props.setFilter(false)}
                    >
                        Cancel
                    </button>
                    <button style={{
                        width: '50px',
                        height: '25px',
                        marginLeft: '5px',
                        backgroundColor: '#3B71CA',
                        border: 'none',
                        borderRadius: '5px',
                        color: '#fff'
                    }}
                        type='submit'

                    >
                        Ok
                    </button>
                </div>
            </form>
    

        </div>
    )
}
