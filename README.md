
# TBT

> 

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# How to add a game
Let's say we have a game, `2048` in a directory
 1. Copy the game folder to the server, `scp -r 2048 isebarn@192.168.1.35:./`
 2. Once on the server, copy the game directory the correct workspace `sudo mv 2048/ /var/lib/jenkins/workspace/`
 3. Edit the file `/etc/nginx/demoweb.conf` by adding the following
 ```
       location /2048 {
        gzip off;
        alias /var/lib/jenkins/workspace/2048;
        index index.html;
      }
```
4. restart the nginx server `sudo systemctl restart nginx`
5. Add the game to the database by doing a `POST` request
```
requests.post('https://demoapi.isebarn.com/api/game', json={
"Name": '2048',
"Icon": 'url to an icon',
"Path": 'https://demo.isebarn.com/2048' 
"UserId": 2
})
```
Here, `UserId` is the user id of the developer `as it appears in the database`
Here, the `2048` in `https://demo.isebarn.com/2048` is the same as the `2048` in  `location /2048`
 

