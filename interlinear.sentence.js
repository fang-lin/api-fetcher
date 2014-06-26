/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    config = require('./libs/config');

var versions = {
    'CSB': ['Manuscript'],
    'HCSB': ['Manuscript'],
    'Manuscript': ['CSB', 'HCSB']
};

var books = ['Mat', 'Jhn'];

var verses = util.readJson('api/books/', [
    'CSB/Mat.json',
    'CSB/Jhn.json',
    'HCSB/Mat.json',
    'HCSB/Jhn.json',
    'Manuscript/Mat.json',
    'Manuscript/Jhn.json'
]);

Object.keys(versions).forEach(function (mainVersion) {
    versions[mainVersion].forEach(function (subVersion) {
        books.forEach(function (book) {
            verses[mainVersion + '/' + book + '.json']['chapters'].forEach(function (item) {
                var chapter = item.chapter,
                    result = {};

                item.verses.forEach(function (verse, index) {
                    var verseNum = verse.verse;

                    util.fetchJson(config.apiBaseUrl + 'interlinear/sentence/' + mainVersion + '/' + subVersion + '/' + book + '/' + chapter + '/' + verseNum)
                        .then(function (chunk) {
                            result[verseNum] = JSON.parse(chunk);
                            if (index + 1 === item.verses.length) {
                                util.writeJsonToFiles('api/interlinear/sentence/' + mainVersion + '/' + subVersion + '/' + book + '/' + chapter + '/data.json', JSON.stringify(result));
                            }
                        });
                });
            });
        });
    });
});








