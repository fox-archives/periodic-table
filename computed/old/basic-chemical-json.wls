#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["basic-chemical.json"];

periodicTable = {};
	 
Do[
	(* Supposed to be other stuff *)
	electronAffinity = ElementData[i, "ElectronAffinity"];
	electronegativity = ElementData[i, "Electronegativity"];
	gasAtomicMultiplicities = ElementData[i, "GasAtomicMultiplicities"];
	valence = ElementData[i, "Valence"];
	crustAbundance = ElementData[i, "CrustAbundance"];
	humanAbundance = ElementData[i, "HumanAbundance"];
	meteoriteAbundance = ElementData[i, "MeteoriteAbundance"];
	oceanAbundance = ElementData[i, "OceanAbundance"];
	solarAbundance = ElementData[i, "SolarAbundance"];
	universeAbundance = ElementData[i, "UniverseAbundance"];
	
	
	(* Format all Properties *)
	electronAffinity = transformProperty[electronAffinity];
	electronegativity = transformProperty[electronegativity];
	gasAtomicMultiplicities = transformProperty[gasAtomicMultiplicities];
	valence = transformProperty[valence];
	crustAbundance = transformProperty[crustAbundance];
	humanAbundance = transformProperty[humanAbundance];
	meteoriteAbundance = transformProperty[meteoriteAbundance];
	oceanAbundance = transformProperty[oceanAbundance];
	solarAbundance = transformProperty[solarAbundance];
	universeAbundance = transformProperty[universeAbundance];
	
	
	newElement = {
		(* AllotropicMultiplicities *)
		(* CommonCompoundNames *)
		"electronAffinity" -> electronAffinity,
		"electronegativity" -> electronegativity,
		"gasAtomicMultiplicities" -> gasAtomicMultiplicities,
		"valence" -> valence,
		"crustAbundance" -> crustAbundance,
		"humanAbundance" -> humanAbundance,
		"meteoriteAbundance" -> meteoriteAbundance,
		"oceanAbundance" -> oceanAbundance,
		"solarAbundance" -> solarAbundance,
		"universeAbundance" -> universeAbundance
	
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["basic-chemical.json", periodicTable, "JSON"];
