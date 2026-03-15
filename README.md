📘 Notes: Nodemon, package.json, and npm
1️⃣ What is npm?

npm (Node Package Manager) is used to install and manage packages (libraries) in a Node.js project.

Example:

npm install express

This installs the Express framework.

2️⃣ What is package.json?

package.json is the main configuration file of a Node.js project.

It stores:

project information

dependencies

scripts

version

entry file

Example:

{
  "name": "node-project",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  }
}
3️⃣ What are dependencies?

Dependencies are packages required for the application to run.

Example:

npm install express

Example in package.json:

"dependencies": {
  "express": "^4.18.2"
}

These are used in production and development.

4️⃣ What are devDependencies?

These packages are only needed during development.

Example:

npm install nodemon --save-dev

Example in package.json:

"devDependencies": {
  "nodemon": "^3.0.0"
}

Used for:

testing

development tools

auto restart

Not needed in production.

5️⃣ What is nodemon?

nodemon is a development tool that automatically restarts the Node.js server when files change.

Without nodemon:

node app.js

You must manually restart the server.

With nodemon:

nodemon app.js

Server restarts automatically.

6️⃣ Installing nodemon

Global install:

npm install -g nodemon

Dev dependency install:

npm install nodemon --save-dev
7️⃣ npm scripts

Scripts allow running commands easily.

Example:

"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}

Run with:

npm start
npm run dev
🧠 Summary of Learning

In this task, I learned how npm manages packages in a Node.js project.
The package.json file stores project metadata, dependencies, and scripts.

I also learned about:

dependencies → required in production and development

devDependencies → only required during development

The tool nodemon helps developers by automatically restarting the server when code changes, improving development speed.

Using npm scripts, we can run commands like npm start and npm run dev easily.
