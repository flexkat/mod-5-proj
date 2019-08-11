class UserMedicinesSerializer < ActiveModel::Serializer
  attributes :id, :name, :dose, :composite_id, :url, :morning, :evening, :user_id, :history
end