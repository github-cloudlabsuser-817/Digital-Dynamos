import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StringUtils {
    stringBetweenStrings(startStr, endStr, str) {
        let pos = startStr.length === 0 ? 0 : str.indexOf(startStr) + startStr.length;
        return str.substring(pos, str.indexOf(endStr, pos)).trim();
      }
}