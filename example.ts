import { Client, isFullPage } from "@notionhq/client";
import {
  GetDatabaseResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

export const notion = new Client({ auth: process.env.NOTION_KEY });

export const getDatabase = async (
  databaseId: string
): Promise<GetDatabaseResponse | undefined> => {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    return response;
  } catch (e) {
    console.error(
      "Error: The database ID you provided is invalid. Please double check that you have set up the Notion API integration with the database, and that you are providing the right database IDs."
    );
    return undefined;
  }
};

const getPages = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId as string,
  });
  return response.results
};

const run = async () => {
  const pages = await getPages("5b3247dc63b84fd1b6105e5a8aabd397");
  const pageDescriptionsWorking = pages.map((page) => {
    if (!isFullPage(page)) {
      return;
    }

    if (page.properties.Description.type === "rich_text") {
      return page.properties.Description.rich_text[0]?.plain_text;
    }
  });
  console.log(
    "You can see in this log that page.properties.Description.rich_text[0]?.plain_text will return data properly. However, this requires an @ts-ignore because the type RichTextPropertyItemObjectResponse is not expecting an array"
  );
  console.log("pageDescriptionsWorking: ", pageDescriptionsWorking);
  const pageDescriptionsNotWorking = pages.map((page) => {
    if (!isFullPage(page)) {
      return;
    }

    if (page.properties.Description.type === "rich_text") {
      return page.properties.Description.rich_text[0]?.plain_text;
    }
  });
  console.log(
    "Now you can see that pageDescriptionsNotWorking will returned undefined, even though it is correctly typed"
  );
  console.log("pageDescriptionsNotWorking: ", pageDescriptionsNotWorking);
};

run();
