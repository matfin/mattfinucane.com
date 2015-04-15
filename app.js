Meteor.startup(function() {
	if(Meteor.isClient) {

	}
	if(Meteor.isServer) {
		Contentful.fetchAndPopulate().then(function(result) {
			console.log(result.message);
			Contentful.listenForContentChanges();
		}).fail(function(error) {
			console.log(error.message);
		});
	}
});