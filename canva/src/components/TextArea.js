import React, { useState, useEffect } from 'react';
import useDragger from '../useDragger';
import { FaSave, FaUndo, FaRedo } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

const DraggableTextArea = (props) => {
  const [inputValue, setInputValue] = useState(props.initialValue || '');
  const [isTyping, setIsTyping] = useState(true);
  const [isTextareaVisible, setIsTextareaVisible] = useState(true);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);
  const [history, setHistory] = useState([{ value: inputValue, fontFamily, fontColor, fontSize }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  useDragger(`${props.id}`, { top: 0, left: 0 });

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleEdit = () => {
    setIsTyping(!isTyping);
    setIsTextareaVisible(!isTextareaVisible);
  };

  const handleSave = () => {
    setIsTyping(false);
    setIsTextareaVisible(false);
    // Update history only when Save is clicked
    updateHistory({ value: inputValue, fontFamily, fontColor, fontSize });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      const { value, fontFamily, fontColor, fontSize } = history[historyIndex - 1];
      setInputValue(value);
      setFontFamily(fontFamily);
      setFontColor(fontColor);
      setFontSize(fontSize);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prevIndex) => prevIndex + 1);
      const { value, fontFamily, fontColor, fontSize } = history[historyIndex + 1];
      setInputValue(value);
      setFontFamily(fontFamily);
      setFontColor(fontColor);
      setFontSize(fontSize);
    }
  };

  const handleFontSizeChange = (e) => {
    const newFontSize = parseInt(e.target.value, 10);
    if (!isNaN(newFontSize)) {
      setFontSize(newFontSize);
    }
  };

  const handleFontChange = (e) => {
    const newFontFamily = e.target.value;
    setFontFamily(newFontFamily);
  };

  const handleColorChange = (e) => {
    const newFontColor = e.target.value;
    setFontColor(newFontColor);
  };

  const updateHistory = (newState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newState]);
    setHistoryIndex(newHistory.length);
  };
  const handleDelete = () => {
    // Call the onDelete callback passed from the parent
    if (props.onDelete) {
      props.onDelete(props.id);
    }
  };
  useEffect(() => {
    // Log the history for demonstration purposes
    console.log('History:', history);
  }, [history]);

  return (
    <div
      id={props.id}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
         {/* Drag handle */}
         <div
        onClick={isTyping ? handleSave : handleEdit}
        style={{
          // ... (existing styles)
        }}
      >
        {isTyping ? <FaSave /> : <MdEdit />}
      </div>

      {isTyping && (
        <>
          {/* Undo and Redo buttons */}
          <div style={{ display: 'flex', marginTop: '8px' }}>
            <button onClick={handleUndo} style={{ marginRight: '8px', cursor: 'pointer' }}>
              <FaUndo />
            </button>
            <button onClick={handleRedo} style={{ cursor: 'pointer' }}>
              <FaRedo />
            </button>
          </div>

          {/* Delete button */}
          <button
            onClick={handleDelete}
            style={{
              marginTop: '8px',
              background: '#ff0000',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <MdDelete />
          </button>
        </>
      )}

      <p
        style={{
          margin: '0',
          fontFamily: fontFamily,
          color: fontColor,
          fontSize: fontSize,
          fontWeight:'bolder',
        }}
      >
        {inputValue}
      </p>
      {isTextareaVisible && (
        <>
          <textarea
            value={inputValue}
            onChange={handleChange}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              marginTop: '8px',
              fontFamily: fontFamily,
              color: fontColor,
            }}
            placeholder="Type here..."
          />
          <div style={{ marginTop: '8px' }}>
            <label>
              Font:
              <select value={fontFamily} onChange={handleFontChange}>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                {/* Add other font options as needed */}
              </select>
            </label>
            <label style={{ marginLeft: '8px' }}>
              FontSize
              <input
                type="text"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </label>
            <label style={{ marginLeft: '8px' }}>
              Color:
              <input
                type="color"
                value={fontColor}
                onChange={handleColorChange}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default DraggableTextArea;
