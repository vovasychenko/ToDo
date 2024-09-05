import { useState, memo } from "react";

const UncompletedNote = memo(
  ({
    text,
    id,
    completion,
    onEditNote,
    moveNoteToCompletedUncompleted,
    deleteNote,
  }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => deleteNote(id, completion);

    const startEditing = () => {
      setIsEditing(true);
    };

    const finishEditing = (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      onEditNote(id, formData.get("text"));

      setIsEditing(false);
    };

    return (
      <div className="uncompleted">
        {!isEditing ? (
          <>
            <input
              type="checkbox"
              defaultChecked={false}
              onClick={() => moveNoteToCompletedUncompleted(id, completion)}
            />
            <span>{text}</span>
            <button type="button" onClick={handleDelete}>
              delete
            </button>
            <button type="button" onClick={startEditing}>
              edit
            </button>
          </>
        ) : (
          <form onSubmit={finishEditing}>
            <input name="text" defaultValue={text} />
            <button type="submit">finish editing</button>
          </form>
        )}
      </div>
    );
  }
);

export default UncompletedNote;
