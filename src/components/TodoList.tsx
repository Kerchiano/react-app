import { useState, useRef } from "react";
import { Check, X } from "lucide-react";

export default function TodoList() {
  const [record, setRecord] = useState("");
  const [recordsList, setRecordsList] = useState<{ text: string; completed: boolean }[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addRecord = () => {
    if (record.trim() !== "") {
      setRecordsList([...recordsList, { text: record, completed: false }]);
      setRecord("");
      setSearchText("");
    }
  };

  const deleteRecord = (index: number) => {
    const newRecordsList = [...recordsList];
    newRecordsList.splice(index, 1);
    setRecordsList(newRecordsList);
  };

  const checkRecord = (index: number) => {
    const newRecordsList = [...recordsList];
    newRecordsList[index].completed = !newRecordsList[index].completed;
    setRecordsList(newRecordsList);
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedText(recordsList[index].text);
  };

  const finishEditing = () => {
    if (editingIndex !== null) {
      const newRecordsList = [...recordsList];
      newRecordsList[editingIndex].text = editedText;
      setRecordsList(newRecordsList);
      setEditingIndex(null);
    }
  };

  const filteredRecordList = recordsList.filter((item) =>
      item.text.toLowerCase().includes(searchText.toLowerCase())
    )
  return (
    <div className="records">
      <h1 className="records__title">Todo list</h1>
      <input
        placeholder="Enter record"
        value={record}
        onChange={(e) => {
          const value = e.target.value;
          setRecord(value);
          setSearchText(value);
        }}
        type="text"
        className="records__input"
      />
      <button className="record__add" onClick={addRecord}>
        Add record
      </button>
      <ul className="records__list">
        {filteredRecordList.map((item, index) => (
            <li
              className={`item ${item.completed ? "completed" : ""}`}
              key={index}
            >
              {editingIndex === index ? (
                <input
                  style={{ outline: "none", border: "none", fontSize: "15px" }}
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onBlur={finishEditing}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") finishEditing();
                  }}
                  ref={inputRef}
                />
              ) : (
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                  }}
                  onDoubleClick={() => {
                    startEditing(index);
                    setTimeout(() => {
                      if (inputRef.current) inputRef.current.focus();
                    }, 0);
                  }}
                >
                  {item.text}
                </span>
              )}
              <div className="butons-block">
                <div
                  style={{
                    backgroundColor: item.completed ? "orange" : "#41B06E",
                  }}
                  className="Check"
                  onClick={() => checkRecord(index)}
                >
                  <Check size={18} color={item.completed ? "black" : "white"} />
                </div>
                <div className="X-mark" onClick={() => deleteRecord(index)}>
                  <X size={18} color="white" />
                </div>
              </div>
            </li>
          ))}
      </ul>
      {/* <h1 className="text-7xl text-center text-blue-400">
      Hello world!
    </h1> */}
    </div>
  );
}
