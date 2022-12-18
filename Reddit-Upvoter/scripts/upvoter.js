const snoowrap = require("snoowrap");
const yargs = require("yargs");

let requestCount = 0;
let lastRequestTime = 0;

async function throttle(fn) {
  requestCount += 1;
  const currentTime = Date.now();
  if (requestCount === 1) {
    lastRequestTime = currentTime;
  }
  const timeSinceLastRequest = currentTime - lastRequestTime;
  if (timeSinceLastRequest < 1000) {
    // If the time since the last request is less than 1 second,
    // wait for the remaining time before making the request
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 - timeSinceLastRequest)
    );
  }
  lastRequestTime = Date.now();
  // Make the request
  return fn();
}

async function main(maxUpvotesAllowed) {
  // Load environment variables from .env file

  // Parse command-line arguments
  const args = yargs
    .option("subreddit", {
      alias: "s",
      description: "The subreddit to upvote posts in",
      type: "string",
      demandOption: true,
    })
    .option("threshold", {
      alias: "t",
      description:
        "The minimum number of upvotes a post must have to be upvoted",
      type: "number",
      demandOption: true,
    })
    .option("maxUpvotes", {
      alias: "m",
      description: "The maximum number of posts to upvote",
      type: "number",
      demandOption: true,
    })

    .help().argv;

  // Authenticate with the Reddit API using a Reddit account and API key
  const r = new snoowrap({
    userAgent: "my-reddit-bot/1.0",
    clientId: "api_client_id",
    clientSecret: "api_secret_key",
    username: "reddit_username",
    password: "reddit_password",
  });

  // Set up variables for the subreddit, minimum upvote threshold, and maximum upvote count
  const subreddit = args.subreddit;
  const minUpvotes = args.threshold;
  const maxUpvotes = args.maxUpvotes;

  let upvoteCount = 0; // Initialize a counter for the number of upvotes made

  try {
    // Get the top posts in the subreddit
    const topPosts = await r.getSubreddit(subreddit).getTop({ time: "week" });

    // Iterate through the top posts and upvote if they meet the threshold
    // then call the throttle function for each iteration of the loop
    topPosts.forEach(async (post) => {
      if (post.score >= minUpvotes && upvoteCount < maxUpvotesAllowed) {
        upvoteCount += 1; // Increment the upvote counter
        await throttle(async () => {
          await post.upvote();
          console.log(
            `Upvoted post "${post.title}" with score of ${post.score}`
          );
        });
      }
    });

    // Exit the script once the upvotes are complete
    if (upvoteCount >= maxUpvotes) {
      console.log(`Upvote complete. Exiting script in 10 seconds.`);
      setTimeout(() => {
        process.exit(0);
      }, 10000); // Wait for 10 seconds before exiting
    }
  } catch (error) {
    if (error instanceof snoowrap.errors.HTTPError) {
      console.error("An HTTP error occurred:", error.message);
    } else {
      console.error(error);
    }
  }

  setInterval(() => {
    requestCount = 0;
    lastRequestTime = 0;
  }, 60000);
}

main(5);

/**
 * use this command to run the scripts
 * node r_upvoter.js --subreddit r/ghana --threshold 10 --maxUpvotes 5
 */
