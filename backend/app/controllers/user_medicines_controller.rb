class UserMedicinesController < ApplicationController

  def index 
    render json: UserMedicine.all
  end 

  def create
  end

end
