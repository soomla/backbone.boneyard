describe("Boneyard", function() {


    var Model = Backbone.Model.extend();
    var Collection = Backbone.Collection.extend({model: Model});

    describe("Collecion", function() {

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

});
