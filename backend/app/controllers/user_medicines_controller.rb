class UserMedicinesController < ApplicationController

  def index 
    render json: UserMedicine.all
  end 

  def create
    medicine = UserMedicine.create(user_medicine_params)
    render json: {info: "user medicine created"}
  end

  def update
    medicine = UserMedicine.find_by(id: params[:id])
    medicine.update(user_medicine_params)
    render json: {info: "Medicine updated"}
  end

  def destroy
    medicine = UserMedicine.find_by(id: params[:id])
    medicine.destroy
    render json: {info: 'User medicine deleted!'}
  end

  private 
  def user_medicine_params 
    params.require(:user_medicine).permit(:name, :dose, :morning, :evening, :url, :composite_id, :user_id, history: {})
  end

end
