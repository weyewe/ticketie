class Api::MaintenancesController < Api::BaseApiController
  
  def index
    
    
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Maintenance.where{ 
        (
          (name =~  livesearch ) | 
          (code =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Maintenance.where{ 
        (
          (name =~  livesearch ) | 
          (code =~  livesearch )
        )
      }.count
      
      # calendar
      
    elsif params[:parent_id].present?
      # @group_loan = Maintenance.find_by_id params[:parent_id]
      @objects = Maintenance.active_objects.
                  where(:customer_id => params[:parent_id]).
                  page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Maintenance.active_objects.where(:customer_id => params[:parent_id]).count 
    else
      @objects = []
      @total = 0 
    end
    
    
    
    
    
    # render :json => { :items => @objects , :total => @total, :success => true }
  end

  def create
    @object = Maintenance.create_object( params[:item] )  
    
    params[:maintenance][:complaint_date] =  parse_date( params[:maintenance][:complaint_date] )
    params[:maintenance][:diagnosis_date] =  parse_date( params[:maintenance][:diagnosis_date] )
    params[:maintenance][:solution_date] =  parse_date( params[:maintenance][:solution_date] )
    
 
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :items => [@object] , 
                        :total => Maintenance.active_objects.count }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg                         
    end
  end

  def update
    @object = Maintenance.find(params[:id])
    
    
    params[:maintenance][:complaint_date] =  parse_date( params[:maintenance][:complaint_date] )
    params[:maintenance][:diagnosis_date] =  parse_date( params[:maintenance][:diagnosis_date] )
    params[:maintenance][:solution_date] =  parse_date( params[:maintenance][:solution_date] )


    if params[:diagnosis].present?  
      if not current_user.has_role?( :maintenances, :start)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
      
      @object.start(:started_at => params[:maintenance][:started_at] )
    elsif params[:solution].present?    
      
      if not current_user.has_role?( :maintenances, :unstart)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
      @object.cancel_start
    elsif params[:confirm].present?
      if not current_user.has_role?( :maintenances, :disburse)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
      @object.disburse_loan( :disbursed_at => params[:maintenance][:disbursed_at] )
    elsif params[:unconfirm].present?  
      if not current_user.has_role?( :maintenances, :undisburse)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
        
      @object.undisburse
    elsif params[:unsolve].present?
      if not current_user.has_role?( :maintenances, :close)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
      @object.close( :closed_at => params[:maintenance][:closed_at] )
    elsif params[:undiagnose].present?
      if not current_user.has_role?( :maintenances, :withdraw)
        render :json => {:success => false, :access_denied => "Tidak punya authorisasi"}
        return
      end
      
      @object.withdraw_compulsory_savings( :compulsory_savings_withdrawn_at => params[:maintenance][:compulsory_savings_withdrawn_at] )
    else
    
      @object.update_object(params[:maintenance])
    end
    
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :maintenances => [
                            :id 							=>  	@object.id    ,
                          	:item_name 			 										 =>   @object.item.name                                ,
                          	:item_id                   => @object.item.id , 
                          	:customer_name 						 =>   @object.customer.name  ,
                          	:customer_id					 =>   @object.customer.id   ,
                          	:user_id             =>   @object.user.id , 
                          	:user_name 										 =>   @object.user.name,
                          	:complaint_date 										 =>   format_date_friendly(@object.complaint_date)    ,
                          	:complaint 							 =>   @object.complaint ,
                          	:complaint_case 									 =>   format_date_friendly( @object.complaint_case) ,
                          	:complaint_case_text 											 =>   @object.complaint_case_text,
                          	:diagnosis_date 											 =>   format_date_friendly( @object.diagnosis_date )   ,
                          	:diagnosis =>   @object.diagnosis     ,
                            :diagnosis_case =>   @object.diagnosis_case,                            # 
                            :diagnosis_case_text                               => @object.diagnosis_case_text,
                            :is_diagnosed   => @object.is_diagnosed,
                            :solution_date                           =>  format_date_friendly( @object.solution_date ),
                            :solution      => @object.solution ,
                          	:solution_case => @object.solution_case,
                          	:solution_case_text => @object.solution_case_text,
                          	:is_solved => @object.is_solved,
                          	:is_confirmed => @object.is_confirmed,
                            :is_deleted => @object.is_deleted
                          ],
                        :total => Maintenance.active_objects.count  } 
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg
      
      
    end
  end

  def destroy
    @object = Maintenance.find(params[:id])
    @object.delete_object

    if @object.is_deleted
      render :json => { :success => true, :total => Maintenance.active_objects.count }  
    else
      render :json => { :success => false, :total => Maintenance.active_objects.count }  
    end
  end
  
  def search
    search_params = params[:query]
    selected_id = params[:selected_id]
    if params[:selected_id].nil?  or params[:selected_id].length == 0 
      selected_id = nil
    end
    
    query = "%#{search_params}%"
    # on PostGre SQL, it is ignoring lower case or upper case 
    
    if  selected_id.nil?
  
    else
      @objects = Maintenance.where{ (id.eq selected_id)  
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
   
      @total = Maintenance.where{ (id.eq selected_id)   
                              }.count 
    end
    
    
    # render :json => { :records => @objects , :total => @total, :success => true }
  end
end
