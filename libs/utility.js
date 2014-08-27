/**
 * Copyright 2006-2014 GrapeCity inc
 * Author: isaac.fang@grapecity.com
 */

var request = require('request'),
    fs = require('fs'),
    Q = require('q'),
    logger = require('log4js').getLogger('utility');

//logger.setLevel('warn');

function fetchJson(url) {
    return Q.promise(function (resolve, reject, notify) {
        logger.trace('request :', url);

        request(url, function (error, response, body) {
            logger.info('request response:', url);

            if (!error && response.statusCode == 200) {

                resolve(body);
            } else {
                logger.error('Can\'t XHR : ' + url, error);

                reject(new Error('Can\'t XHR : ' + url));
            }
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

function readJson(dir, files) {
    var seeds = {};
    if (files) {
        files.forEach(function (file) {
            seeds[file] = JSON.parse(fs.readFileSync(dir + file, 'utf8'));
        });
    } else {
        seeds = JSON.parse(fs.readFileSync(dir, 'utf8'));
    }
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
    readJson: readJson,
    treeToList: treeToList,
    q: q
};

