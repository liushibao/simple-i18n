export interface ITranslation {
    [key: string]: ITranslationItem
}

export type ITranslationItem =
    {
        //每一个参数都要定义一个function或者null
        formaters: ((arg: any, locales: Intl.LocalesArgument) => string)[],
        locales: {
            [locales: string]: string
        }
    }
    | {
        [locales: string]: string
        | {
            template: string,
            formaters: ((arg: any) => string)[],
        }
    }

export class Translate {
    locale: string;

    private _formatString(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }

    translate = (item: ITranslationItem, ...args: any[]) => {
        if (item.formaters != null) {
            let newArgs: string[] = [];
            let length = args.length;
            for (let i = 0; i < length; i++) {
                let formater = (<((arg: any, locales: Intl.LocalesArgument) => string)[]>item.formaters)[i];
                if (formater == null)
                    newArgs.push(args[i].toString());
                else
                    newArgs.push(formater(args[i], this.locale));
            }
            return this._formatString(item.locales[this.locale], ...newArgs);
        }
        else if (typeof item[this.locale] == "string") {
            return this._formatString(item[this.locale], ...args);
        }
        else {
            let newArgs: string[] = [];
            let length = args.length;
            for (let i = 0; i < length; i++) {
                let formater = item[this.locale].formaters[i];
                if (formater == null)
                    newArgs.push(args[i].toString());
                else
                    newArgs.push(formater(args[i]));
            }
            return this._formatString(item[this.locale].template, ...newArgs);
        }
    }

}

export const $T = new Translate();
export const $t = $T.translate;