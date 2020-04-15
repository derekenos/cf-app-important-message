**Important Message** provides a simple and configurable way to display a message to your visitors.

| **Features** | |
| --- | --- |
| Display Modes | Banner or Modal |
| Message Types | Plain Text, Rich Text, or HTML |
| Banner Options | Dismiss or redirect to URL on click |
| Dismissal Modes | Dismissible w/ custom period or Non-Dismissible |
| Color Scheme | Predefined or Custom |
| Styling Options | Text Size, Padding, Corner Roundness |

# Messages Types
You can compose your message using plain text, rich text, or HTML.

## Plain-Text Message
This option allows you to enter a plain text message, with no links, images, or formatting.

## Rich-Text Message *(FULL version only)*
The rich-text input allows you to control text formatting and insert links and images.

### Example of Rich Text Message

![rich-text modal screenshot](https://user-images.githubusercontent.com/585182/77550943-0ebb8780-6e88-11ea-82bc-ef8598b1aacb.png)

## HTML Message *(FULL version only)*
The option allows you to enter HTML for complete control over your message styling and embedded links, images, etc.

For example, entering this:

```
A <span style="color: red;">Custom</span> <b>HTML</b> <a href="#">Message</a>
```

will display:

![customHTMLMessage](https://user-images.githubusercontent.com/585182/79355563-d568bb80-7f0b-11ea-9cf9-69915eb5f4f7.png)


Here's the HTML for a more ambitious example that includes a background image:

```
<p style="background-image: url(https://images.unsplash.com/photo-1558897979-72a433ed5f8d?auto=format&fit=crop&w=500&q=60); background-position: center; width: 500px; height: 333px; border-radius: 16px; text-align: center; color: #444; font-weight: bold;">We're closed today because our cattle escaped through that fence.<br><br>See you tomorrow!</p>
```

### Example of Custom HTML

![cattleFence](https://user-images.githubusercontent.com/585182/79357702-60e34c00-7f0e-11ea-9ef3-d6f4d724baff.png)


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
