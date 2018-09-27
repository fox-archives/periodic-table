#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Setup *)
Import["common-methods.wls"];
DeleteFile["atomic.json"];

periodicTable = {};
	 
Do[
	decayMode = ElementData[i, "DecayMode"];
	isotopeAbundances = ElementData[i, "IsotopeAbundances"];
	isotopeHalfLives = ElementData[i, "IsotopeHalfLives"];
	isotopeLifetimes = ElementData[i, "IsotopeLifetimes"];
	knownIsotopes = ElementData[i, "KnownIsotopes"];
	molarRadioactivity = ElementData[i, "MolarRadioactivity"];
	neutronCrossSection = ElementData[i, "NeutronCrossSection"];
	neutronMassAbsorption = ElementData[i, "NeutronMassAbsorption"];
	specificRadioactivity = ElementData[i, "SpecificRadioactivity"];
	stableIsotopes = ElementData[i, "StableIsotopes"];
	
	
	(* Format all Properties *)
	decayMode = transformProperty[decayMode];
	isotopeAbundances = transformProperty[isotopeAbundances];
	isotopeHalfLives = transformProperty[isotopeHalfLives];
	isotopeLifetimes = transformProperty[isotopeLifetimes];
	knownIsotopes = transformProperty[knownIsotopes];
	molarRadioactivity = transformProperty[molarRadioactivity];
	neutronCrossSection = transformProperty[neutronCrossSection];
	neutronMassAbsorption = transformProperty[neutronMassAbsorption];
	specificRadioactivity = transformProperty[specificRadioactivity];
	stableIsotopes = transformProperty[stableIsotopes];
	
	newElement = {
		"decayMode" -> decayMode,
		"isotopeAbundances" -> isotopeAbundances,
		"isotopeHalfLives" -> isotopeHalfLives,
		"isotopeLifetimes" -> isotopeLifetimes,
		"knownIsotopes" -> knownIsotopes,
		"molarRadioactivity" -> molarRadioactivity,
		"neutronCrossSection" -> neutronCrossSection,
		"neutronMassAbsorption" -> neutronMassAbsorption,
		"specificRadioactivity" -> specificRadioactivity,
		"stableIsotopes" -> stableIsotopes
	};
	
	periodicTable = Append[periodicTable, newElement];
, {i, 1, 118}];

Export["atomic.json", periodicTable, "JSON"];



