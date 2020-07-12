<h1 align="center">Welcome to LBF-dashboard 👋</h1>
<p>
</p>

> React app and node.js repository accessing postgres database and pulling data into a table, with sort and filter queries. This project was a way for me to use node.js and try out docker, docker-compose and heroku.

## Run

You can run this project using `docker-compose up`. This will automatically pick up the docker-compose.yml config and setup a postgres database and run the Frontend and Backend services with the right environment variables.

After that, all you need to do then is go to [0.0.0.0/3000](http://0.0.0.0:3000/) to see the table and start interacting with it :). Running `docker ps` will show you the newly started containers for yourself.

## Deployed with...

I'm using `heroku` and the `heroku-cli` to deploy this app. The react app is deployed through the usual `git push heroku master`, but the API is deployed through releasing docker images:
```
heroku container:push web
heroku container:release web
```

Finally, the postgres database runs on a heroku container.

## Author

👤 **Leo Le Bleis**

* Website: https://www.leolebleis.com/
* Github: [@leolebleis](https://github.com/leolebleis)
* LinkedIn: [@leolebleis](https://linkedin.com/in/leolebleis)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_