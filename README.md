# TypeSass - Webpack Boilerplate

A simple webpack boilerplate with Typescripts & Sass (save time with this boilerplate 🚶‍♂️)

## Building and running on localhost

### Install node modules
First install dependencies:

```sh
npm install
```

### Development

To create a development build:

```sh
npm run start
```

### Production

To create a production build:

```sh
npm run build
```

## Sass Folder structure

### Base
The *base* folder holds boilerplate content. It holds the styles every page of your site/project should receive.

### Components
The *components* folder holds all your micro layout files. Your styles for buttons and navigation and similar page components.

### Layout
Your macro layout files go in the *layouts* folder. Styles for major sections of the layout like a header or footer and styles for a grid system would belong here.

### Pages
If you have styles specific to individual pages on your site, you can place them in the *pages* folder. For example it’s not uncommon for the home page of your site to require page specific styles that no other page receives.

### Vendor
Finally the *vendors* folder holds 3rd party code and the main.scss file uses @import statements to include the other files.

## Generating Multiple HTML Files
To generate more than one HTML file, declare the plugin more than once in your plugins array

*webpack.config.js*
```
{
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a demo.html
      filename: 'demo.html',
      template: 'src/html/demo.html'
    })
  ]
}
```

