#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-functions"];
DeleteFile["json/colors.json"];

periodicTable = {};

Do[
	block = ElementData[i, "Block"];
	color = "N / A";
	If[block == "s", color = "blue"; ];
	If[block == "p", color = "red"; ];
	If[block == "d", color = "green"; ];
	If[block == "f", color = "orange"; ];
	
	newElement = {
		"defaultColor" -> color,
		"color" -> color
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["json/colors.json", periodicTable, "JSON"(*, "Compact" \[Rule] True*)];
