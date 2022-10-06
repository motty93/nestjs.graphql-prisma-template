#!/bin/bash

# -e Exit immediately when a command returns a non-zero status.
# -x Print commands before they are executed
set -ex

yarn prisma generate

echo '==== develop database migration ===='
if [ $# = 0 ]; then
  yarn prisma migrate dev --skip-seed
else
  yarn prisma migrate dev --name $1 --skip-seed
fi

echo '==== test database migration ===='
yarn db:migrate:test

echo '=== prettier format ==='
yarn fmt
