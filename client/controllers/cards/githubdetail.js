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

		if(typeof Session.get('githubCommits') === 'undefined') {
			/**
			 *	No events, return
			 */
			return
		}

		var commits 	= Session.get('githubCommits'),
			toDisplay 	= commits.slice(0, 3),
			data = {
				toDisplay: 		toDisplay,
				isSingle: 		commits.length === 1,
				itemsPresent: 	commits.length > 0,
				size: 			commits.length,
				lastEvent: 		_.last(commits)
			};

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