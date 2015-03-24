Albums = new Mongo.Collection('favorite_albums');

if (Meteor.isClient) {

/* ------ */
/* Routes */
/* ------ */
Router.route('/', function () {
  this.render('Home', {data: {title: 'Home'}});
});

Router.route('/charts', function () {
  this.render('Charts', {data: {title: 'Charts'}});
});

/* ---- */
/*	Home */
/* ---- */
Template.addAlbum.events({
	'submit .add_album': function(event) {
		var rank = event.target.rank.value;
		var album = event.target.album.value;
		var band = event.target.band.value;
		var year = event.target.year.value;

		Albums.insert({
			rank : rank,
			album : album,
			band : band,
			year : year
		});

		event.target.rank.value = "";
		event.target.album.value = "";
		event.target.band.value = "";
		event.target.year.value = "";

		return false;
	}
});

Template.favoriteAlbumTable.helpers({
	favoriteAlbums: function () {
		return Albums.find(
			{},
			{sort: {rank: -1}}
			);
	}
});

Template.favoriteAlbum.events({
	'click .delete' : function() {
		if (window.confirm("Sure?")) {
			Albums.remove(this._id);
		} else {
			return false;
		}
	}
});

/* ------ */
/* Charts */
/* ------ */
// Template.favoriteAlbumCharts.helpers({
// 	albumPerDecade: function () {
// 		return Albums.find(
// 			{ "decade" : "90s" },
// 			{sort: {rank: -1}}
// 			);
// 	}
// });
Meteor.startup(function() {
	Template.favoriteAlbumCharts.helpers({
		albumPerDecade: function(){
			var data = {
				labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
				series: [
				[5, 2, 4, 2, 0]
				]
			};
		//	new Chartist.Line('.ct-chart', data);	
		}
	});
});





}
if (Meteor.isServer) {
	Meteor.startup(function () {
    // code to run on server at startup
  });
}




