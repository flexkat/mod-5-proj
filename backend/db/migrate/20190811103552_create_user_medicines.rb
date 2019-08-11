class CreateUserMedicines < ActiveRecord::Migration[5.2]
  def change
    create_table :user_medicines do |t|
      t.string :name
      t.integer :dose
      t.boolean :morning
      t.boolean :evening
      t.string :composite_id
      t.string :url
      t.integer :user_id

      t.timestamps
    end
  end
end
