import { ITranslation } from "formater";
import { $T, $t } from "./formater";

const T: ITranslation = {
    Now: {
        formaters: [
            null,
            (arg: Date, locales?: Intl.LocalesArgument) => new Intl.DateTimeFormat(locales, { dateStyle: "full", timeStyle: "full" }).format(arg)
        ],
        locales: {
            "en": "Hi {0}! Now: {1}! Your flight will depart in {2} minutes.",
            "zh": "{0}你好! 现在是：{1}! 你的航班将在{2}分钟后起飞。"
        }
    },
    HI: {
        "en": "Hi {0}!",
        "zh": "{0}你好!"
    },
    "Total amount: {0} {1}": {
        "en": {
            template: "Total amount: {0} {1}",
            formaters: [
                (arg: number) => Math.ceil(arg / 7).toString()
            ]
        },
        "zh": "总计：{0} {1}",
    }
};

const now = new Date("Thu Sep 24 2024 06:47:12 GMT+0800 (China Standard Time)");

test("Chinese format", () => {
    $T.locale = "zh";
    expect($t(T.Now, "某某", now, 50)).toBe("某某你好! 现在是：2024年9月24日星期二 GMT+08:00 06:47:12! 你的航班将在50分钟后起飞。");
    expect($t(T.HI, "某某")).toBe("某某你好!");
    expect($t(T["Total amount: {0} {1}"], 10, "元")).toBe("总计：10 元");
})

test("English format", () => {
    $T.locale = "en";
    expect($t(T.Now, "Bob", now, 50)).toBe("Hi Bob! Now: Tuesday, September 24, 2024 at 6:47:12 AM GMT+08:00! Your flight will depart in 50 minutes.");
    expect($t(T.HI, "Bob")).toBe("Hi Bob!");
    expect($t(T["Total amount: {0} {1}"], 10, "USD")).toBe("Total amount: 2 USD");
    expect($t(T.HI)).toBe("Hi {0}!");
})
