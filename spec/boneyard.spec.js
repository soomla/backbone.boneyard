describe("Boneyard", function() {


    var Model = Backbone.Model.extend();
    var Collection = Backbone.Collection.extend({model: Model});

    describe("Collecion", function() {

        var collection, model, helper;

        beforeEach(function() {
            collection = new Collection([{id: "Moe"}, {id: "Larry"}, {id: "Curly"}]);
            helper = {callback: function(){}};
        });

        it("move: should move a model in the collection to the right index", function() {
            collection.move(collection.last(), 1);
            expect(collection.last().id).toBe("Larry");
            expect(collection.at(1).id).toBe("Curly");
        });

        it("move: should throw an error when moving to an illegal index", function() {
            expect(function() {
                collection.move(collection.last(), 3);
            }).toThrow();
            expect(function() {
                collection.move(collection.last(), -1);
            }).toThrow();
        });

        it("move: should trigger a 'reset' event on the collection", function() {
            spyOn(helper, 'callback');
            collection.on('reset', helper.callback);
            collection.move(collection.last(), 1);
            expect(helper.callback).toHaveBeenCalled();
        });

        it("move: shouldn't trigger a 'reset' event if {silent: true} options are passed", function() {
            spyOn(helper, 'callback');
            collection.on('reset', helper.callback);
            collection.move(collection.last(), 1, {silent: true});
            expect(helper.callback).not.toHaveBeenCalled();
        });

    });

});
