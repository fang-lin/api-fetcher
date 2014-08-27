/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    config = require('./libs/config');

var versions = ['CSB', 'HCSB', 'Manuscript'],
    books = ['Mat', 'Jhn'],
    chapters = [1, 2];


versions.forEach(function (version) {
    var result = {};

    books.forEach(function (book, bookIndex, books) {
        chapters.forEach(function (chapter, chapterIndex, chapters) {
            var trees = util.readJson('api/bible/tree/' + version + '/' + book + '/' + chapter + '.json');

            trees.forEach(function (tree, treeIndex, trees) {
                tree.nodes.forEach(function (node, nodeIndex, nodes) {
                    var id = node.id;

                    util.fetchJson(config.apiBaseUrl + 'bible/node/' + version + '/' + id)
                        .then(function (chunk) {
                            result[id] = JSON.parse(chunk);

                            if (bookIndex + 1 === books.length &&
                                chapterIndex + 1 === chapters.length &&
                                treeIndex + 1 === trees.length &&
                                nodeIndex + 1 === nodes.length) {

                                util.writeJsonToFiles('api/bible/node/' + version + '.json', JSON.stringify(result));
                            }
                        });
                });
            });
        });
    });
});








