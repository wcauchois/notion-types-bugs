"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabase = exports.notion = void 0;
const client_1 = require("@notionhq/client");
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
exports.notion = new client_1.Client({ auth: process.env.NOTION_KEY });
const getDatabase = (databaseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield exports.notion.databases.retrieve({
            database_id: databaseId,
        });
        return response;
    }
    catch (e) {
        console.error("Error: The database ID you provided is invalid. Please double check that you have set up the Notion API integration with the database, and that you are providing the right database IDs.");
        return undefined;
    }
});
exports.getDatabase = getDatabase;
const getPages = (databaseId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield exports.notion.databases.query({
        database_id: databaseId,
    });
    return response.results;
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const pages = yield getPages("5b3247dc63b84fd1b6105e5a8aabd397");
    const pageDescriptionsWorking = pages.map((page) => {
        var _a;
        if (!(0, client_1.isFullPage)(page)) {
            return;
        }
        if (page.properties.Description.type === "rich_text") {
            // @ts-ignore
            return (_a = page.properties.Description.rich_text[0]) === null || _a === void 0 ? void 0 : _a.plain_text;
        }
    });
    console.log("You can see in this log that page.properties.Description.rich_text[0]?.plain_text will return data properly. However, this requires an @ts-ignore because the type RichTextPropertyItemObjectResponse is not expecting an array");
    console.log("pageDescriptionsWorking: ", pageDescriptionsWorking);
    const pageDescriptionsNotWorking = pages.map((page) => {
        var _a;
        if (!(0, client_1.isFullPage)(page)) {
            return;
        }
        if (page.properties.Description.type === "rich_text") {
            return (_a = page.properties.Description.rich_text) === null || _a === void 0 ? void 0 : _a.plain_text;
        }
    });
    console.log("Now you can see that pageDescriptionsNotWorking will returned undefined, even though it is correctly typed");
    console.log("pageDescriptionsNotWorking: ", pageDescriptionsNotWorking);
});
run();
