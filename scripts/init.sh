#!/bin/bash

# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

yarn storage:init
chmod +x ./scripts/**/*.sh
yarn db:migrate
yarn lefthook install
