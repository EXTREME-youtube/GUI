(function() {
  const style = document.createElement('style');
  style.textContent = `
    #blooketGUIWindow {
      width: 300px;
      height: 200px;
      border: 2px solid #333;
      border-radius: 8px;
      background-color: #222;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
      position: fixed;
      top: 50px;
      left: 50px;
      transition: transform .3s ease, opacity .3s ease;
      display: none;
      flex-direction: column;
      cursor: grab;
      z-index: 2000; /* High z-index */
    }

    #blooketGUITitlebar {
      background-color: #444;
      color: #fff;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      width: 100%;
      box-sizing: border-box;
    }

    #blooketGUITitlebar span {
      flex-grow: 1;
      margin-right: 10px;
    }

    #blooketGUITitlebar button {
      background: none;
      border: none;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      margin-left: 5px;
      padding: 5px 8px;
      border-radius: 3px;
      transition: transform .2s ease, box-shadow .3s ease;
    }

    #blooketGUITitlebar button:hover {
      background-color: #555;
      transform: scale(1.1);
      box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
    }

    #blooketGUIContentArea {
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      width: 100%;
      box-sizing: border-box;
    }

    #blooketGUISidebar {
      width: 80px;
      background: #444;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 10px;
      box-sizing: border-box;
    }

    #blooketGUISidebar button {
      background: #555;
      border: 2px solid #777;
      color: #fff;
      font-size: 12px;
      cursor: pointer;
      padding: 8px;
      transition: background .3s, transform .1s, color .5s ease, border-color .5s ease;
      width: 90%;
      border-radius: 6px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 6px;
      box-sizing: border-box;
    }

    #blooketGUISidebar button:hover {
      background: linear-gradient(to bottom, #666, #555);
      transform: scale(1.1);
      box-shadow: 0 3px 7px rgba(0, 0, 0, .5);
    }

    #blooketGUISidebar button.active {
      background: #888;
      border-color: #aaa;
    }

    .blooketGUIMainContent {
      flex-grow: 1;
      padding: 10px;
      display: none;
      color: #fff;
      border-radius: 8px;
      transition: background-color .5s ease, box-shadow .3s ease;
      width: 100%;
      box-sizing: border-box;
    }

    .blooketGUIMainContent.active {
      display: block;
      animation: blooketGUIFadeIn .3s ease-in-out;
    }

    @keyframes blooketGUIFadeIn {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    #blooketGUIRestoreBtn {
      display: none;
      position: fixed;
      top: 10px;
      left: 10px;
      padding: 8px 12px;
      background: linear-gradient(45deg, #ff004c, #6b00ff);
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
      font-weight: bold;
      transition: transform .3s ease, box-shadow .3s ease, opacity .5s ease;
      opacity: 0;
      z-index: 2001; /* High z-index */
    }

    #blooketGUIRestoreBtn:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px rgba(255, 0, 100, .8);
    }

    #blooketGUIRestoreBtn.pulsing {
      animation: blooketGUIPulse 1.5s infinite;
    }

    @keyframes blooketGUIPulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 8px rgba(255, 0, 100, .5);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(255, 0, 100, 1);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 8px rgba(255, 0, 100, .5);
      }
    }

    #blooketGUIKeypad {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #333;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
      z-index: 2002; /* Even higher z-index */
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
    }

    #blooketGUIKeypad h3 {
      margin-bottom: 10px;
      font-size: 1.2em;
    }

    #blooketGUIKeypadInput {
      margin-bottom: 15px;
      padding: 10px;
      border: 1px solid #555;
      border-radius: 4px;
      width: 150px;
      background-color: #444;
      color: #fff;
    }

    #blooketGUIKeypadButtons {
      display: grid;
      grid-template-columns: repeat(3, 50px);
      grid-gap: 5px;
      margin-bottom: 10px;
    }

    #blooketGUIKeypadButtons button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      background-color: #555;
      color: #fff;
      cursor: pointer;
      transition: background-color .3s ease;
      font-size: 1em;
    }

    #blooketGUIKeypadButtons button:hover {
      background-color: #666;
    }

    #blooketGUIKeypadEnter {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background: linear-gradient(to bottom, #4CAF50, #388E3C);
      color: #fff;
      cursor: pointer;
      transition: background-color .3s ease;
      font-size: 1em;
      width: 100%;
      text-align: center;
    }

    #blooketGUIKeypadEnter:hover {
      background: linear-gradient(to bottom, #66BB6A, #43A047);
    }

    .blooketGUIErrorMessage {
      color: red;
      margin-top: 10px;
      font-size: .9em;
      display: none;
    }
  `;
  document.head.appendChild(style);

  const guiDiv = document.createElement('div');
  guiDiv.innerHTML = `
    <div id="blooketGUIWindow">
      <div id="blooketGUITitlebar"><span>My GUI</span><div><button id="blooketGUIMinimizeBtn">−</button><button id="blooketGUICloseBtn">×</button></div></div>
      <div id="blooketGUIContentArea">
        <div id="blooketGUISidebar">
          <button class="blooketGUITabButton active" data-tab="blooketGUIHome">Home</button>
          <button class="blooketGUITabButton" data-tab="blooketGUITab1">Tab 1</button>
          <button class="blooketGUITabButton" data-tab="blooketGUITab2">Tab 2</button>
        </div>
        <div class="blooketGUIMainContent active" id="blooketGUIHome"><h3>Home</h3><p>Welcome!</p></div>
        <div class="blooketGUIMainContent" id="blooketGUITab1"><h3>Tab 1</h3><p>Content 1.</p></div>
        <div class="blooketGUIMainContent" id="blooketGUITab2"><h3>Tab 2</h3><p>Content 2.</p></div>
      </div>
    </div>
    <button id="blooketGUIRestoreBtn">Restore</button>
    <div id="blooketGUIKeypad">
      <h3>Enter Key</h3>
      <input type="password" id="blooketGUIKeypadInput" maxlength="4">
      <div id="blooketGUIKeypadButtons">
        <button>1</button><button>2</button><button>3</button>
        <button>4</button><button>5</button><button>6</button>
        <button>7</button><button>8</button><button>9</button>
        <button>*</button><button>0</button><button>#</button>
      </div>
      <button id="blooketGUIKeypadEnter">Enter</button>
      <p class="blooketGUIErrorMessage">Incorrect Key</p>
    </div>
  `;
  document.body.appendChild(guiDiv);

  let isDragging = false, offsetX, offsetY, initialWidth = 300, initialSidebarWidth = 80;
  const $ = (id) => document.getElementById(id);
  const gw = $("blooketGUIWindow");
  const tb = $("blooketGUITitlebar");
  const sb = $("blooketGUISidebar");
  const sbbs = document.querySelectorAll(".blooketGUITabButton");
  const mcs = document.querySelectorAll(".blooketGUIMainContent");
  const mb = $("blooketGUIMinimizeBtn");
  const cb = $("blooketGUICloseBtn");
  const rb = $("blooketGUIRestoreBtn");
  const kp = $("blooketGUIKeypad");
  const ki = $("blooketGUIKeypadInput");
  const kbs = document.querySelectorAll("#blooketGUIKeypadButtons button");
  const ke = $("blooketGUIKeypadEnter");
  const em = document.querySelector(".blooketGUIErrorMessage");
  const ckey = "1234";

  tb.addEventListener("mousedown", (e) => {
    isDragging = true;
    gw.style.cursor = 'grabbing';
    offsetX = e.clientX - gw.getBoundingClientRect().left;
    offsetY = e.clientY - gw.getBoundingClientRect().top;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    gw.style.cursor = 'grab';
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    gw.style.left = e.clientX - offsetX + "px";
    gw.style.top = e.clientY - offsetY + "px";
  });

  const st = (tn, btn) => {
    mcs.forEach(el => el.classList.remove("active"));
    sbbs.forEach(button => button.classList.remove("active"));
    $(tn).classList.add("active");
    btn.classList.add("active");
  };

  const minimizeGUI = () => {
    initialWidth = gw.offsetWidth;
    initialSidebarWidth = sb.offsetWidth;
    gw.classList.add("minimized");
    gw.style.width = "100px";
    sb.style.width = "100px";
    setTimeout(() => {
      gw.style.display = "none";
      rb.style.display = "block";
      setTimeout(() => rb.style.opacity = "1", 100);
      rb.classList.add("pulsing");
    }, 300);
  };

  const restoreGUI = () => {
    gw.style.display = "block";
    gw.style.width = initialWidth + "px";
    sb.style.width = initialSidebarWidth + "px";
    setTimeout(() => gw.classList.remove("minimized"), 50);
    rb.style.opacity = "0";
    setTimeout(() => rb.style.display = "none", 500);
    rb.classList.remove("pulsing");
  };

  const closeGUI = () => {
    gw.style.display = "none";
    rb.style.display = "none";
  };

  mb.onclick = minimizeGUI;
  cb.onclick = closeGUI;
  rb.onclick = restoreGUI;
  sbbs.forEach(button => button.addEventListener('click', () => st(button.dataset.tab, button)));
  kbs.forEach(button => {
    button.addEventListener('click', () => {
      ki.value += button.textContent;
    });
  });

  ke.addEventListener('click', () => {
    if (ki.value === ckey) {
      kp.style.display = "none";
      gw.style.display = "block";
    } else {
      em.style.display = "block";
      ki.value = "";
      setTimeout(() => em.style.display = "none", 2000);
    }
  });

  gw.style.display = "none";
})();
