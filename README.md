# Redoc OpenAPI Documentation w/ Live Reloading

## Overview

This is skeleton project created from a need to work extensively with OpenAPI v2.0 & ReDoc. While the specification itself is fantastic to work with, there are a number of practical challenges faced when the number of operations and definitions begin to quickly grow - especially when wrapping the delivery process in ReDoc:

* My YAML definition has grown beyond 2k lines. Can I work with 'fragments' YAML in a well defined folder structure instead?
  * What if I also need to support multiple active API definition contributors? One file becomes a nightmare very quickly.
* If I work in 'fragmented' YAML, how can I combine all files back together into an *uber* YAML that ReDoc can understand?
  * I need the output to be a valid document in its entirety, otherwise it will not render in ReDoc.
* How can I develop locally so that changes are reflected quickly - i.e. without stopping & starting npm/yarn processes?
  * I need changes to be immediately reflected in the browser, so I get quick feedback & don't spend all my time double checking semantics.

### Uses popular libraries ###

* redoc - https://github.com/Rebilly/ReDoc
* live-server - https://github.com/tapio/live-server
* json-refs - https://github.com/whitlockjc/json-refs

## Demo ##

### GIF Example ###

Below is an example of the skeleton project in action. The GIF includes making a change, and having it update on the fly in the browser:

![Alt text](/screenshots/demo.gif?raw=true "Redoc Live Reload Example")

### Sandbox ###

The sample documentation generated from this project has been hosted in a sandbox environment:

[Sandbox](https://s3-ap-southeast-2.amazonaws.com/redoc-live-reload-sample/index.html)

## Project Structure
This project layout is structured as below:

```
+-- _bin
+-- _docs
    +-- _definitions
        +-- index.yaml
    +-- info
        +-- index.yaml
    +-- _paths
        +-- index.yaml
    index.yaml
+-- _public
    +-- index.html
    +-- redoc.standalone.js (copied from node_modules)
    +-- output.yml (generated)
+-- index.yaml
+-- package.json
+-- README.md
```

* **index.yaml** - base (root yaml file. Imports other yaml fragments (refs) referenced in docs/.
* **docs/** - yaml fragments go under this structure.
  * **paths/** - API resources and operations
  * **definitions/** - Resource model objects (used in paths)
  * **info/** - Contact information

  Each main folder here has a corresponding index.yaml to aggregate individual definitions together.

* **public/** - used as the root directory for the running web server (locally or remotely). This is also where the 'combined' yaml (called output.yml) will be copied, as well as redoc.standalone.js (from node_modules). These files are both referenced in the index.html which serves on the root context path of the application server.
* **zip/** - working folder for zipped artifacts. These can be hosted (if desired)- a S3 bucket or Apache server will do.

## Serving up documentation (local)

1. Run `yarn install` in a terminal. This only needs to be done for changes to node module imports.
2. Run `yarn run start` from a terminal
3. Navigate to http://localhost:8005 to view the live documentation in a browser.

### Hot reloading after *docs* folder content changes

By default, hot loading is not enabled. To activate this:

1. Open an additional terminal window/tab and run `yarn run watch-docs`. This is in addition to the `yarn run start` command above still running in another terminal.
2. Make changes to anything within the **docs** folder
3. Observe the web browser automatically reloads itself and reflects the new changes. We are using the *watch* npm package for this, so it will take ~5 seconds to reflect the changes.
