#!/bin/bash

# tell subroutine tells user what script is being run
tell() {
	echo "Exec $1"
}

# $1 represents the first parameter being passed through

# If there are no parameters, tell to enter in a parameter
if [[  -z "${1// }" ]]
then
  echo "Enter param"

# Else, if theere are parameters, check and see if there any matching ones. If not, tell that there are no matching parameters
else

  if [ "$1" == "-all" ]
  then
    tell "all"
    ./all-json.wls
  
  elif [ "$1" == "-col" ]
  then
    tell "colors"
    ./colors.wls
  
  elif [ "$1" == "-com" ]
  then
    tell "common-methods"
    ./common-methods.wls
  
  elif [ "$1" == "-mat" ]
  then
    tell "material"
    ./material-json.wls
  
  elif [ "$1" == "-therm" ]
  then
    tell "thermodynamic"
    ./thermodynamic-json.wls
  
  elif [ "$1" == "-electromag" ]
  then
    tell "electromagnet-optical"
    ./electromagnetic-optical-json.wls
  else
    echo "Param invalid"
  fi

fi
