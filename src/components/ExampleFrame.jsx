function ExampleFrame() {
    return (
        <div className="og-examples__frame">
            <iframe
                title="HTML Runner"
                width="100%"
                height="100%"
                ref={iframeRef}
            />
        </div>
    )
}

export default ExampleFrame;