'use strict';


module.exports = function(Article) {

    Article.observe('before save', function parse_author_id(ctx, next) {
        if (ctx.instance) {
            if (ctx.instance.author_id) {
                ctx.instance.authorId = ctx.instance.author_id;
            }
        } else {
            if (ctx.data.author_id) {
                ctx.data.authorId = ctx.data.author_id;
            }
        }
        next();
    });

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
