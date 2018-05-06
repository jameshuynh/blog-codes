# frozen_string_literal: true

# app/graphql/types/comment_type.rb

require 'graphql/batch'
Types::CommentType = GraphQL::ObjectType.define do
  name 'Comment'

  field :id, !types.ID
  field :content, !types.String
end
