<script>
    import { useNavigate } from "svelte-routing";

    let backendUrl = "http://127.0.0.1:8000";
    let userId = 1;  // placeholder user ID for demonstration purposes
    let statusMessage = "System Ready.";
    let isAnalyzing = false;
   
    // Initialize the Svelte Router navigation controller
    const navigate = useNavigate();

    async function triggerAnalysis() {
        isAnalyzing = true;
        statusMessage = "Capturing frame and running ONNX model...";

        try {
            const response = await fetch(`${backendUrl}/analyse`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    file_dir: "CAMERA",
                    user_id: userId
                })
            });

            if (!response.ok) throw new Error(`Server status ${response.status}`);

            const data = await response.json();
           
            // Success! Programmatically push user to the results view, passing the text response state
            navigate("/result", { state: { result: data } });

        } catch (error) {
            statusMessage = `Error processing frame: ${error.message}`;
            isAnalyzing = false;
        }
    }
</script>

<main>
    <h1>System Live Control Center</h1>

    <div class="container">
        <div class="card video-box">
            <h2>Live Camera Stream</h2>
            <img src="{backendUrl}/video_feed" alt="Live Stream Feed" />
        </div>

        <div class="card control-box">
            <h2>AI Diagnostic Trigger</h2>
            <p>Click below to capture the current live frame and pass it through the ONNX analytical model pipeline.</p>
           
            <button on:click={triggerAnalysis} disabled={isAnalyzing}>
                {isAnalyzing ? "Processing Matrix..." : "Analyze Live Frame"}
            </button>

            <p class="status-text">{statusMessage}</p>
        </div>
    </div>
</main>

<style>
    main { display: flex; flex-direction: column; align-items: center; }
    .container { display: flex; gap: 20px; max-width: 1200px; width: 100%; margin-top: 20px; }
    .card { background: #2a2a2a; border-radius: 8px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
    .video-box { flex: 2; display: flex; flex-direction: column; }
    .video-box img { width: 100%; border-radius: 6px; border: 2px solid #444; background: #000; }
    .control-box { flex: 1; display: flex; flex-direction: column; gap: 15px; }
    button { background-color: #007acc; color: white; border: none; padding: 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px; }
    button:hover:not(:disabled) { background-color: #005999; }
    button:disabled { background-color: #555; cursor: not-allowed; }
    .status-text { font-style: italic; color: #aaa; margin-top: 10px; }
</style>