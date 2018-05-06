# app/graphql/types/author_type.rb
# frozen_string_literal: true

require 'graphql/batch'
Types::AuthorType = GraphQL::ObjectType.define do
  name 'Author'

  field :id, !types.ID
  field :name, !types.String
end
