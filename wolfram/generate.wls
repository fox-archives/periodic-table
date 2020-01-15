#!/usr/bin/env wolframscript
(* ::Package:: *)

(*
  this script must be a wolfram file for optimal efficiency. for some reason,
  every time we execute the wolfram cli command to process a file, it takes
  a while to start up. by sourcing other files from a `single` file using
  the 'Import' function, we can effectively get rid of this huge delay
*)

(* source wolfram-data-groups/**/*.wls *)
sourceWolframDataGroups[file_] := (
  SetDirectory[file];
  Print["GENERATING " <> ToUpperCase[file]];
  Scan[Import, Select[FileNames[], !StringFreeQ[#, ".wls"] &]];
  Print[""];
  SetDirectory[".."];
);
SetDirectory["wolfram-data-groups"];
Scan[sourceWolframDataGroups, Sort@Select[FileNames[], DirectoryQ]];

(* source build/atom-layout-data/*.wls *)
SetDirectory["../build/atom-layout-data"];
Print["GENERATING BUILD/ATOM-LAYOUT-DATA"]
Import["./atomColorsTabElectrons.wls"];
Import["./atomColorsTabProperties.wls"];
