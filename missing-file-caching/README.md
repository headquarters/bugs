# Cached missing file at CDN

See [this blog post](https://www.michaelehead.com/2020/01/08/bug-case-studies.html) for some more background.

## Build the container
`docker build -t <name> .`

## Run the container
`docker run -d --rm --name=apache-test -p 8008:80 --mount type=bind,source="$(pwd)"/src/,target=/usr/local/apache2/htdocs/ <name>`

## Check localhost
http://localhost:8008 will return the default Ember application static HTML page with some extra requests that should 404.

The HTML referenced in the iframe will fail with a 302 that then redirects to a 200 that serves up the 404 page. Confusing, right?!

The JS file will respond with a 404 as expected. 

