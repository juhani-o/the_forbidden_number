import { Note, Sequence } from "./TinyMusic.min.js";
var ac =
    typeof AudioContext !== "undefined"
      ? new AudioContext()
      : new webkitAudioContext(),
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 125, // Nopeampi mutta rauhallisempi tempo
  // initialize some vars
  sequence1,
  sequence2,
  sequence3,
  // create an array of "note strings" that can be passed to a sequence
  lead = [
    "G4  e",
    "A4  e",
    "B4  q",
    "C5  e",
    "D5  e",
    "E5  q",
    "F#5 e",
    "G5  e",
    "F#5 e",
    "E5  e",
    "D5  q",
    "C5  e",
    "B4  e",
    "A4  q",
    "G4  h",

    "D4  e",
    "E4  e",
    "F#4 q",
    "G4  e",
    "A4  e",
    "B4  q",
    "C5  e",
    "D5  e",
    "C5  e",
    "B4  e",
    "A4  q",
    "G4  e",
    "F#4 e",
    "E4  q",
    "D4  h",

    "C4  e",
    "D4  e",
    "E4  q",
    "F4  e",
    "G4  e",
    "A4  q",
    "B4  e",
    "C5  e",
    "B4  e",
    "A4  e",
    "G4  q",
    "F4  e",
    "E4  e",
    "D4  q",
    "C4  h",
  ],
  harmony = [
    "E4  e",
    "G4  e",
    "A4  q",
    "C5  e",
    "D5  e",
    "E5  q",
    "F#5 e",
    "G5  e",
    "F#5 e",
    "E5  e",
    "D5  q",
    "C5  e",
    "A4  e",
    "G4  q",
    "E4  h",

    "C4  e",
    "E4  e",
    "F#4 q",
    "A4  e",
    "B4  e",
    "C5  q",
    "D5  e",
    "E5  e",
    "D5  e",
    "C5  e",
    "B4  q",
    "A4  e",
    "F#4 e",
    "E4  q",
    "C4  h",

    "A3  e",
    "C4  e",
    "D4  q",
    "E4  e",
    "G4  e",
    "A4  q",
    "B4  e",
    "C5  e",
    "A4  e",
    "G4  e",
    "F#4 q",
    "E4  e",
    "D4  e",
    "C4  q",
    "A3  h",
  ],
  bass = [
    "G2  h",
    "D2  q",
    "E2  q",
    "C2  h",
    "G2  q",
    "A2  q",
    "D2  h",
    "A2  q",
    "B2  q",

    "C2  h",
    "G2  q",
    "A2  q",
    "F2  h",
    "C2  q",
    "D2  q",
    "G2  h",
    "D2  q",
    "E2  q",

    "A2  h",
    "E2  q",
    "F#2  q",
    "C2  h",
    "G2  q",
    "A2  q",
    "D2  h",
    "A2  q",
    "B2  q",
  ];

// create 3 new sequences (one for lead, one for harmony, one for bass)
sequence1 = new Sequence(ac, tempo, lead);
sequence2 = new Sequence(ac, tempo, harmony);
sequence3 = new Sequence(ac, tempo, bass);

// set staccato and smoothing values for a brighter feel
sequence1.staccato = 0.3; // Iloisempi ja kevyempi tuntuma
sequence2.staccato = 0.3;
sequence3.staccato = 0.2;
sequence3.smoothing = 0.1;

// adjust the levels so the bass and harmony aren't too loud
sequence1.gain.gain.value = 0.8 / 2;
sequence2.gain.gain.value = 0.6 / 2;
sequence3.gain.gain.value = 0.4 / 2;

// apply EQ settings
sequence1.mid.frequency.value = 500;
sequence1.mid.gain.value = 3;
sequence2.mid.frequency.value = 700;
sequence3.mid.gain.value = 5;
sequence3.bass.gain.value = 6;
sequence3.bass.frequency.value = 60;
sequence3.mid.gain.value = -2;
sequence3.mid.frequency.value = 400;
sequence3.treble.gain.value = -2;
sequence3.treble.frequency.value = 1200;

// play
export const playSong = () => {
  when = ac.currentTime;
  //start the lead part immediately
  sequence1.play(when);
  // delay the harmony by 2 beats for more interaction
  sequence2.play(when + (60 / tempo) * 2);
  // start the bass part immediately
  sequence3.play(when);
};
