// ==========================================================================
// Project:   MvoEdge.tree
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals MvoEdge */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
MvoEdge.treeController = SC.ArrayController.create(
/** @scope MvoEdge.treeController.prototype */ {

  treeSelection: undefined,
  
  /**
	Updates the masterController if the currently selected thumbnail has been changed.
  */
  treeSelectionDidChange: function() {
    console.log('TreeController, call treeSelectionDidChange');
    var selectedTreeNode = this.get('treeSelection');
    console.info('selectedTreeNode : ' + selectedTreeNode);
    if (selectedTreeNode) {
		var hasObject = this.get('hasObjectId');
		console.info('hasObject : ' + hasObject);
		if (hasObject === false) {
			var objectIds = selectedTreeNode.get('objectIds');
			console.info('objectIds : ' + objectIds);
			var sel = objectIds.firstObject();
				console.info('sel : ' + sel);
			if (sel) {
				console.info('TreeController, Change masterController');
				MvoEdge.masterController.changeSelection(sel);
			}
		}
    }
    console.log('TreeController, end of call treeSelectionDidChange.');
  }.observes('treeSelection'),

  /**
    Returns true if the coreDocumentNode's guid is already in the the currently selected treeNode
  */
  hasObjectId: function() {
    console.log('TreeController, call hasObjectId');
	var selectedTreeNode = this.get('treeSelection');
	console.info('selectedTreeNode : ' + selectedTreeNode);
	var hasObject = NO;
	if (selectedTreeNode) {
		var objectIds = selectedTreeNode.get('objectIds');
		console.info('objectIds : ' + objectIds);
		if (objectIds) {
			var sizeObjectIds = objectIds.length;
			console.info('sizeObjectIds : ' + sizeObjectIds);
			var masterSelection = MvoEdge.masterController.get('selectedObjectId');
			console.info('masterSelection : ' + masterSelection);
			if (masterSelection) {
				for (var i = 0; i < sizeObjectIds; i++) {
					if (objectIds[i] === masterSelection) {
						hasObject = YES;
						console.info('hasObject : ' + hasObject);
						break;
					}
				}
			}
		}
	}
	console.log('TreeController, end of call hasObjectId');
	return hasObject;
  }.property('treeSelection'), //.cacheable(),

  /**
    Updates treeNode selection by observing changes in master controller's
    object selection
  */
  masterObjectSelectionDidChange: function() {
    console.log('TreeController, call masterObjectSelectionDidChange');
    var masterSelection = MvoEdge.masterController.get('selectedObjectId');
    console.info('masterSelection : ' + masterSelection);

	// Check if the current 'treeSelection' has the objectId 'masterSelection'
	var hasObj = this.get('hasObjectId');
	console.info('hasObj : '+ hasObj);
	if (masterSelection && hasObj === false) {
		console.info("TreeController, change treeSelection");
		// Retrieve the good treeNode with masterSelection
		this.setTreeSelection(masterSelection);
    }
    console.log('TreeController, end of call masterObjectSelectionDidChange.');
  }.observes('MvoEdge.masterController.selectedObjectId'),

  /**
	Changes the currently selected treeNode, given the coreDocumentNode's guid.
	@param {String} coreDocumentNode the guid of an object of type {@link MvoEdge.CoreDocumentNode}
	*/
  setTreeSelection: function(coreDocumentNode) {
	console.log('TreeController, call setTreeSelection');
	var treeNodes = MvoEdge.store.findAll(MvoEdge.Tree);
	console.info('treeNodes : ' + treeNodes);
	if (treeNodes) {
		var sizeTreeNodes = treeNodes.get('length');
		var hasTreeNode = NO;
		for (var i = 0; i < sizeTreeNodes; i++) {
			var treeNode = treeNodes.objectAt(i);
			var listObjectIds = treeNode.get('objectIds');
			console.info('listObjectIds : ' + listObjectIds);
			if (listObjectIds) {
				var sizeObjectIds = listObjectIds.length;
				console.info('sizeObjectIds : ' + sizeObjectIds);
				for (var j = 0; j < sizeObjectIds; j++) {
					if (listObjectIds[j] === coreDocumentNode) {
						console.info('treeNode : ' + treeNode);
						this.set('treeSelection',treeNode);
						hasTreeNode = YES;
						break;
					}
				}
			}
			if (hasTreeNode === true) {
				break;
			}
		}
	}
	console.log('TreeController, end of call setTreeSelection');
  }

});