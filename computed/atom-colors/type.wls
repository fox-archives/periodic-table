#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../common-methods.wls"];
DeleteFile["type.json"];

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
	Print@series;
	Switch[
		series,
		"Nonmetal",
		type = "red",
		"NobleGas",
		type = "violet",
		"AlkaliMetal",
		type = "cyan",
		"AlkalineEarthMetal",
		type = "lime";,
		"Metalloid",
		type = "pink",
		"Chalcogen",
		type = "indigo",
		"Halogen",
		type = "teal",
		"PoorMetal",
		type = "yellow",
		"TransitionMetal",
		type = "grape",
		"Lanthanide",
		type = "blue",
		"Actinide",
		type = "green"
	];
	newElement = {
		"defaultColor" -> type,
		"color" -> type
	};
	
	periodicTable = Append[periodicTable, newElement];
	
	(* Case for Lanthanites *)
	If[i == 56,
		lanth = {
			"defaultColor" -> "blue",
			"color" -> "blue"
		};
		periodicTable = Append[periodicTable, lanth];
	];
	
	(* Case for Actinides *)
	If[i == 88,
		act = {
			"defaultColor" -> "green",
			"color" -> "green"
		};
		periodicTable = Append[periodicTable, act];
	];
];

Export["type.json", periodicTable, "JSON"];
