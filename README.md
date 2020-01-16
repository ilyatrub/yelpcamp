# YelpCamp

This is the latest version of YelpCamp - web app that was developed by me following The Web Developer Bootcamp on udemy.com by Colt Steele.

# Features
* /node_modules: contains all installed by NPM modules, that also can be seen in package.json file:
  * express
  * mongoose
  * body-parser
  * connect-flash
  * passport
  * passport-local
  * passport-local-mongoose
  * method-override
* /views: contains .ejs files of all web pages including /campgrounds pages, /comments pages and separated header.ejs and footer.ejs that are included in almost every page.
* /models: contains descriptions of models of User, Campground and Comment and their configuration for passport.
* /routes: contains all the routing setup for campgrounds, comments and other pages.
* /public/stylesheets: contains .css files.
* /middleware: contains middleware for checking if the user is logged in and ownership of created campground post or a comment.

# Technologies

Here is the list of was used during the development:
* HTML5
* CSS3
* JavaScript
* Bootstrap 3
* Node.js
* MongoDB (MongoDB Atlas)
* and NPM packages that are listed above.
