# Registered Carpark UI

Static UI for the Westfield Registered Carpark project.

The build is using a simple Node server to put our files together and give us the ability to use includes (partials) to keep things DRY. [Read more](http://nodejs.org/).

## Project Structure

- All the UI lives in the `views` folder, the breakdown is:
  - `layout` folder houses the master templates with the main template being `main.handlebars`.
  - `partials` folder houses any shared markup to keep things DRY and are referenced like this: `{{> centre-brand}}`.
  - the rest are the specific pages of the app, with some being in their own folders to keep things more organised e.g. **Registration**.
- All assets (CSS, JS, images) live in the `public` folder however the `public` folder is only needed for the Node server setup, they actually resolve to the root e.g. `/css/style.css`.
- The three favicons need to remain in the root of the project and on the server. These files are:
  - `apple-touch-icon-144x144-precomposed.png`.
  - `apple-touch-icon-precomposed.png`.
  - `favicon.ico`.

## Installation

### Node

1. You will need to install Node: <http://nodejs.org/download/>.
2. The project has two dependencies; **[Express](https://github.com/visionmedia/express)** (a popular Node framework) and **[Express3 Handlebars](https://github.com/ericf/express3-handlebars)** (a JS templating language). Run these commands from the project folder in the terminal:
  1. `npm install`.
  2. `npm install express`.
  3. `npm install express3-handlebars`.
3. To start the server run `node app.js` which by default will run on port 4000.

### Sass

Requires Sass 3.3, [see here](http://sass-lang.com/install) for installation instructions.

To compile Sass run `sass --watch style.scss:style.css --style compressed` in the terminal from where `style.scss` lives. It you don’t want minification run `sass --watch style.scss:style.css --style expanded` however for production compressed should always be used.

## 3rd Party Handover

Please don't modify any of the HTML/CSS, if you're missing anything or if anything doesn't work for you then please come back to us and we'll work together on it. This is important because we need to make sure we're adhering to best practices, maintain the responsive UI, and our Accessibility guidelines.

If you absolutely must write CSS, please create a new stylesheet and call it **after** `style.css` and we'll review it at the end. **N.B. do not modify any of the other CSS files as they'll be constantly changing throughout the build**.

Any important notes for you are in the form of HTML comments prefixed with **BACKEND DEV** e.g.

    <!-- BACKEND DEV: make year dynamic -->

### Form Validation Rules

Form validation rules after form submit, this all needs to happen server side (i.e. on a post back) not with JavaScript:

- Append `aria-invalid="true"` attribute to the input(s) that fail validation, when the input(s) pass validation remove the attribute(s). Example:

    <input type="text" id="firstName" class="txt-input" aria-required="true" required aria-invalid="true">
- Append `is-input-error` class to the input(s) that fail validation, when the input(s) pass validation remove the class(es). Example:
    <input type="text" id="firstName" class="txt-input is-input-error" aria-required="true" required aria-invalid="true">
- Inject the error message(s) directly after it's input(s) that fail validation, when the error message(s) pass validation remove them from the HTML source. Example:

    <input type="text" id="firstName" class="txt-input" aria-required="true" required>
    <p class="form-field__msg form-field__msg--validation feedback feedback--inline feedback--error">Please enter your first name</p>

All the errors have been included for each form but they're commented out however the copy is not final, Abdul Ghani will provide the finalised copy in a spreadsheet.

Other rules:
  - The first error message needs to be focused too when the page has refreshed i.e. form has been submitted, either by it's `id` or use `tabindex="-1"`.
  - Only one error can ever be shown.
  - Each error needs to be connected to it's input via the attributes: `id` and `aria-describedby`, Example:

    <input type="text" id="firstName" class="txt-input" aria-required="true" required aria-describedby="form-error-1">
    <p class="form-field__msg form-field__msg--validation feedback feedback--inline feedback--error" id="form-error-1">Please enter your first name</p>

    I've hardcoded each `id` to each error, the application is: `id="form-error-x"` where **x** is a number according to where it is in the order e.g. for the third error the `id` will be `id="form-error-3"`.