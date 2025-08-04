// Initialize Zoom Co-browse session (example setup)
document.addEventListener('DOMContentLoaded', function() {
  console.log("Initializing Zoom Co-browse Demo...");

  // Assuming the SDK provides a global ZCC object
  if (window.ZCC) {
    ZCC.init({
      accountId: "YOUR_ACCOUNT_ID",  // replace with actual account ID
      appKey: "YOUR_APP_KEY"         // replace with actual app key if required
    });
  }
});
