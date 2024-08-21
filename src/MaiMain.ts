import {app, screen, globalShortcut, ipcMain, dialog, BrowserWindow} from 'electron'
import path, {join} from 'path'
import fs from 'fs';
import os from 'os';
import {MlcContainer} from "./mlc/core/MlcContainer";
import {
    MaiNativeAccountLogicConstant,
    MaiNativeAgentLogicConstant,
    MaiNativeEmbeddingLogicConstant,
    MaiNativeKnowledgeLogicConstant,
    MaiNativeLLMsLogicConstant,
    MaiNativeMCodeLogicConstant,
    MaiNativeMCubeLogicConstant,
    MaiNativeMddLogicConstant,
    MaiNativeMPromptLogicConstant,
    MaiNativeSettingsLogicConstant,
} from "@mai-alpha/mai-native-main";
import {MlcActionEvent, MlcErrorEvent, MlcLifecycleEvent, MlcStateEvent} from "@mai-alpha/mai-mlc-core-tsc";

let _primaryDisplay: any;

let _splashWindow: any;
let _loginWindow: any;
let _mainWindow: any;
let _agentWindow: any;
let _knowledgeWindow: any;
let _codeWindow: any;

let _mainNativeLoginContainer, _mainNativeContainer: MlcContainer | null

const getMaiPageUrl = (page: string) => {
    // return `http://localhost:22988/${page}.html`
    return `https://native.mortiseai.com/${page}.html`
}

const createSplashWindow = () => {
    startMaiNativeLoginContainer()
    if (!_primaryDisplay) {
        _primaryDisplay = screen.getPrimaryDisplay()
    }
    _splashWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        backgroundColor: '#15161D',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'MaiPreload.js')
        }
    })
    _splashWindow.on('closed', () => {
        _splashWindow = null
    })
    _splashWindow.loadURL(getMaiPageUrl((global as any).MaiSplashPage))
}

const createLoginWindow = () => {
    startMaiNativeLoginContainer()
    if (_splashWindow) {
        _splashWindow.close()
    }
    if (_mainWindow) {
        _mainWindow.close()
    }
    if (!_primaryDisplay) {
        _primaryDisplay = screen.getPrimaryDisplay()
    }
    const {width, height} = _primaryDisplay.workAreaSize
    _loginWindow = new BrowserWindow({
        width: width,
        height: height,
        backgroundColor: '#15161D',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'MaiPreload.js')
        }
    })
    _loginWindow.on('closed', () => {
        _loginWindow = null
    })
    _loginWindow.loadURL(getMaiPageUrl((global as any).MaiLoginPage))
}

const createMainWindow = () => {
    startMaiNativeContainer()
    if (_splashWindow) {
        _splashWindow.close()
    }
    if (_loginWindow) {
        _loginWindow.close()

    }
    if (_mainWindow) {
        _mainWindow.close()
    }
    if (_agentWindow) {
        _agentWindow.close()
    }
    if (_knowledgeWindow) {
        _knowledgeWindow.close()
    }
    if (_codeWindow) {
        _codeWindow.close()
    }
    if (!_primaryDisplay) {
        _primaryDisplay = screen.getPrimaryDisplay()
    }
    const {width, height} = _primaryDisplay.workAreaSize
    _mainWindow = new BrowserWindow({
        width: width,
        height: height,
        backgroundColor: '#15161D',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'MaiPreload.js')
        }
    })
    _mainWindow.on('closed', () => {
        _mainWindow = null
    })
    _mainWindow.loadURL(getMaiPageUrl((global as any).MaiMainPage))
}

const createAgentWindow = (params?: any) => {
    if (!_mainWindow) {
        return
    }
    if (_knowledgeWindow) {
        _knowledgeWindow.close()
    }
    let agentURL = getMaiPageUrl((global as any).MaiAgentPage)
    let agentOpen = false
    if (params || _agentWindow == null) {
        agentOpen = true
        if (params) {
            Object.keys(params).forEach((key, index) => {
                agentURL += (index == 0 ? "?" : "&")
                agentURL += `${key}=${params[key] ? params[key] : ""}`
            });
        }
    }
    if (agentOpen) {
        if (!_primaryDisplay) {
            _primaryDisplay = screen.getPrimaryDisplay()
        }
        const {width, height} = _primaryDisplay.workAreaSize
        _agentWindow = new BrowserWindow({
            width: Math.floor(width * 0.8),
            height: Math.floor(height * 0.8),
            alwaysOnTop: true,
            backgroundColor: '#15161D',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'MaiPreload.js')
            }
        })
        _agentWindow.on('closed', () => {
            _agentWindow = null
        })
        _agentWindow.loadURL(agentURL)
    }
}

const createKnowledgeWindow = (params?: any) => {
    if (!_mainWindow) {
        return
    }
    if (_agentWindow) {
        _agentWindow.close()
    }
    let knowledgeURL = getMaiPageUrl((global as any).MaiKnowledgePage)
    let knowledgeOpen = false
    if (params || _knowledgeWindow == null) {
        knowledgeOpen = true
        if (params) {
            Object.keys(params).forEach((key, index) => {
                knowledgeURL += (index == 0 ? "?" : "&")
                knowledgeURL += `${key}=${params[key] ? params[key] : ""}`
            });
        }
    }
    if (knowledgeOpen) {
        if (!_primaryDisplay) {
            _primaryDisplay = screen.getPrimaryDisplay()
        }
        const {width, height} = _primaryDisplay.workAreaSize
        _knowledgeWindow = new BrowserWindow({
            width: Math.floor(width * 0.8),
            height: Math.floor(height * 0.8),
            alwaysOnTop: true,
            backgroundColor: '#15161D',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'MaiPreload.js')
            }
        })
        _knowledgeWindow.on('closed', () => {
            _knowledgeWindow = null
        })
        _knowledgeWindow.loadURL(knowledgeURL)
    }
}

const createCodeWindow = (params?: any) => {
    if (!_mainWindow) {
        return
    }
    if (_codeWindow) {
        _codeWindow.close()
    }
    let codeURL = getMaiPageUrl((global as any).MaiCodePage)
    let codeOpen = false
    if (params || _codeWindow == null) {
        codeOpen = true
        if (params) {
            Object.keys(params).forEach((key, index) => {
                codeURL += (index == 0 ? "?" : "&")
                codeURL += `${key}=${params[key] ? params[key] : ""}`
            });
        }
    }
    if (codeOpen) {
        if (!_primaryDisplay) {
            _primaryDisplay = screen.getPrimaryDisplay()
        }
        const {width, height} = _primaryDisplay.workAreaSize
        _codeWindow = new BrowserWindow({
            width: Math.floor(width * 0.8),
            height: Math.floor(height * 0.8),
            alwaysOnTop: true,
            backgroundColor: '#15161D',
            webPreferences: {
                nodeIntegration: true,
                preload: path.join(__dirname, 'MaiPreload.js')
            }
        })
        _codeWindow.on('closed', () => {
            _codeWindow = null
        })
        _codeWindow.loadURL(codeURL)
    }
}

const defBrowserOpenUrl = (url: string, params?: any) => {
    let openUrl = url
    if (params) {
        Object.keys(params).forEach((key, index) => {
            openUrl += (index == 0 ? "?" : "&")
            openUrl += `${key}=${params[key] ? params[key] : ""}`
        });
    }
    const startCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    const {exec} = require('child_process');
    exec(`${startCommand} ${openUrl}`);
}

app.whenReady().then(() => {
    initMaiNative()
    initMaiNativeDevelop()
    initMaiShortcut()
    registryMaiBridge()
    setTimeout(() => {
        createSplashWindow()
    }, 1000)

})

app.on("window-all-closed", () => {
    if (process.platform === "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createSplashWindow()
    }
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    if (_mainNativeLoginContainer) {
        _mainNativeLoginContainer.handleDestroyContainer()
        _mainNativeLoginContainer = null
    }
    if (_mainNativeContainer) {
        _mainNativeContainer.handleDestroyContainer()
        _mainNativeContainer = null
    }
});

function initMaiNative() {

    (global as any).maiNativeApp = app;
    (global as any).maiNativeIpcMain = ipcMain;
    (global as any).maiNativeDialog = dialog;

    const _configFile = join(__dirname, "config.json")
    let status = false
    if (fs.existsSync(_configFile)) {
        const _configContent = fs.readFileSync(_configFile, 'utf8');
        if (_configContent) {
            const _configData = JSON.parse(_configContent)
            if (_configData) {
                Object.keys(_configData).forEach(key => {
                    (global as any)[key] = _configData[key];
                });
                status = true
            }
        }
    }

    if (!status) {
        dialog.showMessageBox({
            type: 'info',
            title: 'MortiseAI',
            message: 'MortiseAI Startup Error...',
            buttons: ['Close']
        }).then(() => {
            app.quit()
        });
    }

}

function initMaiNativeDevelop() {
    const _configFile = join(__dirname, "devconfig.json")
    if (fs.existsSync(_configFile)) {
        const _configContent = fs.readFileSync(_configFile, 'utf8');
        if (_configContent) {
            const _configData = JSON.parse(_configContent)
            if (_configData) {
                Object.keys(_configData).forEach(key => {
                    (global as any)[key] = _configData[key];
                });
            }
        }
    }
}

function initMaiShortcut() {
    if ((global as any).MaiDebug) {
        globalShortcut.register('CommandOrControl+M', () => {
            BrowserWindow.getFocusedWindow()?.webContents.openDevTools();
        });
    }
    globalShortcut.register('CommandOrControl+B', () => {
        BrowserWindow.getFocusedWindow()?.webContents.goBack()
    });
    globalShortcut.register('CommandOrControl+L', () => {
        createAgentWindow()
    });
    globalShortcut.register('CommandOrControl+K', () => {
        createKnowledgeWindow()
    });
}

function registryMaiBridge() {
    ipcMain.on("mai_change_page", handleMaiChangePage)
    ipcMain.on('mai_mcube_export_path_select', (event, folderPath) => {
        if (folderPath === 'initialPath') {
            folderPath = os.platform() === 'win32' ? process.cwd().split(path.sep)[0] + '\\' : '/';
        }
        const contents = readDirectory(folderPath);
        event.sender.send('mai_mcube_export_path_call_back', {
            "contents": contents,
            "path": folderPath,
        });
    });
}

function readDirectory(dirPath) {
    try {
        const dirents = fs.readdirSync(dirPath, {withFileTypes: true});
        return dirents.map(dirent => ({
            name: dirent.name,
            path: path.join(dirPath, dirent.name),
            isDirectory: dirent.isDirectory(),
        }));
    } catch (err) {
        return [];
    }
}

function handleMaiChangePage(event: any, data: any) {
    if (data.page) {
        switch (data.page) {
            case "login_page":
                createLoginWindow()
                break
            case "main_page":
                createMainWindow()
                break
            case "agent_page":
                createAgentWindow(data.params)
                break
            case "knowledge_page":
                createKnowledgeWindow(data.params)
                break
            case "code_page":
                createCodeWindow(data.params)
                break
            default:
                defBrowserOpenUrl(data.page, data.params)
                break
        }
    }
}

function startMaiNativeLoginContainer() {

    if (_mainNativeContainer) {
        _mainNativeContainer.handleDestroyContainer()
        _mainNativeContainer = null
    }

    if (!_mainNativeLoginContainer) {
        _mainNativeLoginContainer = new MlcContainer("mai_native_login_dsl", (global as any).MaiDebug)
        _mainNativeLoginContainer.handlerCreateContainer({
            onActionEvent(event: MlcActionEvent): void {
                switch (event.getSender()) {
                    case "MaiNativeAccountLogic":
                        handleMaiAccountLogic(event)
                        break
                    default:
                        break
                }
            },
            onErrorEvent(event: MlcErrorEvent): void {
            },
            onLifecycleEvent(event: MlcLifecycleEvent): void {
            },
            onStateEvent(event: MlcStateEvent): void {
            }
        })
    }
}


function startMaiNativeContainer() {
    if (_mainNativeLoginContainer) {
        _mainNativeLoginContainer.handleDestroyContainer()
        _mainNativeLoginContainer = null
    }
    if (!_mainNativeContainer) {
        _mainNativeContainer = new MlcContainer("mai_native_dsl", (global as any).MaiDebug)
        _mainNativeContainer.handlerCreateContainer({
            onActionEvent(event: MlcActionEvent): void {
                switch (event.getSender()) {
                    case "MaiNativeAccountLogic":
                        handleMaiAccountLogic(event)
                        break
                    case "MaiNativeSettingsLogic":
                        handleMaiSettingsLogic(event)
                        break
                    case "MaiNativeMCubeLogic":
                        handleMaiMCubeLogic(event)
                        break
                    case "MaiNativeMPromptLogic":
                        handleMaiMPromptLogic(event)
                        break
                    case "MaiNativeMddLogic":
                        handleMaiMddLogic(event)
                        break
                    case "MaiNativeLLMsLogic":
                        handleMaiLLMsLogic(event)
                        break
                    case "MaiNativeKnowledgeLogic":
                        handleMaiNativeKnowledgeLogic(event)
                        break
                    case "MaiNativeEmbeddingLogic":
                        handleMaiNativeEmbeddingLogic(event)
                        break
                    case "MaiNativeMCodeLogic":
                        handleMaiNativeMCodeLogic(event)
                        break
                    case "MaiNativeAgentLogic":
                        handleMaiNativeAgentLogic(event)
                        break
                    default:
                        break
                }
            },
            onErrorEvent(event: MlcErrorEvent): void {
            },
            onLifecycleEvent(event: MlcLifecycleEvent): void {
            },
            onStateEvent(event: MlcStateEvent): void {
            }
        })
    }
}

function handleMaiAccountLogic(event: MlcActionEvent) {
    _splashWindow?.webContents.send(
        MaiNativeAccountLogicConstant.MAI_ACCOUNT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _loginWindow?.webContents.send(
        MaiNativeAccountLogicConstant.MAI_ACCOUNT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _mainWindow?.webContents.send(
        MaiNativeAccountLogicConstant.MAI_ACCOUNT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _agentWindow?.webContents.send(
        MaiNativeAccountLogicConstant.MAI_ACCOUNT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _knowledgeWindow?.webContents.send(
        MaiNativeAccountLogicConstant.MAI_ACCOUNT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}


function handleMaiSettingsLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeSettingsLogicConstant.MAI_SETTINGS_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiMCubeLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeMCubeLogicConstant.MAI_MCUBE_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiMPromptLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeMPromptLogicConstant.MAI_MPROMPT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiMddLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeMddLogicConstant.MAI_MDD_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiLLMsLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeLLMsLogicConstant.MAI_LLMS_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _codeWindow?.webContents.send(
        MaiNativeLLMsLogicConstant.MAI_LLMS_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}


function handleMaiNativeAgentLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeAgentLogicConstant.MAI_MAGENT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _agentWindow?.webContents.send(
        MaiNativeAgentLogicConstant.MAI_MAGENT_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiNativeKnowledgeLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeKnowledgeLogicConstant.MAI_MKNOWLEDGE_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _knowledgeWindow?.webContents.send(
        MaiNativeKnowledgeLogicConstant.MAI_MKNOWLEDGE_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiNativeEmbeddingLogic(event: MlcActionEvent) {
    _knowledgeWindow?.webContents.send(
        MaiNativeEmbeddingLogicConstant.MAI_MEMBEDDING_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _agentWindow?.webContents.send(
        MaiNativeEmbeddingLogicConstant.MAI_MEMBEDDING_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

function handleMaiNativeMCodeLogic(event: MlcActionEvent) {
    _mainWindow?.webContents.send(
        MaiNativeMCodeLogicConstant.MAI_MCODE_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
    _codeWindow?.webContents.send(
        MaiNativeMCodeLogicConstant.MAI_MCODE_CALL_BACK,
        {
            message: event.getMessage(),
            data: {...event.getModel()}
        })
}

