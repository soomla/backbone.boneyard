_.extend(Backbone.Model.prototype, {

    unsetMany : function() {

        var args = _.toArray(arguments);
        _.each(args, function(arg) {
            this.unset(arg);
        }, this);
    }
});
