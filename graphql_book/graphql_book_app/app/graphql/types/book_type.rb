# frozen_string_literal: true

# app/graphql/types/book_type.rb

require 'graphql/batch'
Types::BookType = GraphQL::ObjectType.define do
  name 'Book'

  field :id, !types.ID
  field :title, !types.String

  field :author, Types::AuthorType do
    # preload %i[author]
    resolve lambda { |obj, _args, _ctx|
      obj.author
    }
  end

  field :comments, !types[Types::CommentType] do
    # preload %i[comments]
    resolve lambda { |obj, _args, _ctx|
      obj.comments
    }
  end

  field :number_of_comments, !types.Int do
    # preload %i[comments]
    resolve lambda { |obj, _args, _ctx|
      obj.comments.length
    }
  end
end
