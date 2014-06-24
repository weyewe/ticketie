Ext.define('AM.view.operation.Maintenance', {
    extend: 'AM.view.Worksheet',
    alias: 'widget.maintenanceProcess',
	 
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
					xtype : 'maintenancelist',
					flex : 2
				}, 
			
			// {
			// 	xtype: "container",
			// 	html : "Aweomse banzai"
			// }
		]
});