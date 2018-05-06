# app/graphql/types/auth_input.rb
# frozen_string_literal: true

Types::AuthInput = GraphQL::InputObjectType.define do
  name 'AuthInput'

  argument :email, !types.String
  argument :password, !types.String
end
