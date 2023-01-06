const RiveScript = require("rivescript");
const readline = require("readline");

// Create a new RiveScript interpreter.
const bot = new RiveScript();

// Load a RiveScript script file.
bot.loadFile("./brain.rive").then(() => {
  // Now the chatbot is ready to go. You can send it messages and it will
  // respond with appropriate responses.
  bot.sortReplies();

  // Create a new readline interface.
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Print the ">" symbol to the terminal.
  process.stdout.write("> ");

  // Read input from the user on the terminal.
  rl.on("line", (input) => {
    // Validate the user's input.
    if (input.trim() === "") {
      console.log("Please enter a message.");
    } else {
      // Call the chatbot function to handle the user's message.
      chatbot(input.trim());
    }

    // Print the ">" symbol to the terminal again.
    process.stdout.write("> ");
  });
});

// Chatbot function to handle the user's message.
function chatbot(message) {
  try {
    // Send the user's message to the chatbot and get its response.
    const reply = bot.reply("local-user", message);

    // Print the chatbot's response to the terminal.
    console.log(reply);
  } catch (error) {
    // Catch any exceptions that might be thrown and print the error message.
    console.error(error);
  }
}
