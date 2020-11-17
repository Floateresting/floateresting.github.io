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
const inputs = [
    '#fg',
    '#bg',
    '#w',
    '#h',
    '#d'
].map(i => $(i).get(0));
function updateColors() {
    $('style').text(`:root{--fg:${inputs[0].value};--bg:${inputs[1].value};}`);
}
/**
 * Parse query strings and replace them in their <input> tags by id
 * @param keys keys to look for
 */
function queryToInput(...keys) {
    let pair;
    window.location.search.substr(1).split('&').forEach(q => {
        pair = q.split('=');
        if (keys.includes(pair[0])) {
            $('#' + pair[0])[0].value = pair[1];
        }
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(r => setTimeout(r, ms));
    });
}
/**
 * Generate an array from 0 to n
 * @param n length of the array
 */
function array(n) {
    return Array.from(Array(n), (_, i) => i);
}
/**
 * Fisher-Yates shuffle algorithm
 * @param a
 */
function shuffle(a) {
    for (let i = a.length, j; i--;) {
        j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}
