'use strict';

module.exports = function(Article) {

    /**
     * Include all data from other models.
     * @param {Function(Error, object)} callback
     */
    Article.include_all_data = function(callback) {
        var result = [];
        var filter = {
            // fields: ['id', 'title', 'content', 'author'],
            include: ['author', 'comments','tags']
        };

        Article.find(filter, function(err, articles) {
            if (err !== null) {
                return callback(err);
            }

            if (articles.length) {
                articles.forEach(function(article) {
                    result.push(article);
                });
            }

            if (result.length) {
                callback(null, result);
            }
            else {
                callback(null, []);
            }
        });
    };

    // next methods here

};
