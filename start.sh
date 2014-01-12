#!/bin/bash

# install npm dependencies
npm install

# config cortex registry
cortex config registry --value http://registry.cortex.dp

# install cortex packages
cortex install

# start cortex server
cortex server &> /dev/null || echo "WARNING: cortex server might be already started"

# start static and mock server
node tools/server.js && open ./html/index.html || echo "FATAL: fails to start local server"
