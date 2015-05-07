/**
 *	Template - cards_github_detail
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_github_detail.created = function() {

};

/**
 *	Template - cards_github_detail
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_github_detail.rendered = function() {
	
};

/**
 *	Template - cards_github_detail
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_github_detail.destroyed = function() {
	
};

/**
 *	Template - cards_github_detail
 *	Helpers
 */
Template.cards_github_detail.helpers({

	/**
	 *	Get the total number of commits for the events
	 */
	commits: function() {

		if(typeof Session.get('githubEvents') === 'undefined') {
			/**
			 *	No events, return
			 */
			return
		}

		var session 	= Session.get('githubCommits'),
			commits  	= session.commits;
			toDisplay 	= commits.splice(0, 3);

		var data = {
			toDisplay: 		toDisplay,
			isSingle: 		commits.length === 1,
			itemsPresent: 	commits.length > 0,
			size: 			commits.length,
			lastEvent: 		_.last(commits)
		};

		console.log(commits, commits.length);

		return data;
	},
});

/**
 *	Template - cards_github_detail
 *	Events
 */
Template.cards_github_detail.events = {

	'mouseleave .githubDetail': function(e, template) {
		template.hideTimeout = Meteor.setTimeout(function() {
			$(e.currentTarget).removeClass('revealed');
		}, 200);	
	},

	'mouseover .githubDetail': function(e, template) {
		Meteor.clearTimeout(template.hideTimeout);
	}

};