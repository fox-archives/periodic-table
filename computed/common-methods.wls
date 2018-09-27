#!/usr/bin/env wolframscript
(* ::Package:: *)

(* Set current working directory *)
SetDirectory["/Users/edwin/Documents/All/Programs/periodic-table/computed/"];
(* Prevent returning units from queries *)
SetSystemOptions["DataOptions" -> "ReturnQuantities" -> False];

(* Removes the ending period in some of the numbers *)
removeEndingPeriod[str_]:=
	If[StringEndsQ[str, "."],
		newStr = StringTake[str, StringLength[str] - 1];
		Return[newStr];,
		(* Else *)
		Return[str];
	];
	
(* Replaces the stringified version of the error / no data message with a human readable one *)
convertToUnknownNA[str_]:=
	If[str == "Missing[NotAvailable]" ||
		str == "Missing[Unknown]",
		
		Return["Unknown"];,
		(* Else *)
		If[str == "Missing[NotApplicable]",
			Return["N / A"];,
			
			(* Else *)
			Return[str];
		];
	];
	
(* Converts scientific form to regular integer form *)
scientificToRegular[num_]:=
	If[NumberQ[num],
		Return[DecimalForm[N[num]]];,
		(* Possibly use AccountingForm instead, since it does not ouput scientific notation at all *)
		(* Return[N[num]];, *)
		(* Else *)
		Return[num];
	];
	
transformProperty[prop_]:=
	(* Apparently, this function will not work without the "If" statement *)
	If["true" === "true",
		(*newProp = scientificToRegular[prop];
		newProp = ToString[newProp];
		newProp = convertToUnknownNA[newProp];
		newProp = removeEndingPeriod[newProp];*)
		
		(* This works, but seems to have a problem with atomic.wls, abeit, above has a problem witht that also *)
		newProp = removeEndingPeriod@ToString@AccountingForm@N@prop;
		newProp = convertToUnknownNA[newProp];
		Return[newProp];
	];

objectToObject[prop_]:=
	(* Use the "if" statement just like last time *)
	If["true" === "true",
		newProp = ToString[prop];
		Return[newProp];
	];

toHTMLSuperScript[i_, fn_]:=
	If["true" === "true",
		(* Unprotects Mathematica's Superscript method, so it can be overriden *)
		Unprotect[Superscript];
		Superscript[x_, y_] := Return[StringJoin[ToString[x], "<sup>", ToString[y], "</sup>", " "]];
		Subscript[x_, y_] := Return[StringJoin[ToString[x], "<sub>", ToString[y], "</sub>", " "]];

		newProp = ToString@ElementData[i, fn];
		(* Restores Mathematica's Superscript method *)
		Superscript[x_, y_]=.;
		Subscript[x_, y_]=.;

		newProp = StringReplace[newProp, "]" -> "] ", 1];
		Return[newProp];
	];

customFunction[i_, fn_]:=
	If["true" === "true",
		newProp = ElementData[i, fn];
		Do[
			(* "newProp[[j]]" represents each element in array of all ionizationEnergies for a given periodic table element *)
			(*newProp[[j]] = scientificToRegular[newProp[[j]]];*)
			newProp[[j]] = removeEndingPeriod@ToString@AccountingForm@newProp[[j]];
			(*Print@newProp[[j]];*)
		, {j, 1, Length[newProp]}];
		Return[newProp];
	];
