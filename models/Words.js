(function() {
    var app = angular.module('Models');

    app.factory('Words',
        ['Abstract', 'DreamFactory', function(Abstract, DreamFactory) {
            function Words() {
                var words = new Abstract();

                var data = {
                    apiFile: 'filestadja',
                    fileContainer: 'data',
                    filePath: 'abstract',
                    values: false,
                    tableValues: false,
                    loading: false,
                };

                words.load = function(callback) {
                    words.loading = true;
                    words.getFile(words.fileContainer, words.filePath+'?'+(new Date().getTime()), function(result) {
                        words.values = result;
                        words.loading = false;
                        if (callback) {
                            callback(words.values);
                        }
                    });
                };

                words.save = function(callback) {
                    words.loading = true;
                    words.replaceFile(words.fileContainer, words.filePath, words.values, function(result) {
                        words.loading = false;
                        if (callback) {
                            callback(words.values);
                        }
                    });
                };

                words.getOneRandom = function() {
                    /*if (!words.tableValues) {
                        words.tableValues = words.values.split('\n');
                    }
                    var value = words.tableValues[Math.floor(Math.random() * (words.tableValues.length))];*/
                    var table = words.values.split('\n');
                    var value = table[Math.floor(Math.random() * (table.length))];
                    return value;
                }
                words.setData(data);

                return words;
            };

            return Words;
        }
    ]);

    app.factory('Verbes',
        ['Words', function(Words) {
            function Verbes() {
                var verbes = new Words();

                var data = {
                    filePath: 'lesmots/mascToFem_verbes.txt'
                };

                verbes.setData(data);
                verbes.load();
                return verbes;
            };
            return Verbes;
        }
    ]);


    app.factory('Noms',
        ['Words', function(Words) {
            function Noms() {
                var noms = new Words();

                var data = {
                    filePath: 'lesmots/mascToFem_noms.txt'
                };

                noms.setData(data);
                noms.load();
                return noms;
            };
            return Noms;
        }
    ]);

})()
