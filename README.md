# Registered Carpark UI

Static UI for the Westfield Registered Carpark project.

The build is using a simple node server to put our html files together. Below are instructions for getting the project running locally:

## Basic File Structure

- The master header and footer templates are located in the `shared` folder.
- Each of the page templates will be located in the `templates` folder.
- All assets (CSS and images) that need to be accessible publicly are located in the `public` folder.

## Installation

### Node

1. You will need to install node: <http://nodejs.org/download/>.
2. The project only has one dependency; **Express** (a popular node framework). Run `npm install` from the project folder in the terminal. 
3. To start the server run `node express-parking.js` which will run on port 4000. 

### Sass

Requires Sass 3.3, [see here](http://sass-lang.com/install) for installation instructions. 

To compile Sass run `sass --watch style.scss:style.css --style compressed` in the terminal from where `style.scss` lives. It you don’t want minification run `sass --watch style.scss:style.css --style expanded` however for production compressed should always be used.

## 3rd Party Handover

Please don't modify any of the HTML/CSS, if you're missing anything or if anything doesn't work for you then please come back to us and we'll work together on it. This is important because we need to make sure we're adhering to best practices, maintain the responsive UI, and our Accessibility guidelines. 

If you absolutely must write CSS, please add your changes to the `third-party.scss` partial located in `public/css/partials/third-party/`. **N.B. do not modify any of the files in the `css-framework` directory** as this is an external framework which needs to be regularly updated. 

Any important notes for you are in the form of HTML comments prefixed with **BACKEND DEV** e.g. `<!-- BACKEND DEV: make year dynamic -->`.
