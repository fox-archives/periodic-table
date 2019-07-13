#!/usr/bin/env wolframscript
(* ::Package:: *)

SetDirectory["/Users/edwin/Documents/All/Programs/periodic-table/computed/"];
Import["common-methods.wls"];
DeleteFile["json/ubiquitous.json"];

periodicTable = {};
	
For[i = 1, i < 119, i++,
	
	newElement = {
		"label" -> i,
		"name" -> ElementData[i, "StandardName"],
		"abbreviation" -> ElementData[i, "Abbreviation"]
	};
	
	periodicTable = Append[periodicTable, newElement];
	
	(* Case for Lanthanites *)
	If[i == 56,
		lanth = {
			"label" -> "57-71",
			"name" -> "Lanthanides",
			"abbreviation" -> "Lan."
		};
		periodicTable = Append[periodicTable, lanth];
	];
	
	(* Case for Actinides *)
	If[i == 88,
		act = {
			"label" -> "89-103",
			"name" -> "Actinides",
			"abbreviation" -> "Act."
		};
		periodicTable = Append[periodicTable, act];
	];
];

Export["json/ubiquitous.json", periodicTable, "JSON"];
