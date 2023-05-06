import React, { useState } from 'react';

function App() {
  const [inputTexts, setInputTexts] = useState([]);
  const [generatedTexts, setGeneratedTexts] = useState([]);

  const generateTexts = async () => {
    const response = await fetch('http://localhost:5000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texts: inputTexts })
    });

    const data = await response.json();
    setGeneratedTexts(data.generated_texts);
  };

  const handleInputChange = (index, value) => {
    const newInputTexts = [...inputTexts];
    newInputTexts[index] = value;
    setInputTexts(newInputTexts);
  };

  const addInputText = () => {
    setInputTexts([...inputTexts, '']);
  };

  const removeInputText = index => {
    const newInputTexts = [...inputTexts];
    newInputTexts.splice(index, 1);
    setInputTexts(newInputTexts);
  };

  return (
    <div>
      {inputTexts.map((inputText, index) => (
        <div key={index}>
          <input type="text" value={inputText} onChange={e => handleInputChange(index, e.target.value)} />
          <button onClick={() => removeInputText(index)}>Remove</button>
        </div>
      ))}
      <button onClick={addInputText}>Add input</button>
      <button onClick={generateTexts}>Generate</button>
      {generatedTexts.map((generatedText, index) => (
        <p key={index}>{generatedText}</p>
      ))}
    </div>
  );
}

export default App;
