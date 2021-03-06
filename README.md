# Affinity

Affinity.works is supporting the surge of resistance against Trump. It's coming at it in two ways. First, working with the new activist groups that have sprung up, building MVP's to solve the problems they've encountered in their organizing. Second, Affinity is enabling rapid collaboration between the grassroots and the big national networks like Indivisible & Daily Kos, to defend the institutions of democracy.

Concretely, the tool is a SaaS and has components for managing a network of groups, a crm, task management for volunteers, outreach, and a reputation marketplace between campaigns, activists, and groups.

# Developers

## Getting Started

Clone the project:

``` shell
$ git clone https://github.com/affinityworks/main
$ cd main
```

Or (via ssh):

``` shell
$ git clone git@github.com:affinityworks/main.git
$ cd main
```

The project requires the following system-level dependencies:

* `postgresql` v 9.6: our database!
* `redis` v 4.0.6: a cache to store frequently-retrieved things in memory instead of on disk
* `ruby` v 2.3.3: the programming language in which the bulk of the app is written
* `nodejs` v 6.9.0: enables us to transpile "es6"-flavored js into js that will run in all browsers
* `bundler` v 1.x: the package manager for ruby
* `yarn` v 1.x: yet another javacript package manager

Below are some scripts for installing and running those dependencies using either Docker or plain old bash scripts. Feel free to take a look at `Dockerfile`, `dockercompose-yml` file, or the `run` and `install` scripts in the `bin` directory to get a sense of what's going on under the hood!

All commands assume you are located in `path/to/this/repo`.

## Docker Setup

Install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/), then...

**Run app:**

``` shell
$ ./bin/docker-up
```

**Run in background:**

``` shell
$ ./bin/docker-up -d
```

**Shut down:**

``` shell
$ ./bin/docker-down
```

**Run tests:**

``` shell
$ ./bin/docker-cmd "bundle exec rails test"
```

**Run arbitrary bash commands:**

``` shell
$ ./bin/docker-cmd "bundle exec rake routes"
```

**Rebuild docker container:**

``` shell
$ ./bin/docker-build "latest"
$ docker push affinityworks/web:latest
```

## Bash setup

**Note:** our bash scripts only work for Mac OSX and Debian-flavored GNU/Linux. They also enforce use of both NVM and RVM. If those constraints don't work for you, please feel free to either:

1. Use the Dockerized dev env described above.
2. Adapt the comands in our bash scripts to your liking.
3. Open an issue or pull request to help us improve the scripts! :)

**Install:**

``` shell
$ ./bin/install
```

**Run:**

``` shell
$ ./bin/run-services # first run only: start redis & postgres
$ ./bin/seed-db # first run only: seed db
$ ./bin/run-web
```

**Shut down cleanly:**

```shell
$ kill -9 `cat tmp/pids/server/pid`
```

**Run tests:**

``` shell
$ bundle exec rails test
```

## Gotchas

**Switching btw/ docker and bash**

If you are switching between docker and bash setups, you might run into odd Devise authentication errors on login. If this happens:

Delete all caches:

``` shell
$ cd path/to/this/repo
$ rm -rf tmp/caches/
```

If that doesn't fix it, try removing the local dbs and re-seeding:

``` shell
$ psql
# drop database affinity_development;
# drop database affinity_test;
# \q
$ ./bin/seed-db
```

## Bnuild Javascript in Production Configuration

Webpack will automatically rebuild the dev javascript bundles on changes according to the development configuration in `client/webpack.config.js`. So it is not necessary to rebuild manually. That said, if you want to spit out a static build of the frontend that matches the production build, you can run:

``` shell
$ bundle exec rake react_on_rails:assets:webpack
```
