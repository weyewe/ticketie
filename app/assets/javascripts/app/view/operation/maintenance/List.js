Ext.define('AM.view.operation.maintenance.List' ,{
  	extend: 'Ext.grid.Panel',
  	alias : 'widget.maintenancelist',

  	store: 'Maintenances', 
 

	initComponent: function() {
		// this.columns = [
		// 	{ header: 'Code',  dataIndex: 'code', flex: 1},
		// 	{	header: 'Employee', dataIndex: 'user_name', flex: 1 },
		// 	{	header: 'Item', dataIndex: 'item_code', flex: 1 },
		// 	{	header: 'Complaint Date', dataIndex: 'complaint_date', flex: 1 },
		// 	{	header: 'Complaint', dataIndex: 'complaint', flex: 1 },
		// ];
		
		this.columns = [
			{	header: 'Item', dataIndex: 'item_code', flex: 1 },
			{
				xtype : 'templatecolumn',
				text : "Complaint",
				flex : 1,
				tpl : 'Code: <b>{code}</b>' + '<br />' + '<br />' +
							'Complaint Date:<br /> <b>{complaint_date}</b>'  + '<br />' + '<br />' 
							
							'Complaint:<br />{complaint}'  + '<br />' + '<br />' 
			},
			
			
		 
		];
		
		

		this.addObjectButton = new Ext.Button({
			text: 'Add',
			action: 'addObject'
		});

		this.editObjectButton = new Ext.Button({
			text: 'Edit',
			action: 'editObject',
			disabled: true
		});

		this.deleteObjectButton = new Ext.Button({
			text: 'Delete',
			action: 'deleteObject',
			disabled: true
		});
		
		this.diagnoseObjectButton = new Ext.Button({
			text: 'Diagnose',
			action: 'diagnoseObject',
			disabled: true
		});
		
		this.solveObjectButton = new Ext.Button({
			text: 'Solve',
			action: 'solveObject',
			disabled: true
		});
		
		this.confirmObjectButton = new Ext.Button({
			text: 'Confirm',
			action: 'confirmObject',
			disabled: true
		});
		
		this.searchField = new Ext.form.field.Text({
			name: 'searchField',
			hideLabel: true,
			width: 200,
			emptyText : "Search",
			checkChangeBuffer: 300
		});



		this.tbar = [this.addObjectButton, this.editObjectButton, this.deleteObjectButton, this.searchField ];
		this.bbar = Ext.create("Ext.PagingToolbar", {
			store	: this.store, 
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display" 
		});

		this.callParent(arguments);
	},
 
	loadMask	: true,
	
	getSelectedObject: function() {
		return this.getSelectionModel().getSelection()[0];
	},

	enableRecordButtons: function() {
		this.editObjectButton.enable();
		this.deleteObjectButton.enable();
	},

	disableRecordButtons: function() {
		this.editObjectButton.disable();
		this.deleteObjectButton.disable();
	},
	
	enableAddButton: function(){
		this.addObjectButton.enable();
	},
	disableAddButton : function(){
		this.addObjectButton.disable();
	},
	
	
});
