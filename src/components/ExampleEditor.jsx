function ExampleEditor({handleRun, handleRaw}) {
    return (
        <div className="og-examples__editor">
            <div className="og-examples__toolbar">
                <button className="og-examples__run" onClick={handleRun}>Run</button>
                <button className="og-examples__raw" onClick={handleRaw}>Raw</button>
            </div>
            <textarea className="og-examples__code" value={head} onChange={handleHeadChange}></textarea>
            <textarea className="og-examples__code" value={body} onChange={handleBodyChange}></textarea>
            <textarea className="og-examples__code" value={script} onChange={handleScriptChange}></textarea>
        </div>
    )
}

export default ExampleEditor;