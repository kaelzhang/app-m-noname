#!/bin/bash

########################################################

STATIC_PORT=9098

#########################################################

# install npm dependencies
echo -e "install nodejs environment >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
npm install

# config cortex registry
echo -e "\nconfigure cortex registry >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
cortex config registry --value http://registry.cortex.dp

# install cortex packages
echo -e "\ninstall neurons >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
cortex install

# start cortex server
cortex server & &> /dev/null || echo "WARNING: cortex server might be already started"

# start static and mock server
node tools/server.js "$STATIC_PORT" &