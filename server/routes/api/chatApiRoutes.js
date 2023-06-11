const router = require("express").Router();
const { Configuration } = require("openai");

router.get("/chat", async (req, res) => {
  if (!Configuration.apiKey) {
    res.status(500).send("OPENAI_API_KEY not set.");
    console.log("Please set your OPENAI_API_KEY environment variable.");
  }

  try {
    const { messages } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: `${messages}` }],
    });
    res.status(200).json({
      completion: completion.data.choices[0].message,
      response: completion.data,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
});

module.exports = router;
