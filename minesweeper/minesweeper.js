"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Tile;
(function (Tile) {
    Tile["Mine"] = "mine";
    Tile["Unopened"] = "unopened";
    Tile["Flagged"] = "flagged";
})(Tile || (Tile = {}));
class Minesweeper {
    /**
     * @param t Mine field
     * @param option width, height, density
     */
    constructor(t, ...option) {
        this.generated = false;
        this.player = { isPlaying: false, isDead: false };
        this.tds = [];
        let [w, h, d] = option;
        // convert any invalid density to [0,100)
        d = Math.abs(d % 100);
        this.table = t;
        this.width = w;
        this.height = h;
        this.density = d;
        this.delta = [-w - 1, -w, -w + 1, -1, 1, w - 1, w, w + 1];
    }
    initialize() {
        for (let h = 0; h < this.height; h++) {
            for (let w = 0, r = this.table.insertRow(0); w < this.width; w++) {
                r.insertCell()
                    .classList.add(Tile.Unopened);
            }
        }
        this.tds = $('td').get();
    }
    generateAt(index) {
        this.generated = true;
        let n = Math.floor(this.width * this.height * this.density / 100);
        // generate all indexes expect the 9 tiles around the first click
        let toDelete = this.delta.map(d => index + d);
        let a = Array.from(Array(this.width * this.height), (_, i) => i)
            .filter(i => !(toDelete.includes(i) || i == index));
        // Fisher-Yates shuffle algorithm
        let j;
        for (let i = a.length; i--;) {
            j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        // select n mines
        for (let i = 0; i < n; i++) {
            this.tds[a[i]].classList.add(Tile.Mine);
        }
        // count
        this.tds.forEach((td, i) => {
            if (!td.classList.contains(Tile.Mine)) {
                n = this.searchAdjacent(i, (t) => t.classList.contains(Tile.Mine)).length;
                if (n)
                    td.innerText = n.toString();
            }
        });
    }
    openAt(i) {
        return __awaiter(this, void 0, void 0, function* () {
            // if first click, generate mines
            if (!this.generated)
                this.player.isPlaying = true, this.generateAt(i);
            // if not playing, do nothing
            if (!this.player.isPlaying)
                return;
            // bfs
            let ts = [i];
            let td;
            while (ts.length) {
                i = ts.shift(), td = this.tds[i];
                td.classList.remove(Tile.Unopened);
                yield sleep(1);
                if (td.classList.contains(Tile.Mine)) {
                    // DEATH !!
                    this.player.isDead = true;
                    this.player.isPlaying = false;
                    // show all tiles
                    $('td').removeClass(Tile.Unopened);
                    return;
                }
                td.classList.remove(Tile.Flagged);
                // if every unopened tiles are mines
                if (this.tds.filter(t => t.classList.contains(Tile.Unopened))
                    .every(t => t.classList.contains(Tile.Mine))) {
                    // victory
                    this.player.isPlaying = false;
                    return;
                }
                // if no adjecent mines
                if (!td.innerText) {
                    ts.push(...this.searchAdjacent(i, 
                    // has to be unopened, no mine, no flagged
                    (t, ni) => !ts.includes(ni)
                        && t.classList.contains(Tile.Unopened)
                        && t.classList.length == 1));
                }
            }
        });
    }
    flagAt(i) {
        this.tds[i].classList.toggle(Tile.Flagged);
    }
    searchAdjacent(i, condition) {
        let t;
        let ni;
        return this.delta.filter(d => {
            ni = i + d;
            // if wrap
            if (i % this.width == 0 && ni % this.width == this.width - 1)
                return false;
            if ((i + 1) % this.width == 0 && ni % this.width == 0)
                return false;
            return typeof (t = this.tds[ni]) != 'undefined' && condition(t, ni);
        }).map(d => d + i);
    }
}
