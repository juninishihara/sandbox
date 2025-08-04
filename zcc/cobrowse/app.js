// Listen for the ZoomZccCobrowseSDK:Ready event
window.addEventListener('ZoomZccCobrowseSDK:Ready', function(event) {
    const button = document.getElementById('startCobrowseButton'); // Your custom button ID

    if (button) {
        // Optional: Enable the button if it is disabled
        button.disabled = false; 
        
        // Add a click event to start the Cobrowse session
        button.addEventListener('click', function() {
            try {
                window.ZoomZccCobrowseSDK.init();
            } catch (e) {
                console.log("ZoomZccCobrowseSDK is not ready, please try again later")
            }
        });
    }
}); 
