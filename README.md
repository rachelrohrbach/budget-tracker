# Budget Tracker, a Progressive Web Application

## Table of Contents
* [General Information](#general-info)
* [Technologies](#technologies)
* [Demo](#Demo)
* [Credits](#credits)
* [License](#license)

## General Information
The Budget Tracker application allows a user to add expenses and deposits to their budget with or without a connection. When entering transactions offline, the application will populate the total when brought back online. 

You can view the deployed application here: https://whispering-stream-96277.herokuapp.com/

Alternatively, the application can be run locally by running following command in the terminal to install the dependencies required:
```sh
npm install
```
The application is then invoked with the following command:
```sh
node server.js
```

## Technologies
The goal of this project was to take a fully functional application that was already built and to make it into a Progressive Web Application (PWA) which offers some great benefits like working in any browser, being responsive to any screen size, availability offline, and the ability to install it to a device homescreen.  To make it into a PWA I had to add a web manifest and a service worker. 

The web manifest is a document that sits at the root of the public directory and provides meta-data about the app in a JSON text file.
```sh
{
    "short_name": "Budget Tracker",
    "name": "PWA Budget Tracker",
    "icons": [
        {
            "src": "assets/img/piggy-bank-96x96.png",
            "sizes": "96x96",
            "type": "image/png"
        },
        {
            "src": "assets/img/piggy-bank-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "start_url": "/",
    "display": "standalone"
  }
  ```
The manifest.webmanifest file is referenced in the ```<Head>``` of the index.html with:
```sh
<link rel="manifest" href="manifest.webmanifest">
```  
The service worker is a proxy, so if the user is offline the service worker can access the cache to still return data to the user.   To use the service worker it must first be registered in the public directory.  The service worker needs to be a the root of the domain so that the entire site will be in scope, so since this is just a one page application I registered the service worker by adding the code below to the index.html file before the closing ```</body>``` tag:
```sh
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('service-worker.js').then(reg => {
            console.log('We found your service worker file!', reg);
          });
        });
      }
    </script>
```
The service-worker.js file also sits at the root of the public directory of the application and handles the caching of the public files, the installation, activation and fetch events.  One other thing to note in regards to service workers is that they require an HTTPS setup on the server. It works fine on localhost without this, but when deployed it does need to have HTTPS certification which in this case is being handled by Heroku.  


## Demo
![install pwa](public/assets/img/installing-pwa.gif)

![access pwa from desktop](public/assets/img/pwa-access-from-desktop.gif)


## Credits
The starting application was provided by my course GitLab repository. Some other resources that I consulted while adding the web manifest and Service Worker are Service Workers: an Introduction (https://developers.google.com/web/fundamentals/primers/service-workers), MDN Web Docs (https://developer.mozilla.org/en-US/docs/Web/Manifest#Example_manifest), and The Offline Cookbook (https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook). 

## License
MIT License

Copyright (c) [2020] [Rachel Rohrbach]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
