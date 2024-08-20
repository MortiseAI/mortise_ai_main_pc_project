import {MlcActionEvent, MlcStateEvent, MlcWorkflow} from "@mai-alpha/mai-mlc-core-tsc";
import {MaiEmbeddingOpenAILogicActionKeys, MaiEmbeddingQianFanLogicActionKeys} from "@mai-alpha/mai-native-embedding";
import {MaiNativeEmbeddingLogicStateKeys, MaiNativeEmbeddingLogicStateModel} from "@mai-alpha/mai-native-main";

export class MaiNativeEmbeddingWorkflow extends MlcWorkflow {

    handleActionEvent(event: MlcActionEvent) {

        switch (event.getSender()) {
            case "MaiEmbeddingOpenAILogic":
                this.handleMaiEmbeddingOpenAILogic(event)
                break
            case "MaiEmbeddingQianFanLogic":
                this.handleMaiEmbeddingQianFanLogic(event)
                break
            default:
                break
        }

    }

    handleMaiEmbeddingOpenAILogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiEmbeddingOpenAILogicActionKeys.MAI_EMBEDDING_REGISTER:
                const model1 = new MaiNativeEmbeddingLogicStateModel()
                model1.embeddingModels = [...event.getModel().embeddingModels]
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeEmbeddingLogic")
                    .setMessage(MaiNativeEmbeddingLogicStateKeys.MAI_EMBEDDING_REGISTER)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiEmbeddingOpenAILogicActionKeys.MAI_EMBEDDING_RESULT:
                const model2 = new MaiNativeEmbeddingLogicStateModel()
                model2.status = event.getModel().status
                model2.embeddingID = event.getModel().embeddingID
                model2.errorMessage = event.getModel().errorMessage
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeEmbeddingLogic")
                    .setMessage(MaiNativeEmbeddingLogicStateKeys.MAI_EMBEDDING_RESULT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

    handleMaiEmbeddingQianFanLogic(event: MlcActionEvent) {
        switch (event.getMessage()) {
            case MaiEmbeddingQianFanLogicActionKeys.MAI_EMBEDDING_REGISTER:
                const model1 = new MaiNativeEmbeddingLogicStateModel()
                model1.embeddingModels = [...event.getModel().embeddingModels]
                const event1 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeEmbeddingLogic")
                    .setMessage(MaiNativeEmbeddingLogicStateKeys.MAI_EMBEDDING_REGISTER)
                    .setModel(model1)
                    .build()
                this.sendStateEventObj(event1)
                break
            case MaiEmbeddingQianFanLogicActionKeys.MAI_EMBEDDING_RESULT:
                const model2 = new MaiNativeEmbeddingLogicStateModel()
                model2.status = event.getModel().status
                model2.embeddingID = event.getModel().embeddingID
                model2.errorMessage = event.getModel().errorMessage
                const event2 = MlcStateEvent.obtain()
                    .setSender(event.getSender())
                    .setReceiver("MaiNativeEmbeddingLogic")
                    .setMessage(MaiNativeEmbeddingLogicStateKeys.MAI_EMBEDDING_RESULT)
                    .setModel(model2)
                    .build()
                this.sendStateEventObj(event2)
                break
            default:
                break
        }
    }

}