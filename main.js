const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const PouchDB = require('pouchdb');

const db = new PouchDB('aemanersol');

db.info().then(function (info) {
  console.log(info);
});

const menuItems = [
  {
    label: 'Menu',
    // submenu: [
    //   {
    //     label: 'About',
    //   },
    // ],
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Electron',
        click: async () => {
          await shell.openExternal('https://www.electronjs.org/');
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Exit',
        click: () => app.quit(),
      },
    ],
  },
  {
    label: 'Debug',
    submenu: [{ role: 'toggleDevTools' }],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      openDevTools();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
