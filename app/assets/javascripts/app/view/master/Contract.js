Ext.define('AM.view.master.Contract', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.contractProcess',
	 
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false,
		selectedParentId : null,
		
		items : [
		// list of group loan.. just the list.. no CRUD etc
 
			{
				xtype : 'mastercustomerList',
				flex : 1
			},
			
			{
				xtype : 'contractlist',
				flex : 2
			}, 
		]
});