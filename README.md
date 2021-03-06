# @uppercod/exp-route

Path expression syntax for capturing parameters.

## Install

```bash
npm install @uppercod/exp-route
```

## Syntax

### fixed route

```
/folder1/folrder2
```

### parameter path

```
/folder1/{folder}
```

### optional parameter path

```
/folder1/[folder]
```

### spread parameter path

```
/folder1/[...folder]
/folder1/{...folder}
```

## Api

```ts
declare module "@uppercod/exp-route" {
    export interface Params {
        [param: string]: string;
    }
    export type Match<T = Params> = (path: string) => T | undefined;
    /**
     * Separate the pathname from the search
     * @example
     * "/before?after" = ["/before","?after"]
     */
    export function getParts(path: string): [string, string];
    /**
     * Capture the search parameters of a string that begins with the character `?`
     * @example
     * "?id=10"
     * @param search
     * @param master - Object to be used to store the captured indices
     */
    export function searchParams<T = Params>(
        search: string,
        master?: Params
    ): T;
    /**
     * Create a callback to compare the route expression with the given route
     */
    export function createMatch<T = Params>(path: string): Match<T>;
}
```
