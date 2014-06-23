json.success true 
json.total @total
json.maintenances @objects do |object|
	 id                   	object.id 
	 item_name             	object.item.name                                  
	 item_id              	object.item.id   
	 customer_name         	object.customer.name 	
	 customer_id           	object.customer.id   	
	 user_id               	object.user.id  
	 user_name             	object.user.name 
	 complaint_date        	format_date_friendly(object.complaint_date)   
	 complaint             	object.complaint  
	 complaint_case        	format_date_friendly( object.complaint_case)  
	 complaint_case_text   	object.complaint_case_text 
	 diagnosis_date        	format_date_friendly( object.diagnosis_date )    
	 diagnosis             	object.diagnosis   
   diagnosis_case       	object.diagnosis_case                 
   diagnosis_case_text  	object.diagnosis_case_text 
   is_diagnosed         	object.is_diagnosed 
   solution_date        	format_date_friendly( object.solution_date ) 
   solution             	object.solution 
	 solution_case        	object.solution_case 
	 solution_case_text   	object.solution_case_text 
	 is_solved            	object.is_solved 
	 is_confirmed         	object.is_confirmed 
   is_deleted           	object.is_deleted

end
