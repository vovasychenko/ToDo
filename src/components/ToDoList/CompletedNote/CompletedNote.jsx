import { memo } from "react";

const CompletedNote = memo(
  ({ text, id, deleteNote, completion, moveNoteToCompletedUncompleted }) => {
    const handleDelete = () => deleteNote(id, completion);
    return (
      <div className="completed">
        <input
          type="checkbox"
          defaultChecked={true}
          onClick={() => moveNoteToCompletedUncompleted(id, completion)}
        />
        <span>{text}</span>
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      </div>
    );
  }
);

export default CompletedNote;
