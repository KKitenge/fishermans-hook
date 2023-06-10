const express = require("express");
const path = require("path");
const OpenAI = require("openai");
const db = require("./config/connections.js");
const {Configuration, OpenAIApi} = OpenAI
require("dotenv").config();
// const routes = require("./routes");


const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);

const configuration = new Configuration({
  organization: "org-YLNfaOCVsvPpQKVV3HN6Q391", 
  apiKey: process.env.OPENAI_API_KEY,


  });
  console.log("configuration", configuration);
  const openai = new OpenAIApi(configuration);
  
  
  app.get("/", async (req, res) => {

    if(!configuration.apiKey) {
      res.status(500).send("OPENAI_API_KEY not set.")
        console.log("Please set your OPENAI_API_KEY environment variable.")
    }


    try{ 
       const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: "assistant", content: "is it likely to rain in Arlington Texas today"}]
  });

  res.status(200).json({
    completion: completion.data.choices[0].message,
    response: completion.data
  });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });





