/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    fs = require('fs');

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
                fs.readFile('api/interlinear/chapter/' + mainVersion + '/' + subVersion + '/' + book + '/' + chapter + '/data.json', 'utf8', function (error, data) {
                    if (error) throw error;

                    var nodes = JSON.parse(data),
                        hashmap = {};

                    nodes.forEach(function (node, index) {
                        hashmap[node.id] = index;
                    });

                    util.writeJsonToFiles('api/interlinear/chapter/' + mainVersion + '/' + subVersion + '/' + book + '/' + chapter + '/hashmap.json', JSON.stringify(hashmap));
                });
            });
        });
    });
});








