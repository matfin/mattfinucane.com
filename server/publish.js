'use strict';

Meteor.publish('entries', function(contentTypeName) {
	var contentType, 
			entries,
			handle,
			attach;

	attach = function(property) {
		for(var key in property) {
			if(property.hasOwnProperty(key)) {
				this[key] = property[key];
			}
		}
		return this;
	};
			
	contentType = Collections.contentTypes.findOne({name: contentTypeName});
	entries = Collections.entries.find({'sys.contentType.sys.id': contentType.sys.id});

	handle = entries.observeChanges({
		added: function(id, entry) {
			this.added('entries', id, attach.call(entry, {contentType: contentTypeName}));
		}.bind(this),
		changed: function(id, entry) {
			this.changed('entries', id, attach.call(entry, {contentType: contentTypeName}));
		}.bind(this)
	});

	this.onStop(function() {
		handle.stop();
	});

	this.ready();

});

