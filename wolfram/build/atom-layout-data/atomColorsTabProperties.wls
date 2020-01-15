#!/usr/bin/env wolframscript
(* ::Package:: *)

DeleteFile["atomColorsTabProperties.json"];

periodicTable = {};
For[i = 1, i < 119, i++,
	(*type = getType[ElementData[i, "Series"]];*)
	series = ElementData[i, "Series"];
	type = "Unexpected Values";
	Switch[
		series,
		"Nonmetal",
		type = "yellow",
		"NobleGas",
		type = "indigo",
		"AlkaliMetal",
		type = "red",
		"AlkalineEarthMetal",
		type = "violet";,
		"Metalloid",
		type = "green",
		"Chalcogen",
		type = "yellow",
		"Halogen",
		type = "pink",
		"PoorMetal",
		type = "orange",
		"TransitionMetal",
		type = "blue",
		"Lanthanide",
		type = "cyan",
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
			"defaultColor" -> "cyan",
			"color" -> "cyan"
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

Export["atomColorsTabProperties.json", periodicTable, "JSON"];
Print["atomColorsTabProperties.json" <> " done"];
