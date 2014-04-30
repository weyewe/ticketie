Ext.define("AM.controller.Master", {
	extend : "AM.controller.BaseTreeBuilder",
	views : [
		"master.MasterProcessList",
		'MasterProcessPanel',
		'Viewport'
	],

	 
	
	refs: [
		{
			ref: 'masterProcessPanel',
			selector: 'masterProcessPanel'
		} ,
		{
			ref: 'masterProcessList',
			selector: 'masterProcessList'
		}  
	],
	

	 
	init : function( application ) {
		var me = this; 
		 
		// console.log("starting the init in Master.js");
		me.control({
			"masterProcessPanel" : {
				activate : this.onActiveProtectedContent,
				deactivate : this.onDeactivated
			} 
			
		});
		
	},
	
	onDeactivated: function(){
		// console.log("Master process panel is deactivated");
		var worksheetPanel = Ext.ComponentQuery.query("masterProcessPanel #worksheetPanel")[0];
		worksheetPanel.setTitle(false);
		// worksheetPanel.setHeader(false);
		worksheetPanel.removeAll();		 
		var defaultWorksheet = Ext.create( "AM.view.master.Default");
		worksheetPanel.add(defaultWorksheet); 
	},
	
	 

	setupFolder : {
		text 			: "Setup", 
		viewClass : '',
		iconCls		: 'text-folder', 
    expanded	: true,
		children 	: [
        
			{ 
				text:'User', 
				viewClass:'AM.view.master.User', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'users',
					action : 'index'
				}
				]
			}, 
			{ 
				text:'JobCode', 
				viewClass:'AM.view.master.JobCode', 
				leaf:true, 
				iconCls:'text',
				conditions : [
				{
					controller : 'job_codes',
					action : 'index'
				}
				]
			},
    ]
	},
	   
	 
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		var email = currentUser['email'];
		
		me.folderList = [
			this.setupFolder,
			// this.inventoryFolder,
			// this.reportFolder,
			// this.projectReportFolder
		];
		
		var processList = panel.down('masterProcessList');
		processList.setLoading(true);
	
		var treeStore = processList.getStore();
		treeStore.removeAll(); 
		
		treeStore.setRootNode( this.buildNavigation(currentUser) );
		processList.setLoading(false);
	},
});