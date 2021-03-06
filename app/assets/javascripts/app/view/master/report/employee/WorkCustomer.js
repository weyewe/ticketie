Ext.define('AM.view.master.report.employee.WorkCustomer', {
    extend: 'Ext.Container',
    alias: 'widget.masterreportemployeeWorkCustomerReport',

		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		header: false, 
		headerAsText : false, 
		
		initComponent: function(){
			var me = this; 
			// me.buildToolbar();
			
			// console.log("init component of masterreportemployeeWorkCustomerReport");
			
			this.items = [  {
				xtype : 'masterreportuserList',
				// xtype : 'container',
				// html : "Awesome shite",
				flex: 2 
			},
			me.buildChartInspect() ];
			
	    this.callParent(arguments);
		},
		
	 
		
		buildChartInspect: function(){
			// console.log("build Chart Inspect called");
			return {
					xtype : "chartInspect",
					chartStoreFields : [
						'name',
						'data1',
						'id'
					],
					chartStoreUrl :  'api/work_customer_reports', 
					listXType: 'workcustomerList',
					yAxisLabel : "Total Maintenance",
					xAxisLabel : "Customer",
					panelTitle: "Customer",
					flex: 7,
					chartListWrapperXType: 'masterreportemployeeWorkCustomerReport',
					autoChartLoad: false 
				} 
		},

 		
});
