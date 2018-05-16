var app = new Vue({
  el: '#table-container',
  data: {
    elements: [
      { atomicNumber: 1,         name: "Hydrogen",     abbreviation: "H",       id: "h",   group: "g-1",   period: "p-1",  block: "s",  atomicMass: 1.008,    meltingPoint: 13.99,     boilingPoint: 20.271,    discoveryDate: 1766,           discoveredBy: "Henry Cavendish" },
      { atomicNumber: 2,         name: "Helium",       abbreviation: "He",      id: "he",  group: "g-18",  period: "p-1",  block: "s",  atomicMass: 4.003,    meltingPoint: -1,        boilingPoint: 4.222,     discoveryDate: 1895,           discoveredBy: "Sir William Ramsay, Per Teodor Cleve, and Nils Abraham" },
      { atomicNumber: 3,         name: "Lithium",      abbreviation: "Li",      id: "li",  group: "g-1",   period: "p-2",  block: "s",  atomicMass: 6.940,    meltingPoint: 453.65,    boilingPoint: 1615,      discoveryDate: 1817,           discoveredBy: "Johan August Arfvedson" },
      { atomicNumber: 4,         name: "Beryllium",    abbreviation: "Be",      id: "be",  group: "g-2",   period: "p-2",  block: "s",  atomicMass: 9.012,    meltingPoint: 1560,      boilingPoint: 2741,      discoveryDate: 1797,           discoveredBy: "Nicholas Louis Vauquelin" },
      { atomicNumber: 5,         name: "Boron",        abbreviation: "B",       id: "b",   group: "g-13",  period: "p-2",  block: "p",  atomicMass: 10.810,   meltingPoint: 2350,      boilingPoint: 4273,      discoveryDate: 1808,           discoveredBy: "Louis-Josef Gay-Lussac, Louis-Jacques The`nard, and Humphry Davy" },
      { atomicNumber: 6,         name: "Carbon",       abbreviation: "C",       id: "c",   group: "g-14",  period: "p-2",  block: "p",  atomicMass: 12.011,   meltingPoint: 4098,      boilingPoint: 4098,      discoveryDate: "Prehistoric",  discoveredBy: "Prehistoric" },
      { atomicNumber: 7,         name: "Nitrogen",     abbreviation: "N",       id: "n",   group: "g-15",  period: "p-2",  block: "p",  atomicMass: 14.007,   meltingPoint: 63.2,      boilingPoint: 77.355,    discoveryDate: 1772,           discoveredBy: "Daniel Rutherford" },
      { atomicNumber: 8,         name: "Oxygen",       abbreviation: "O",       id: "o",   group: "g-16",  period: "p-2",  block: "p",  atomicMass: 15.999,   meltingPoint: 54.36,     boilingPoint: 90.188,    discoveryDate: 1774,           discoveredBy: "Joseph Priestley and Carl Wilhelm Scheele" },
      { atomicNumber: 9,         name: "Flourine",     abbreviation: "Fl",      id: "fl",  group: "g-17",  period: "p-2",  block: "p",  atomicMass: 18.998,   meltingPoint: 53.48,     boilingPoint: 85.04,     discoveryDate: 1886,           discoveredBy: "Henri Moissan" },
      { atomicNumber: 10,        name: "Neon",         abbreviation: "N",       id: "n",   group: "g-18",  period: "p-2",  block: "p",  atomicMass: 20.180,   meltingPoint: 24.56,     boilingPoint: 27.104,    discoveryDate: 1898,           discoveredBy: "Sir William Ramsay and Morris Travers" },
      { atomicNumber: 11,        name: "Sodium",       abbreviation: "Na",      id: "na",  group: "g-1",   period: "p-3",  block: "s",  atomicMass: 22.990,   meltingPoint: 370.944,   boilingPoint: 1156.090,  discoveryDate: 1807,           discoveredBy: "Humphry Davy" },
      { atomicNumber: 12,        name: "Magnesium",    abbreviation: "Mg",      id: "mg",  group: "g-2",   period: "p-3",  block: "s",  atomicMass: 24.305,   meltingPoint: 923,       boilingPoint: 1363,      discoveryDate: 1755,           discoveredBy: "Joseph Black" },
      { atomicNumber: 13,        name: "Aluminium",    abbreviation: "Al",      id: "al",  group: "g-13",  period: "p-3",  block: "p",  atomicMass: 26.982,   meltingPoint: 933.473,   boilingPoint: 2792,      discoveryDate: 1825,           discoveredBy: "Hans Oersted" },
      { atomicNumber: 14,        name: "Silicon",      abbreviation: "Si",      id: "si",  group: "g-14",  period: "p-3",  block: "p",  atomicMass: 28.085,   meltingPoint: 1687,      boilingPoint: 3538,      discoveryDate: 1824,           discoveredBy: "Jo..ns Jacob Berzelius" },
      { atomicNumber: 15,        name: "Phosphorous",  abbreviation: "P",       id: "p",   group: "g-15",  period: "p-3",  block: "p",  atomicMass: 30.974,   meltingPoint: 317.3,     boilingPoint: 553.7,     discoveryDate: 1669,           discoveredBy: "Hennig Brandt" },
      { atomicNumber: 16,        name: "Sulfur",       abbreviation: "S",       id: "s",   group: "g-16",  period: "p-3",  block: "p",  atomicMass: 32.060,   meltingPoint: 388.36,    boilingPoint: 717.76,    discoveryDate: "Prehistoric",  discoveredBy: "Prehistoric" },
      { atomicNumber: 17,        name: "Chlorine",     abbreviation: "Cl",      id: "cl",  group: "g-17",  period: "p-3",  block: "p",  atomicMass: 35.450,   meltingPoint: 171.7,     boilingPoint: 239.11,    discoveryDate: 1774,           discoveredBy: "Carl Wilhelm Scheele" },
      { atomicNumber: 18,        name: "Argon",        abbreviation: "Ar",      id: "ar",  group: "g-18",  period: "p-3",  block: "p",  atomicMass: 39.948,   meltingPoint: 83.81,     boilingPoint: 87.302,    discoveryDate: 1894,           discoveredBy: "Lord Rayleigh and Sir William Ramsay" },
      { atomicNumber: 19,        name: "Potassium",    abbreviation: "K",       id: "k",   group: "g-1",   period: "p-4",  block: "s",  atomicMass: 39.098,   meltingPoint: 336.7,     boilingPoint: 1032,      discoveryDate: 1807,           discoveredBy: "Humphry Davy" },
      { atomicNumber: 20,        name: "Calcium",      abbreviation: "Ca",      id: "ca",  group: "g-2",   period: "p-4",  block: "s",  atomicMass: 40.078,   meltingPoint: 1115,      boilingPoint: 1757,      discoveryDate: 1808,           discoveredBy: "Humphry Davy" },
      { atomicNumber: 21,        name: "Scandium",     abbreviation: "Sc",      id: "sc",  group: "g-3",   period: "p-4",  block: "d",  atomicMass: 44.956,   meltingPoint: 1814,      boilingPoint: 3109,      discoveryDate: 1879,           discoveredBy: "Lars Frederik Nilson" },
      { atomicNumber: 22,        name: "Titanium",     abbreviation: "Ti",      id: "ti",  group: "g-4",   period: "p-4",  block: "d",  atomicMass: 47.867,   meltingPoint: 1943,      boilingPoint: 3560,      discoveryDate: 1791,           discoveredBy: "William Gregor" },
      { atomicNumber: 23,        name: "Vanadium",     abbreviation: "V",       id: "v",   group: "g-5",   period: "p-4",  block: "d",  atomicMass: 50.942,   meltingPoint: 2183,      boilingPoint: 3680,      discoveryDate: 1801,           discoveredBy: "Andre`s Manuel del Rio" },
      { atomicNumber: 24,        name: "Chromium",     abbreviation: "Cr",      id: "cr",  group: "g-6",   period: "p-4",  block: "d",  atomicMass: 51.996,   meltingPoint: 2180,      boilingPoint: 2944,      discoveryDate: 1798,           discoveredBy: "Nicholas Louis Vauquelin" },
      { atomicNumber: 25,        name: "Manganese",    abbreviation: "Mn",      id: "mn",  group: "g-7",   period: "p-4",  block: "d",  atomicMass: 54.938,   meltingPoint: 1519,      boilingPoint: 2334,      discoveryDate: 1774,           discoveredBy: "Johan Gottlieb Gahn" },
      { atomicNumber: 26,        name: "Iron",         abbreviation: "Fe",      id: "fe",  group: "g-8",   period: "p-4",  block: "d",  atomicMass: 55.845,   meltingPoint: 1811,      boilingPoint: 3134,      discoveryDate: ~-3500,         discoveredBy: "N/A" },
      { atomicNumber: 27,        name: "Cobalt",       abbreviation: "Co",      id: "co",  group: "g-9",   period: "p-4",  block: "d",  atomicMass: 58.933,   meltingPoint: 1768,      boilingPoint: 3200,      discoveryDate: 1739,           discoveredBy: "Georg Brandt" },
      { atomicNumber: 28,        name: "Nickel",       abbreviation: "Ni",      id: "ni",  group: "g-10",  period: "p-4",  block: "d",  atomicMass: 58.693,   meltingPoint: 1728,      boilingPoint: 3186,      discoveryDate: 1751,           discoveredBy: "Axel Fredrik Cronstedt" },
      { atomicNumber: 29,        name: "Copper",       abbreviation: "Cu",      id: "cu",  group: "g-11",  period: "p-4",  block: "d",  atomicMass: 63.546,   meltingPoint: 1357.77,   boilingPoint: 2833,      discoveryDate: "Prehistoric",  discoveredBy: "Prehistoric" },
      { atomicNumber: 30,        name: "Zinc",         abbreviation: "Zn",      id: "zn",  group: "g-12",  period: "p-4",  block: "d",  atomicMass: 65.380,   meltingPoint: 692.677,   boilingPoint: 1180,      discoveryDate: 1746,           discoveredBy: "Andreas Marggraf" },  //discoveryDate as "Zinc" was 1746, but Greeks and Romans knew about element before -20
      { atomicNumber: 31,        name: "Gallium",      abbreviation: "Ga",      id: "ga",  group: "g-13",  period: "p-4",  block: "p",  atomicMass: 69.723,   meltingPoint: 302.9146,  boilingPoint: 2502,      discoveryDate: 1875,           discoveredBy: "Paul-E`mile Lecoq de Boisbaudran" },
      { atomicNumber: 32,        name: "Germanium",    abbreviation: "Ge",      id: "ge",  group: "g-14",  period: "p-4",  block: "p",  atomicMass: 72.630,   meltingPoint: 1211.4,    boilingPoint: 3106,      discoveryDate: 1886,           discoveredBy: "Clemens Winkler" },
      { atomicNumber: 33,        name: "Arsenic",      abbreviation: "As",      id: "as",  group: "g-15",  period: "p-4",  block: "p",  atomicMass: 74.922,   meltingPoint: 889,       boilingPoint: 889,       discoveryDate: "~1250",        discoveredBy: "Albertus Magnus" },
      { atomicNumber: 34,        name: "Selenium",     abbreviation: "Se",      id: "se",  group: "g-16",  period: "p-4",  block: "p",  atomicMass: 78.971,   meltingPoint: 494,       boilingPoint: 958,       discoveryDate: 1817,           discoveredBy: "Jo..ns Jacob Berzelius" },
      { atomicNumber: 35,        name: "Bromine",      abbreviation: "Br",      id: "br",  group: "g-17",  period: "p-4",  block: "p",  atomicMass: 79.904,   meltingPoint: 266,       boilingPoint: 322,       discoveryDate: 1826,           discoveredBy: "Antoine-Je`ro^me Balard and Carl L..owig" },
      { atomicNumber: 36,        name: "Krypton",      abbreviation: "Kr",      id: "kr",  group: "g-18",  period: "p-4",  block: "p",  atomicMass: 83.798,   meltingPoint: 115.78,    boilingPoint: 119.735,   discoveryDate: 1898,           discoveredBy: "Sir William Ramsay and Morris Travers" },
      { atomicNumber: 37,        name: "Rubidium",     abbreviation: "Rb",      id: "rb",  group: "g-1",   period: "p-5",  block: "s",  atomicMass: 85.468,   meltingPoint: 312.45,    boilingPoint: 961,       discoveryDate: 1861,           discoveredBy: "Gustav Kirchhoff and Robert Bunsen" },
      { atomicNumber: 38,        name: "Strontium",    abbreviation: "Sr",      id: "sr",  group: "g-2",   period: "p-5",  block: "s",  atomicMass: 87.620,   meltingPoint: 1050,      boilingPoint: 1650,      discoveryDate: 1790,           discoveredBy: "Adair Crawford" },
      { atomicNumber: 39,        name: "Yttrium",      abbreviation: "Y",       id: "y",   group: "g-3",   period: "p-5",  block: "d",  atomicMass: 88.906,   meltingPoint: 1795,      boilingPoint: 3618,      discoveryDate: 1794,           discoveredBy: "Johan Gadolin" },
      { atomicNumber: 40,        name: "Zirconium",    abbreviation: "Zr",      id: "zr",  group: "g-4",   period: "p-5",  block: "d",  atomicMass: 91.224,   meltingPoint: 2127,      boilingPoint: 4679,      discoveryDate: 1789,           discoveredBy: "Martin Heinrich Klaproth"},
      { atomicNumber: 41,        name: "Niobium",      abbreviation: "Nb",      id: "nb",  group: "g-5",   period: "p-5",  block: "d",  atomicMass: 92.906,   meltingPoint: 2750,      boilingPoint: 5014,      discoveryDate: 1801,           discoveredBy: "Charles Hatchett" },
      { atomicNumber: 42,        name: "Molybdenum",   abbreviation: "Mo",      id: "mo",  group: "g-6",   period: "p-5",  block: "d",  atomicMass: 95.950,   meltingPoint: 2895,      boilingPoint: 4912,      discoveryDate: 1781,           discoveredBy: "Peter Jacob Hjelm" },
      { atomicNumber: 43,        name: "Technetium",   abbreviation: "Tc",      id: "tc",  group: "g-7",   period: "p-5",  block: "d",  atomicMass: "(98)",   meltingPoint: 2430,      boilingPoint: 4535,      discoveryDate: 1937,           discoveredBy: "Carlo Perrier and Emilio Segre`" },
      { atomicNumber: 44,        name: "Ruthenium",    abbreviation: "Ru",      id: "ru",  group: "g-8",   period: "p-5",  block: "d",  atomicMass: 101.07,   meltingPoint: 2606,      boilingPoint: 4420,      discoveryDate: 1844,           discoveredBy: "Karl Karlovich Klaus" },
      { atomicNumber: 45,        name: "Rhodium",      abbreviation: "Rh",      id: "rh",  group: "g-9",   period: "p-5",  block: "d",  atomicMass: 102.906,  meltingPoint: 2236,      boilingPoint: 3968,      discoveryDate: 1803,           discoveredBy: "William Hyde Wollaston" },
      { atomicNumber: 46,        name: "Palladium",    abbreviation: "Pd",      id: "pd",  group: "g-10",  period: "p-5",  block: "d",  atomicMass: 106.42,   meltingPoint: 1828,      boilingPoint: 3236,      discoveryDate: 1803,           discoveredBy: "William Hyde Wollastom" },
      { atomicNumber: 47,        name: "Silver",       abbreviation: "Ag",      id: "ag",  group: "g-11",  period: "p-5",  block: "d",  atomicMass: 107.868,  meltingPoint: 1234.93,   boilingPoint: 2435,      discoveryDate: "~-3000",       discoveredBy: "N/A"},
      { atomicNumber: 48,        name: "Cadmium",      abbreviation: "Cd",      id: "cd",  group: "g-12",  period: "p-5",  block: "d",  atomicMass: 112.414,  meltingPoint: 594.219,   boilingPoint: 1040,      discoveryDate: 1817,           discoveredBy: "Friedrich Stromeyer" },
      { atomicNumber: 49,        name: "Indium",       abbreviation: "In",      id: "in",  group: "g-13",  period: "p-5",  block: "p",  atomicMass: 114.818,  meltingPoint: 429.75,    boilingPoint: 2300,      discoveryDate: 1863,           discoveredBy: "Ferdinand Reich and Hieronymous Richter" },
      { atomicNumber: 50,        name: "Tin",          abbreviation: "Sn",      id: "sn",  group: "g-14",  period: "p-5",  block: "p",  atomicMass: 118.710,  meltingPoint: 505.078,   boilingPoint: 2859,      discoveryDate: "~-2100",       discoveredBy: "N/A" },
      { atomicNumber: 51,        name: "Antmony",      abbreviation: "Sb",      id: "sb",  group: "g-15",  period: "p-5",  block: "p",  atomicMass: 121.760,  meltingPoint: 903.778,   boilingPoint: 1860,      discoveryDate: "~-1600",       discoveredBy: "N/A" },
      { atomicNumber: 52,        name: "Tellurium",    abbreviation: "Te",      id: "te",  group: "g-16",  period: "p-5",  block: "p",  atomicMass: 127.60,   meltingPoint: 722.66,    boilingPoint: 1261,      discoveryDate: 1783,           discoveredBy: "Franz-Joseph Mu..ler von Reichenstein" },
      { atomicNumber: 53,        name: "Iodine",       abbreviation: "I",       id: "i",   group: "g-17",  period: "p-5",  block: "p",  atomicMass: 126.904,  meltingPoint: 386.9,     boilingPoint: 457.6,     discoveryDate: 1811,           discoveredBy: "Bernard Courtois" },
      { atomicNumber: 54,        name: "Xenon",        abbreviation: "Xe",      id: "xe",  group: "g-18",  period: "p-5",  block: "p",  atomicMass: 131.293,  meltingPoint: 161.4,     boilingPoint: 165.051,   discoveryDate: 1898,           discoveredBy: "Sir William Ramsay and Morris Travers" },
      { atomicNumber: 55,        name: "Caesium",      abbreviation: "Cs",      id: "cs",  group: "g-1",   period: "p-6",  block: "s",  atomicMass: 132.905,  meltingPoint: 301.7,     boilingPoint: 944,       discoveryDate: 1860,           discoveredBy: "Gustav Kirchhoff and Robert Bunsen" },
      { atomicNumber: 56,        name: "Barium",       abbreviation: "Ba",      id: "ba",  group: "g-2",   period: "p-6",  block: "s",  atomicMass: 137.327,  meltingPoint: 1000,      boilingPoint: 2118,      discoveryDate: 1808,           discoveredBy: "Humphry Davy" },
      { atomicNumber: "57-71",   name: "Lanthanides",  abbreviation: "Lan.",  id: "z1",  group: "g-3",   period: "p-6",  block: "d",  atomicMass: "",       meltingPoint: "",        boilingPoint: "",        discoveryDate: "",             discoveredBy: "" },
      { atomicNumber: 72,        name: "Hafnium",      abbreviation: "Hf",      id: "hf",  group: "g-4",   period: "p-6",  block: "d",  atomicMass: 178.49,   meltingPoint: 2506,      boilingPoint: 4873,      discoveryDate: 1923,           discoveredBy: "George Charles de Hevesy and Dirk Coster" },
      { atomicNumber: 73,        name: "Tantalum",     abbreviation: "Ta",      id: "ta",  group: "g-5",   period: "p-6",  block: "d",  atomicMass: 180.948,  meltingPoint: 3290,      boilingPoint: 5728,      discoveryDate: 1802,           discoveredBy: "Anders Gustav Ekeberg" },
      { atomicNumber: 74,        name: "Tungsten",     abbreviation: "W",       id: "w",   group: "g-6",   period: "p-6",  block: "d",  atomicMass: 183.84,   meltingPoint: 3687,      boilingPoint: 5828,      discoveryDate: 1783,           discoveredBy: "Juan Elhuyar and Fausto Elhuyar" },


      { atomicNumber: 87,        name: "Francium",     abbreviation: "Fr",      id: "fr",  group: "g-1",   period: "p-7",  block: "s",  atomicMass: "(223)",  meltingPoint: 294,       boilingPoint: 923,       discoveryDate: 1939,           discoveredBy: "Marguerite Perey" },
      { atomicNumber: 88,        name: "Radium",       abbreviation: "Ra",      id: "ra",  group: "g-2",   period: "p-7",  block: "s",  atomicMass: "(226)",  meltingPoint: 969,       boilingPoint: 1773,      discoveryDate: 1898,           discoveredBy: "Pierre Curie and Marie Curie" },
      { atomicNumber: "89-103",  name: "Actinides",    abbreviation: "Act.",  id: "z1",  period: "p-7", group: "g-3",  block: "f",    atomicMass: "",       meltingPoint: "",        boilingPoint: "",        discoveryDate: "",             discoveredBy: "" },
      { atomicNumber: 118,       name: "Oganesson",    abbreviation: "Og",      id: "z2",  period: "p-7", group: "g-18" },
    ],
    hoverAtomicNumber: "1",
    hoverAbbreviation: "H",
    hoverName: "Hydrogen",
    hoverAtomicMass: 1.008,

    DDiscoveryDate: "1766",
    DDiscoverer: "Henry Cavendish"
  },
  methods: {
    // Update element overview and description
    updateElementInfo: function(event) {

      // Atomic Number
      if(isNumber(event.srcElement.parentNode.children[0].innerHTML) || atomicNumIsRange(event.srcElement.parentNode.children[0].innerHTML))
      {
        var atomicNumberDiv = event.srcElement.parentNode.children[0];
        this.hoverAtomicNumber = atomicNumberDiv.innerHTML;
        console.log(event);
      }
      else if (event.srcElement.classList[0] == "element-outer")
      {
        var atomicNumberDiv = event.srcElement.firstChild.children[0];
        this.hoverAtomicNumber = atomicNumberDiv.innerHTML
      }
      else if (event.srcElement.classList[0] == "element-inner")
      {
        var atomicNumberDiv = event.srcElement.children[0]
        this.hoverAtomicNumber = atomicNumberDiv.innerHTML
      }
      else
      {
        console.log("updateElementInfo method in main.vue returned an event not accounted for.");
      }

      // Abbreviation
      /*if(event.srcElement.parentNode.children[1] != undefined)
      {
        this.hoverAbbreviation = event.srcElement.parentNode.children[1].innerHTML;
      }*/

      /*
      // Name
      if(nameDiv != undefined)
      {
        this.hoverName = nameDiv.innerHTML;
      }

      //Atomic Mass
      // For some reason checking if atomicMass.innerHTML is a number does not work and throws errors in javascript
      if(atomicMassDiv != undefined)
      {
        this.hoverAtomicMass = atomicMassDiv.innerHTML;
      }
      */
    }
  }
})
