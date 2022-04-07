import React, { useState } from "react";



const ReactFileUpload = () => {
    const [image, setImage] = useState(null)

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }
    const handleUpload = () => { }
    console.log(image)
    return (

        <>
            <div>
                <h2>file upload</h2>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>upload</button>
            </div>
        </>
    )
}
export default ReactFileUpload