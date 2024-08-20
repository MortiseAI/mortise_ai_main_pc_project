import {IMlcEnv} from "@mai-alpha/mai-mlc-core-tsc";
import {mai_native_dsl} from "../../project/mai-native/dsl/mai_native_dsl";
import {MaiNativeWorkflow} from "../../project/mai-native/workflow/MaiNativeWorkflow";
import {MaiNativeLLMsWorkflow} from "../../project/mai-native/workflow/MaiNativeLLMsWorkflow";
import {MaiNativeAgentWorkflow} from "../../project/mai-native/workflow/MaiNativeAgentWorkflow";
import {MaiNativeEmbeddingWorkflow} from "../../project/mai-native/workflow/MaiNativeEmbeddingWorkflow";
import {MaiNativeAgentCodeWorkflow} from "../../project/mai-native/workflow/MaiNativeAgentCodeWorkflow";
import {MaiNativeKnowledgeWorkflow} from "../../project/mai-native/workflow/MaiNativeKnowledgeWorkflow";
import {
    MaiNativeAccountLogic, MaiNativeAccountLogicActionKeys, MaiNativeAccountLogicStateKeys,
    MaiNativeUserLogic, MaiNativeUserLogicActionKeys, MaiNativeUserLogicStateKeys,
    MaiNativeAgentLogic, MaiNativeAgentLogicActionKeys, MaiNativeAgentLogicStateKeys,
    MaiNativeEmbeddingLogic, MaiNativeEmbeddingLogicActionKeys, MaiNativeEmbeddingLogicStateKeys,
    MaiNativeKnowledgeLogic, MaiNativeKnowledgeLogicActionKeys, MaiNativeKnowledgeLogicStateKeys,
    MaiNativeLLMsLogic, MaiNativeLLMsLogicActionKeys, MaiNativeLLMsLogicStateKeys,
    MaiNativeMCodeLogic, MaiNativeMCodeLogicActionKeys, MaiNativeMCodeLogicStateKeys,
    MaiNativeMCubeLogic, MaiNativeMCubeLogicActionKeys, MaiNativeMCubeLogicStateKeys,
    MaiNativeMddLogic, MaiNativeMddLogicActionKeys, MaiNativeMddLogicStateKeys,
    MaiNativeMPromptLogic, MaiNativeMPromptLogicActionKeys, MaiNativeMPromptLogicStateKeys,
    MaiNativeSettingsLogic, MaiNativeSettingsLogicActionKeys, MaiNativeSettingsLogicStateKeys,
} from "@mai-alpha/mai-native-main";
import {
    MaiLLMsOpenAILogic, MaiLLMsOpenAILogicActionKeys, MaiLLMsOpenAILogicStateKeys,
    MaiLLMsQianFanLogic, MaiLLMsQianFanLogicActionKeys, MaiLLMsQianFanLogicStateKeys
} from "@mai-alpha/mai-native-llms";
import {
    MaiMCubeKnowledgeActionKeys, MaiMCubeKnowledgeStateKeys, MaiMCubKnowledgeLogic
} from "@mai-alpha/mai-native-knowledge";
import {
    MaiEmbeddingOpenAILogic, MaiEmbeddingOpenAILogicActionKeys, MaiEmbeddingOpenAILogicStateKeys,
    MaiEmbeddingQianFanLogic, MaiEmbeddingQianFanLogicActionKeys, MaiEmbeddingQianFanLogicStateKeys
} from "@mai-alpha/mai-native-embedding";
import {
    MaiCodeMCubeViewTsReactActionKeys, MaiCodeMCubeViewTsReactLogic, MaiCodeMCubeViewTsReactStateKeys,
    MaiCodeMCubeDslTsActionKeys, MaiCodeMCubeDslTsLogic, MaiCodeMCubeDslTsStateKeys,
    MaiCodeMCubeLogicTsActionKeys, MaiCodeMCubeLogicTsLogic, MaiCodeMCubeLogicTsStateKeys,
    MaiCodeMCubeWorkflowTsActionKeys, MaiCodeMCubeWorkflowTsLogic, MaiCodeMCubeWorkflowTsStateKeys
} from "@mai-alpha/mai-native-code";
import {
    MaiMCubeViewAgentActionKeys, MaiMCubeViewAgentLogic, MaiMCubeViewAgentStateKeys,
    MaiMCubeDslAgentActionKeys, MaiMCubeDslAgentLogic, MaiMCubeDslAgentStateKeys,
    MaiMCubeLogicAgentActionKeys, MaiMCubeLogicAgentLogic, MaiMCubeLogicAgentStateKeys,
    MaiMCubeWorkflowAgentActionKeys, MaiMCubeWorkflowAgentStateKeys, MaiMCubWorkflowAgentLogic
} from "@mai-alpha/mai-native-agent";
import {mai_native_login_dsl} from "../../project/mai-native-login/dsl/mai_native_login_dsl";
import {MaiNativeLoginWorkflow} from "../../project/mai-native-login/workflow/MaiNativeLoginWorkflow";

export class MlcEvn implements IMlcEnv {

    private _dsl: any = {
        mai_native_dsl: mai_native_dsl,
        mai_native_login_dsl: mai_native_login_dsl,
    }

    private _mortiseLogic: any = {
        /** mai-native **/
        MaiNativeAccountLogic,
        MaiNativeUserLogic,
        MaiNativeSettingsLogic,
        MaiNativeMCodeLogic,
        MaiNativeKnowledgeLogic,
        MaiNativeEmbeddingLogic,
        MaiNativeAgentLogic,
        MaiNativeLLMsLogic,
        MaiNativeMCubeLogic,
        MaiNativeMddLogic,
        MaiNativeMPromptLogic,
        /** mai-llms **/
        MaiLLMsOpenAILogic,
        MaiLLMsQianFanLogic,
        /** mai-agent **/
        MaiMCubeViewAgentLogic,
        MaiMCubeDslAgentLogic,
        MaiMCubeLogicAgentLogic,
        MaiMCubWorkflowAgentLogic,
        /** mai-knowledge **/
        MaiMCubKnowledgeLogic,
        /** mai-knowledge-embedding **/
        MaiEmbeddingOpenAILogic,
        MaiEmbeddingQianFanLogic,
        /** mai-agent-code **/
        MaiCodeMCubeViewTsReactLogic,
        MaiCodeMCubeDslTsLogic,
        MaiCodeMCubeLogicTsLogic,
        MaiCodeMCubeWorkflowTsLogic,
    }

    private _mortiseWorkflow: any = {
        /** mai-native **/
        MaiNativeWorkflow,
        /** mai-llms **/
        MaiNativeLLMsWorkflow,
        /** mai-agent **/
        MaiNativeAgentWorkflow,
        /** mai-knowledge **/
        MaiNativeKnowledgeWorkflow,
        /** mai-knowledge-embedding **/
        MaiNativeEmbeddingWorkflow,
        /** mai-agent-code **/
        MaiNativeAgentCodeWorkflow,
        /** mai-native-login **/
        MaiNativeLoginWorkflow
    }

    private _actionKeys: any = {
        /** mai-native **/
        MaiNativeAccountLogicActionKeys,
        MaiNativeUserLogicActionKeys,
        MaiNativeMCodeLogicActionKeys,
        MaiNativeKnowledgeLogicActionKeys,
        MaiNativeEmbeddingLogicActionKeys,
        MaiNativeAgentLogicActionKeys,
        MaiNativeLLMsLogicActionKeys,
        MaiNativeMCubeLogicActionKeys,
        MaiNativeMddLogicActionKeys,
        MaiNativeMPromptLogicActionKeys,
        MaiNativeSettingsLogicActionKeys,
        /** mai-llms **/
        MaiLLMsOpenAILogicActionKeys,
        MaiLLMsQianFanLogicActionKeys,
        /** mai-agent **/
        MaiMCubeViewAgentActionKeys,
        MaiMCubeDslAgentActionKeys,
        MaiMCubeLogicAgentActionKeys,
        MaiMCubeWorkflowAgentActionKeys,
        /** mai-knowledge **/
        MaiMCubeKnowledgeActionKeys,
        /** mai-knowledge-embedding **/
        MaiEmbeddingOpenAILogicActionKeys,
        MaiEmbeddingQianFanLogicActionKeys,
        /** mai-agent-code **/
        MaiCodeMCubeViewTsReactActionKeys,
        MaiCodeMCubeDslTsActionKeys,
        MaiCodeMCubeLogicTsActionKeys,
        MaiCodeMCubeWorkflowTsActionKeys,
    }

    private _stateKeys: any = {
        /** mai-native **/
        MaiNativeAccountLogicStateKeys,
        MaiNativeUserLogicStateKeys,
        MaiNativeMCodeLogicStateKeys,
        MaiNativeKnowledgeLogicStateKeys,
        MaiNativeEmbeddingLogicStateKeys,
        MaiNativeAgentLogicStateKeys,
        MaiNativeLLMsLogicStateKeys,
        MaiNativeMCubeLogicStateKeys,
        MaiNativeMddLogicStateKeys,
        MaiNativeMPromptLogicStateKeys,
        MaiNativeSettingsLogicStateKeys,
        /** mai-llms **/
        MaiLLMsOpenAILogicStateKeys,
        MaiLLMsQianFanLogicStateKeys,
        /** mai-agent **/
        MaiMCubeViewAgentStateKeys,
        MaiMCubeDslAgentStateKeys,
        MaiMCubeLogicAgentStateKeys,
        MaiMCubeWorkflowAgentStateKeys,
        /** mai-knowledge **/
        MaiMCubeKnowledgeStateKeys,
        /** mai-knowledge-embedding **/
        MaiEmbeddingOpenAILogicStateKeys,
        MaiEmbeddingQianFanLogicStateKeys,
        /** mai-agent-code **/
        MaiCodeMCubeViewTsReactStateKeys,
        MaiCodeMCubeDslTsStateKeys,
        MaiCodeMCubeLogicTsStateKeys,
        MaiCodeMCubeWorkflowTsStateKeys,
    }

    private _sidecar: any = {}

    appId(): string {
        return "";
    }

    dsl(key: string): any {
        return this._dsl[key]
    }

    mortiseView(key: string): any {
    }

    mortiseLogic(key: string): any {
        return this._mortiseLogic[key]
    }

    mortiseWorkflow(key: string): any {
        return this._mortiseWorkflow[key]
    }

    actionKeys(key: string): any {
        return this._actionKeys[key]
    }

    stateKeys(key: string): any {
        return this._stateKeys[key]
    }

    sidecarClass(key: string): any {
        return this._sidecar[key]
    }

}
