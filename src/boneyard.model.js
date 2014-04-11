_.extend(Backbone.Model.prototype, {

    unsetMany : function() {

        // TODO: Override unset.
        var args = _.toArray(arguments);
        _.each(args, function(arg) {
            this.unset(arg);
        }, this);
    }
});
