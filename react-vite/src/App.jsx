import { useState } from 'react';




export default function App() {
  const [count, setCount] = useState(0);



  return (
    <section>

      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          Counter {count}
        </button>
      </div>

    </section>
  );
}