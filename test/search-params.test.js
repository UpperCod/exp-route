import test from "ava";
import { searchParams, getParts } from "../src/search-params";

test("getParts", (t) => {
    const partBefore = "folder/folder/folder";
    const partAfter = "?param=1";
    const [before, after] = getParts(partBefore + partAfter);

    t.is(partBefore, before);
    t.is(partAfter, after);
});

test("searchParams", (t) => {
    const search = searchParams("?a_b&c-c&d f");
    t.deepEqual(search, { a_b: undefined, "c-c": undefined, "d f": undefined });
});

test("searchParams empty", (t) => {
    const search = searchParams("?");
    t.deepEqual(search, {});
});
