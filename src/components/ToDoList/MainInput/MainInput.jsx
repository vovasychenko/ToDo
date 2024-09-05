import { useRef } from "react";

const MainInput = ({ createNote }) => {
  const mainInputRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    createNote(mainInputRef.current.value);
  };

  return (
    <form
      id="mainInputForm"
      key="mainForm"
      className="mainForm"
      onSubmit={onSubmit}
    >
      <input
        key="mainInput"
        className="mainInput"
        name="mainInput"
        ref={mainInputRef}
      />
    </form>
  );
};
export default MainInput;
