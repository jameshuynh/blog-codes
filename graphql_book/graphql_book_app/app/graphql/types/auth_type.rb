# app/graphql/types/author_type.rb
# frozen_string_literal: true

require 'graphql/batch'
Types::AuthType = GraphQL::ObjectType.define do
  name 'AuthType'

  field :jwt, !types.String
  field :user, Types::UserType
end
