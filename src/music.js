import { Note, Sequence } from "./TinyMusic.min.js";
var ac =
    typeof AudioContext !== "undefined"
      ? new AudioContext()
      : new webkitAudioContext(),
  // get the current Web Audio timestamp (this is when playback should begin)
  when = ac.currentTime,
  // set the tempo
  tempo = 75, // Hidas ja uhkaava tempo
  // initialize some vars
  sequence1,
  sequence2,
  sequence3,
  // create an array of "note strings" that can be passed to a sequence
  lead = [
    "D4  q", // Aloitus sävelet ovat matalat ja synkät
    "F4  e",
    "E4  e",
    "D4  q",
    "C4  e",
    "A3  e",
    "G3  h",

    "Bb3 q",
    "C4  e",
    "D4  e",
    "Bb3 q",
    "A3  e",
    "G3  e",
    "F3  h",

    "G3  q",
    "A3  e",
    "Bb3 e",
    "G3  q",
    "F3  e",
    "E3  e",
    "D3  h",

    "F3  q",
    "G3  e",
    "A3  e",
    "F3  q",
    "E3  e",
    "D3  e",
    "C3  h",
  ],
  harmony = [
    "Bb3 q", // Harmonisoidaan D4 ja F4 avulla mollikvartetti
    "D4  e",
    "C4  e",
    "Bb3 q",
    "A3  e",
    "G3  e",
    "F3  h",

    "D4  q",
    "F4  e",
    "E4  e",
    "D4  q",
    "C4  e",
    "Bb3 e",
    "A3  h",

    "C4  q",
    "D4  e",
    "F4  e",
    "C4  q",
    "Bb3 e",
    "A3  e",
    "G3  h",

    "Bb3 q",
    "C4  e",
    "D4  e",
    "Bb3 q",
    "A3  e",
    "G3  e",
    "F3  h",
  ],
  bass = [
    "D2  h", // Bassossa liikutaan synkissä ja matalissa sävelissä
    "-   q",
    "D2  q",

    "A1  h",
    "-   q",
    "A1  q",

    "G1  h",
    "-   q",
    "G1  q",

    "C2  h",
    "-   q",
    "C2  q",

    "D2  h",
    "-   q",
    "D2  q",

    "A1  h",
    "-   q",
    "A1  q",
  ];

// create 3 new sequences (one for lead, one for harmony, one for bass)
sequence1 = new Sequence(ac, tempo, lead);
sequence2 = new Sequence(ac, tempo, harmony);
sequence3 = new Sequence(ac, tempo, bass);

// set staccato and smoothing values for a darker feel
sequence1.staccato = 0.2;
sequence2.staccato = 0.2;
sequence3.staccato = 0.1;
sequence3.smoothing = 0.3;

// adjust the levels so the bass and harmony aren't too loud
sequence1.gain.gain.value = 0.7 / 2;
sequence2.gain.gain.value = 0.7 / 2;
sequence3.gain.gain.value = 0.5 / 2;

// apply EQ settings
sequence1.mid.frequency.value = 400;
sequence1.mid.gain.value = 2;
sequence2.mid.frequency.value = 600;
sequence3.mid.gain.value = 4;
sequence3.bass.gain.value = 8;
sequence3.bass.frequency.value = 50;
sequence3.mid.gain.value = -3;
sequence3.mid.frequency.value = 300;
sequence3.treble.gain.value = -4;
sequence3.treble.frequency.value = 1000;

// play
//
export const playSong = () => {
  when = ac.currentTime;
  //start the lead part immediately
  sequence1.play(when);
  // delay the harmony by 4 beats
  sequence2.play(when + (60 / tempo) * 4);
  // start the bass part immediately
  sequence3.play(when);
};

// pause
//document.querySelector('#stop').addEventListener('click', function() {
//    sequence1.stop();
//    sequence2.stop();
//    sequence3.stop();
//}, false);
