import {MlcActionEvent, MlcStateEvent, MlcWorkflow} from "@mai-alpha/mai-mlc-core-tsc";
import {MaiCodeMCubeViewTsReactActionKeys, MaiCodeMCubeDslTsActionKeys, MaiCodeMCubeLogicTsActionKeys, MaiCodeMCubeWorkflowTsActionKeys} from "@mai-alpha/mai-native-code";
import {MaiNativeKnowledgeLogicStateKeys, MaiNativeKnowledgeLogicStateModel, MaiNativeLLMsLogicStateKeys, MaiNativeLLMsLogicStateModel, MaiNativeMCodeLogicStateKeys, MaiNativeMCodeLogicStateModel, MaiNativeMddLogicStateKeys, MaiNativeMddLogicStateModel} from "@mai-alpha/mai-native-main";

export class MaiNativeAgentCodeWorkflow extends MlcWorkflow {

    handleActionEvent(event: MlcActionEvent) {
        switch (event.getSender()) {
            case "MaiCodeMCubeViewTsReactLogic":
                this.hanldeMaiCodeMCubeViewTsReactLogic(event)
                break
            case "MaiCodeMCubeDslTsLogic":
                this.hanldeMaiCodeMCubeDslTsLogic(event)
                break
            case "MaiCodeMCubeLogicTsLogic":
                this.hanldeMaiCodeMCubeLogicTsLogic(event)
                break
            case "MaiCodeMCubeWorkflowTsLogic":
                this.hanldeMaiCodeMCubeWorkflowTsLogic(event)
                break
            default:
                break
        }
    }

    hanldeMaiCodeMCubeViewTsReactLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiCodeMCubeViewTsReactActionKeys.MAI_MCODE_PROGRAMMING_LANGUAGE_REGISTER:
                const model1 = new MaiNativeMCodeLogicStateModel()
                model1.programmingLanguage = {...event.getModel().programmingLanguage}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCodeLogic")
                    .setMessage(MaiNativeMCodeLogicStateKeys.MAI_MCODE_LOGIC_REGISTER_PROGRAMMING_LANGUAGE)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            default:
                break
        }
    }

    hanldeMaiCodeMCubeDslTsLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiCodeMCubeDslTsActionKeys.MAI_MCODE_PROGRAMMING_LANGUAGE_REGISTER:
                const model1 = new MaiNativeMCodeLogicStateModel()
                model1.programmingLanguage = {...event.getModel().programmingLanguage}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCodeLogic")
                    .setMessage(MaiNativeMCodeLogicStateKeys.MAI_MCODE_LOGIC_REGISTER_PROGRAMMING_LANGUAGE)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            default:
                break
        }
    }

    hanldeMaiCodeMCubeLogicTsLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiCodeMCubeLogicTsActionKeys.MAI_MCODE_PROGRAMMING_LANGUAGE_REGISTER:
                const model1 = new MaiNativeMCodeLogicStateModel()
                model1.programmingLanguage = {...event.getModel().programmingLanguage}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCodeLogic")
                    .setMessage(MaiNativeMCodeLogicStateKeys.MAI_MCODE_LOGIC_REGISTER_PROGRAMMING_LANGUAGE)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiCodeMCubeLogicTsActionKeys.MAI_MCODE_GET_MDD_DATA:
                const model2 = new MaiNativeMddLogicStateModel()
                model2.mcubeID = event.getModel().mcubeID
                model2.mcubeVersion = event.getModel().mcubeVersion
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMddLogic")
                    .setMessage(MaiNativeMddLogicStateKeys.MAI_MDD_DATE_GET)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            case MaiCodeMCubeLogicTsActionKeys.MAI_MCODE_GET_MKNOWLEDGE_DATA:
                const model3 = new MaiNativeKnowledgeLogicStateModel()
                model3.knowledgeKey = event.getModel().knowledgeKey
                model3.knowledgeContentID = event.getModel().knowledgeContentID
                model3.knowledgeType = event.getModel().knowledgeType
                model3.knowledgeID = event.getModel().knowledgeID
                model3.knowledgeVersion = event.getModel().knowledgeVersion
                model3.knowledgeRegion = event.getModel().knowledgeRegion
                const event3 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeKnowledgeLogic")
                    .setMessage(MaiNativeKnowledgeLogicStateKeys.MAI_MKNOWLEDGE_CONTENT_ITEM_GET)
                    .setModel(model3)
                    .build()
                this.sendStateEventObj(event3)
                break
            case MaiCodeMCubeLogicTsActionKeys.MAI_MCODE_LLMS_GENERATE:
                const model4 = new MaiNativeLLMsLogicStateModel()
                model4.mcodeKey = event.getModel().mcodeKey
                model4.mcodeLLMsModel = event.getModel().mcodeLLMsModel
                model4.mcodeContent = event.getModel().mcodeContent
                const event4 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_MCODE_GENERATE)
                    .setModel(model4)
                    .build()
                this.sendStateEventObj(event4)
                break
            case MaiCodeMCubeLogicTsActionKeys.MAI_MCODE_GENERATE_RESULT:
                const model5 = new MaiNativeMCodeLogicStateModel()
                model5.status = event.getModel().status
                if (event.getModel().status) {
                    model5.generateResult = {...event.getModel().generateResult}
                } else {
                    model5.errorMessage = {...event.getModel().errorMessage}
                }
                const event5 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCodeLogic")
                    .setMessage(MaiNativeMCodeLogicStateKeys.MAI_MCODE_GENERATE_RESULT)
                    .setModel(model5)
                    .build()
                this.sendStateEventObj(event5)
                break
            default:
                break
        }
    }

    hanldeMaiCodeMCubeWorkflowTsLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiCodeMCubeWorkflowTsActionKeys.MAI_MCODE_PROGRAMMING_LANGUAGE_REGISTER:
                const model1 = new MaiNativeMCodeLogicStateModel()
                model1.programmingLanguage = {...event.getModel().programmingLanguage}
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMCodeLogic")
                    .setMessage(MaiNativeMCodeLogicStateKeys.MAI_MCODE_LOGIC_REGISTER_PROGRAMMING_LANGUAGE)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            default:
                break
        }
    }


}
