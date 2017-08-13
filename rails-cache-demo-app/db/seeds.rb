post_description = %(Simply dummy text of the printing and typesetting industry)

(1..10).to_a.each do |index|
  post = Post.create(title: "Post #{index}", content: post_description)
  (1..1000).to_a.each do |comment_index|
    post.comments.create(content: "Comment #{comment_index}")
  end
end
