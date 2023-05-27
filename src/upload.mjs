import { LokaliseApi } from '@lokalise/node-api';
const lokaliseApi = new LokaliseApi({ apiKey: 'ab3c39b3bf245b77a605f279edbe740705395823' });
const lokaliseProjectId = '13719315646e597c771fd7.29242554';
import englishI18nFile from '../src/i18n/locales/en.json' assert { type: 'json' };
const filename = 'en.json';
const lang_iso = 'en';
(async function () {
    try {
        const data_base64 = Buffer.from(JSON.stringify(englishI18nFile)).toString("base64");
        process = await lokaliseApi.files().upload(lokaliseProjectId,
            { data: data_base64, filename, lang_iso }
        );
        console.log('upload process --->', process.status);
    } catch (error) {
        console.log('ERROR --->', error);
    }
})();