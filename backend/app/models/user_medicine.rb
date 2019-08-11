class UserMedicine < ApplicationRecord
  serialize :history, Hash
end
