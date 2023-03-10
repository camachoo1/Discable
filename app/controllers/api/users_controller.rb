class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ["password"]
  # before_action :require_logged_out, only: [:create] # dont want to create if we are already logged in

  def create
    @user = User.new(user_params)
    @user.status = "online"

    if @user.save
      login!(@user)
      ServerSubscription.create(user_id: @user.id, server_id: 1)
      Friend.create(user1_id: @user.id, user2_id: 1, status: "friends")
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :tag, :password)
  end
end
