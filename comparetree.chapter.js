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
var chapters = ['1', '2'];

Object.keys(versions).forEach(function (mainVersion) {
    versions[mainVersion].forEach(function (subVersion) {
        books.forEach(function (book) {
            chapters.forEach(function (chapter) {
                util.fetchJson(config.apiBaseUrl + 'comparetree/chapter/' + mainVersion + '/' + subVersion + '/' + book + '/' + chapter + '/0/end')
                    .then(function (chunk) {
                        return util.writeJsonToFiles('api/comparetree/chapter/' + mainVersion + '.' + subVersion + '.' + book + '.' + chapter + '.json', chunk);
                    });
            });
        });
    });
});








