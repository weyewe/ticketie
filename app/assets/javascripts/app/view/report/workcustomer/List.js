Ext.define('AM.view.report.workcustomer.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.workcustomerList',

  	store: 'Maintenances', 
 

	initComponent: function() {
		this.columns = [
			{
				xtype : 'templatecolumn',
				text : "Info",
				flex : 1,
				tpl : 'maintenanceid: {id}' + '<br />' 
			},
			
			  
	
		];
 
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: '{0} - {1} of {2}',
			emptyMsg: "No Record" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
});