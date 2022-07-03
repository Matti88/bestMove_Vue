# bestMove App

This App is intended as analysis tool to enable an household to identify the best place to move to

This is an MVP including the following features:
- Load of a list of houses into the app
- Insertion of APIary access key
- research and print of isochrone areas with various options
- filtering houses on hose characteristics and by isochronous

## Example 1
![](/public/appBestMove1.png)

## Example 2
![](/public/appBestMove2.png)

## TO Add
![](/public/appMetric.png)
 

# Developing a Single Page App with FastAPI and Vue.js

### Want to learn how to build this?

Check out the [post](https://testdriven.io/blog/developing-a-single-page-app-with-fastapi-and-vuejs).

## Want to use this project?

#### Go to GeoApify, create your project's API KEY and insert it here
![](/public/key_insertion.png)
 

#### Build the images and spin up the containers:

```sh
$ docker-compose up -d --build
```

Apply the migrations:

```sh
$ docker-compose exec backend aerich upgrade

$ docker-compose exec backend aerich init -t src.database.config.TORTOISE_ORM

$ docker-compose exec backend aerich init-db

```

Ensure [http://localhost:5000](http://localhost:5000), [http://localhost:5000/docs](http://localhost:5000/docs), and [http://localhost:8080](http://localhost:8080) work as expected.

