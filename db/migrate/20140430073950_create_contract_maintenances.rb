class CreateContractMaintenances < ActiveRecord::Migration
  def change
    create_table :contract_maintenances do |t|

      t.integer :customer_id 
      t.string :name 
      t.text :description 
      
      t.timestamps
    end
  end
end
