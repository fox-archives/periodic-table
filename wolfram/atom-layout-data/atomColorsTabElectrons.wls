#!/usr/bin/env wolframscript
(* ::Package:: *)

Import["../common-methods.wls"];
DeleteFile["atomLayoutColorsOrbitalBlock.json"];

periodicTable = {};

For[i = 1, i < 119, i++,
	block = ElementData[i, "Block"];
	Switch[
		block,
		"s",
		color = "blue";,
		"p",
		color = "red";,
		"d",
		color = "green";,
		"f",
		color = "orange";
	];
	newElement = {
		"defaultColor" -> color,
		"color" -> color
	};
	
	periodicTable = Append[periodicTable, newElement];
	
	(* Case for Lanthanites *)
	If[i == 56,
		lanth = {
			"defaultColor" -> "orange",
			"color" -> "orange"
		};
		periodicTable = Append[periodicTable, lanth];
	];
	
	(* Case for Actinides *)
	If[i == 88,
		act = {
			"defaultColor" -> "orange",
			"color" -> "orange"
		};
		periodicTable = Append[periodicTable, act];
	];
];

Export["atomLayoutColorsOrbitalBlock.json", periodicTable, "JSON"];
