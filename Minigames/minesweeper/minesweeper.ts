enum Tile {
    Mine = 'mine',
    Unopened = 'unopened',
    Flagged = 'flagged'
}

interface Player {
    isPlaying: boolean;
    isDead: boolean;
}

class Minesweeper {
    width: number;
    height: number;
    density: number;
    table: HTMLTableElement;
    delta: number[];
    generated: boolean = false;
    player: Player = { isPlaying: false, isDead: false };
    tds: HTMLElement[] = [];

    /**
     * @param t Mine field
     * @param option width, height, density
     */
    constructor(t: HTMLTableElement, ...option: number[]) {
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
                r.insertCell().classList.add(Tile.Unopened);
            }
        }
        this.tds = $('td').get();
    }

    generateAt(index: number) {
        this.generated = true;

        let n = Math.floor(this.width * this.height * this.density / 100);
        // generate all indexes expect the 9 tiles around the first click
        let toDelete = this.delta.map(d => index + d);
        let a = array(this.width * this.height)
            .filter(i => !(toDelete.includes(i) || i == index));
        // Fisher-Yates shuffle algorithm
        shuffle(a);
        // select n mines
        for (let i = 0; i < n; i++) {
            this.tds[a[i]].classList.add(Tile.Mine);
        }
        // count
        this.tds.forEach((td, i) => {
            if (!td.classList.contains(Tile.Mine)) {
                n = this.searchAdjacent(
                    i,
                    (t: HTMLTableCellElement) => t.classList.contains(Tile.Mine)
                ).length;
                if (n) td.innerText = n.toString();
            }
        });
    }

    async openAt(i: number) {
        // if first click, generate mines
        if (!this.generated)
            this.player.isPlaying = true, this.generateAt(i);
        // if not playing, do nothing
        if (!this.player.isPlaying) return;

        // bfs
        let ts: number[] = [i];
        let td: HTMLElement;
        while (ts.length) {
            i = ts.shift()!, td = this.tds[i];
            td.classList.remove(Tile.Unopened);

            await sleep(1);
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
                ts.push(...this.searchAdjacent(
                    i,
                    // has to be unopened, no mine, no flagged
                    (t: HTMLTableCellElement, ni: number) => !ts.includes(ni)
                        && t.classList.contains(Tile.Unopened)
                        && t.classList.length == 1
                ));
            }
        }
    }

    flagAt(i: number) {
        this.tds[i].classList.toggle(Tile.Flagged);
    }

    private searchAdjacent(i: number, condition: Function): number[] {
        let t: HTMLElement;
        let ni: number;
        return this.delta.filter(d => {
            ni = i + d;
            // if wrap
            if (i % this.width == 0 && ni % this.width == this.width - 1) return false;
            if ((i + 1) % this.width == 0 && ni % this.width == 0) return false;

            return typeof (t = this.tds[ni]) != 'undefined' && condition(t, ni);
        }).map(d => d + i);
    }
}
