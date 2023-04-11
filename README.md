## Limey

## What is this project?

This project is created as part of a collaboration under [The Collab Lab](https://github.com/the-collab-lab). Our team ([Elizabeth Hammes](https://github.com/ehammes), [Louie Knolle](https://github.com/louieknolle), [Nicole Shnurr](https://github.com/DwightTheShark), and myself) has created a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store.

### How does it work?

As a user, you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

## A view into Limey

<div style="display: flex;">
<img src="https://github.com/tinazarb/tcl-52-smart-shopping-list/blob/53b7c8416a66b5d660f4e6dd90a483d9e4b4c850/public/img/limey-app-add-item.png" width="500">
<img src="https://github.com/tinazarb/tcl-52-smart-shopping-list/blob/main/public/img/limey-app-purchase-date.png" width="500">
<img src="https://github.com/tinazarb/tcl-52-smart-shopping-list/blob/main/public/img/limey-app-share-list.png" width="500">
</div>

You can add groceries, check them off as you buy, share your grocery list through a token with others, and have the smart shopping list predict your next purchase date!

You can visit and demo the site here: https://limey-list.web.app/

<hr>

## Want to set up the project locally?

### Install Node and NPM

`npm` is distributed with Node.js, which means that when you download Node.js, you automatically get `npm` installed on your computer. You can install Node by [downloading it from the Node.js website](https://nodejs.org/en/) or using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) on a macOS or Linux device or [nvm-windows](https://github.com/coreybutler/nvm-windows) on a Windows device.

💡 **Note:** This project requires the latest Long Term Support (LTS) version of Node. If you have an earlier version of Node, now would be a great time to upgrade!

### Clone the project locally

On GitHub, navigate to the repo for your cohort’s project (you’re probably there right now), then:

1. Click on the "Code" tab. It may already be selected.
2. Click the green "Code" button to reveal a "Clone" popup.
3. The "HTTPS" tab should be automatically selected. If not, click "HTTPS."
4. Click the copy button to copy the url of this repository to your clipboard.

From your terminal, `cd` into the directory where you want this project to live.

Once you’re in the directory, type `git clone` followed by the web URL you just copied to your clipboard from GitHub. Then `cd` into the directory that is created.

### Install the project’s dependencies

Once you’ve cloned the project locally and you’re in the project directory, you’ll want to install the project’s dependencies. To do so, type the following into your terminal: `npm ci`

### Access the project in your browser

After you’ve cloned the project locally and updated the dependencies, run the project by typing the following into your terminal: `npm start`. You should be able to see the project at `localhost:3000`.

🎉 You did it! Happy shopping!
