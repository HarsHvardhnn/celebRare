import React, { useState } from 'react';
import './App.css';
import TextArea from './components/TextArea';

function App() {
  const [arr, setArr] = useState([1, 2]);
  const [i, setI] = useState(3);
  const [history, setHistory] = useState([{ arr: arr.map(id => ({ id, value: '' })), i }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleDelete = (id) => {
    const updatedTextAreas = arr.filter((area) => area !== id);
    updateHistory(updatedTextAreas);
  };

  const handleCreate = () => {
    const updatedTextAreas = [...arr, i];
    updateHistory(updatedTextAreas);
    setI((prev) => prev + 1);
  };

  const updateHistory = (newArr) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, { arr: newArr.map(id => ({ id, value: '' })), i }]);
    setHistoryIndex(newHistory.length);
    setArr(newArr);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setArr(history[historyIndex - 1].arr.map(item => item.id));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      setArr(history[historyIndex + 1].arr.map(item => item.id));
    }
  };

  const handleTextChange = (id, value) => {
    const updatedArr = arr.map((item) => (item === id ? { id, value } : item));
    updateHistory(updatedArr);
  };

  return (
    <main> 
      <p style={{fontWeight:'bolder',fontSize:'20px'}}>This is your Design Area</p>
      <div className="container">
        {arr.map((id) => (
          <TextArea
            key={id}
            id={id}
            onDelete={handleDelete}
            onTextChange={(value) => handleTextChange(id, value)}
          ></TextArea>
        ))}
      </div>
      <button onClick={handleCreate}>Create TextArea</button>
      <button onClick={handleUndo} disabled={historyIndex === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={historyIndex === history.length - 1}>
        Redo
      </button>
    </main>
  );
}

export default App;
