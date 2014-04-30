class CreateContractedItems < ActiveRecord::Migration
  def change
    create_table :contracted_items do |t|

      t.timestamps
    end
  end
end
