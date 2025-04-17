import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAgent = async () => {
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('http://localhost:8080/agents/pydantic-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: question })
      });

      const data = await res.json();
      setResponse(data.output || JSON.stringify(data));
    } catch (error) {
      setResponse('Erro ao se comunicar com o agente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🤖 Chat com Agente Pydantic-AI</h1>
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta..."
          className="w-full border rounded p-3 mb-4"
        />
        <button
          onClick={askAgent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || !question}
        >
          {loading ? 'Perguntando...' : 'Perguntar'}
        </button>

        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Resposta:</h2>
            <p className="mt-2 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;