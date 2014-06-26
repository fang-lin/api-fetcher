/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./libs/utility'),
    config = require('./libs/config');

var seeds = util.readJson('api/bible/tree/', [
    'CSB.Mat.1.json',
    'CSB.Jhn.1.json',
    'HCSB.Mat.1.json',
    'HCSB.Jhn.1.json',
    'Manuscript.Mat.1.json',
    'Manuscript.Jhn.1.json',
    'CSB.Mat.2.json',
    'CSB.Jhn.2.json',
    'HCSB.Mat.2.json',
    'HCSB.Jhn.2.json',
    'Manuscript.Mat.2.json',
    'Manuscript.Jhn.2.json'
]);

var versions = {
    'CSB': ['Manuscript'],
    'HCSB': ['Manuscript'],
    'Manuscript': ['CSB', 'HCSB']
};

var defer = util.q();

Object.keys(seeds).forEach(function (filename) {
    var slices = filename.split('.'),
        mainVersion = slices[0],
        book = slices[1],
        chapter = slices[2];

    versions[mainVersion].forEach(function (subVersion) {

        var result = {};

        seeds[filename].forEach(function (tree, treeIndex, trees) {

            util.treeToList(tree['tree']).forEach(function (id, nodeIndex, nodes) {

                util.fetchJson(config.apiBaseUrl + 'interlinear/children/' + mainVersion + '/' + subVersion + '/' + id)
                    .then(function (chunk) {
                        result[id] = JSON.parse(chunk);

                        if (treeIndex + 1 === trees.length &&
                            nodeIndex + 1 === nodes.length) {

                            util.writeJsonToFiles('api/interlinear/children/' + mainVersion + '.' + subVersion + '.' + book + '.' + chapter + '.json', JSON.stringify(result));
                        }
                    });
            });
        });
    });
});








