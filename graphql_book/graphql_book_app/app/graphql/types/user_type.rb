# frozen_string_literal: true

# app/graphql/types/comment_type.rb

require 'graphql/batch'
Types::UserType = GraphQL::ObjectType.define do
  name 'User'

  field :id, !types.ID
  field :email, !types.String
end
