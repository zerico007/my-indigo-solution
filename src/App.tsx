import { useState } from 'react';
import parse from 'html-react-parser';

import './App.css';

const divStyles = {
  display: 'flex',
  width: '90vw',
};

const outPutStyles = {
  border: '1px solid black',
  padding: 5,
  flex: 1,
};

const createMarkdown = (text: string) => {
  const paragraphArray = text.split('\n\n');

  const textWithHeadings = paragraphArray.map((paragraph: string) => {
    const headingArray = paragraph.split('\n');
    return headingArray
      .map((line: string) => {
        if (line.startsWith('##')) {
          return `<h2>${line.substring(2)}</h2>`;
        } else if (line.startsWith('#')) {
          return `<h1>${line.substring(1)}</h1>`;
        } else if (line.startsWith('---')) {
          return line.replace('---', '<hr />');
        } else {
          return line;
        }
      })
      .join('');
  });

  const final = textWithHeadings.map((paragraph: string) => `<p>${paragraph}</p>`).join('');
  return final;
};

function App() {
  const [enteredValue, setEnteredValue] = useState('');

  return (
    <div style={divStyles}>
      <textarea
        style={{ flex: 1, padding: 5 }}
        onChange={(e) => setEnteredValue(e.target.value)}
        rows={5}
      />
      <div style={outPutStyles}>{parse(createMarkdown(enteredValue))}</div>
    </div>
  );
}

export default App;
