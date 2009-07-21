// ==========================================================================
// Project:   MvoEdge.masterController
// Copyright: (c) 2009 RERO
// ==========================================================================
/*globals MvoEdge */

/** @class

  This is the application's master controller. It serves as communication
  hub between the controllers of the different widgets.

  In this case it holds a reference to the currently selected object (image),
  in order to keep the thumbnail and tree views synchronized.

  @extends SC.ArrayController
*/

MvoEdge.masterController = SC.ArrayController.create(
/** @scope MvoEdge.masterController.prototype */ {

  allowsMultipleSelection: NO,

  /**
    The root node of the CoreDocumentModel contains the document's
    descriptive metadata

    @property {Array} descriptiveMetadataDictionary
  */
  descriptiveMetadataDictionary: function() {
    return this.arrangedObjects().objectAt(0).get('metadata');
  }.property(),

  /**
    The guid of the selected file/object that is currently being displasyed by
    the application

    @property {String} selectedObjectId the guid of an object of type
    MvoEdge.CoreDocumentNode
   */
  selectedObjectId: undefined,

  /**
    The selected file/object that is currently being displayed by the
    application

    @property {MvoEdge.CoreDocumentNode} selectedObject
   */
  selectedObject: function() {
    console.log('MasterController, call selectedObject');
    var sel = this.get('selectedObjectId');
	console.info('sel : ' + sel);
    if (sel) {
      console.info('selectedObjectId : ' + sel);
	  var q = SC.Query.create({ recordType: MvoEdge.Thumbnail, conditions: "coreDocumentNode = '"+sel+"'"});
	  var imageObjects = MvoEdge.store.findAll(q);
	  console.info('ImageObjects : ' + imageObjects);
	  var res = imageObjects.firstObject();
	  console.info('Res : ' + res);
      return res;
    }
    console.log('MasterController, end of call selectedObject.');
  }.property('selectedObjectId').cacheable(),

  /**
    Changes the currently selected object

    @param {String} the guid of an object of type MvoEdge.CoreDocumentNode
   */
  changeSelection: function(guid) {
	console.log('MasterController, call changeSelection : ' + guid);
    console.info('old guid : ' + this.get('selectedObjectId') + ', new guid : ' + guid);
	this.set('selectedObjectId', guid);
	console.log('MasterController, end of call changeSelection.');
  }

});
