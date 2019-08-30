#!/usr/bin/env wolframscript
(* ::Package:: *)

removeUnknowns[data_]:= (
  If[FailureQ[data],
    Return["Failed"];
  ];
  
  If[MissingQ[data],
    Return["Unknown"];
  ];

  Return[data];
);

fixValue[data_]:= (
  If[MemberQ[{"Failed", "Unknown"}, data],
    Return[data];
  ];

  If[NumberQ[QuantityMagnitude@data],
    Return[QuantityMagnitude@data];
  ];

  Return["Error"];
);

fixAccuracy[data_]:= (
  If[MemberQ[{"Failed", "Unknown"}, data],
    Return[data];
  ];

  If[NumberQ[Accuracy@data],
    Return[Accuracy@data];
  ];

  Return["Error"];
);

fixPrecision[data_]:= (
  If[MemberQ[{"Failed", "Unknown"}, data],
    Return[data];
  ];

  If[NumberQ[Precision@data],
    Return[Precision@data];
  ];
  
  Return["Error"];
);

(*
  atomProperty
    name of the property,
  atomValueTransformation
    function to transform the actual value of the property that we are trying to extract
  lanthanitesCase
    special case value for lanthanites block
  actinidesCase
    spacial case value for actinites block
*)
iterateAtomProperty[
  atomProperty_,
  atomValueTransformation_,
  lanthanitesCase_,
  actinidesCase_
]:= (
  (* AtomProperty *)
  atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  (* Atom Property *)
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]];

  atomArrayData = {};
  For[i = 1, i < 119, i++, (
    name = ElementData[i, "StandardName"];
    value = atomValueTransformation@ElementData[i, atomPropertyPascalCase];
    unit = ToString@ElementData[i, atomPropertyPascalCase, "Units"];

    atomArrayData = Append[atomArrayData, {
      "name" -> name,
      "value" -> value,
      "unit" -> unit
    }];

    If[i == 56,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Lanthanites",
        "value" -> lanthanitesCase
      }];
    ];

    If[i == 88,
      atomArrayData = Append[atomArrayData, {
        "name" -> "Actinides",
        "value" -> actinidesCase
      }];
    ];
  )];


  rootData = {
    "meta" -> {
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace,
      "description" -> ElementData[1, atomPropertyPascalCase, "Description"],
      "longDescription" -> ElementData[1, atomPropertyPascalCase, "LongDescription"]
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  textFile = "plainOutput.txt";
  Export[jsonFile, rootData, "JSON"];
  Export[textFile, rootData, "Text"];

  Print[jsonFile <> " done"];
);
