import { useState } from 'react';




export default function App() {
  const [count, setCount] = useState(0);



  return (
    <section>
      <h1> Vite React</h1>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Counter {count}
        </button>
      </div>

    </section>
  );
}