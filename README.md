# Problem

The API response is giving me rich text properties as an array, while the type RichTextPropertyItemObjectResponse says that it should not be an array.

# To Test

- Add your secret to .env `NOTION_KEY=YOURSECRET`
- `npm install`
- `tsc`
- `node example.js`

# Note

I added a type, because page properties are not exposed on PageObjectResponse. I am casting page.properties.Description as RichTextPropertyItemObjectResponse. Please let me know if this is the wrong way of doing this.

```
export type PageObjectResponseWithProperties = PageObjectResponse & {
  properties: {
    Description: RichTextPropertyItemObjectResponse;
  };
};
```
