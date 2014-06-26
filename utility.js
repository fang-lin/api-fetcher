/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var http = require('http'),
    fs = require('fs'),
    Q = require('q'),
    logger = require('log4js').getLogger('utility');

//logger.setLevel('warn');

function fetchJson(url) {
    return Q.promise(function (resolve, reject, notify) {
        logger.trace('http.get :', url);

        http.get(url, function (res) {
            res.on('data', function (chunk) {
                logger.info('http.get response:', url);

                resolve(chunk.toString());
            });
        }).on('error', function (e) {
            console.error('Can\'t http.get : ' + url, e);
            reject(new Error('Can\'t http.get : ' + url));
        });
    });
}

function writeJsonToFiles(filename, data) {
    return Q.promise(function (resolve, reject, notify) {
        logger.info('fs.writeFile :', filename);

        fs.writeFile(filename, data, 'utf8', function () {
            resolve();
        });
    });
}

function readSeeds(dir, files) {
    var seeds = {};
    files.forEach(function (file) {
        seeds[file] = JSON.parse(fs.readFileSync(dir + file, 'utf8'));
    });
    return seeds;
}

function treeToList(tree) {
    var list = [];
    (function traverse(subTree) {
        if (subTree.id.split('-').pop() === '0') {
            list.push(subTree.id);
        }
        if (subTree.children) {
            subTree.children.forEach(function (tree) {
                traverse(tree);
            })
        }
    })(tree);
    return list;
}

function q() {
    return new Q();
}

module.exports = {
    fetchJson: fetchJson,
    writeJsonToFiles: writeJsonToFiles,
    readSeeds: readSeeds,
    treeToList: treeToList,
    q: q
};

