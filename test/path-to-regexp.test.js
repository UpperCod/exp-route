import test from "ava";
import { pathToRegExp, ignore } from "../src/path-to-regexp.js";

test("prepare", (t) => {
    t.is(ignore(":-().+"), `\\:\\-\\(\\)\\.\\+`);
});

test("pathToRegExp", (t) => {
    t.deepEqual(pathToRegExp("/router/"), [/^\/router\/$/, []]);

    t.deepEqual(pathToRegExp("/#/"), [/(?:(?:\/){0,1}#(?:\/){0,1})$/, []]);

    t.deepEqual(pathToRegExp("/folder"), [/^\/folder$/, []]);

    t.deepEqual(pathToRegExp("/folder/folder"), [/^\/folder\/folder$/, []]);

    t.deepEqual(pathToRegExp("/folder/{folder}"), [
        /^\/folder(?:\/){1}([^/#]+)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/[folder]"), [
        /^\/folder(?:\/){0,1}([^/#]*)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/[...folder]"), [
        /^\/folder(?:\/){0,1}(.*)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/{...folder}"), [
        /^\/folder(?:\/){1}(.+)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/#[folder]"), [
        /^\/folder(?:(?:\/){0,1}#(?:\/){0,1}){0,1}([^/#]*)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/#{folder}"), [
        /^\/folder(?:(?:\/){0,1}#(?:\/){0,1}){1}([^/#]+)$/,
        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/#{folder}"), [
        /^\/folder(?:(?:\/){0,1}#(?:\/){0,1}){1}([^/#]+)$/,

        ["folder"],
    ]);

    t.deepEqual(pathToRegExp("/folder/#{...folder}"), [
        /^\/folder(?:(?:\/){0,1}#(?:\/){0,1}){1}(.+)$/,
        ["folder"],
    ]);
});
