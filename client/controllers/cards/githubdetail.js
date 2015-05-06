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

		var session  	= Session.get('githubEvents'),
			events 		= session.gh_events,
		 	commits 	= [],
		 	index  		= 1,
			commitMap 	= _.map(events, function(item) {
				_.each(item.payload.commits, function(commit) {
					commit.index = index;
					commits.push(commit);
					index++;
				})
			}),
			collection = commits.splice(0, 3);



		var commits = {
			collection: collection,
			size: collection.length,
			itemsPresent: collection.length > 0,
			isSingle: collection.length === 1,
			lastEvent: _.last(events)
		};

		return commits;
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