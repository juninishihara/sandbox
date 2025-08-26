document.addEventListener('DOMContentLoaded', () => {
  const contentContainer = document.getElementById('content-container');

  // This event listener is attached once at the beginning to enable the button
  // as soon as the SDK is ready, regardless of which page is active.
  window.addEventListener('ZoomZccCobrowseSDK:Ready', function(event) {
    const startButton = document.getElementById('startCobrowseButton');
    if (startButton) {
      startButton.disabled = false;
      console.log("Start Cobrowse button is now enabled.");
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
    const script = document.querySelector('script[data-enable-zcb="true"]');
    if (!script) {
      const newScript = document.createElement('script');
      newScript.src = "[https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js](https://us01ccistatic.zoom.us/us01cci/web-sdk/zcc-sdk.js)";
      newScript.setAttribute('data-apikey', 'w0xRg0TQSYGT5X8WFWZMgg');
      newScript.setAttribute('data-env', 'us01');
      newScript.setAttribute('data-enable-zcb', 'true');
      document.body.appendChild(newScript);
    }
  };

  const stopZoomSDK = () => {
    const script = document.querySelector('script[data-enable-zcb="true"]');
    if (script) {
      document.body.removeChild(script);
      console.log("ZoomZccCobrowseSDK has been stopped.");
    }
  };

  const router = () => {
    const route = window.location.hash.slice(1) || 'home';
    const isCobrowsePage = ['home', 'page1', 'page2'].includes(route);

    contentContainer.innerHTML = pages[route];
    
    if (isCobrowsePage) {
      loadZoomSDK();
      // Attach the event listener for the button only when on the home page
      if (route === 'home') {
        const startButton = document.getElementById('startCobrowseButton');
        if (startButton) {
            startButton.addEventListener('click', function() {
                try {
                    window.ZoomZccCobrowseSDK.init();
                } catch (e) {
                    console.log("ZoomZccCobrowseSDK is not ready, please try again later", e);
                }
            });
        }
      }
    } else {
      stopZoomSDK();
    }
  };

  window.addEventListener('hashchange', router);
  window.addEventListener('load', router);
  
  router();
});
