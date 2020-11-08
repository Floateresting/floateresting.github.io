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
/**
 * Parse query strings and add them to <input> tags by id
 * @param keys required keys
 * @returns true if query string is valid
 */
function queryToInput(...keys) {
    let map = new Map();
    let pair;
    window.location.search.substr(1).split('&').forEach(q => {
        pair = q.split('=');
        if (keys.includes(pair[0])) {
            map.set(pair[0], pair[1]);
        }
    });
    if (map.size == keys.length) {
        // set the values in <input>
        keys.forEach(k => $('#' + k)[0].value = map.get(k));
    }
    return map.size == keys.length;
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(r => setTimeout(r, ms));
    });
}
