class Api::FriendsController < ApplicationController
  wrap_parameters include: Friend.attribute_names

  def index
    if current_user
      @friends = current_user.friends
    else
      render json: { errors: ["You are not logged in"] }, status: 422
    end
  end

  def create
    @friend = Friend.new(friend_params)

    if @friend.save
      @user1 = User.find(@friend.user1_id)
      @user2 = User.find(@friend.user2_id)
      FriendsChannel.broadcast_to @user1,
                                  type: "RECEIVE_FRIEND",
                                  **from_template("api/friends/show", friend: @friend, current_user: current_user)

      FriendsChannel.broadcast_to @user2,
                                  type: "RECEIVE_FRIEND",
                                  **from_template("api/friends/show", friend: @friend, current_user: current_user)

      render json: nil, status: :ok
    else
      render json: { errors: @friend.errors.full_messages }, status: 422
    end
  end

  def update
    @friend = Friend.find_by(id: params[:id])

    if @friend.update(friend_params.status)
      @user1 = User.find(@friend.user1_id)
      @user2 = User.find(@friend.user2_id)
      FriendsChannel.broadcast_to @user1,
                                  type: "UPDATE_FRIEND",
                                  **from_template("api/friends/show", friend: @friend, current_user: @user2)

      FriendsChannel.broadcast_to @user2,
                                  type: "UPDATE_FRIEND",
                                  **from_template("api/friends/show", friend: @friend, current_user: @user1)

      render json: nil, status: :ok
    else
      render json: { errors: @friend.errors.full_messages }, status: 422
    end
  end

  def destroy
    @friend = Friend.find_by(id: params[:id])

    if @friend.destroy
      @user1 = User.find(@friend.user1_id)
      @user2 = User.find(@friend.user2_id)

      FriendsChannel.broadcast_to @user1,
                                  type: "DESTROY_FRIEND",
                                  id: @friend.id

      FriendsChannel.broadcast_to @user2,
                                  type: "DESTROY_FRIEND",
                                  id: @friend.id

      render json: nil, status: :ok
    else
      render json: { errors: @friend.errors.full_messages }, status: 422
    end
  end

  private

  def friend_params
    params.require(:friend).permit(:user1_id, :user2_id, :status)
  end
end
