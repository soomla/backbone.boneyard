describe("Boneyard", function() {


    var Model = Backbone.Model.extend();
    var Collection = Backbone.Collection.extend({model: Model});

    describe("Backbone.Collecion", function() {

        var collection, model, helper, size;

        beforeEach(function() {
            collection = new Collection([{id: "Moe"}, {id: "Larry"}, {id: "Curly"}]);
            helper = {callback: function(){}};
            size = collection.size();
        });

        describe("#move", function() {

            it("should move a model in the collection to the right index", function() {
                collection.move(collection.last(), 1);
                expect(collection.last().id).toBe("Larry");
                expect(collection.at(1).id).toBe("Curly");
            });

            it("should throw an error when moving to an illegal index", function() {
                expect(function() {
                    collection.move(collection.last(), 3);
                }).toThrow();
                expect(function() {
                    collection.move(collection.last(), -1);
                }).toThrow();
            });

            it("should trigger a 'reset' event on the collection", function() {
                spyOn(helper, 'callback');
                collection.on('reset', helper.callback);
                collection.move(collection.last(), 1);
                expect(helper.callback).toHaveBeenCalled();
            });

            it("shouldn't trigger a 'reset' event if {silent: true} options are passed", function() {
                spyOn(helper, 'callback');
                collection.on('reset', helper.callback);
                collection.move(collection.last(), 1, {silent: true});
                expect(helper.callback).not.toHaveBeenCalled();
            });
        });


        describe("#removeById", function() {

            it("should remove the model with the given ID from the collection", function() {
                collection.removeById("Larry");
                expect(collection.get("Larry")).toBeUndefined();
                expect(collection.size()).toBe(size - 1);
            });

            it("should fallback to removing first item if not found", function() {
                collection.removeById("Krusty", {fallback: "first"});
                expect(collection.get("Moe")).toBeUndefined();
                expect(collection.size()).toBe(size - 1);
            });

            it("should fallback to removing last item if not found", function() {
                collection.removeById("Krusty", {fallback: "last"});
                expect(collection.get("Curly")).toBeUndefined();
                expect(collection.size()).toBe(size - 1);
            });
        });


        describe("#getOrAdd", function() {

            it("should return the model with the given ID if found", function() {
                model = collection.getOrAdd("Moe");
                expect(model.id).toBe("Moe");
                expect(collection.size()).toBe(size);
            });

            it("should add a model with the given ID if not found and return it", function() {
                model = collection.getOrAdd("Krusty");
                expect(model.id).toBe("Krusty");
                expect(collection.size()).toBe(size + 1);
            });
        });
    });


    describe("Backbone.Events", function() {

        var source = _.clone(Backbone.Events),
            target = _.clone(Backbone.Events),
            helper = {callback: function(){}},
            helper2 = {callback: function(){}};

        describe("#forwardEvent", function() {

            it("should forward an event to the target object", function() {
                spyOn(helper, "callback");
                target.on("someEvent", helper.callback);
                source.forwardEvent("someEvent", target);
                source.trigger("someEvent");
                expect(helper.callback).toHaveBeenCalled();
            });

            it("should forward an event to the target object with a different name", function() {
                spyOn(helper, "callback");
                target.on("newEvent", helper.callback);
                source.forwardEvent("someEvent", target, "newEvent");
                source.trigger("someEvent");
                expect(helper.callback).toHaveBeenCalled();
            });

            it("should be chainable", function() {
                var s = source.forwardEvent("someEvent", target, "newEvent");
                expect(s).toEqual(source);
            });
        });


        describe("#bubbleEventsTo", function() {

            it("should bubble all events to the target object", function() {
                spyOn(helper, "callback");
                target.on("someEvent", helper.callback);
                source.bubbleEventsTo(target);
                source.trigger("someEvent");
                expect(helper.callback).toHaveBeenCalled();
            });

            it("should bubble specific given events to the target object", function() {
                spyOn(helper, "callback");
                spyOn(helper2, "callback");
                target.on("event:first", helper.callback);
                target.on("event:second", helper2.callback);
                source.bubbleEventsTo(target, "event:first event:second");
                source.trigger("event:first");
                expect(helper.callback).toHaveBeenCalled();
                source.trigger("event:second");
                expect(helper2.callback).toHaveBeenCalled();
            });

            it("should throw an error if the target is undefined", function() {
                expect(function() {
                    source.bubbleEventsTo(null);
                }).toThrow();
            });

            it("should throw an error if the target doesn't have Backbone.Events mixed in", function() {
                expect(function() {
                    source.bubbleEventsTo({});
                }).toThrow();
            });

            it("should be chainable", function() {
                var s = source.bubbleEventsTo(target);
                expect(s).toEqual(source);
            });
        });


        describe("#listenToMany", function() {

            it("should listen to the given event from multiple targets", function() {
                spyOn(helper, "callback");
                var source2 = _.clone(Backbone.Events);
                target.listenToMany([source, source2], "someEvent", helper.callback);

                // TODO: Check helper callback is called twice
                source.trigger("someEvent");
                expect(helper.callback).toHaveBeenCalled();
                source2.trigger("someEvent");
                expect(helper.callback).toHaveBeenCalled();
            });

            it("should be chainable", function() {
                var t = target.listenToMany([source], "someEvent", helper.callback);
                expect(t).toEqual(target);
            });
        });

    });

    describe("Backbone.Model", function() {

        describe("#unsetMany", function() {

            it("should unset multiple attributes", function() {
                var model = new Backbone.Model({a:1, b:2});
                model.unsetMany("a", "b");
                expect(model.get("a")).toBeUndefined();
                expect(model.get("b")).toBeUndefined();
            });
        });
    });
});
