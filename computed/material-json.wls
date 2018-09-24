#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["material.json"];

periodicTable = {};
	
Do[
	brinelHardness = ElementData[i, "BrinellHardness"];
	bulkModulus = ElementData[i, "BulkModulus"];
	density = ElementData[i, "Density"];
	liquidDensity = ElementData[i, "LiquidDensity"];
	mohsHardness = ElementData[i, "MohsHardness"];
	molarVolume = ElementData[i, "MolarVolume"];
	poissonRatio = ElementData[i, "PoissonRatio"];
	shearModulus = ElementData[i, "ShearModulus"];
	soundSpeed = ElementData[i, "SoundSpeed"];
	thermalConductivity = ElementData[i, "ThermalConductivity"];
	thermalExpansion = ElementData[i, "ThermalExpansion"];
	vickersHardness = ElementData[i, "VickersHardness"];
	youngModulus = ElementData[i, "YoungModulus"];
	
	(* Format all Properties *)
	brinelHardness = transformProperty[brinelHardness];
	bulkModulus = transformProperty[bulkModulus];
	density = transformProperty[density];
	liquidDensity = transformProperty[liquidDensity];
	mohsHardness = transformProperty[mohsHardness];
	molarVolume = transformProperty[molarVolume];
	poissonRatio = transformProperty[poissonRatio];
	shearModulus = transformProperty[shearModulus];
	soundSpeed = transformProperty[soundSpeed];
	thermalConductivity = transformProperty[thermalConductivity];
	thermalExpansion = transformProperty[thermalExpansion];
	vickersHardness = transformProperty[vickersHardness];
	youngModulus = transformProperty[youngModulus];
	
	
	newElement = {
		"brinelHardness" -> brinelHardness,
		"bulkModulus" -> bulkModulus,
		"density" -> density,
		"liquidDensity" -> liquidDensity,
		"mohsHardness" -> mohsHardness,
		"molarVolume" -> molarVolume,
		"poissonRatio" -> poissonRatio,
		"shearModulus" -> shearModulus,
		"soundSpeed" -> soundSpeed,
		"thermalConductivity" -> thermalConductivity,
		"thermalExpansion" -> thermalExpansion,
		"vickersHardness" -> vickersHardness, (* Probably Don't need this *)
		"youngModulus" -> youngModulus
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["material.json", periodicTable, "JSON"];
