class ChangeColumnDose < ActiveRecord::Migration[5.2]
  def change
    change_column :user_medicines, :dose, :string
  end
end
