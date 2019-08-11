class AddHistoryToUserMedicines < ActiveRecord::Migration[5.2]
  def change
    add_column :user_medicines, :history, :string
  end
end
