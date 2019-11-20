import React from 'react';
export const defaultNote = {
  id: 0,
  name: 'no name',
  modified: 'never',
  content: 'no content'
}
export const NoteContext=React.createContext( 
  defaultNote
 );