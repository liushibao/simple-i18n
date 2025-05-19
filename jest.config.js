module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/src/.*(\\.test))\\.(jsx?|tsx?|ts)$",
    testPathIgnorePatterns: [
        "index.ts",
        "/dist/",
        "/node_modules/",
        "/<node_internals>/internal/util.js"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/{!(index|\\w+Config|my-server-framework),}.ts",
        "!src/my-libs/*",
        "!src/entities/*"
    ]
};
