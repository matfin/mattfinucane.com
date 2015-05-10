/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_ghday.created = function() {
	this.subscribe('gh_commits');
};

/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_ghday.rendered = function() {
	
};

/**
 *	Template - cards_ghday
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_ghday.destroyed = function() {
	
};

/**
 *	Template - cards_ghday
 *	Helpers
 */
Template.cards_ghday.helpers({

	points: function() {
		
		/**
		 *	Grab all the commits for the given day
		 */
		var commits = App.collections.gh_commits.find({created_at_ts: {$gte: this.start, $lte: this.end}}, {sort: {'created_at_ts': -1}}).fetch(),
			points = [];

		this.commits = commits;

		/**
		 *	Create the points that will represent the dots on the SVG chart
		 */
		for(var i = 0; i < 4; i++){

			points.push({
				y: 20,
				commits: []
			});
		}

		/**
		 *	Since each dot represents a quarter of a day, assign each commit 
		 *	to a dot based on the time of day it was pushed
		 */
		_.each(commits, function(commit) {
			var hour 	= new Date(commit.created_at_ts).getHours(),
				division = Helpers.inDivision(hour, 24, points.length - 1);

			if(points[division].y < 50) {
				points[division].y += 5;
			}
			
			points[division].commits.push(commit);
		});

		return {
			asCollection: points,
			asString: _.map(points, function(point) {
				return point.x + ',' + point.y + ' ';
			})
		};
	}
});

/**
 *	Template - cards_ghday
 *	Events
 */
Template.cards_ghday.events = {

	'click': function(e, template) {
		Session.set('githubCommits', this.commits);
		$('.githubDetail').addClass('revealed');
	}
}