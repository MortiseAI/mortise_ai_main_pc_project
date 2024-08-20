import {MlcActionEvent, MlcStateEvent, MlcWorkflow} from "@mai-alpha/mai-mlc-core-tsc";
import {MaiMCubeViewAgentActionKeys, MaiMCubeDslAgentActionKeys, MaiMCubeLogicAgentActionKeys, MaiMCubeWorkflowAgentActionKeys} from "@mai-alpha/mai-native-agent";
import {MaiNativeLLMsLogicStateKeys, MaiNativeLLMsLogicStateModel, MaiNativeMPromptLogicStateKeys, MaiNativeMPromptLogicStateModel} from "@mai-alpha/mai-native-main";

export class MaiNativeAgentWorkflow extends MlcWorkflow {

    handleActionEvent(event: MlcActionEvent) {
        switch (event.getSender()) {
            case "MaiMCubeViewAgentLogic":
                this.hanldeMaiMCubeViewAgentLogic(event)
                break
            case "MaiMCubeDslAgentLogic":
                this.hanldeMaiMCubeDslAgentLogic(event)
                break
            case "MaiMCubeLogicAgentLogic":
                this.hanldeMaiMCubeLogicAgentLogic(event)
                break
            case "MaiMCubWorkflowAgentLogic":
                this.hanldeMaiMCubeWorkflowAgentLogic(event)
                break
            default:
                break
        }
    }

    hanldeMaiMCubeViewAgentLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiMCubeViewAgentActionKeys.MAI_MAGENT_REGISTER_API:
                const model1 = new MaiNativeLLMsLogicStateModel()
                model1.agentApi = event.getModel().agentApi
                model1.agentFuncCalling = event.getModel().agentFuncCalling
                model1.agentFunc = event.getModel().agentFunc
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_REGISTER_API)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiMCubeViewAgentActionKeys.MAI_MPROMPT_GET_DEF_PROMPT:
                const model2 = new MaiNativeMPromptLogicStateModel()
                model2.mcubeID = event.getModel().mcubeID
                model2.mcubeVersion = event.getModel().mcubeVersion
                model2.mpromptList = [...event.getModel().mpromptList]
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMPromptLogic")
                    .setMessage(MaiNativeMPromptLogicStateKeys.MAI_MPROMPT_GET_DEF_PROMPT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

    hanldeMaiMCubeDslAgentLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiMCubeDslAgentActionKeys.MAI_MAGENT_REGISTER_API:
                const model1 = new MaiNativeLLMsLogicStateModel()
                model1.agentApi = event.getModel().agentApi
                model1.agentFuncCalling = event.getModel().agentFuncCalling
                model1.agentFunc = event.getModel().agentFunc
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_REGISTER_API)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiMCubeDslAgentActionKeys.MAI_MPROMPT_GET_DEF_PROMPT:
                const model2 = new MaiNativeMPromptLogicStateModel()
                model2.mcubeID = event.getModel().mcubeID
                model2.mcubeVersion = event.getModel().mcubeVersion
                model2.mpromptList = [...event.getModel().mpromptList]
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMPromptLogic")
                    .setMessage(MaiNativeMPromptLogicStateKeys.MAI_MPROMPT_GET_DEF_PROMPT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

    hanldeMaiMCubeLogicAgentLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiMCubeLogicAgentActionKeys.MAI_MAGENT_REGISTER_API:
                const model1 = new MaiNativeLLMsLogicStateModel()
                model1.agentApi = event.getModel().agentApi
                model1.agentFuncCalling = event.getModel().agentFuncCalling
                model1.agentFunc = event.getModel().agentFunc
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_REGISTER_API)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiMCubeLogicAgentActionKeys.MAI_MPROMPT_GET_DEF_PROMPT:
                const model2 = new MaiNativeMPromptLogicStateModel()
                model2.mcubeID = event.getModel().mcubeID
                model2.mcubeVersion = event.getModel().mcubeVersion
                model2.mpromptList = [...event.getModel().mpromptList]
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMPromptLogic")
                    .setMessage(MaiNativeMPromptLogicStateKeys.MAI_MPROMPT_GET_DEF_PROMPT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

    hanldeMaiMCubeWorkflowAgentLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiMCubeWorkflowAgentActionKeys.MAI_MAGENT_REGISTER_API:
                const model1 = new MaiNativeLLMsLogicStateModel()
                model1.agentApi = event.getModel().agentApi
                model1.agentFuncCalling = event.getModel().agentFuncCalling
                model1.agentFunc = event.getModel().agentFunc
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeLLMsLogic")
                    .setMessage(MaiNativeLLMsLogicStateKeys.MAI_LLMS_LOGIC_REGISTER_API)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiMCubeWorkflowAgentActionKeys.MAI_MPROMPT_GET_DEF_PROMPT:
                const model2 = new MaiNativeMPromptLogicStateModel()
                model2.mcubeID = event.getModel().mcubeID
                model2.mcubeVersion = event.getModel().mcubeVersion
                model2.mpromptList = [...event.getModel().mpromptList]
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeMPromptLogic")
                    .setMessage(MaiNativeMPromptLogicStateKeys.MAI_MPROMPT_GET_DEF_PROMPT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

}
