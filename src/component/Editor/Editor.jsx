import React, { useState, useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import { EditorState, convertToRaw } from 'draft-js';
import './Editor.css';
import axios from 'axios';
const EditorComponent = () => {
  const [editorState, setEditorState] = useState('');

  useEffect(() => {
    // const editorHtmlString = draftToHtml(
    //   convertToRaw(editorState.getCurrentContent())
    // );
    // console.log(editorState.getCurrentContent());
  }, [editorState]);

  const uploadFile = async (file) => {};

  return (
    <div className='maineditor'>
      <Editor
        editorState={editorState}
        wrapperClassName='editor-wrapper'
        editorClassName='editor'
        toolbarClassName='editor-toolbar'
        toolbar={{
          fontFamily: {
            options: [
              'Poppins',
              'Nunito',
              'Georgia',
              'Times New Roman',
              'Verdana',
            ],
          },
          image: {
            uploadCallback: uploadFile,
            previewImage: true,
          },
        }}
        onEditorStateChange={(editorState) => setEditorState(editorState)}
      ></Editor>
      <h1>Preview</h1>
      <textarea
        value={
          ' ' || draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }
      ></textarea>
    </div>
  );
};

export default EditorComponent;
