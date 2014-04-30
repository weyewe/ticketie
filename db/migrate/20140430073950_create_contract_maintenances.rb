class CreateContractMaintenances < ActiveRecord::Migration
  def change
    create_table :contract_maintenances do |t|

      t.timestamps
    end
  end
end
