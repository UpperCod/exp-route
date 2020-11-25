import test from "ava";
import { createMatch } from "../src/create-match";

test("createMatch 1", (t) => {
    const match = createMatch("/folder/{param}/folder");

    t.deepEqual(match("/folder/value/folder"), { param: "value" });
    t.deepEqual(match("/folder/  value  /folder"), { param: "  value  " });
    t.is(match("/folder/  value  /folder1"), undefined);
});

test("createMatch 2", (t) => {
    const match = createMatch("/folder/{...param}");
    t.deepEqual(match("/folder/ea/ea"), { param: "ea/ea" });
    t.deepEqual(match("/folder/"), undefined);
    t.deepEqual(match("/folder"), undefined);
});

test("createMatch 3", (t) => {
    const match = createMatch("/folder/[...param]");

    t.deepEqual(match("/folder/ea/ea"), { param: "ea/ea" });
    t.deepEqual(match("/folder/"), { param: "" });
    t.deepEqual(match("/folder"), { param: "" });
    t.deepEqual(match("/"), undefined);
});

test("createMatch 4", (t) => {
    const match = createMatch("/folder/#[...param]");

    t.deepEqual(match("/folder/#users"), { param: "users" });

    t.deepEqual(match("/folder#users"), { param: "users" });

    t.deepEqual(match("/#users"), undefined);
});
