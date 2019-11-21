import React, {Component} from 'react';
import { NoteContext, defaultNote, defaultFolder } from './NoteContext'
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: [],
        findNote: (id)=> findNote(this.state.notes, id),
        findFolder: (id)=> findFolder(this.state.folders, id),
        getNotesForFolder: (id)=> getNotesForFolder(this.state.notes,id),
        handleDeleteNote: (id) => this.handleDeleteNote(id)
    };

    componentDidMount() {
        // fetch from API
        ['notes','folders'].forEach(stateItem =>
        fetch('http://localhost:9090/'+stateItem)
        .then(rsp=>{
            if(rsp.ok)return rsp.json()
        } )
        .then(data=>{
            console.log(data)
            const {...all} =this.state
            all[stateItem]=data
            this.setState(all)
        })
        )
    }
    handleDeleteNote = (id)=>{
        fetch('http://localhost:9090/notes/'+id,{
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
        .then(rsp=>{
            if(rsp.ok){
      
                const {...all} =this.state
                all.notes= all.notes.filter(note=>note.id!=id)
                
                console.log(this.state)
            this.setState(all)
        }}) 
    }
    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        return <NotePageNav {...routeProps} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            return (
                                <NoteListMain
                                    {...routeProps}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        return <NotePageMain {...routeProps} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <NoteContext.Provider value={this.state}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
            </NoteContext.Provider>
        );
    }
}

export default App;
