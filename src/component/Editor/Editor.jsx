// import React, { useState, useEffect } from 'react';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import ReactHtmlParser from 'react-html-parser';
// import { EditorState, convertToRaw } from 'draft-js';
// import './Editor.css';
// import axios from 'axios';
// const EditorComponent = ({ editorState, setEditorState }) => {
//   //!not working properly but working in integration with the form
//   const [base64, setBase64] = useState('');
//   // setEditorState(EditorState.createEmpty());
//   useEffect(() => {
//     const editorHtmlString = draftToHtml(
//       convertToRaw(editorState.getCurrentContent())
//     );
//     console.log(editorHtmlString);
//     // console.log(editorState);
//   }, []);

//   const getFileBase64 = (file, callback) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => callback(reader.result);
//   };

//   const uploadFile = async (file) => {
//     return new Promise((resolve, reject) =>
//       getFileBase64(file, (data) => resolve({ data: { link: data } }))
//     );
//   };

//   return (
//     <div className='maineditor'>
//       <Editor
//         editorState={editorState}
//         wrapperClassName='editor-wrapper'
//         editorClassName='editor'
//         toolbarClassName='editor-toolbar'
//         toolbar={{
//           fontFamily: {
//             options: [
//               'Poppins',
//               'Nunito',
//               'Georgia',
//               'Times New Roman',
//               'Verdana',
//             ],
//           },
//           image: {
//             uploadEnabled: true,
//             uploadCallback: uploadFile,
//             previewImage: true,
//           },
//         }}
//         onEditorStateChange={(editorState) => setEditorState(editorState)}
//       ></Editor>
//       <div></div>
//       <div> {ReactHtmlParser(``)} </div>;
//       {/* <textarea
//         value={
//           ' ' || draftToHtml(convertToRaw(editorState.getCurrentContent()))
//         }
//       ></textarea> */}
//     </div>
//   );
// };

// export default EditorComponent;
