import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";



const configuration = new Configuration({
    organization: "org-YLNfaOCVsvPpQKVV3HN6Q391",
    apiKey:"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" ,
  });

  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello world"},]
  })

console.log(completion.data.choices[0].message);



