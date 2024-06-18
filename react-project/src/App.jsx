import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>
        testAAAAA eee
      </h1>
      <div >
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>

    </div>
  );
}

export default App;
