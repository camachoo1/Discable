# [Disclone](https://discable-k8cm.onrender.com)

## Overview
[Disclone](https://discable-k8cm.onrender.com) is a clone of Discord. Discord has over 150 million monthly active users and over 19 million active servers per week. With Disclone, users are able to communicate with each other through real-time chat messaging, create servers and channels, and collaborate with others through friends.

##Technologies

In order to build Disclone I had to use a React-Redux frontend, a Ruby on Rails backend, and PostgreSQL as the DBMS. For formatting and styling I used CSS and [MUI](https://mui.com) for the icons.

## Features

Logged in users are able to create their own servers and channels. Users will also be able to update and delete both of their servers and channels. Once a user is in a channel then they are able to send messages inside of those channes to be able to chat with friends in real time.

## Important Code

### Setting up backend Controller/ActionCable actions to enable real-time chat
```ruby
def create
    @message = Message.new(message_params)

    if @message.save
      ChannelsChannel.broadcast_to @message.channel,
                                   type: "RECEIVE_MESSAGE",
                                   **from_template("api/messages/show", message: @message)
      render json: nil, status: :ok
    else
      render json: { errors: @message.errors.full_messages }, status: 422
    end
  end
```

### Setting up frontend useEffect to subscribe channels on mount
```javascript
useEffect(() => {
    dispatch(clearFriends());
    dispatch(clearMessages());
    dispatch(fetchMessages(serverId, channelId));
    dispatch(fetchChannel(channelId));

    const subscription = consumer.subscriptions.create(
      { channel: 'ChannelsChannel', id: channelId },
      {
        received: (messageObj) => {
          switch (messageObj.type) {
            case 'RECEIVE_MESSAGE':
              dispatch(addMessage(messageObj));
              break;
            case 'UPDATE_MESSAGE':
              dispatch(addMessage(messageObj));
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(messageObj.id));
              break;
            default:
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch, channelId, serverId]);
```

## Future Features to Implement
+ Implement notifications for messages
+ Add functionality to add/block/remove friends
+ Voice/Video calling
