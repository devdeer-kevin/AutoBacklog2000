export default function Home() {
  return (
    <main className="grid grid-flow-row w-full p-24 gap-8">
      <div className="text-4xl leading-8 text-left w-full font-bold">
        <h1>AutoBacklog</h1>
      </div>
      <div className="form-control w-full h-full">
        <label className="label">
          <span className="label-text">Your Notes</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Enter Your Requirement Engineering Notes"
        ></textarea>
      </div>
    </main>
  );
}
