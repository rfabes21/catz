var MyApp = new Backbone.Marionette.Application();

MyApp.addRegions({
    mainRegion: "#content"
});

var AngryCat = Backbone.Model.extend ({});

var AngryCats = Backbone.Collection.extend ({
    model: AngryCat,

    initialize: function(cats) {

        var rank = 1;
        _.each(cats, function(cat) {
            cat.rank = rank;
            ++rank;
        });
    }
});

var AngryCatView = Backbone.Marionette.ItemView.extend({
    template: "#angry_cat-template",
    tagName: "tr",
    className: "angry_cat",

    events: {
        'click .rank_up img': 'rankUp',
        'click .rank_down img': 'rankDown'
    },

    rankUp: function() {
        console.log('Rank UP');
    },

    rankDown: function() {
        console.log('Rank DOWN');
    }
});

 var AngryCatsView = Backbone.Marionette.CompositeView.extend({
    tagName: "table",
    id: "angry_cats",
    className: "table-striped table-bordered",
    template: "#angry_cats-template",
    itemView: AngryCatView,
    itemViewContainer: 'tbody',

    initialize: function(){

       this.listenTo(this.collection, "sort", this.renderCollection);
    }
});

// MyApp.addInitializer = function(options){
//     var angryCatsView = new AngryCatsView({
//         collection: options.cats
//     });
//     MyApp.mainRegion.show(angryCatsView);
// };

$(document).ready( function(){
    var cats = new AngryCats([
        { name: "Wet Cat", image_path: "/assets/images/cat2.jpg" },
        { name: "Bitey Cat", image_path: "/assets/images/cat1.jpg" },
        { name: "Surprised Cat", image_path: "/assets/images/cat3.jpg" }
    ]);
    var angryCatsView = new AngryCatsView({
        collection: cats
    });
    MyApp.mainRegion.show(angryCatsView);
});


