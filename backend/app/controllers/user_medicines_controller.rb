class UserMedicinesController < ApplicationController

  def index 
    render json: UserMedicine.all
  end 

  def create
    medicine = UserMedicine.create(user_medicine_params)
    render json: {info: "user medicine created"}
  end

  def update
    medicine = UserMedicine.find_by(composite_id: params[:composite_id])
    medicine.update(user_medicine_params)
    render json: UserMedicinesSerializer.new(medicine.to_serialized_json)
  end

  def destroy
    medicine = UserMedicine.find_by(composite_id: params[:composite_id])
    medicine.destroy
    render json: {info: 'User medicine deleted!'}
  end


# def destroy
#     order = Order.find_by(id: params[:id])
#     id = order.id
#     order.destroy
#     render json: {info: 'Order Deleted!', orderId: id}
# end

  private 
  def user_medicine_params 
    params.require(:user_medicine).permit(:name, :dose, :morning, :evening, :url, :composite_id, :user_id)
  end

end
