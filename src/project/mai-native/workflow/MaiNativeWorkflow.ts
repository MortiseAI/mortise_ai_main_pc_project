import {MlcActionEvent, MlcStateEvent, MlcWorkflow} from "@mai-alpha/mai-mlc-core-tsc";
import {MaiLLMsOpenAILogicStateKeys, MaiLLMsOpenAILogicStateModel, MaiLLMsQianFanLogicStateKeys, MaiLLMsQianFanLogicStateModel} from "@mai-alpha/mai-native-llms";
import {
    MaiNativeAccountLogicActionKeys,
    MaiNativeAgentLogicActionKeys, MaiNativeAgentLogicStateKeys,
    MaiNativeEmbeddingLogicActionKeys,
    MaiNativeKnowledgeLogicActionKeys, MaiNativeKnowledgeLogicStateKeys,
    MaiNativeLLMsLogicStateKeys, MaiNativeLLMsLogicStateModel,
    MaiNativeMCodeLogicActionKeys,
    MaiNativeMCubeLogicActionKeys, MaiNativeMCubeLogicStateKeys,
    MaiNativeMddLogicActionKeys,
    MaiNativeMPromptLogicActionKeys,
    MaiNativeSettingsLogicActionKeys,
    MaiNativeUserLogicStateKeys, MaiNativeUserLogicStateModel,
    MaiNativeAccountLogicStateKeys, MaiNativeAccountLogicStateModel, MaiNativeUserLogicActionKeys
} from "@mai-alpha/mai-native-main";

export class MaiNativeWorkflow extends MlcWorkflow {

    handleActionEvent(event: MlcActionEvent) {
        switch (event.getSender()) {
            case "MaiNativeAccountLogic":
                this.handleMaiNativeAccountLogic(event)
                break
            case "MaiNativeUserLogic":
                this.handleMaiNativeUserLogic(event)
                break
            case "MaiNativeSettingsLogic":
                this.hanldeMaiNativeSettingsLogic(event)
                break
            case "MaiNativeAgentLogic":
                this.hanldeMaiNativeAgentLogic(event)
                break
            case "MaiNativeKnowledgeLogic":
                this.hanldeMaiNativeKnowledgeLogic(event)
                break
            case "MaiNativeEmbeddingLogic":
                this.handleMaiNativeEmbeddingLogic(event)
                break
            case "MaiNativeMddLogic":
                this.handleMaiNativeMddLogic(event)
                return
            case "MaiNativeMPromptLogic":
                this.handleMaiNativeMPromptLogic(event)
                return
            case "MaiNativeMCubeLogic":
                this.handleMaiNativeMCubeLogic(event)
                break
            case "MaiNativeMCodeLogic":
                this.handleMaiNativeMCodeLogic(event)
                break
            default:
                super.handleActionEvent(event);
                break
        }
    }

    handleMaiNativeAccountLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeAccountLogicActionKeys.MAI_ACCOUNT_LOGIN:
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCubeLogic")
                    .setMessage(MaiNativeMCubeLogicStateKeys.MAI_MCUBE_ALL_GET)
                    .build()
                this.sendStateEventObj(event1)
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeAgentLogic")
                    .setMessage(MaiNativeAgentLogicStateKeys.MAI_MAGENT_INIT)
                    .build()
                this.sendStateEventObj(event2)
                const event3 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeKnowledgeLogic")
                    .setMessage(MaiNativeKnowledgeLogicStateKeys.MAI_MKNOWLEDGE_INIT)
                    .build()
                this.sendStateEventObj(event3)
                break
            case MaiNativeAccountLogicActionKeys.MAI_ACCOUNT_LOGOUT:
                const event4 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_ACCOUNT_LOGOUT)
                    .build()
                this.sendStateEventObj(event4)
                break
            case MaiNativeAccountLogicActionKeys.MAI_ACCOUNT_UPDATE_USER:
                const model5 = new MaiNativeUserLogicStateModel()
                model5.userData = {...event.getModel().accountData}
                const event5 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeUserLogic")
                    .setMessage(MaiNativeUserLogicStateKeys.MAI_USER_UPDATE)
                    .setModel(model5)
                    .build()
                this.sendStateEventObj(event5)
                break
            default:
                break
        }
    }

    handleMaiNativeUserLogic(event: MlcActionEvent){
        switch (event.getMessage()) {
            case MaiNativeUserLogicActionKeys.MAI_USER_UPDATE:
                const model1 = new MaiNativeAccountLogicStateModel()
                model1.status = event.getModel().status
                if(model1.status){
                    model1.accountData = {...event.getModel().userData}
                }
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeAccountLogic")
                    .setMessage(MaiNativeAccountLogicStateKeys.MAI_ACCOUNT_UPDATE_USER_RESULT)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
            default:
                break
        }
    }

    hanldeMaiNativeSettingsLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeSettingsLogicActionKeys.MAI_SETTINGS_LLMS_SET:
                if (event.getModel().status) {
                    const llmsSettings = event.getModel().llmsSettings
                    switch (llmsSettings.key) {
                        case "OpenAI":
                            const model1 = new MaiLLMsOpenAILogicStateModel()
                            model1.settingsData = {...llmsSettings}
                            const event1 = MlcStateEvent.obtain()
                                .setSender(event.getSender())
                                .setReceiver("MaiLLMsOpenAILogic")
                                .setMessage(MaiLLMsOpenAILogicStateKeys.MAI_LLMS_OPEN_AI_SETTINGS)
                                .setModel(model1)
                                .build()
                            this.sendStateEventObj(event1)
                            break
                        case "QianFan":
                            const model2 = new MaiLLMsQianFanLogicStateModel()
                            model2.settingsData = {...llmsSettings}
                            const event2 = MlcStateEvent.obtain()
                                .setSender(event.getSender())
                                .setReceiver("MaiLLMsQianFanLogic")
                                .setMessage(MaiLLMsQianFanLogicStateKeys.MAI_LLMS_QIAN_FAN_SETTINGS)
                                .setModel(model2)
                                .build()
                            this.sendStateEventObj(event2)
                            break
                        default:
                            break
                    }
                }
                break
            default:
                break
        }
    }

    hanldeMaiNativeAgentLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeAgentLogicActionKeys.MAI_MAGENT_INIT:
                const magent_list = ["MaiMCubeViewAgentLogic", "MaiMCubeDslAgentLogic", "MaiMCubeLogicAgentLogic", "MaiMCubWorkflowAgentLogic"]
                magent_list.forEach(magent => {
                    const event1 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(magent)
                        .setMessage(MaiNativeAgentLogicActionKeys.MAI_MAGENT_INIT)
                        .build()
                    this.sendStateEventObj(event1)
                })
                break
            default:
                break
        }
    }

    hanldeMaiNativeKnowledgeLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeKnowledgeLogicActionKeys.MAI_MKNOWLEDGE_INIT:
                const mknowledge_list = ["MaiMCubKnowledgeLogic"]
                mknowledge_list.forEach(mknowledge => {
                    const event1 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(mknowledge)
                        .setMessage(MaiNativeKnowledgeLogicActionKeys.MAI_MKNOWLEDGE_INIT)
                        .build()
                    this.sendStateEventObj(event1)
                })
                break
            case MaiNativeKnowledgeLogicActionKeys.MAI_MKNOWLEDGE_CONTENT_ITEM_GET_NATIVE:
                const model2: any = {...event.getModel()}
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver(event.getReceiver())
                    .setMessage(event.getMessage())
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }


    handleMaiNativeEmbeddingLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeEmbeddingLogicActionKeys.MAI_EMBEDDING_CONTENT_DATA:
                const model1: any = {...event.getModel()}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver(event.getReceiver())
                    .setMessage(event.getMessage())
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiNativeEmbeddingLogicActionKeys.MAI_EMBEDDING_SINGLE_CONTENT_DATA:
                const model2: any = {...event.getModel()}
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver(event.getReceiver())
                    .setMessage(event.getMessage())
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

    handleMaiNativeMddLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeMddLogicActionKeys.MAI_MDD_GET_RESULT:
                if (event.getReceiver() == "MaiNativeLLMsLogic") {
                    const model1 = new MaiNativeLLMsLogicStateModel()
                    model1.mddData = event.getModel().mddData
                    model1.taskMddData = event.getModel().taskMddData
                    model1.messageID = event.getModel().messageID
                    model1.taskID = event.getModel().taskID
                    const event1 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(event.getReceiver())
                        .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_MDD_GET_RESULT)
                        .setModel(model1)
                        .build()
                    this.sendStateEventObj(event1)
                } else {
                    const model2: any = {...event.getModel()}
                    const event2 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(event.getReceiver())
                        .setMessage(event.getMessage())
                        .setModel(model2)
                        .build()
                    this.sendStateEventObj(event2)
                }
                break
            default:
                break
        }
    }

    handleMaiNativeMPromptLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeMPromptLogicActionKeys.MAI_MPROMPT_GET_DEF_PROMPT:
                let _receiver = ""
                switch (event.getModel().mcubeType) {
                    case "Component":
                        _receiver = "MaiMCubeViewAgentLogic"
                        break
                    case "DSL":
                        _receiver = "MaiMCubeDslAgentLogic"
                        break
                    case "Logic":
                        _receiver = "MaiMCubeLogicAgentLogic"
                        break
                    case "Workflow":
                        _receiver = "MaiMCubWorkflowAgentLogic"
                        break
                    default:
                        break
                }
                if (_receiver.length != 0) {
                    const model1: any = {}
                    model1.mcubeID = event.getModel().mcubeID
                    model1.mcubeType = event.getModel().mcubeType
                    model1.mcubeVersion = event.getModel().mcubeVersion
                    model1.projectID = event.getModel().projectID
                    const event1 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(_receiver)
                        .setMessage(MaiNativeMPromptLogicActionKeys.MAI_MPROMPT_GET_DEF_PROMPT)
                        .setModel(model1)
                        .build()
                    this.sendStateEventObj(event1)
                }
                break
            default:
                break
        }
    }

    handleMaiNativeMCubeLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeMCubeLogicActionKeys.MAI_MCUBE_GET_RESULT:
                if (event.getModel().status && event.getModel().mcube) {
                    const model1 = {
                        mcube: {...event.getModel().mcube}
                    }
                    const event1 = MlcStateEvent.obtain()
                        .setSender(event.getSender())
                        .setReceiver(event.getReceiver())
                        .setMessage(event.getMessage())
                        .setModel(model1)
                        .build()
                    this.sendStateEventObj(event1)
                }
                break
            default:
                break
        }
    }

    handleMaiNativeMCodeLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiNativeMCodeLogicActionKeys.MAI_MCODE_GENERATE_START:
                const model1: any = {...event.getModel()}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver(event.getReceiver())
                    .setMessage(event.getMessage())
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiNativeMCodeLogicActionKeys.MAI_MCODE_GENERATE_STOP:
                const model2: any = {...event.getModel()}
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver(event.getReceiver())
                    .setMessage(event.getMessage())
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }


}
