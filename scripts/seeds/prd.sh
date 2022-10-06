#!/bin/bash

set -ex

for file in `\find ./prisma/seeds/production -maxdepth 1 -type f`; do
  npx ts-node $file
done
