import {NoteContext, defaultFolder} from '../App/NoteContext'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'

export default class NotePageNav extends React.Component{
  render(){
    const noteId = this.props.match.params.noteId
    const note = this.context.findNote(noteId)
    let folder = defaultFolder 
    if(note) folder=this.context.findFolder(note.folderId);
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {folder && (
        <h3 className='NotePageNav__folder-name'>
          {folder.name}
        </h3>
      )}
    </div>
  )
}}

NotePageNav.contextType = NoteContext;
NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}