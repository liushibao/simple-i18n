import { ITranslation } from "../../../src";

/* istanbul ignore next */
process.on("uncaughtException", function (err) {

    // Handle the error safely 
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
})

/* istanbul ignore next */
process.on("unhandledRejection", function (err) {

    // Handle the error safely 
    console.log(err)
    process.exit(1);
})

console.log("hello world")

const T: ITranslation = {
    Now: {
        formaters: [
            (arg: Date, locales?: Intl.LocalesArgument) => new Intl.DateTimeFormat(locales, { dateStyle: "full", timeStyle: "full" }).format(arg)
        ],
        locales: {
            "en": "Now: {0}!",
            "zh": "现在是：{0}!"
        }
    },
    HI: {
        "en": "Hi {0}!",
        "zh": "{0}你好!"
    },
    "Total amount: {0}": {
        "en": {
            template: "Total amount: {0} USD",
            formaters: [
                (arg: number) => Math.ceil(arg / 7).toString()
            ]
        },
        "zh": "总计：{0} 元",
    }
};

const now= new Date("Thu Sep 24 2024 06:47:12 GMT+0800 (China Standard Time)");

import { $T, $t } from "../../../src";
$T.locale = "zh";

console.log($t(T.HI, "某某"));
console.log($t(T["Total amount: {0}"], 10));
console.log($t(T.Now, now));

$T.locale = "en";
console.log($t(T["Total amount: {0}"], 10));
console.log($t(T.Now, now));
