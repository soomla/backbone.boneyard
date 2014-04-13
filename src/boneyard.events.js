var BoneyardEvents = {

    forwardEvent : function(event, target, targetEvent) {
        var source = this;

        // Listen to the source object for `event`.
        target.listenTo(source, event, function() {
            var args = _.toArray(arguments);

            // Forward to the target event.  If none was give, forward to same event name.
            target.trigger.apply(target, [targetEvent || event].concat(args));
        });

        return this;
    },
    bubbleEventsTo : function(target) {

        // Don't allow passing a target object that is undefined,
        // or that doesn't have events mixed into it.
        if (!target) throw "Error: can't bubble events to an undefined target.";
        if (!target.trigger) throw "Error: target object must have Backbone.Events mixed in."
        var slice = Array.prototype.slice;
        var events = slice.call(arguments, 1);

        if (events.length === 0) {

            //
            // The function was called without specific events. Bubble all events.
            // Example: `bubbleEventsTo(target)`
            //
            this.on("all", function() {
                Backbone.Events.trigger.apply(target, arguments);
            });
        } else {

            //
            // The function was called with multiple event strings.
            // Example: `bubbleEventsTo(target, "change:name change:price")`
            //
            events = events[0].split(/\s+/);
            _.each(events, function(event) {
                this.on(event, function() {
                    var args = slice.call(arguments);
                    args.unshift(event);
                    Backbone.Events.trigger.apply(target, args);
                });
            }, this);
        }
        return this;
    },

    listenToMany : function(objs, event, listener) {
        _.each(objs, function(obj) {
            this.listenTo(obj, event, listener);
        }, this);
        return this;
    }
};

_.each(['Model', 'Collection', 'View', 'Router', 'History'], function(entity) {
    _.extend(Backbone[entity].prototype, BoneyardEvents);
});
_.extend(Backbone, BoneyardEvents);
_.extend(Backbone.Events, BoneyardEvents);
