import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Home() {
    const [requirementInput, setRequirementInput] = useState('');
    const [result, setResult] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [resetResult, setResetResult] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');

    async function onSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        try {
            setIsLoading(true);
            setResetResult(true);
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requirement: requirementInput }),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setIsLoading(false);
            setShowResult(true);
            setRequirementInput('');
        } catch (error) {
            // Consider implementing your own error handling logic here
            console.error(error);
            // alert(error.message);
        }
    }
    const resetHandler = () => {
        setResetResult(false);
        setShowResult(false);
        setRequirementInput('');
    };

    /** A handler to check if the password is correct. */
    const loginHandler = async () => {
        if (!password) {
            return;
        } else {
            try {
                const response = await fetch(`/api/${password}`);
                if (response.status == 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setRequirementInput('');
        setShowResult(false);
        setResetResult(false);
    };

    return (
        <main className="grid grid-flow-row justify-items-center w-full min-h-screen font-mono bg-indigo-50">
            <nav className="navbar w-full shadow-sm h-16 px-8">
                <div className="grid w-full grid-cols-2 items-center">
                    <div className="flex">
                        <h1 className="text-md leading-8 font-bold text-indigo-800">Auto Backlog 2000</h1>
                    </div>
                    <div className="flex items-center justify-end">
                        {isLoggedIn && (
                            <button
                                onClick={logoutHandler}
                                className="btn-sm border-none btn bg-indigo-800 hover:bg-indigo-600 rounded-md text-xs normal-case disabled:bg-slate-200">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            {isLoggedIn ? (
                <div className="max-w-7xl p-8">
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
                                    name="requirement"
                                    value={requirementInput}
                                    onChange={(e) => setRequirementInput(e.target.value)}
                                    className="textarea bg-slate-50 w-full h-96 p-4 rounded-md shadow-md resize-non focus:outline-none"
                                    placeholder="Enter your requirement engineering notes here..."
                                />
                                {isLoading ? (
                                    <button className="btn-sm btn-disabled loading w-full btn my-6 rounded-md text-xs normal-case disabled:bg-slate-200" />
                                ) : (
                                    <button
                                        type="submit"
                                        className="btn-sm border-none w-full btn my-6 bg-indigo-800 hover:bg-indigo-600 rounded-md text-xs normal-case disabled:bg-slate-200">
                                        Generate
                                    </button>
                                )}
                            </form>
                        </div>
                        {showResult && (
                            <div className="grid">
                                <div className="grid w-full grid-cols-2 items-center grid-flow-col pb-4">
                                    <div className="flex">
                                        <label className="label font-semibold text-indigo-800">Result</label>
                                    </div>
                                    {resetResult && (
                                        <div className="flex items-center justify-end">
                                            <button
                                                onClick={resetHandler}
                                                className="btn-sm btn border-none bg-pink-600 hover:bg-pink-500 rounded-md text-xs normal-case disabled:bg-slate-200">
                                                <XMarkIcon className="h-4 w-4" /> <span className="px-1">Reset</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-indigo-800 h-96 text-sm pl-4 pt-6 rounded-md shadow-md bg-slate-50 overflow-auto">
                                    <p>{result}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="">
                    <div className="h-8 mb-2">
                        <label className="label font-semibold text-indigo-800">Authentication</label>
                    </div>
                    <div className="">
                        <input
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="input rounded-md outline-none shadow-sm focus:outline-none input-sm"
                        />
                        <button
                            onClick={loginHandler}
                            className="btn-sm border-none btn bg-indigo-800 hover:bg-indigo-600 rounded-md text-xs normal-case disabled:bg-slate-200 ml-2">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
