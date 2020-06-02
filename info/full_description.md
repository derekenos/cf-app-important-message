**Important Message** provides a simple and configurable way to display a message to your visitors.

| **Features** | |
| --- | --- |
| Display Modes | Banner or Modal |
| Message Types | Plain Text, Rich Text, or HTML |
| Banner Options | Dismiss or redirect to URL on click |
| Dismissal Modes | Dismissible w/ custom period or Non-Dismissible |
| Color Scheme | Predefined or Custom |
| Styling Options | Text Size, Padding, Corner Roundness, Custom CSS |

# Messages Types
You can compose your message using plain text, rich text, or HTML.

## Plain-Text Message
This option allows you to enter a plain text message, with no links, images, or formatting.

## Rich-Text Message *(FULL version only)*
The rich-text input allows you to control text formatting and insert links and images.

### Example of Rich Text Message

![rich-text modal screenshot](https://user-images.githubusercontent.com/585182/77550943-0ebb8780-6e88-11ea-82bc-ef8598b1aacb.png)

## HTML Message *(FULL version only)*
This option allows you to enter HTML for complete control over your message styling and embedded links, images, etc.

For example, entering this:

```
A <span style="color: red;">Custom</span> <b>HTML</b> <a href="#">Message</a>
```

will display:

![customHTMLMessage](https://user-images.githubusercontent.com/585182/79355563-d568bb80-7f0b-11ea-9cf9-69915eb5f4f7.png)


Here's the HTML for a fancier example that includes a background image:

```
<div style="background-image: url(https://images.unsplash.com/photo-1558897979-72a433ed5f8d?auto=format&fit=crop&w=500&q=60); background-position: center; width: 500px; height: 333px; border-radius: 16px;"><p style="color: #444; font-size: 32px; font-weight: bold; text-align: center; padding: .5em;">We're closed today because our cattle escaped through that fence.<br><br>See you tomorrow!</p></div>
```

### Example of Custom HTML

![cattleFence](https://user-images.githubusercontent.com/585182/79467422-c34e5200-7fcb-11ea-8a41-721c2c9c525f.png)

Note the white border around the above image. That's baked into the component, but you can modify that with custom styles as described below.

# Custom Styles  *(FULL version only)*
This option allows you to add custom CSS to style your HTML message elements or override the existing component styles.

For example, to eliminate the white padding around the snowy image in **Example of Custom HTML**, you can set Custom Styles as follows:

```
.content { padding: 0; }
```

which will result in:

![cattleFenceWithCustomStyles](https://user-images.githubusercontent.com/585182/79482613-1251b280-7fdf-11ea-97d9-60cbc637ef01.png)

Some things to note:
- Both the Banner and Modal components have .wrapper and .message class elements but you should right-click -> Inspect Element in your browser to see them in all their structural glory.
- You may have to use **!important** to override styles that are exposed via controls in the UI (e.g. Text Size / font-size).

## Predefined Custom Styles

[Click here to view a growing list of predefined custom styles that demonstrate what's possible!](https://gist.github.com/derekenos/d42134d8c358715b793303d2a782eb7c)


# Display Modes

Two display modes are available: Banner and Modal

## Banner Mode

In this mode, your message is displayed as a banner either across the top of the page or embedded in a location of your choosing. Banners can be dismissible or non-dismissible. Dismissible banners are always at the top of the page.

### Example of Dismissible Banner

![dismissibleBanner](https://user-images.githubusercontent.com/585182/79354046-e0225100-7f09-11ea-9f80-e949f17f97a5.png)

### Example of Non-Dismissible Banner

![nonDismissibleBanner](https://user-images.githubusercontent.com/585182/79354629-a4d45200-7f0a-11ea-8737-8fa445f672ac.png)


## Modal Mode
In this mode, the message is displayed in a dialog that overlays the entire screen.

### Example of Dismissible Modal

![dismissibleModal](https://user-images.githubusercontent.com/585182/79355250-67bc8f80-7f0b-11ea-8054-058e26520b57.png)

### Example of Non-Dismissible Modal

![nonDismissibleModal](https://user-images.githubusercontent.com/585182/79355266-6c814380-7f0b-11ea-8323-258847f797a5.png)


# Banner Click URL *(FULL version only)*
When this field is set, a click on the banner message will redirect the visitor to the specified URL and the visual style will change to indicate a button on the right-hand-side that can be used to dismiss the banner.

## Example of Banner with Banner Click URL

![BannerClickURL](https://user-images.githubusercontent.com/585182/79352853-5aea6c80-7f08-11ea-891f-e1cd538e52f0.png)

## Example of Banner without Banner Click URL

![noBannerClickURL](https://user-images.githubusercontent.com/585182/79353311-e3690d00-7f08-11ea-878f-c805863644b6.png)

# Dismissal Modes
For dismissible messages, you can configure how long you'd like to hide the message from the visitor before showing it to them again.

You can configure it to show again:

- on the next page load
- in 10 Minutes
- in 1 Hour
- in 1 Day
- never
- custom *(FULL version only)*

_Note that when a visitor dismisses a message, they're dismissing that specific message. If you change the content of your message, the previous dismissal will be invalidated and they will see the new message on the next page load._


# Color Schemes
You can choose from one of several predefined color schemes, or select your own background, text, and button colors.

## Predefined Color Schemes

![combined-final](https://user-images.githubusercontent.com/585182/77785956-5894a100-7033-11ea-8203-27a736cb9d45.png)

## Custom Color Scheme  *(FULL version only)*

Example:

![Screenshot from 2020-03-25 11-23-02](https://user-images.githubusercontent.com/585182/77553326-0c0e6180-6e8b-11ea-99b9-f0c79cfec43f.png)
