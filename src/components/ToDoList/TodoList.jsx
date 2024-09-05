import { useState, useCallback } from "react";

import { v4 } from "uuid";

import "./TodoList.css";
import UncompletedNote from "./UncompletedNote/UncompletedNote";
import CompletedNote from "./CompletedNote/CompletedNote";
import MainInput from "./MainInput/MainInput";

const COMPLETED = "COMPLETED";
const UNCOMPLETED = "UNCOMPLETED";

const ToDoList = () => {
  const [uncompletedNotes, setUncompletedNotes] = useState([]);

  const [completedNotes, setCompletedNotes] = useState([]);

  const createNote = (inputText) => {
    const uncompletedNote = {
      text: inputText,
      id: v4(),
    };

    setUncompletedNotes([...uncompletedNotes, uncompletedNote]);
  };

  const deleteNote = useCallback((id, completion) => {
    const filter = (prevNotes) => prevNotes.filter((note) => note.id !== id);

    switch (completion) {
      case COMPLETED:
        setUncompletedNotes(filter);
        break;
      case UNCOMPLETED:
        setCompletedNotes(filter);
        break;

      default:
        break;
    }
  }, []);

  const handleEditNote = useCallback((id, text) => {
    setUncompletedNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          note.text = text;
        }
        return note;
      })
    );
  }, []);

  const moveNoteToCompletedUncompleted = useCallback((id, completion) => {
    switch (completion) {
      case COMPLETED:
        setUncompletedNotes((prevNotes) => {
          return prevNotes.map((prevNote) => {
            if (prevNote.id === id) {
              setCompletedNotes((prev) => [...prev, prevNote]);
            }
            return prevNote;
          });
        });
        break;

      case UNCOMPLETED:
        setCompletedNotes((prevNotes) => {
          return prevNotes.map((prevNote) => {
            if (prevNote.id === id) {
              setUncompletedNotes((prev) => [...prev, prevNote]);
            }
            return prevNote;
          });
        });
        break;

      default:
        break;
    }

    deleteNote(id, completion);
  }, []);

  return (
    <>
      <MainInput createNote={createNote} />

      <div className="onlyUncompleted">
        {uncompletedNotes.map((note) => (
          <UncompletedNote
            text={note.text}
            id={note.id}
            onEditNote={handleEditNote}
            moveNoteToCompletedUncompleted={moveNoteToCompletedUncompleted}
            completion={COMPLETED}
            deleteNote={deleteNote}
            key={note.id}
          />
        ))}
      </div>

      <div className="onlyCompleted">
        {completedNotes.map((note) => (
          <CompletedNote
            text={note.text}
            id={note.id}
            moveNoteToCompletedUncompleted={moveNoteToCompletedUncompleted}
            completion={UNCOMPLETED}
            deleteNote={deleteNote}
            key={note.id}
          />
        ))}
      </div>
    </>
  );
};

export default ToDoList;
