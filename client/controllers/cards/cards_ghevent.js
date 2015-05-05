/**
 *	Template - cards_ghevent
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_ghevent.created = function() {
};

/**
 *	Template - cards_ghevent
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_ghevent.rendered = function() {
	
};

/**
 *	Template - cards_ghevent
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_ghevent.destroyed = function() {
	
};

/**
 *	Template - cards_ghevent
 *	Helpers
 */
Template.cards_ghevent.helpers({

	/**
	 *	Get the name and url for the repositories
	 */
	repositories: function() {
		/**
		 *	From all events associated with a point, grab the 
		 *	unique repositories
		 */
		var uniqueByRepo = _.uniq(this.gh_events, function(gh_event) {
			return gh_event.repo.name;
		});

		/**
		 *	Then create a mapping function to pull out the repository
		 *	data.
		 */
		repositories = _.map(uniqueByRepo, function(item) {
			return {
				name: item.repo.name,
				url: item.repo.url
			};
		});

		return {
			collection: repositories,
			isSingle: repositories.length === 1
		};
	},

	/**
	 *	Get the total number of commits for the events
	 */
	commits: function() {
		var commits 	= [],
			commitMap 	= _.map(this.gh_events, function(item) {
			_.each(item.payload.commits, function(commit) {
				commits.push(commit);
			});
		});

		return {
			collection: commits,
			size: commits.length
		};
	},

	/**
	 *	Getting the date for the latest event
	 */
	lastEvent: function() {
		return _.last(this.gh_events);
	}	
});