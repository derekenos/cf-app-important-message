**Important Message** provides a simple and configurable way to display a message to your visitors.

| **Features** | |
| --- | --- |
| Display Modes | Banner or Modal |
| Message Types | Predefined or custom Plain Text, Rich Text, or HTML |
| Banner Options | Dismiss or redirect to URL on click |
| Dismissal Modes | Dismissible w/ custom period or Non-Dismissible |
| Color Scheme | Predefined or Custom |
| Several Styling Options | Text Size, Padding, Corner Roundness |

# Messages Types
You can choose from one of several predefined messages, or write your own plain-text, rich-text, or HTML message.

## Predefined Messages

- Minor Service Interruption
> ⚠ We're experiencing a minor service interruption - some features may not work.

- Major Service Interruption
> ⚠ We're experiencing a major service interruption - many features may not work.

- Scheduled Maintenance
> ⚠ We're currently undergoing scheduled maintenance - some features may not work.

## Custom Plain Text Message
This option allows you to enter a plain text message, with no links, images, or formatting.

## Custom Rich-Text Message *(FULL version only)*
The rich-text input allows you to control text formatting and insert links and images.

### Example of Rich Text Message

![rich-text modal screenshot](https://user-images.githubusercontent.com/585182/77550943-0ebb8780-6e88-11ea-82bc-ef8598b1aacb.png)

## Custom HTML Message *(FULL version only)*
The option allows you to enter HTML for complete control over your message styling and embedded links, images, etc.

For example, entering this:

```
A <span style="color: red;">Custom</span> <b>HTML</b> <a href="#">Message</a>
```

will display:

![Screenshot from 2020-04-11 16-13-12](https://user-images.githubusercontent.com/585182/79053976-5cb5e680-7c0f-11ea-812f-d31f8ff2ba5f.png)


Here's the HTML for a more ambitious example that includes a background image:

```
<p style="background-image: url(https://images.unsplash.com/photo-1554921027-b91f0beeb07d?auto=format&fit=crop&w=400&q=20); background-position: center; width: 400px; height: 500px; text-align: center; color: #fff; font-weight: bold;">Whoops!<br><br>The floppy popped out.<br><br>We're working on it!</h1></p>
```

### Example of Custom HTML

![floppy](https://user-images.githubusercontent.com/585182/79075083-7a8e5480-7cbe-11ea-99fe-2c04bb836ee8.png)


# Display Modes

There are two display modes available: Banner and Modal

## Banner Mode
In this mode, the message is displayed either across the top of the page or embedded in a location of your choosing depending on the **Not Dismissible** configuration setting.

The **Not Dismissible** option looks like this:

![notDissmisibleUnchecked](https://user-images.githubusercontent.com/585182/79054238-5cb6e600-7c11-11ea-9687-ec9b285b906a.png)

### Example of Dismissible Banner

![dismissible banner screenshot](https://user-images.githubusercontent.com/585182/77548024-5dffb900-6e84-11ea-83b2-b3a3bc9b09b3.png)

### Example of Non-Dismissible Banner

![non-dismissible banner screenshot](https://user-images.githubusercontent.com/585182/77548270-b46cf780-6e84-11ea-8ba9-af1a976ffe1c.png)


## Modal Mode
In this mode, the message is displayed in a dialog that overlays the entire screen.

### Example of Dismissible Modal

![dismissible modal screenshot](https://user-images.githubusercontent.com/585182/77548999-aec3e180-6e85-11ea-8653-f99a272ce408.png)

### Example of Non-Dismissible Modal

![non-dismissible modal screenshot](https://user-images.githubusercontent.com/585182/77549113-d3b85480-6e85-11ea-91c8-24167cc4402c.png)

# Banner Click URL
When this field is set, a click on the banner message will redirect the visitor to the specified URL and the visual style will change to indicate a button on the right-hand-side that can be used to dismiss the banner.

## Example of Banner with Banner Click URL

![BannerClickURL](https://user-images.githubusercontent.com/585182/79069523-ea8be300-7c9c-11ea-80e1-cbb11fef1656.png)

## Example of Banner without Banner Click URL

![noBannerClickURL](https://user-images.githubusercontent.com/585182/79069529-fbd4ef80-7c9c-11ea-97fd-484a319b1a9a.png)

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
