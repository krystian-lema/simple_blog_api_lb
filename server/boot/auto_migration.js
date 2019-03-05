module.exports = function (app) {
    'use strict'
        var dataSource = app.dataSources.db_source;

    console.log('-- Models found:', Object.keys(app.models));

    for (var model in app.models) {
        console.log("Cheking if table for model " + model + " is created and up-to-date in DB...");
        dataSource.isActual(model, function (err, actual) {
            if (actual) {
                console.log("Model " + model + " is up-to-date. No auto-migrated.");
            } else {
                console.log('Difference found! Auto-migrating model ' + model + '...');
                dataSource.autoupdate(model, function () {
                    console.log("Auto-migrated model " + model + " successfully.");
                });
            }
        });
    }
};
