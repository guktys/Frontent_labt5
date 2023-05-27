import { LokaliseApi } from '@lokalise/node-api';
const {
    LOKALISE_API_TOKEN,
    LOKALISE_PROJECT_ID
} = process.env;
const lokaliseApi = new LokaliseApi({
    apiKey: 'ab3c39b3bf245b77a605f279edbe740705395823'
});

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';
import got from 'got';

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function download(translationsUrl, archive) {
    try {
        const response = await got.get(translationsUrl).buffer();
        fs.writeFileSync(archive, response);
    } catch (error) {
        console.log(error);
    }
}

(async function () {
    try {
        const i18nFolder = path.resolve(__dirname, '../src/i18n/locales');

        const downloadResponse = await lokaliseApi.files().download('13719315646e597c771fd7.29242554', {
            format: "json",
            original_filenames: true,
            directory_prefix: '',
            filter_langs: ['en'],
            indentation: '2sp',
        })

        const translationsUrl = downloadResponse.bundle_url
        const archive = path.resolve(i18nFolder, 'archive.zip')

        await download(translationsUrl, archive)

        const zip = new AdmZip(archive)
        zip.extractAllTo(i18nFolder, true)

        fs.unlink(archive, (err) => {
            if (err) throw err
        })
    } catch (error) {
        console.log("ERROR --->", error);
    }
})();