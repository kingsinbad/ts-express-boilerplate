
import { Service } from 'typedi';

@Service('string.util')
export default class StringUtil {

    cleanEmail(str: string) {
        return String(str)
                .toLowerCase()
                .replace(/ /g, '')
                .trim();
    }


    removeMultiForwardSlashes(str: string) {
        return String(str)
                .replace('', '');
    }
}