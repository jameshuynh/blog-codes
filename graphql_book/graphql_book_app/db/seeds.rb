# frozen_string_literal: true

User.create(email: 'admin@example.com', password: 'secret')

author1 = Author.create(name: 'Drew Neil')
author2 = Author.create(name: 'Rob Isenberg')
book1 = Book.create(title: 'Modern Vim', author: author1)
book2 = Book.create(title: 'Docker for Rails Developers', author: author2)

book1.comments.create(content: 'This book is great')
book1.comments.create(content: 'This book is awesome')
book1.comments.create(content: 'I love this book')

book2.comments.create(content: 'Awesome book')
book2.comments.create(content: 'Truly powerful')
book2.comments.create(content: 'Beautiful content')
