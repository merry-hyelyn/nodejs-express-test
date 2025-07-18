import { tool } from "@langchain/core/tools";
import { fal } from "@fal-ai/client";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createReactAgent } from "langchain/agents"
import { pull } from "langchain/hub"
import { createReactAgent } from "@langchain/langgraph/prebuilt"
import { z } from "zod"

const callFalAI = async (prompt) => {
    console.log("CallFalAI")
    const result = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
            prompt: prompt
        },
        logs: true,
        onQueueUpdate: (update) => {
            if (update.status === "IN_PROGRESS") {
                update.logs.map((log) => log.message).forEach(console.log);
            }
        }
    })
    return result.data
}

const falTool = new DynamicTool({
    name: "ImageGenerator",
    description: "이미지 생성용 도구입니다. prompt 를 입력하면 이미지를 생성합니다.",
    func: async (input) => {
        return await callFalAI(input);
    }
})

const callLLMAPI = async (prompt) =>{
    console.log("in call llm api")
    const result = await fal.subscribe("fal-ai/any-llm/enterprise", {
    input: {
        prompt: prompt
    },
    logs: true,
    onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
        }
        },
    });
    return result.data
}

const LLMTool = new  DynamicTool({
    name: "LLM",
    description: "LLM 입니다.",
    func: async (input) => {
        return await callLLMAPI(input)
    }
})

const llm = new ChatOpenAI({ temperature: 0})
const tools = [LLMTool, falTool]
const prompt = await pull("hwchase17/react"); 

const agent = await createReactAgent({
    llm, tools, prompt
})

const agentExecutor = new AgentExecutor({
  agent,
  tools,
  returnIntermediateSteps: true,
  verbose: true,
});



export const runAIAgent = (req, res) => {
    const prompt = req.body.prompt
    const result = agentExecutor.invoke({input: prompt})
    
    console.log(result)
    res.send(result)
}