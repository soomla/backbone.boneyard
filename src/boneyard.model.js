_.extend(Backbone.Model.prototype, {

    unsetMany : function() {
        var options = {};
        var args = _.toArray(arguments);

        // If the last argument is an object (and not a string)
        // then it's an `options` hash
        if (_.isObject(_.last(args))) {

            // Fires a "change" event for each attribute unless `{silent: true}` is passed,
            // and then all removals won't fire the "change" event.
            options = _.last(args);

            args = _.initial(args);
        }

        // Iterate over all attributes and unset them individually
        _.each(args, function(arg) {
            this.unset(arg, options);
        }, this);
    }
});
