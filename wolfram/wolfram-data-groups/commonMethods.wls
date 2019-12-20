#!/usr/bin/env wolframscript
(* ::Package:: *)

MakeUnitReadable[rawUnit_] := (
  unit = ToString@rawUnit;
  Return@Which[
    unit == "GramsPerGram",
    "g per g",

    unit == "Picometers",
    "p",

    unit == "KilojoulesPerMole",
    "kj per m",

    unit == "SiemensPerMeter",
    "s per m",

    unit == "CubicMetersPerKilogram",
    "cb^3 per kilo",

    unit == "CubicMetersPerMole",
    "cb per mole",

    unit == "None",
    "",

    unit == "OhmMeters",
    "ohm meters",

    unit == "Megapascals",
    "mgps",

    unit == "Gigapascals",
    "gpsl",

    unit == "KilogramsPerCubicMeter",
    "kpcm",

    unit == "MeteresPerSecond",
    "m / s",

    unit == "WattsPerMeterKelvin",
    "wpmk",

    unit == "ReciprocalKelvins",
    "rekl",

    unit == "Barns",
    "barn",

    unit == "SquareMetersPerKilogram",
    "smpk",

    unit == "Kelvins",
    "k",

    unit == "DegreesCelsius",
    "C",

    unit == "JoulesPerKilogramKelvin",
    "jpkk",

    unit == "AtomicMassUnit",
    "amu",

    unit == "Missing[NotApplicable]",
    "",

    True,
    unit
  ];
);

MakeUnitLongReadable[rawUnit_] := (
  unit = ToString@rawUnit;
  Return@Which[
    unit == "AtomicMassUnit",
    "unified atomic mass unit (dalton)",

    True,
    unit
  ];
);

fixUnknowns[data_] := (
  If[FailureQ[data],
    Return["Failed"];
  ];
  
  If[MissingQ[data],
    Return["Unknown"];
  ];

  If[NumberQ[QuantityMagnitude@data],
    Return[QuantityMagnitude@data];
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

(* TODO: defualt aguments *)
iterateAtomProperty[
  atomProperty_,
  atomValueTransformation_,
  lanthanitesCase_:"lanthanites case",
  actinidesCase_:"actinides case"
] := (
  (* AtomProperty *)
  atomPropertyPascalCase = StringDelete[StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]], " "];
  (* Atom Property *)
  atomPropertyPascalCaseWithSpace = StringReplace[atomProperty, WordBoundary ~~ x_ :> ToUpperCase[x]];

  atomArrayData = {};
  unit = MakeUnitReadable@ElementData[1, atomPropertyPascalCase, "Units"];
  unitLong = MakeUnitLongReadable@ElementData[1, atomPropertyPascalCase, "Units"];

  For[i = 1, i < 119, i++, (
    name = ElementData[i, "StandardName"];
    value = atomValueTransformation@ElementData[i, atomPropertyPascalCase];

    atomArrayData = Append[atomArrayData, {
      "name" -> name,
      "value" -> value
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
      "longDescription" -> ElementData[1, atomPropertyPascalCase, "LongDescription"],
      (* "missingCount" -> Count[atomsUnitData, _Missing], *)
      (* get number of missing values for a particular unit *) 
      "unit" -> unit,
      "unitLong" -> unitLong
    },
    "data" -> atomArrayData
  };

  jsonFile = StringReplace[atomProperty, (" " ~~ WordBoundary) ~~ x_ :> ToUpperCase[x]] ~~ ".json";
  Export[jsonFile, rootData, "JSON"];

  Print[jsonFile <> " done"];
);
