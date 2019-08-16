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

fixUnit[data_]:= (
  If[MemberQ[{"Failed", "Unknown"}, data],
    Return[data];
  ];

  (* If[KnownUnitQ@QuantityUnit[data],
    Return[ToString@QuantityForm[data, "LongForm"]];
  ]; *)
  Return[ToString@QuantityForm[QuantityUnit@data, "LongForm"]];

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
    rawValue = ElementData[i, atomPropertyPascalCase];
    transformedValue = removeUnknowns@atomValueTransformation@rawValue;

    name = ElementData[i, "StandardName"];
    value = fixValue@transformedValue;
    oldUnit = fixUnit@transformedValue;
    unit = ToString@ElementData[i, atomPropertyPascalCase, "Units"];
    unitsName = ToString@ElementData[i, atomPropertyPascalCase, "UnitsStandardName"];
    rawAccuracy = fixAccuracy@rawValue;
    transformedAccuracy = fixAccuracy@transformedValue;
    rawPrecision = fixPrecision@rawValue;
    transformedPrecision = fixPrecision@transformedValue;

    atomArrayData = Append[atomArrayData, {
      "name" -> name,
      "value" -> value,
      "oldUnit" -> oldUnit,
      "unit" -> unit,
      "unitsName" -> unitsName
      (* "rawAccuracy" -> rawAccuracy,
      "transformedAccuracy" -> transformedAccuracy,
      "rawPrecision" -> rawPrecision,
      "transformedPrecision" ->  transformedPrecision *)
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
