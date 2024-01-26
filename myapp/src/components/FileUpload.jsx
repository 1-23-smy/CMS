// import React, { useState } from 'react';
// import axios from 'axios';
// const FileUpload = () => {
//     const [file, setFile] = useState(null);
//     const[fileURI,setFileURI]=useState();
//     // let URI=null;
//     const onFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const onUpload = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('file', file);

//             const response = await axios.post('http://localhost:3000/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

           
//             setFileURI(`/Users/soumyaranjandas/assignment/server/public/temp/${response.data.file}`)
//             console.log(fileURI);
            
//         } catch (error) {
//             console.error('Error uploading file:', error.message);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={onFileChange} />
//             <button onClick={onUpload}>Upload</button>
            
//                 <div>
//                     <h3>Uploaded Image:</h3>
//                     <img src={fileURI} alt="Uploaded" style={{ width: '300px' }} />
//                 </div>
        
//         </div>
//     );
// };

// export default FileUpload;