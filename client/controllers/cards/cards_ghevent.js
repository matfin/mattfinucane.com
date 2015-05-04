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
	repositoryInfo: function() {
		var repositories = _.uniq(this.gh_events, function(gh_event) {
			return gh_event.repo.name;
		});

		console.log(repositories);
	}

});