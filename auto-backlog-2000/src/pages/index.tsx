import { useState } from 'react';

export default function Home() {
    const [animalInput, setAnimalInput] = useState('');
    const [result, setResult] = useState();

    async function onSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ animal: animalInput }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setAnimalInput('');
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            // alert(error.message);
        }
    }
    return (
        <main className="grid grid-flow-row justify-items-center w-full min-h-screen font-mono bg-indigo-50">
            <nav className="navbar w-full shadow-sm h-16 px-8">
                <div className="grid w-full grid-cols-2 items-center">
                    <div className="flex">
                        <h1 className="text-md leading-8 font-bold text-indigo-800">Auto Backlog 2000</h1>
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="btn-sm btn bg-indigo-800 hover:bg-indigo-600 rounded-md text-xs normal-case disabled:bg-slate-200">Logout</button>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl px-8">
                <div className="grid grid-flow-row gap-8 auto-rows-max w-full">
                    <div className="w-full bg-indigo-100 shadow-md rounded-md p-4">
                        <h3 className="text-sm leading-6 font-regular text-slate-800">
                            💡 <span className="text-indigo-800 font-bold">Idea</span> <br />
                            Automated backlog generation tool leveraging GPT-4 to convert requirement engineering notes into structured Scrum artifacts.
                        </h3>
                    </div>
                    <div className="grid">
                        <label className="label font-semibold text-indigo-800">Requirement Engineering Notes</label>
                        <form onSubmit={onSubmit}>
                            <textarea
                                name="animal"
                                value={animalInput}
                                onChange={(e) => setAnimalInput(e.target.value)}
                                className="textarea bg-slate-50 w-full h-96 p-4 rounded-md shadow-md resize-non focus:outline-none"
                                placeholder="Enter your requirement engineering notes here..."
                            />
                            <button type="submit" className="btn-sm w-full btn my-6 bg-indigo-800 hover:bg-indigo-600 rounded-md text-xs normal-case disabled:bg-slate-200">
                                Generate
                            </button>
                        </form>
                    </div>
                    <div className="grid">
                        <label className="label font-semibold text-indigo-800">Result</label>
                        <div className="w-full text-indigo-800 h-96 text-sm pl-4 pt-6 rounded-md shadow-md bg-slate-50 overflow-auto">
                            <p>{result}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
