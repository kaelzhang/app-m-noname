#!/bin/bash

########################################################

STATIC_PORT=9098

#########################################################

# install npm dependencies
npm install

# config cortex registry
cortex config registry --value http://registry.cortex.dp

# install cortex packages
cortex install

# start cortex server
cortex server &> /dev/null || echo "WARNING: cortex server might be already started"

# start static and mock server
anywhere "$STATIC_PORT"