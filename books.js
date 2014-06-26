/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    config = require('./libs/config');

var versions = ['CSB', 'HCSB', 'Manuscript'],
    books = ['Mat', 'Jhn'];

versions.forEach(function (version) {
    books.forEach(function (book) {
        util.fetchJson(config.apiBaseUrl + 'books/' + version + '/' + book)
            .then(function (chunk) {
                return util.writeJsonToFiles('api/books/' + version + '/' + book + '.json', chunk);
            });
    });
});








