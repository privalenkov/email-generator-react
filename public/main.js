const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
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
    switch (args) {
      case 'closeApp':
        win = null;
        if (process.platform !== 'darwin') {
          app.quit();
        }
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

