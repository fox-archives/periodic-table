#!/bin/bash

exall() {
  echo "EXEC all.json-wls"
  ./all-json.wls
  echo "EXEC atomic-json.wls"
  ./atomic-json.wls
  echo "EXEC basic-chemical-json.wls"
  ./basic-chemical-json.wls
  echo "EXEC colors.wls"
  ./colors.wls
  echo "EXEC electromagnetic-optical-json.wls"
  ./electromagnetic-optical-json.wls
  echo "EXEC material-json.wls"
  ./material-json.wls
  echo "EXEC nuclear-json.wls"
  ./nuclear-json.wls
  echo "EXEC thermodynamic-json.wls"
  ./thermodynamic-json.wls
}


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
      exall

#   if [ "$1" == "-all" ]
#   then
#     tell "all"
#     ./all-json.wls
  
#   elif [ "$1" == "-col" ]
#   then
#     tell "colors"
#     ./colors.wls
  
#   elif [ "$1" == "-com" ]
#   then
#     tell "common-methods"
#     ./common-methods.wls
  
#   elif [ "$1" == "-mat" ]
#   then
#     tell "material"
#     ./material-json.wls
  
#   elif [ "$1" == "-therm" ]
#   then
#     tell "thermodynamic"
#     ./thermodynamic-json.wls
  
#   elif [ "$1" == "-electromag" ]
#   then
#     tell "electromagnet-optical"
#     ./electromagnetic-optical-json.wls

#   elif [ "$1" == "-basic-chem" ]
#   then
#     tell "basic chemistry"
#     ./basic-chemical-json.wls

  else
    echo "Param invalid"

  fi

fi
