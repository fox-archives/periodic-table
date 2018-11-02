#!/usr/bin/env wolframscript
(* ::Package:: *)

SetDirectory["/Users/edwin/Documents/All/Programs/periodic-table/computed/"];
Import["common-methods.wls"];
DeleteFile["json/categories.json"];

periodicTable = {};

getType[series_]:=
	(*Switch[
		ToString@series,
		"AlkaliMetals",
		Return["blue"]
	];*)
	Return[series];
	(*Which[
		ToString@group == "1",
			Return["red"];,
		MissingQ@group \[Equal] True,
			Return["Missing"];,
		True,
			Return["Unexpected Values"];
	];*)

For[i = 1, i < 119, i++,
	(*type = getType[ElementData[i, "Series"]];*)
	series = ElementData[i, "Series"];
	type = "Unexpected Values";
	(* Colors Not Included: Orange, Lime *)
	Switch[
		series,
		"Nonmetal",
		type = "yellow",
		"NobleGas",
		type = "pink",
		"AlkaliMetal",
		type = "blue",
		"AlkalineEarthMetal",
		type = "violet";,
		"Metalloid",
		type = "indigo",
		"Chalcogen",
		type = "yellow",
		"Halogen",
		type = "teal",
		"PoorMetal",
		type = "green",
		"TransitionMetal",
		type = "red",
		"Lanthanide",
		type = "cyan",
		"Actinide",
		type = "grape"
	];
	newElement = {
		"defaultColor" -> type,
		"color" -> type
	};
	
	periodicTable = Append[periodicTable, newElement];
	
	(* Case for Lanthanites *)
	If[i == 56,
		lanth = {
			"defaultColor" -> "cyan",
			"color" -> "cyan"
		};
		periodicTable = Append[periodicTable, lanth];
	];
	
	(* Case for Actinides *)
	If[i == 88,
		act = {
			"defaultColor" -> "grape",
			"color" -> "grape"
		};
		periodicTable = Append[periodicTable, act];
	];
];
Print["Done"];
Export["json/categories.json", periodicTable, "JSON"];
