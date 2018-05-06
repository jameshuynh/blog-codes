# frozen_string_literal: true

Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :books, !types[Types::BookType] do
    resolve lambda { |_obj, _args, ctx|
      if ctx[:current_user].blank?
        raise GraphQL::ExecutionError, 'Authentication required'
      end
      Book.all
    }
  end
end
