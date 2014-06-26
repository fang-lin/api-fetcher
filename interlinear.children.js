/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var util = require('./utility'),
    config = require('./config');


var seeds = util.readSeeds(config.seedsDir + 'trees/', [
//    'bible.tree.CSB.Mat.1.json'
    'bible.tree.CSB.Jhn.1.json'
//    'bible.tree.HCSB.Mat.1.json',
//    'bible.tree.HCSB.Jhn.1.json',
//    'bible.tree.Manuscript.Mat.1.json',
//    'bible.tree.Manuscript.Jhn.1.json',
//    'bible.tree.CSB.Mat.2.json',
//    'bible.tree.CSB.Jhn.2.json',
//    'bible.tree.HCSB.Mat.2.json',
//    'bible.tree.HCSB.Jhn.2.json',
//    'bible.tree.Manuscript.Mat.2.json',
//    'bible.tree.Manuscript.Jhn.2.json'
]);

var versions = {
    'CSB': ['Manuscript'],
    'HCSB': ['Manuscript'],
    'Manuscript': ['CSB', 'HCSB']
};

//http://localhost:3000/api/v1/interlinear/children/CSB/Manuscript/csb-43-1_11_6_1-1_11_7_1-0

var defer = util.q();

Object.keys(seeds).forEach(function (filename) {
    var slices = filename.split('.'),
        mainVersion = slices[2],
        book = slices[3],
        chapter = slices[4];

    versions[mainVersion].forEach(function (subVersion) {

        var result = {};

        seeds[filename].forEach(function (tree, treeIndex, trees) {

            util.treeToList(tree['tree']).forEach(function (id, nodeIndex, nodes) {

                util.fetchJson(config.apiBaseUrl + 'interlinear/children/' + mainVersion + '/' + subVersion + '/' + id)
                    .then(function (chunk) {
                        result[id] = JSON.parse(chunk);

                        if (treeIndex + 1 === trees.length &&
                            nodeIndex + 1 === nodes.length) {

                            util.writeJsonToFiles('api/interlinear.children.' + mainVersion + '.' + subVersion + '.' + book + '.' + chapter + '.json', JSON.stringify(result));
                        }
                    });
            });
        });
    });
});








