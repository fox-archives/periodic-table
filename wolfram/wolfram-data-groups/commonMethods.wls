#!/usr/bin/env wolframscript
(* ::Package:: *)

fixValue[data_]:= (
  If[NumberQ[data],
    Return[data];
  ];

  Return["Error"];
);

fixUnit[data_]:= (
  If[KnownUnitQ[data],
    Return@ToString@QuantityForm[data, "LongForm"];
  ];

  Return["Error"];
);

fixAccuracyPrecision[data_]:= (
  If[NumberQ[data],
    Return[data];
  ];
  
  Return["Infinity"];
);

removeUnknowns[data_]:= (
  If[FailureQ[data],
    Return["Failed"];
  ];
  
  If[MissingQ[data],
    Return["Unknown"];
  ];

  Return[data];
);

(*
  atomProperty
    name of the property,
  atomValueTransformation
    function to transform the actual value of the property (we are trying to extract)
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
    (* General Case *)
    rawValue = ElementData[i, atomPropertyPascalCase];
    transformedValue = atomValueTransformation@rawValue;
    (* Print@fixUnit @* QuantityUnit@transformedValue; *)
    atomArrayData = Append[atomArrayData, {
      "name" -> ElementData[i, "StandardName"],
      (* "byRaw" -> fixValue @* QuantityMagnitude@rawValue, *)
      "value" -> fixValue @* QuantityMagnitude@transformedValue,
      "unit" -> fixUnit @* QuantityUnit@transformedValue,
      "rawAccuracy" -> fixAccuracyPrecision @* Accuracy@rawValue,
      "transformedAccuracy" -> fixAccuracyPrecision @* Accuracy@transformedValue,
      "rawPrecision" -> fixAccuracyPrecision @* Precision@rawValue,
      "transformedPrecision" -> fixAccuracyPrecision @* Precision@transformedValue
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

  rootData = {
    "meta" -> {
      "atomPropertyName" -> atomPropertyPascalCase,
      "atomPropertyNameWithSpace" -> atomPropertyPascalCaseWithSpace
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  Export[jsonFile, rootData, "JSON"];

  Print[jsonFile <> " done"];
);
