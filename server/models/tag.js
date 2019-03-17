'use strict';

module.exports = function(Tag) {

    Tag.observe('before save', function parse_article_id(ctx, next) {
        if (ctx.instance) {
            if (ctx.instance.article_id) {
                ctx.instance.articleId = ctx.instance.article_id;
            }
        } else {
            if (ctx.data.article_id) {
                ctx.data.articleId = ctx.data.article_id;
            }
        }
        next();
    });
};
