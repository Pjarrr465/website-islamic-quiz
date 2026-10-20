/* =====================================================
   HEWAN PIXEL
   Cara membaca: setiap HURUF = 1 kotak warna, titik (.) = kosong.
   Warna tiap huruf ada di "palette". Gambar dibuat dari kotak-kotak itu.
   Hewan berjalan karena ada 2 pose kaki (legsA dan legsB) yang berganti-ganti.
   ===================================================== */

const SPRITES = {
  kucing: {
    palette: {"O": "#FF9F1C", "D": "#E36414", "W": "#FFFFFF", "K": "#2B2D42", "P": "#FF6B9D"},
    body: [
      "...........O...O",
      "...........OO.OO",
      ".O.........OOOOO",
      ".O.........OKOKO",
      ".OO........OOPOO",
      "..OODOODOOOOWWW.",
      "...OOOOOOOOOWW..",
      "...ODODODOOOO...",
      "...OOOOOOOOOO...",
    ],
    legsA: [
      "...OO......OO...",
      "...WW......WW...",
    ],
    legsB: [
      "....OO....OO....",
      "....WW....WW....",
    ],
  },
  kambing: {
    palette: {"W": "#FFFFFF", "G": "#C9D6DF", "H": "#FFD166", "K": "#2B2D42", "P": "#FF6B9D", "B": "#8D5524"},
    body: [
      "............H.H.",
      "............HHH.",
      "...........WWWWW",
      "...........WKWWK",
      "...........WWWPP",
      "..WWWWWWWW.WWWG.",
      ".WWWWWWWWWWWGB..",
      ".WWGWWGWWWWW.B..",
      ".WWWWWWWWWWW....",
    ],
    legsA: [
      "..WW......WW....",
      "..BB......BB....",
    ],
    legsB: [
      "...WW....WW.....",
      "...BB....BB.....",
    ],
  },
  sapi: {
    palette: {"W": "#FFFFFF", "K": "#2B2D42", "P": "#FFB3C6", "H": "#FFD166", "N": "#FF6B9D"},
    body: [
      "............H.H.",
      "...........WWWWW",
      "..........KWWKWW",
      "..........WWWWWW",
      "..........PPNPPP",
      ".KWWWWWWWWWPPPP.",
      "WKWWKKWWWWWW....",
      "W.WKKKWWKKWW....",
      "..WWWKWWKKWW....",
      "..WPPWWWWWWW....",
    ],
    legsA: [
      "..WW......WW....",
      "..KK......KK....",
    ],
    legsB: [
      "...WW....WW.....",
      "...KK....KK.....",
    ],
  },
  unta: {
    palette: {"T": "#C98B4B", "D": "#8A4F1D", "K": "#2B2D42", "P": "#FF6B9D", "R": "#EF476F"},
    body: [
      "..............TT",
      "..............TT",
      ".....TTT.....TKT",
      "....TTTTT....TTT",
      "..TTTTTTTT...TTP",
      ".TTTTDTTTTT.TT..",
      ".TTTTTTTTTTTT...",
      ".TDTTTTTDTTTT...",
      "..TTTTTTTTTT....",
    ],
    legsA: [
      "..TT......TT....",
      "..TT......TT....",
      "..DD......DD....",
    ],
    legsB: [
      "...TT....TT.....",
      "...TT....TT.....",
      "...DD....DD.....",
    ],
  },
  bulan: {
    palette: {"Y": "#FFD60A", "L": "#FFF3B0", "K": "#2B2D42"},
    body: [
      "....YYYYYY......",
      "..YYYLLLY.......",
      ".YYYLL..........",
      ".YYYL...........",
      "YYYYL...........",
      "YYYYL...........",
      "YYYYY...........",
      ".YYYYY..........",
      ".YYYYYY.........",
      "..YYYYYYYYY.....",
      "....YYYYYY......",
    ],
    legsA: [],
    legsB: [],
  },
  bintang: {
    palette: {"Y": "#FFD60A", "L": "#FFF3B0"},
    body: [
      ".......YY.......",
      "......YLLY......",
      "......YLLY......",
      ".....YLLLLY.....",
      "YYYYYYLLLLYYYYYY",
      ".YLLLLLLLLLLLLY.",
      "..YLLLLLLLLLLY..",
      "...YLLLLLLLLY...",
      "...YLLLLLLLLY...",
      "..YLLLLYYLLLLY..",
      "..YLLLY..YLLLY..",
      ".YYYYY....YYYYY.",
    ],
    legsA: [],
    legsB: [],
  },
};

// Gambar satu pose menjadi <svg> (satu <rect> untuk tiap kotak berwarna)
function drawPose(sprite, rows, poseNo) {
  let boxes = "";
  rows.forEach((row, y) => {
    [...row].forEach((letter, x) => {
      if (letter !== ".") {
        boxes += `<rect x="${x}" y="${y}" width="1" height="1" fill="${sprite.palette[letter]}"/>`;
      }
    });
  });
  return `<svg class="pose pose-${poseNo}" viewBox="0 0 16 ${rows.length}" shape-rendering="crispEdges">${boxes}</svg>`;
}

// Buat elemen hewan siap ditempel ke halaman. Contoh: makeSprite("kucing")
function makeSprite(name) {
  const sprite = SPRITES[name];
  const box = document.createElement("div");
  box.className = "sprite sprite-" + name;

  const legPoses = sprite.legsB.length ? [sprite.legsA, sprite.legsB] : [sprite.legsA];
  if (legPoses.length > 1) box.classList.add("walks");   // hewan berkaki: pose berganti-ganti
  legPoses.forEach((legs, i) => {
    box.insertAdjacentHTML("beforeend", drawPose(sprite, sprite.body.concat(legs), i));
  });
  return box;
}
