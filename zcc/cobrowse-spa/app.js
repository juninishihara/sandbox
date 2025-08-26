document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('content-container');
  let isSDKReady = false;

  // Listen for the SDK's ready event to know when it's fully loaded and ready
  window.addEventListener('ZoomZccCobrowseSDK:Ready', function(event) {
    isSDKReady = true;
    console.log("ZoomZccCobrowseSDK is ready.");
    const startButton = document.getElementById('startCobrowseButton');
    if (startButton) {
      startButton.disabled = false;
    }
  });

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
      <button id="startCobrowseButton" disabled class="mt-6 w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 transition duration-300 ease-in-out">
        Start Cobrowse
      </button>
    `,
    'page1': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 1</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 1.</p>
    `,
    'page2': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 2</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 2.</p>
    `,
    'page3': `
      <h1 class="text-3xl font-bold mb-6 text-gray-800 text-center">This is Page 3</h1>
      <p class="mb-6 text-center">This is a placeholder page for Page 3.</p>
      <p class="mb-6 text-center font-bold text-red-600">Note: Co-browse is disabled on this page.</p>
    `
  };

  const loadZoomSDK = () => {
    // Only load the SDK if it's not already loaded
    if (!document.querySelector('script[data-enable-zcb="true"]')) {
      const script = document.createElement('script');
      script.src = "[https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js](https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js)";
      script.setAttribute('data-apikey', 'w0xRg0TQSYGT5X8WFWZMgg');
      script.setAttribute('data-env', 'us01');
      script.setAttribute('data-enable-zcb', 'true');
      document.body.appendChild(script);
    }
  };

  const stopZoomSDK = () => {
    // Find and remove the SDK script tag
    const script = document.querySelector('script[data-enable-zcb="true"]');
    if (script) {
      document.body.removeChild(script);
      isSDKReady = false;
      console.log("ZoomZccCobrowseSDK has been stopped.");
    }
  };

  const renderPage = (pageName) => {
    contentContainer.innerHTML = pages[pageName];
    
    // Attach event listeners for the new content
    if (pageName === 'home') {
      const startButton = document.getElementById('startCobrowseButton');
      if (startButton) {
        startButton.disabled = !isSDKReady;
        startButton.addEventListener('click', () => {
          try {
            window.ZoomZccCobrowseSDK.init();
          } catch (e) {
            console.log("ZoomZccCobrowseSDK is not ready, please try again later", e);
          }
        });
      }
    }
  };

  const router = () => {
    const route = window.location.hash.slice(1) || 'home';
    const isCobrowsePage = ['home', 'page1', 'page2'].includes(route);

    if (isCobrowsePage) {
      loadZoomSDK();
    } else {
      stopZoomSDK();
    }
    
    renderPage(route);
  };

  // Listen for hash changes and initial page load
  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);

  // Initial load
  router();
});
