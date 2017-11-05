/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, ipcMain, BrowserWindow } from 'electron';
import MenuBuilder from './menu';

const electronOauth2 = require('electron-oauth2');
const fs = require('fs');
const oauthConfig = require('./config').oauth;
const userConfig = require('./config').user;

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */
const oauth2WindowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration: false
  }
};

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('login', (event, webContents, request, authInfo, callback) => {
  event.preventDefault();
  callback(userConfig.username, userConfig.password);
});

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('my-oauth', (event, client) => {
  const myOauth2 = electronOauth2({
    ...oauthConfig,
    clientId: client.id,
    clientSecret: client.secret
  }, oauth2WindowParams);
  myOauth2.getAccessToken({})
    .then((token) => {
      try {
        fs.writeFileSync('.mytoken', token.access_token.value, 'utf-8');
      } catch (e) {
        console.log('error', e);
      }
      event.sender.send('my-oauth-reply', token);
    }, (err) => {
      console.log('Error while getting token', err);
    });
});

ipcMain.on('read-token', (event) => {
  const readToken = fs.readFileSync('.mytoken', 'utf-8');
  event.sender.send('read-token-reply', readToken);
});

ipcMain.on('read-user', (event) => {
  const readUser = JSON.parse(fs.readFileSync('user.json', 'utf-8'));
  event.sender.send('read-user-reply', readUser);
});
