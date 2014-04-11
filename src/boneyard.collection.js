_.extend(Backbone.Collection.prototype, {

    /**
     * Moves a model to the given index, if different from its current index. Handy
     * for shuffling models after they've been pulled into a new position via
     * drag and drop.
     */
    move : function(model, toIndex, options) {
        (options) || (options = {});
        if (toIndex < 0 || toIndex >= this.size()) {
            throw new Error("Can't move model to an 'out of bounds' index")
        }
        var fromIndex = this.indexOf(model);
        if (fromIndex == -1) {
            throw new Error("Can't move a model that's not in the collection")
        }
        if (fromIndex !== toIndex) {
            this.models.splice(toIndex, 0, this.models.splice(fromIndex, 1)[0]);
            if (!options.silent) this.trigger("reset");
        }
    },

    /**
     * Finds the model with the given ID and removes it from a collection.
     * Pass {fallback : "first" \ "last"} to indicate that if the model
     * isn't found in the collection, default to removing the first \ last model
     */
    removeById : function(id, options) {
        options || (options = {});

        if (!_.isUndefined(id)) {
            var model = this.get(id);

            if (_.isUndefined(model)) {
                if (options.fallback === "first") return this.remove(this.first(), options);
                if (options.fallback === "last")  return this.remove(this.last(), options);
            }
            return this.remove(model, options);
        }
    },

    /**
     * `get`s the model with the given ID form the collection.  If it doesn't exist,
     * add it to the collection and return it
     */
    getOrAdd : function(id) {
        var model = this.get(id);
        if (_.isUndefined(model)) model = this.add({id : id});
        return model;
    }
});
