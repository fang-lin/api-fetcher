/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    config = require('./libs/config');

var versions = ['CSB', 'HCSB', 'Manuscript'],
    books = ['Mat', 'Jhn'],
    chapters = ['1', '2'];

versions.forEach(function (version) {
    books.forEach(function (book) {
        chapters.forEach(function (chapter) {
            util.fetchJson(config.apiBaseUrl + 'bible/nodes/' + version + '/' + book + '/' + chapter)
                .then(function (chunk) {
                    return util.writeJsonToFiles('api/bible/nodes/' + version + '/' + book + '/' + chapter + '.json', chunk);
                });
        });
    });
});








