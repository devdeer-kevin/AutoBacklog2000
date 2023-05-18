export default function Home() {
    return (
        <main className="w-full min-h-screen items-center font-mono bg-indigo-50 p-24">
            <div className="grid grid-flow-row gap-8 auto-rows-max w-full">
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-slate-600">Auto Backlog 2000</h1>
                </div>
                <div className="w-full grid">
                    <label className="label font-semibold text-slate-600">Requirement Engineering Notes</label>
                    <textarea
                        className="textarea w-full h-96 p-4 rounded-md shadow-md resize-non focus:outline-none"
                        placeholder="Enter your requirement engineering notes here..."
                    />
                </div>
                <div className="w-full grid">
                    <label className="label font-semibold text-slate-600">Result</label>
                    <div className="w-full h-96 text-sm pl-4 pt-6 rounded-md shadow-md bg-white overflow-auto">
                        <p>API response</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
