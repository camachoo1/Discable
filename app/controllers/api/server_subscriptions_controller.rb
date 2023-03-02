class Api::ServerSubscriptionsController < ApplicationController
  def create
    @server_subscription = ServerSubscription.new(server_subscription_params)
    @server = Server.find(params[:server_subscription][:server_id])

    if @server_subscription.save
      render :show
    else
      render json: { errors: @server_subscription.errors.full_messages }, status: 422
    end
  end

  def destroy
    @user = current_user
    @server_subscription = ServerSubscription.find_by(id: params[:id])

    if @server_subscription.user_id == current_user.id && @server_subscription.destroy
      @server_subscription.destroy
      render "api/users/show"
    else
      render json: { errors: @server_subscription.errors.full_messages }, status: 422
    end
  end

  private

  def server_subscription_params
    params.require(:server_subscription).permit(:user_id, :server_id)
  end
end
