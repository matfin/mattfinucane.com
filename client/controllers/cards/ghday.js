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
		var commits = App.collections.gh_commits.find({created_at_ts: {$gte: this.start, $lte: this.end}}).fetch(),
			points = [];

		/**
		 *	Create the points that will represent the dots on the SVG chart
		 */
		for(var i = 0; i < 5; i++){

			points.push({
				x: i * 25,
				y: 60,
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

			points[division].commits.push(commit);
			points[division].y -= 3;
		});

		/**
		 *	Given that SVG animations only run once, they cannot
		 *	be updated reactively without manually triggering the 
		 *	animation. We need to do this in here.
		 */
		var animations = document.getElementsByTagName('animate');
					
		_.each(animations, function(animation) {
			Meteor.setTimeout(function() {
				animation.beginElement();
			}, 1000);
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
	'click g rect': function(e, template) {
		Session.set('githubCommits', this);
		$('.githubDetail').addClass('revealed');
	}
}