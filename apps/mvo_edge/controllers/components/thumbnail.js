// ==========================================================================
// Project:   MvoEdge.thumbnailController
// Copyright: (c) 2009 RERO
// ==========================================================================
/*globals MvoEdge */

/** @class

  This controller manages the behavior of the thumbnail view. It depends on
  the master controller.

  @extends SC.ArrayController
*/
MvoEdge.thumbnailController = SC.ArrayController.create(
/** @scope MvoEdge.thumbnailController.prototype */ {

  allowsMultipleSelection: NO,

  /**
	Returns the currently selected thumbnail.
  */
  selectedThumbnail: function() {
    console.log('ThumbnailController, call selectedThumbnail');
    var selThumbnail = this.get('selection');
    console.info('selThumbnail : ' + selThumbnail);
    if (selThumbnail) {
		var thumbnail = selThumbnail.firstObject();
		console.info('thumbnail : ' + thumbnail);
		if (thumbnail) {
			console.info('OK');
			return thumbnail;
		}
    }
   console.log('ThumbnailController, end of call selectedThumbnail');
  }.property('selection').cacheable(),

	/**
		Changes the currently selected thumbnail, given the coreDocumentNode's guid.
		@param {String} coreDocumentNode the guid of an object of type {@link MvoEdge.CoreDocumentNode}
	 */
	changeSelection: function(coreDocumentNode) {
		console.log("ThumbnailController, call changeSelection");
		var q = SC.Query.create({ recordType: MvoEdge.Thumbnail, conditions: "coreDocumentNode = '"+coreDocumentNode+"'"});
		var imageObjects = MvoEdge.store.findAll(q);
		console.info('len : '+imageObjects.get('length'));
		console.info('imageObjects : ' + imageObjects);
		if (imageObjects) {
			var imageObject = imageObjects.firstObject();
			console.info('imageObject : ' + imageObject);
			var selThumbnail = this.get('selectedThumbnail');
			console.info('selThumbnail : ' + selThumbnail);
			if (imageObject && imageObject !== selThumbnail) {
				console.info('Change Thumbnail');
				// note: selection is set as an array with a single element
				console.info("this.get('selection') 1 : " + this.get('selection'));
				this.set('selection', SC.SelectionSet.create().addObject(imageObject));
				console.info("this.get('selection') 2 : " + this.get('selection'));
			}
		}
		console.log("ThumbnailController, end of call changeSelection");
	},

	/**
		Updates the masterController if the currently selected thumbnail has been changed.
	 */
	thumbnailSelectionDidChange: function() {
		console.log('ThumbnailController, call thumbnailSelectionDidChange');
		var selThumbnail = this.get('selectedThumbnail');
		console.info('thumbnailSelectionDidChange : ' + selThumbnail);
		if (selThumbnail) {
			var cdn = selThumbnail.get('coreDocumentNode');
			console.info('cdn : ' + cdn);
			var masterController = MvoEdge.masterController.get('selectedObjectId');
			console.info('masterController : ' + masterController);
			if (cdn && cdn !== masterController) {
				console.info('ThumbnailController, Change masterController');
				MvoEdge.masterController.changeSelection(cdn);
			}
		}
		console.log('ThumbnailController, end of call thumbnailSelectionDidChange');
	}.observes('selection'),

  /**
    Updates thumbnail selection by observing changes in master controller's
    object selection
    
    NOTE: we're assuming here that the guid of the master controller's
    selected object is the same as the corresponding thumbnail's guid;
    that may not be the case (a translation guid->guid may be needed)
  */
  masterObjectSelectionDidChange: function() {
	console.log('ThumbnailController, call masterObjectSelectionDidChange');
	var masterSelection = MvoEdge.masterController.get('selectedObjectId');
	console.info('masterSelection : '+masterSelection);
	if (masterSelection) {
		var sel = this.get('selectedThumbnail');
		console.info('sel : ' + sel);
		if (sel) {
			var cdn = sel.get('coreDocumentNode');
			console.info('cdn : ' + cdn);
			if (cdn && cdn !== masterSelection) {
				console.info('ThumbnailController, ChangeSelection 1');
				this.changeSelection(masterSelection);
			}
		} else {
			console.info('ThumbnailController, ChangeSelection 2');
			this.changeSelection(masterSelection);
		}
    }

	/*
	if (masterSelection) {
		var sel = this.get('selection');
		console.info('sel : '+sel);
		if (sel.firstObject().get('coreDocumentNode') !== masterSelection) {
			console.info('Change selection');
			this.changeSelection(masterSelection);
		}
	}
	*/
	console.log('ThumbnailController, end of call masterObjectSelectionDidChange');
  }.observes('MvoEdge.masterController.selectedObjectId')

});
