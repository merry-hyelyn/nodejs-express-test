import { fal } from "@fal-ai/client";
import dotenv from "dotenv"

dotenv.config()

fal.config({
  credentials: process.env.FAL_KEY
});


export const falWebhook = (req, res) => {
    console.log("fal webhook")
    res.send({"hello": "world"})
}

export const generateImageWithFal = async (req, res) => {
    console.log("generate image", req, res)
    const prompt = req.body.prompt

    const { request_id } = await fal.queue.submit("fal-ai/flux/schnell", {
        input: {
            prompt: prompt
        },
        webhookUrl: "https://24bbe43d5975.ngrok-free.app/api/fal/webhook",
    });
    const data = {
      "request_id": request_id
    }
    res.send(data)
}

export const getGenerateImageStatus = async (req, res) => {
    console.log("get generate image status")
    const request_id = req.body.request_id
    const status = await fal.queue.status("fal-ai/flux/schnell",  {
        requestId: request_id,
        logs: true,
    });
    console.log(status)
}

export const getGenerateResult = async (req, res) => {
  console.log("get generate result")
  const request_id = req.body.request_id
  const result = await fal.queue.result("fal-ai/flux/schnell",  {
    requestId: request_id
  })
  console.log(result.data);
  console.log(result.requestId);
  const data = {
    "result": result.data
  }
  res.send(data)
}


export const generateImageSync = async (req, res) => {
  
  const prompt = req.body.prompt
  console.log("prompt", prompt)
    const result = await fal.subscribe("fal-ai/flux/schnell",  {
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
  const data = {
    "result": result.data
  }
  res.send(data)
  console.log(result.data);
  console.log(result.requestId);
}