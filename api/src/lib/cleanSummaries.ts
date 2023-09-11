import { db } from "./db";
export async function query_open_api(message) {
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant",
      },
      {
        role: "user",
        content: message,
      },
    ],
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  console.log(response);

  const json = await response.json();

  console.log({ json });

  return json.choices[0].message.content;
}

export async function clean_summary(unclean) {
  return query_open_api(
    `Please remove the title and html tags from the following legislative bill description if they exist. Then, make the description clearer and summarize it for a wide audience. Provide context where it may be helpful to understanding what the bill will do if passed. Here is the bill description: \n${unclean}`,
  );
}

export async function cleanAllSummaries() {
  const summaries = await db.billSummary.findMany();

  const cleanedSummaries = [];

  const summaryCleanings = [];
  for (let i = 0; i < summaries.length; i++) {
    const summary = summaries[i];
    console.log(`Starting ${summary.id}`);
    summaryCleanings.push(
      clean_summary(summary.text).then((cleaned) => {
        cleanedSummaries.push({ text: cleaned });

        console.log(`Cleaned ${summary.id}`);

        return db.billSummary.update({
          where: {
            id: summary.id,
          },
          data: {
            text: cleaned,
          },
        });
      }),
    );
  }

  await Promise.all(summaryCleanings);
}
