Meteor.startup(function() {
	if(Meteor.isClient) {

	}
	if(Meteor.isServer) {
		Contentful.fetchAndPopulate();
	}
});