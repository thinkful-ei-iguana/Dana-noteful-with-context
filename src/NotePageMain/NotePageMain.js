import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import { NoteContext, defaultNote } from '../App/NoteContext'

export default class NotePageMain extends React.Component{
  render(){
    let noteId = this.props.match.params.noteId
    let note = this.context.findNote(noteId) || defaultNote
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )}
}
NotePageMain.contextType=NoteContext;