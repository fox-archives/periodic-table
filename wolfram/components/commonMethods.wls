#!/usr/bin/env wolframscript
(* ::Package:: *)

(*
  atomProperty
    name of the property, we tell wolfram we want
  atomPropertyDisplayValue
    name of the property, in a  human readable form
  atomValueTransformation
    function to transform the actual value of the property (we are trying to extract)
  lanthanitesCase
    special case value for lanthanites block
  actinidesCase
    spacial case value for actinites block
  jsonFile
    where to generate file
*)
IterateAtomProperty[
  atomProperty_,
  atomPropertyDisplayValue_,
  atomValueTransformation_,
  lanthanitesCase_,
  actinidesCase_,
  jsonFile_
]:= (
  atomArrayData = {};
  For[i = 1, i < 119, i++, (
    (* General Case *)
    atomArrayData = Append[atomArrayData, {
      "name" -> ElementData[i, "StandardName"],
      "value" -> ReleaseHold@atomValueTransformation@ElementData[i, atomProperty]
    }];
  
    (* Lanthanites Case *)
    If[i == 56,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Lanthanites",
        "value" -> lanthanitesCase
      }];
    ];
    
    (* Actinides Case *)
    If[i == 88,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Actinides",
        "value" -> actinidesCase
      }];
    ];
  )];

  rootData = <|
    "meta"-> <|
      "atomName"-> atomPropertyDisplayValue
    |>,
    "data"-> atomArrayData
  |>;

  
  Export[jsonFile, rootData, "JSON"];
);
