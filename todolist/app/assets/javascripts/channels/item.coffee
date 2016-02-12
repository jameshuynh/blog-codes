App.item = App.cable.subscriptions.create "ItemChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # When we broadcast the item creation event,
    # all the client subscribed to item_channel
    # would have this function called, which result in calling
    # the js below
    $("#to_do_list").append(data["description"])

  create: (description) ->
    # calling perform to dispatch the create function
    # on ItemChannel with hash { description: description }
    @perform 'create', description: description
