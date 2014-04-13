// Backbone.Boneyard
// v0.1.0
//
// Copyright (c)2014 SOOMLA inc.
// Distributed under MIT license
//
// https://github.com/soomla/backbone.boneyard

(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require('backbone'));
    }
    else if(typeof define === 'function' && define.amd) {
        define(['backbone'], factory);
    }
    else {
        factory(root.Backbone);
    }
}(this, function(Backbone) {

    Backbone.Boneyard = {
        VERSION: "0.1.0"
    };
    
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
    
    _.extend(Backbone.Collection.prototype, {
    
        move : function(model, toIndex, options) {
            (options) || (options = {});
    
            // Throw an Error if `toIndex` is out of bounds
            if (toIndex < 0 || toIndex >= this.size()) {
                throw new Error("Can't move model to an 'out of bounds' index")
            }
            var fromIndex = this.indexOf(model);
    
            // Throw an Error if `model` isn't in the collection
            if (fromIndex == -1) throw new Error("Can't move a model that's not in the collection");
    
            // Move the model only if `toIndex` is different from the model's current index
            if (fromIndex !== toIndex) {
                this.models.splice(toIndex, 0, this.models.splice(fromIndex, 1)[0]);
                if (!options.silent) this.trigger("reset");
            }
        },
    
        removeById : function(id, options) {
    
            // Any `options` passed will be delegated to `Collection#remove`.
            options || (options = {});
            if (!_.isUndefined(id)) {
    
                // Check if the model with the given ID exists.
                var model = this.get(id);
                if (_.isUndefined(model)) {
    
                    // Pass {fallback : "first" \ "last"} to indicate that if the model
                    // isn't found in the collection, default to removing the first \ last model.
                    if (options.fallback === "first") return this.remove(this.first(), options);
                    if (options.fallback === "last")  return this.remove(this.last(), options);
                }
                return this.remove(model, options);
            }
        },
    
        getOrAdd : function(id, options) {
    
            // Any `options` passed will be delegated to `Collection#add`.
            options || (options = {});
    
            // `get` the model with the given ID from the collection.
            var model = this.get(id);
    
            // If it doesn't exist, create it, add it to the collection and return it.
            if (_.isUndefined(model)) model = this.add({id : id}, options);
            return model;
        }
    });
    

}));
