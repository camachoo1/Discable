class Api::MessagesController < ApplicationController
  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
    render :index
  end

  def show
    @message = Message.find_by(id: params[:id])
    render :show
  end

  def create
    @message = Message.new(message_params)

    if @message.save
      render :show
    else
      render json: { errors: @message.errors.full_messages }, status: 422
    end
  end

  def update
    @message = Message.find_by(id: params[:id])

    if @message.author_id == current_user.id
      if @message.update(message_params)
        render :show
      else
        render json: { errors: @message.errors.full_messages }, status: 422
      end
    else
      render json: { errors: ["Messages can only be edited by the author."] }, status: 422
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
    msg_owner = @message.channel.server.owner_id

    if current_user.id == msg_owner || @message.author_id == current_user.id
      if @message.destroy
        render :show
      else
        render json: { errors: @message.errors.full_messages }, status: 422
      end
    else
      render json: { errors: ["Only the author of this message or owner of the server can delete this message."] }
    end
  end

  private

  def message_params
    params.require(:message).permit(:author_id, :body, :channel_id, :parent_id)
  end
end
