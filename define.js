let hpnum=0, speadnum=0, lucknum=0, handannum=0, total=0;

const sta = document.getElementById('sta');
const spead_set = document.getElementById('spead_set');
const handan_set = document.getElementById('handan_set');
const hp_set = document.getElementById('hp_set');
const luck_set = document.getElementById('luck_set');

const start = document.getElementById('start');
const next = document.getElementById("next");
const reset = document.getElementById("reset");
const nextco = document.getElementById("nextco");
const dicescreen = document.getElementById("dicescreen");
const cmd1 = document.getElementById("cmd1");
const cmd2 = document.getElementById("cmd2");
const cmd3 = document.getElementById("cmd3");
const time = document.getElementById("time");
const place = document.getElementById("place");
const status = document.getElementById("status");
const Status = document.getElementById("Status");
const StatusBuck = document.getElementById("StatusBuck");

const Happyend = document.getElementById("Happyend");
const gameover = document.getElementById("gameover");
const Trend = document.getElementById("Trueend");
const end = document.getElementById("end");

const LUCK_game=document.getElementById("LUCK_game");
const SPEAD_game=document.getElementById("SPEAD_game");
const HP_game=document.getElementById("HP_game");
const HANDAN_game=document.getElementById("HANDAN_game");

let Luck;
let Spead;
let Hp;
let Handan;
let playerName;

let person;
let inventory = [];
let help=[];

let Time=10;

let decrsta=null;
let pendingDice = null;
let pendingcount =0;

function dice(status) {
    let d = document.getElementById(status);
    m = Math.floor(Math.random()*6+1);
    d.textContent = m;
}

function diceRoll() {
    return Math.floor(Math.random() * 6 + 1); // 1～6を返す
}

let year = null;
let month = null;
let date = null;
let hours = null;
let minutes = null;
