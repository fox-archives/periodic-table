#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["basic-chemical.json"];

periodicTable = {};
	 
Do[
	electronAffinity = ElementData[i, "ElectronAffinity"];
	electronegativity = ElementData[i, "Electronegativity"];
	gasAtomicMultiplicities = ElementData[i, "GasAtomicMultiplicities"];
	valence = ElementData[i, "Valence"];
	
	
	(* Format all Properties *)
	electronAffinity = transformProperty[electronAffinity];
	electronegativity = transformProperty[electronegativity];
	gasAtomicMultiplicities = transformProperty[gasAtomicMultiplicities];
	valence = transformProperty[valence];
	
	
	newElement = {
		(* AllotropicMultiplicities *)
		(* CommonCompoundNames *)
		"electronAffinity" -> electronAffinity,
		"electronegativity" -> electronegativity,
		"gasAtomicMultiplicities" -> gasAtomicMultiplicities,
		"valence" -> valence
	
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["basic-chemical.json", periodicTable, "JSON"];
