document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('content-container');

  // The content for each page as a string template.
  // The Zoom SDK script is included only where needed.
  const pages = {
    'home': `
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Customer Profile（お客様プロフィール）</h1>
      <form id="customerForm" class="space-y-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name（名）:</label>
          <input type="text" name="firstName" placeholder="名を入力してください" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out p-3">
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name（姓）:</label>
          <input type="text" name="lastName" placeholder="姓を入力してください" class="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out p-3">
        </div>
        <div>
          <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth（誕生日）:</label>
          <input type="text" name="dob" class="juni_cobrowse_mask mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out p-3" placeholder="yyyy/mm/dd">
        </div>
        <div>
          <label for="ssn" class="block text-sm font-medium text-gray-700">Social Security Number（ソーシャルセキュリティー番号）:</label>
          <input type="text" name="ssn" class="juni_cobrowse_mask mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition duration-150 ease-in-out p-3" placeholder="XXXX XXXX XXXX">
        </div>
      </form>
      <!-- Zoom Co-browse SDK -->
      <script data-apikey="キー" data-env="us01" src="https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js" data-enable-zcb="true"></script>
      <script src="app.js"></script>
      <button id="startCobrowseButton" disabled class="mt-6 w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 transition duration-300 ease-in-out">
        Start Cobrowse
      </button>
    `,
    'page1': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 1</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 1.</p>
      <!-- Zoom Co-browse SDK -->
      <script data-apikey="キー" data-env="us01" src="https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js" data-enable-zcb="true"></script>
    `,
    'page2': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 2</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 2.</p>
      <!-- Zoom Co-browse SDK -->
      <script data-apikey="キー" data-env="us01" src="https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js" data-enable-zcb="true"></script>
    `,
    'page3': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 3</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 3.</p>
      <p class="mb-6 text-center font-bold text-red-600">Note: Co-browse is disabled on this page.</p>
    `
  };

  // Function to render the correct page content
  const renderPage = (pageName) => {
    // Clear any previous content and scripts
    contentContainer.innerHTML = '';
    
    // Inject the new page content
    contentContainer.innerHTML = pages[pageName];
    
    // Re-execute scripts inside the new content
    const scripts = contentContainer.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
        newScript.onload = () => {
            if(script.id === 'startCobrowseButton') {
                 // re-enable button after script loads
                 const startButton = document.getElementById('startCobrowseButton');
                 if (startButton) startButton.disabled = false;
            }
        };
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    });
  };

  // Simple routing logic based on URL hash
  const router = () => {
    let route = window.location.hash.slice(1) || 'home';
    if (!pages[route]) {
      route = 'home'; // Fallback to home if route doesn't exist
    }
    renderPage(route);
  };

  // Listen for hash changes and initial page load
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
});
