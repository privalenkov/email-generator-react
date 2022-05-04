const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const fetch = require('node-fetch'); 
const { Headers } = require('node-fetch');
const ipc = ipcMain;

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 926,
    height: 617,
    transparent: true,
    frame: false,
    center: true,
    minWidth: 600,
    maxWidth: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setAspectRatio(1.5);
  //load the index.html from a url
  win.loadURL('http://localhost:3000');

  // Open the DevTools.
  win.webContents.openDevTools()

  ipc.on('toMain', (event, args) => {
    switch (args.type) {
      case 'closeApp':
        win = null;
        if (process.platform !== 'darwin') {
          app.quit();
        }
        break;
      case 'getData':
        const meta = [['Content-Type', 'text/html']];
        const headers = new Headers(meta);
        fetch(`https://mobirise.com/extensions/${args.data.toLowerCase()}`, headers).then((res, rej) => {
          if(!res.ok) return;
          return res.text()
        }).then((html) => win.webContents.send("fromMain", html))
        break;
    
      default:
        break;
    }
  })
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
    })
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

