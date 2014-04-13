_.extend(Backbone.Model.prototype, {

    // Removes multiple attributes from the model.
    // Fires a "change" event for each attribute unless silent is passed as an option, and then all removals won't fire the "change" event.
    unsetMany : function() {
        var options = {};
        var args = _.toArray(arguments);

        // If the last argument is an object (and not a string)
        // then it's an `options` hash
        if (_.isObject(_.last(args))) {
            options = _.last(args);
            args = _.initial(args);
        }
        _.each(args, function(arg) {
            this.unset(arg, options);
        }, this);
    }
});
