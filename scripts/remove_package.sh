#!/bin/bash

function remove_package () {
  # TODO: OS依存になっている
  package_remove=`rm -r node_modules/ dist/ &>/dev/null`

  if [ $? = 0 ]; then
    echo "remove node packages."
  else
    echo "packages not found."
  fi

  return $?
}

remove_package
