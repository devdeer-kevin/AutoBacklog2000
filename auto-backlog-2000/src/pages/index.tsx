export default function Home() {
    return (
        <main className="w-full min-h-screen items-center font-mono bg-indigo-50 p-24">
            <div className="grid grid-flow-row gap-4 auto-rows-max w-full">
                <div className="w-full">
                    <h1 className="text-4xl font-bold text-slate-600">Auto Backlog 2000</h1>
                </div>
                <div className="w-full grid">
                    <textarea
                        className="textarea w-full h-96 p-4 rounded-ld shadow-md resize-non focus:outline-none"
                        placeholder="Enter your requirement engineering notes here..."
                    />
                </div>
            </div>
        </main>
    );
}
