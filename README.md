#Backbone Boneyard
---
The missing bones of Backbone.js

##What is it?
A set of utility functions for models, collections and events.  These functions compliment Backbone's basic functionality with more advanced capabilities which sometimes seem to be needed when using Backbone, but aren't officially part of the framework.  All Boneyard functions ("bones") internally use 

##Installation
####Dependencies
* Backbone.js v1.1.0 (though v.0.9.9 and upwards should also work)
* Backbone's dependencies - underscore and jQuery (see Backbone.js docs)


Download the latest release located under the `dist` folder and the dependencies listed above, then include with script tags in your HTML, after the Backbone script tag.

```html
<script src="backbone.js"></script>
<script src="backbone.boneyard.js"></script>
```


##Usage
Boneyard adds new functionality to Backbone's entities `Model`, `Collection` and `Events`.


####`Events` functions
Event functions are mixed into the `Backbone.Events` and `Backbone` objects, as well as the prototypes of `Backbone.Model`, `Backbone.Colleciton`, `Backbone.View`, `Backbone.Router`, and `Backbone.history`.  So effectively, any Backbone entity that uses events receives these functions.  The documentation for these functions uses `model`, but this can be used on any of these entities.

**forwardEvent** - `model.forwardEvent(event, target, [targetEvent])`
Tells `model` to listen to `event` and trigger it on the object `target`.  If `targetEvent` is provided, the event name is replaced with it when triggering on `target`.  Uses `listenTo` internally

```js
target.on("pong", function() {
  alert("ping pong");
});
source.forwardEvent("ping", target, "pong").trigger("ping");

// Alerts "ping pong"
```

**bubbleEventsTo** - `model.bubbleEventsTo(target, [events]])`
Listens to `model` for all events and triggers them on `target`.  To bubble only specific events pass a space delimited string of event names, Backbone style. Uses `on` internally

**listenToMany** - listenToMany(objs, event, listener)
Listens to `event` on each object in the array `objs` and invokes the given `listener`

```js
this.listenToMany([model1, model2], "change", function() {
  alert("changed");
})
model1.trigger("changed");
model2.trigger("changed");

// Alerts "changed" twice
```

####`Model` functions
**unsetMany** - `model.unsetMany([*attributes], [options])`

Removes multiple attributes from the model. Fires a "change" event for each attribute unless silent is passed as an option, and then all removals won't fire the "change" event.

####`Collection` functions
**move** - `collection.move(model, toIndex, [options])`

Moves the given `model` to a position in the collection indicated by `toIndex`.  Triggers a `reset` event unless you pass `{silent: true}` in `options`.

**removeById** - `collection.removeById(id, [options])`

Finds the model with the given ID and removes it from a collection.  Pass `{fallback : "first" \ "last"}` to indicate that if the model isn't found in the collection, default to removing the first \ last model.  Any `options` passed will be delegated to `Collection#remove`.

**getOrAdd** - `collection.getOrAdd(id, [option]]s)`

`get`s the model with the given ID from the collection.  If such a model doesn't exist, create it, add it to the collection and return it.  Any `options` passed will be delegated to `Collection#add`.


## Versioning

We use [Semantic Versioning guidelines](http://semver.org/). Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

- Breaking backward compatibility **bumps the major** while resetting minor and patch
- New additions without breaking backward compatibility **bumps the minor** while resetting the patch
- Bug fixes and misc changes **bumps only the patch**


## Contribution


We want you!

Fork -> Clone -> Implement -> Test -> Pull-Request. We have great RESPECT for contributors.

## SOOMLA, Elsewhere ...


+ [Framework Page](http://project.soom.la/)
+ [On Facebook](https://www.facebook.com/pages/The-SOOMLA-Project/389643294427376)
+ [On AngelList](https://angel.co/the-soomla-project)


## Copyright and license

Code and documentation copyright 2012-2014 SOOMLA, Inc. Code and docs released under [the MIT license](LICENSE).
