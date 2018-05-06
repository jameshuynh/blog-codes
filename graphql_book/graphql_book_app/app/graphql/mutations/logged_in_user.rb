# frozen_string_literal: true
# app/graphql/mutations/logged_in_user.rb

class Mutations::LoggedInUser < GraphQL::Function
  # define the arguments this field will receive
  argument :auth, !Types::AuthInput

  # define what this field will return
  type Types::AuthType

  # resolve the field's response
  def call(_obj, args, _ctx)
    input = args[:auth]
    return unless input

    user = User.find_by(email: input[:email])
    return unless user
    return unless user.authenticate(input[:password])

    OpenStruct.new(jwt: AuthToken.token(user),
                   user: user)
  end
end
