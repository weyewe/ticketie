class Maintenance < ActiveRecord::Base
  
  # Complaint => DIagnosis => Solution 
  attr_accessible :name, :address, :email  
   
  validates_presence_of :customer_id, :item_id, :user_id 
  belongs_to :item
  belongs_to :customer 
  
 
  
  def self.create_object( params ) 
    new_object           = self.new
    new_object.item_id        = params[:item_id]
    new_object.customer_id    = params[:customer_id    ]
    new_object.user_id        = params[:user_id]
    new_object.complaint_date   = params[:complaint_date  ] 
    new_object.complaint      = params[:complaint  ] 
    new_object.complaint_case = params[:complaint_case]
    new_object.save
    
    return new_object
  end
  
  
   
  
  def update_object(params)
    self.item_id        = params[:item_id]
    self.customer_id    = params[:customer_id    ]
    self.user_id        = params[:user_id]
    self.complaint_date   = params[:complaint_date  ] 
    self.complaint      = params[:complaint  ] 
    self.complaint_case = params[:complaint_case]

    self.save
    
    
    return self
  end
  
  def delete_object
    
    if self.is_diagnosed?  
      self.errors.add(:generic_errors, "Sudah ada diagnosa")
      return self 
    end
    
    self.is_deleted  = true 
    self.save  
    
    
    return self 
  end 
  
  
  def self.active_objects
    self.where(:is_deleted => false )
  end
end
