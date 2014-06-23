Ext.define('AM.view.operational.maintenance.Form', {
  extend: 'Ext.window.Window',
  alias : 'widget.maintenanceform',

  title : 'Add / Edit Maintenance',
  layout: 'fit',
	width	: 500,
  autoShow: true,  // does it need to be called?
	modal : true, 
// win.show() 
// if autoShow == true.. on instantiation, will automatically be called 
	
  initComponent: function() {
	
	
	
	  
    this.items = [{
      xtype: 'form',
			msgTarget	: 'side',
			border: false,
      bodyPadding: 10,
			fieldDefaults: {
          labelWidth: 165,
					anchor: '100%'
      },
      items: [
				{
	        xtype: 'hidden',
	        name : 'id',
	        fieldLabel: 'id'
	      },
				{
	        xtype: 'textfield',
	        name : 'name',
	        fieldLabel: ' Name PT Maintenance'
	      },
				{
					xtype: 'textfield',
					name : 'address',
					fieldLabel: 'Alamat'
				},
				{
					xtype: 'textfield',
					name : 'pic',
					fieldLabel: 'Nama PIC'
				},
				{
					xtype: 'textfield',
					name : 'contact',
					fieldLabel: 'Kontak PIC'
				},
				{
					xtype: 'textfield',
					name : 'email',
					fieldLabel: 'Email PIC'
				},
			
				
			]
    }];

    this.buttons = [{
      text: 'Save',
      action: 'save'
    }, {
      text: 'Cancel',
      scope: this,
      handler: this.close
    }];

    this.callParent(arguments);
  },

	setComboBoxData : function( record){
	
	},
	
	setParentData: function( record ){
		this.down('form').getForm().findField('customer_name').setValue(record.get('name')); 
		this.down('form').getForm().findField('customer_id').setValue(record.get('id')); 
	},
	
});

